import 'package:flutter/cupertino.dart';

class UserModel extends ChangeNotifier{
  String userId;
  String role;
  String name;
  String email;

  UserModel({this.userId, this.role, this.name, this.email}){
    notifyListeners();
  }

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      userId: json['userId'],
      role: json['role'],
      name: json['name'],
      email: json['email']
    );
  }
}
