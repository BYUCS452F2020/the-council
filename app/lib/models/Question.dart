import 'package:flutter/cupertino.dart';

class Question {
  final String questionId;
  final String askerId;
  final String askerName;
  final String createdAt;
  final String header;
  final String body;

  Question({this.questionId, this.askerId, this.askerName, this.createdAt, this.header, this.body});

  factory Question.fromJson(Map<String, dynamic> json) {
    return Question(
        questionId: json['questionId'],
        askerId: json['askerId'],
        askerName: json['askerName'],
        createdAt: json['createdAt'],
        header: json['header'],
        body: json['body']
    );
  }
}
