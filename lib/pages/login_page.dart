import 'package:flutter/material.dart';
import 'package:mussic/pages/body_login.dart';

class LoginAppMusic extends StatefulWidget {
  const LoginAppMusic({Key? key}) : super(key: key);

  @override
  State<LoginAppMusic> createState() => _LoginAppMusicState();
}

class _LoginAppMusicState extends State<LoginAppMusic> {
  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: BodyLogin(),
    );
  }
}
