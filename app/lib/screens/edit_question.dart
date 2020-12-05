import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:the_council/models/Question.dart';
import 'package:the_council/models/database.dart';

class EditQuestion extends StatelessWidget {

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
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('${questionId == null ? 'ask' : 'edit'} question'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: header,
              decoration: InputDecoration(
                hintText: 'header'
              ),
            ),
            TextField(
              controller: body,
              decoration: InputDecoration(
                  hintText: 'body'
              ),
            ),
            TextButton(
              child: Text('submit'),
              onPressed: () {
                Provider.of<Database>(context, listen:false).editQuestion(questionId, header.text, body.text);
                Navigator.pop(context);
              },
            )
          ],
        ),
      )
    );
  }
}
