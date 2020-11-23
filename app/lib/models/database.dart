import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;
import 'package:the_council/models/Question.dart';
import 'package:the_council/request_response/ask_response.dart';
import 'package:the_council/request_response/login_response.dart';
import 'package:the_council/models/usermodel.dart';
import 'package:the_council/request_response/questions_response.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class Database extends ChangeNotifier {
  String authToken;
  AuthStatus authstatus = AuthStatus.notSignedIn;
  String email;
  String password;
  int userId;

  Future<bool> edit_question(String questionId, String header, String body) async {
    if (questionId == null) { // if we're adding a new question.
      final http.Response ask_response = await http.post(
          'https://thecouncil.tk/question',
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: jsonEncode(<String, String> {
            "authToken": this.authToken,
            "header": header,
            "body": body,
          })
      );

      if (ask_response.statusCode == 200) {
        var response = AskResponse.fromJson(jsonDecode(ask_response.body));
        return response.success;
      }
      else {
        throw Exception('Failed to ask');
      }
    }
  }

  Future<List<Question>> getQuestions() async {
    final http.Response questionsResponse = await http.get(
        Uri.https('thecouncil.tk', '/question', {'authToken': this.authToken}),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
    );

    if (questionsResponse.statusCode == 200) {
      var response = QuestionsResponse.fromJson(jsonDecode(questionsResponse.body));
      return (response.success) ? response.questions : Exception('\'not success\' response from server');
    }
    else {
      throw Exception('Failed to ask');
    }

  }

  Future<List<Question>> getQuestionsByUserID() async {
    final http.Response questionsResponse = await http.get(
      Uri.https('thecouncil.tk', '/question/user/${userId}', {'authToken': this.authToken}),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
    );

    if (questionsResponse.statusCode == 200) {
      var response = QuestionsResponse.fromJson(jsonDecode(questionsResponse.body));
      return (response.success) ? response.questions : Exception('\'not success\' response from server');
    }
    else {
      throw Exception('Failed to ask');
    }

  }

  Future<UserModel> login() async {
    // loading();

    final http.Response loginResponse = await http.post(
        'https://thecouncil.tk/user/login',
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String> {
          "email": this.email,
          "password": this.password
        })
    );

    if (loginResponse.statusCode == 200) {
      authstatus = AuthStatus.signedIn;
    }
    else {
      authstatus = AuthStatus.notSignedIn;
      throw Exception('Failed to login');
    }
    // notifyListeners();
    var response = LoginResponse.fromJson(jsonDecode(loginResponse.body));
    authToken = response.authToken;
    userId = response.user.userId;
    return response.user;
  }

  void setEmailAndPassword(email, password) {
    this.email = email;
    this.password = password;
    authstatus = AuthStatus.notDetermined;
    notifyListeners();
  }

  void loading(){
    authstatus = AuthStatus.notDetermined;
    notifyListeners();
  }

}

enum AuthStatus {
  notDetermined,
  notSignedIn,
  signedIn,
}
