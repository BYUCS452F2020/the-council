import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:the_council/models/database.dart';
import 'package:the_council/main.dart';

class EditQuestion extends StatelessWidget {
  final header = TextEditingController();
  final body = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('edit question'),
      ),
      body: Column(
        children: [
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
              Provider.of<Database>(context, listen:false).editQuestion(null, header.text, body.text);
              Navigator.pop(context);
            },
          )
        ],
      )
    );
  }
}
