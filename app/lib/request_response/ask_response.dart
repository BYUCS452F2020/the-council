import 'package:the_council/models/Question.dart';

class AskResponse {
  bool success;
  Question question;

  AskResponse({this.success, this.question});

  factory AskResponse.fromJson(Map<String, dynamic> json) {
    return AskResponse(
        success: json['success'],
        question: Question.fromJson(json['question']),
    );
  }
}
