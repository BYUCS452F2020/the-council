import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:the_council/screens/login.dart';
import 'package:the_council/screens/tabs_screen.dart';

import 'models/database.dart';
import 'models/usermodel.dart';

class Root extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _RootState();
}


class _RootState extends State<Root> {
  @override
  Widget build(BuildContext context) {
    return Consumer<Database>(
      builder: (context, auth, child) {
        switch (auth.authstatus) {
          case AuthStatus.notSignedIn: {
              return Login();
          }
            break;
          // case AuthStatus.signedIn: {
          //   return Tabs();
          // }
          //   break;
          default: {
            return FutureBuilder<UserModel>(
              future: auth.login(), // returns user object from the get-go. they aren't logged in if you've gotten this far.
              builder: (context, snapshot) {
                if(snapshot.hasData) {
                  // Provider.of<UserModel>(context, listen:false).name = snapshot.data.name;
                  return ChangeNotifierProvider(
                    create: (context) => snapshot.data,
                      child: Tabs(),
                  );
                }
                return Scaffold(

                    body: Container(
                      alignment: Alignment.center,
                      child: CircularProgressIndicator(),
                    )
                );
              },
            );
          }
              break;
        }
      }
    );
  }
}