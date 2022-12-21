import 'package:flutter/material.dart';
import 'package:mussic/pages/welcome_page.dart';
import 'package:mussic/theme/colors.dart';

void main() {
  runApp(MaterialApp(
    debugShowCheckedModeBanner: false,
    theme: ThemeData(
      primaryColor: kPrimaryColor,
      scaffoldBackgroundColor: Colors.white,
    ),
    home: const WelComeApp(),
  ));
}
