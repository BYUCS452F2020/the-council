import 'package:flutter/cupertino.dart';
import 'package:the_council/models/user.dart';

class LoginResponse {
  bool success;
  UserModel user;
  String authToken;

  LoginResponse({this.success, this.user, this.authToken});

  factory LoginResponse.fromJson(Map<String, dynamic> json) {
    return LoginResponse(
        success: json['success'],
        user: UserModel.fromJson(json['user']),
        authToken: json['authToken']
    );
  }
}
