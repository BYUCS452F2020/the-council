import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:the_council/models/Question.dart';
import 'package:the_council/models/database.dart';
import 'package:the_council/main.dart';

class EditAnswer extends StatelessWidget {
  final Question question;
  final TextEditingController header;
  final TextEditingController body;

  EditAnswer(this.question, this.header, this.body);

  factory EditAnswer.newAnswer(Question question) {
    return EditAnswer(question, TextEditingController(), TextEditingController());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('edit answer'),
        ),
        body: Column(
          children: [
            Text(
              this.question.header
            ),
            Text(
                this.question.body
            ),
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
                Provider.of<Database>(context, listen:false).editAnswer(question.questionId, header.text, body.text);
                Navigator.pop(context);
              },
            )
          ],
        )
    );
  }
}
