import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:the_council/models/database.dart';
import 'package:the_council/models/usermodel.dart';
import 'package:the_council/root.dart';
import 'package:firebase_core/firebase_core.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  final Future<FirebaseApp> _initialization = Firebase.initializeApp();
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: _initialization,
      builder: (context, snapshot) {
        // Check for errors
        if (snapshot.hasError) {
          return MaterialApp(
            home: Scaffold(
              body: Center(
                child: Icon(Icons.error),
              ),
            ),
          );
            // Center(child:Icon(Icons.add));
        }

        // Once complete, show your application
        if (snapshot.connectionState == ConnectionState.done) {
          return MultiProvider(
            providers: [
              // ChangeNotifierProvider(create: (context) => UserModel()),
              ChangeNotifierProvider(create: (context) => Database())
            ],
            child: MaterialApp(
              title: 'Flutter Demo',
              theme: ThemeData(
                // This is the theme of your application.
                //
                // Try running your application with "flutter run". You'll see the
                // application has a blue toolbar. Then, without quitting the app, try
                // changing the primarySwatch below to Colors.green and then invoke
                // "hot reload" (press "r" in the console where you ran "flutter run",
                // or simply save your changes to "hot reload" in a Flutter IDE).
                // Notice that the counter didn't reset back to zero; the application
                // is not restarted.
                primarySwatch: Colors.grey,
                // This makes the visual density adapt to the platform that you run
                // the app on. For desktop platforms, the controls will be smaller and
                // closer together (more dense) than on mobile platforms.
                visualDensity: VisualDensity.adaptivePlatformDensity,
              ),
              // home: MyHomePage(title: 'Flutter Demo Home Page'),
              home: Root(),
              // MultiProvider(
              //     providers: [
              //       // ChangeNotifierProvider(create: (context) => UserModel()),
              //       ChangeNotifierProvider(create: (context) => Database())
              //     ],
              //     child: Root()),
            ),
          );
        }

        // Otherwise, show something whilst waiting for initialization to complete
        return Center(child: CircularProgressIndicator());
      },
    );
  }
}

