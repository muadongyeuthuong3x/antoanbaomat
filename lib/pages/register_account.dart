import 'package:flutter/material.dart';
import 'package:mussic/pages/body_register.dart';

class RegisterAppMusic extends StatefulWidget {
  const RegisterAppMusic({Key? key}) : super(key: key);

  @override
  State<RegisterAppMusic> createState() => _RegisterAppMusicState();
}

class _RegisterAppMusicState extends State<RegisterAppMusic> {
  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: BodyRegister(),
    );
  }
}
