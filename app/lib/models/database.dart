import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;
import 'package:the_council/models/Question.dart';
import 'package:the_council/request_response/ask_response.dart';
import 'package:the_council/request_response/login_response.dart';
import 'package:the_council/models/usermodel.dart';
import 'package:the_council/request_response/questions_response.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

import 'answer.dart';

class Database extends ChangeNotifier {
  String authToken;
  AuthStatus authstatus = AuthStatus.notSignedIn;
  String email;
  String password;

  UserModel currentUser;

  Future<bool> editQuestion(String questionId, String header, String body) async {
    CollectionReference collection = FirebaseFirestore.instance.collection('questions');
    try {
      if (questionId == null) { // if we're adding a new question.
        await collection.add({
          'askerId': currentUser.userId,
          'askerName': currentUser.name,
          'body': body,
          'createdAt': Timestamp.now(),
          'header': header
        });
        notifyListeners();
        return true;
      } else {
        await collection.doc(questionId).update({
          'body': body,
          'header': header
        });
        notifyListeners();
      }
    } catch (e) {
      print('Error creating/editing question: $e');
    }
  }

  Future<void> deleteQuestion(questionId) async {
    CollectionReference collection = FirebaseFirestore.instance.collection('questions');
    // CollectionReference usercollection = FirebaseFirestore.instance.collection('questions');
    await collection.doc(questionId).delete();
    notifyListeners();
  }

  Future<List<Question>> getAllQuestions() async {
    try {
      CollectionReference collection = FirebaseFirestore.instance.collection('questions');
      QuerySnapshot querySnapshot = await collection.orderBy('createdAt', descending: true).get();
      List<Question> questions = [];
      querySnapshot.docs.forEach((doc) {
        questions.add(Question(askerId: doc['askerId'],body: doc['body'], createdAt: doc['createdAt'].toString(), header: doc['header'], questionId: doc.id));
      });
      return questions;
    } on Exception {
      throw Exception('Failed to get all questions');
    }
  }

  Future<List<Question>> getQuestionsByUserID() async {
    try {
      CollectionReference collection = FirebaseFirestore.instance.collection('questions');
      QuerySnapshot querySnapshot = await collection.where('askerId', isEqualTo: currentUser.userId).orderBy('createdAt', descending: true).get();
      List<Question> questions = [];
      querySnapshot.docs.forEach((doc) {
        questions.add(Question(askerId: doc['askerId'],body: doc['body'], createdAt: doc['createdAt'].toString(), header: doc['header'], questionId: doc.id));
      });
      return questions;
    } catch(e) {
      throw Exception('Failed to get questions by user ID');
    }
  }

  Future<bool> editAnswer(String questionId, String header, String body) async {
    CollectionReference question_collection = FirebaseFirestore.instance.collection('questions').doc(questionId).collection('answers');
    try {
      await question_collection.add({
        'answererName': currentUser.name,
        'answererId': currentUser.userId,
        'createdAt': Timestamp.now(),
        'header': header,
        'body': body
      });

      notifyListeners();
    } catch (e) {
      print('Error creating/editing question: $e');
    }
  }

  Future<List<Answer>> getAnswers(String questionId) async {
    try {
      CollectionReference collection = FirebaseFirestore.instance.collection('questions').doc(questionId).collection('answers');
      QuerySnapshot querySnapshot = await collection.get();
      List<Answer> answers = [];
      querySnapshot.docs.forEach((doc) {
        answers.add(Answer(answererName: doc['answererName'],body: doc['body'], createdAt: doc['createdAt'].toString(), header: doc['header'], answererId: doc['answererId']));
      });
      print(answers.length);
      return answers;
    } catch(e) {
      throw Exception('Failed to get questions by user ID');
    }
  }

  Future<UserModel> login() async {
    FirebaseAuth auth = FirebaseAuth.instance;
    CollectionReference users = FirebaseFirestore.instance.collection('users');
    try {
      UserCredential userCredential = await FirebaseAuth.instance.signInWithEmailAndPassword(
          email: this.email,
          password: this.password,
      );

      // Fetch user name and role from Firestore
      String role = 'user';
      String name = 'New User';
      DocumentSnapshot userDocument = await users.doc(userCredential.user.uid).get();
      if (userDocument.exists) {
        role = userDocument.data()['role'];
        name = userDocument.data()['name'];
      }

      currentUser = UserModel(userId: userCredential.user.uid, email: userCredential.user.email, role: role, name: name);
      authstatus = AuthStatus.signedIn;

      return currentUser;
    } on FirebaseAuthException catch (e) {
      if (e.code == 'user-not-found') {
        print('No user found for that email.');
      } else if (e.code == 'wrong-password') {
        print('Wrong password provided for that user.');
      }
      authstatus = AuthStatus.notSignedIn;
      throw Exception('Failed to login');
    }
    // loading();

    // final http.Response loginResponse = await http.post(
    //     'https://thecouncil.tk/user/login',
    //     headers: <String, String>{
    //       'Content-Type': 'application/json; charset=UTF-8',
    //     },
    //     body: jsonEncode(<String, String> {
    //       "email": this.email,
    //       "password": this.password
    //     })
    // );

    // if (loginResponse.statusCode == 200) {
    //   authstatus = AuthStatus.signedIn;
    // }
    // else {
    //   authstatus = AuthStatus.notSignedIn;
    //   throw Exception('Failed to login');
    // }
    // notifyListeners();
    // var response = LoginResponse();
    // authToken = response.authToken;
    // userId = response.user.userId;

    // return users.doc(); //response.user;
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
