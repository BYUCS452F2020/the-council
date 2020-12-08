import 'package:flutter/cupertino.dart';

class Answer {
  final String answererName;
  final String answererId;
  final String createdAt;
  final String header;
  final String body;

  Answer({this.answererName, this.answererId, this.createdAt, this.header, this.body});

  factory Answer.fromJson(Map<String, dynamic> json) {
    return Answer(
        answererName: json['answererName'],
        answererId: json['answererId'],
        createdAt: json['createdAt'],
        header: json['header'],
        body: json['body']
    );
  }
}
