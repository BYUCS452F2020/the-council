import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:the_council/models/Question.dart';
import 'package:the_council/models/database.dart';
import 'package:the_council/models/usermodel.dart';
import 'package:the_council/root.dart';

import 'edit_question.dart';

class Tabs extends StatefulWidget {
  @override
  _TabsState createState() => _TabsState();
}

class _TabsState extends State<Tabs> {

  Future<List<Question>> questions;
  Future<List<Question>> allQuestions;
  bool isCouncilmember;

  @override
  void initState() {
    super.initState();
  }

  @override
  void didChangeDependencies() {
    // TODO: implement didChangeDependencies
    super.didChangeDependencies();
    questions = Provider.of<Database>(context, listen: false).getQuestionsByUserID();
    isCouncilmember = Provider
        .of<UserModel>(context)
        .role == 'councilmember';
    if (isCouncilmember) allQuestions = Provider.of<Database>(context, listen: false).getAllQuestions();
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: isCouncilmember ? 3 : 1,
      child: Scaffold(
        // body: Center(
        //   child: TextButton(
        //     child: Consumer<UserModel>(builder: (context, user, child) {
        //       return Text(user.name + ' - ' + user.role + ' - ' + user.email + '\nid: ' + user.userId.toString());
        //     }),
        //     onPressed: () {
        //
        //     },
        //   ),
        // ),
        appBar: AppBar(
            title: Text('the council' + (isCouncilmember ? ' - councilmember' : ' - user')),
            bottom: TabBar(
                tabs: isCouncilmember ? [
                  Tab(text: 'ask'),
                  Tab(text: 'answer'),
                  Tab(text: 'vote')
                ] :
                [Tab(text: 'ask')]
            )
        ),
        body: TabBarView(
          children: isCouncilmember ? [
            getOwnQuestionsPage(context),
            getQuestionsPage(context),
            Icon(Icons.how_to_vote)
          ] : [
            getOwnQuestionsPage(context),
          ],
        ),
      ),
    );
  }

  Widget getOwnQuestionsPage(BuildContext context) {
    return Scaffold(
        body: FutureBuilder<List<Question>>(
            future: questions,
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                return ListView(
                  children: snapshot.data.map<Widget>((e) =>
                      QuestionListItem(e)).toList(),
                );
              }
              else {
                return Center(child: CircularProgressIndicator());
              }
            }
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () =>
              Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => EditQuestion())
              ),
          tooltip: 'Increment',
          child: Icon(Icons.add),
        )
    );
  }

  Widget getQuestionsPage(BuildContext context) {
    return Scaffold(
        body: FutureBuilder<List<Question>>(
            future: allQuestions,
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                return ListView(
                  children: snapshot.data.map<Widget>((e) =>
                      QuestionListItem(e)).toList(),
                );
              }
              else {
                return Center(child: CircularProgressIndicator());
              }
            }
        ),
    );
  }

  Widget QuestionListItem(Question e) {
    return ListTile(
      title: Text(e.header),
      subtitle: Text(e.body),
      onTap: () =>
          Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => EditQuestion())
          ),
    );
  }
}
