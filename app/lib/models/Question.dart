import 'package:flutter/cupertino.dart';

class Question {
  final int questionId;
  final int askerId;
  final String createdAt;
  final String header;
  final String body;

  Question({this.questionId, this.askerId, this.createdAt, this.header, this.body});

  factory Question.fromJson(Map<String, dynamic> json) {
    return Question(
        questionId: json['questionId'],
        askerId: json['askerId'],
        createdAt: json['createdAt'],
        header: json['header'],
        body: json['body']
    );
  }
}
