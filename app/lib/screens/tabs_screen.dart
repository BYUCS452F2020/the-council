import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:the_council/models/Question.dart';
import 'package:the_council/models/auth.dart';

import 'edit_question.dart';

class Tabs extends StatefulWidget {
  @override
  _TabsState createState() => _TabsState();
}

class _TabsState extends State<Tabs> {

  Future<List<Question>> questions;

  @override
  void initState() {
    super.initState();
    questions = Provider.of<Database>(context, listen: false).getQuestions();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
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
      body: FutureBuilder<List<Question>>(
        future: questions,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            return ListView(
                children: snapshot.data.map((e) => Text(e.header)).toList(),
            );
          }
          else {
            return Center(child: CircularProgressIndicator());
          }
        }
        ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => EditQuestion())
        ),
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
