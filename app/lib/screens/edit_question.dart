import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:the_council/models/Question.dart';
import 'package:the_council/models/answer.dart';
import 'package:the_council/models/database.dart';

class EditQuestion extends StatefulWidget {

  final String questionId;
  final TextEditingController header;
  final TextEditingController body;

  EditQuestion(this.questionId, this.header, this.body);

  factory EditQuestion.newQuestion() {
    return EditQuestion(null, TextEditingController(), TextEditingController());
  }

  factory EditQuestion.existingQuestion(Question question) {
    return EditQuestion(
        question.questionId,
        TextEditingController(text: question.header),
        TextEditingController(text: question.body)
    );
  }

  @override
  _EditQuestionState createState() => _EditQuestionState();
}

class _EditQuestionState extends State<EditQuestion> {
  Future<List<Answer>> answers;

  @override
  void initState() {
    super.initState();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    Database database = Provider.of<Database>(context);
    answers = database.getAnswers(widget.questionId);
    print(answers);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('${widget.questionId == null ? 'ask' : 'edit'} question'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: widget.header,
              decoration: InputDecoration(
                hintText: 'header'
              ),
            ),
            TextField(
              controller: widget.body,
              decoration: InputDecoration(
                  hintText: 'body'
              ),
            ),
            TextButton(
              child: Text('submit'),
              onPressed: () {
                Provider.of<Database>(context, listen:false).editQuestion(widget.questionId, widget.header.text, widget.body.text);
                Navigator.pop(context);
              },
            ),
            Expanded(
              child: FutureBuilder<List<Answer>>(
                  future: answers,
                  builder: (context, snapshot) {
                    if (snapshot.hasData) {
                      return ListView(
                        children: snapshot.data.map<Widget>((e) =>
                            AnswerListItem(e)).toList(),
                      );
                    }
                    else {
                      return Center(child: CircularProgressIndicator());
                    }
                  }
              ),
            ),
          ],
        ),
      )
    );
  }

  Widget AnswerListItem(Answer answer) {
    return Dismissible(
      key: Key(answer.header),
      // onDismissed: (direction) {
      //   Provider.of<Database>(context, listen:false).deleteQuestion(answer.questionId);
      // },
      child: ListTile(
        title: Text(answer.header),
        subtitle: Text(answer.body),
        // onTap: () =>
        //     Navigator.push(
        //         context,
        //         Provider.of<Database>(context, listen:false).currentUser.userId == answer.askerId ?
        //         MaterialPageRoute(builder: (context) => EditQuestion.widget.existingQuestion(answer)) : MaterialPageRoute(builder: (context) => EditAnswer.newAnswer(question))
        //     ),
      ),
    );
  }
}
