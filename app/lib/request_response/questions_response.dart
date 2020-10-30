import 'package:the_council/models/Question.dart';

class QuestionsResponse {
  bool success;
  List<Question> questions;

  QuestionsResponse({this.success, this.questions});

  factory QuestionsResponse.fromJson(Map<String, dynamic> json) {
    List<Question> returnQuestions = new List<Question>();
    if (json['questions'] != null) {
      returnQuestions = new List<Question>();
      json['questions'].forEach((v) {
        returnQuestions.add(new Question.fromJson(v));
      });
    }
    return QuestionsResponse(
      success: json['success'],
      questions: returnQuestions,
    );
  }
}
