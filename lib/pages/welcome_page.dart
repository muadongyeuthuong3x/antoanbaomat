import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/foundation/key.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:mussic/pages/body_page.dart';

class WelComeApp extends StatefulWidget {
  const WelComeApp({Key? key}) : super(key: key);

  @override
  State<WelComeApp> createState() => _WelComeAppState();
}

class _WelComeAppState extends State<WelComeApp> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: BodyPage(),
    );
  }
}
