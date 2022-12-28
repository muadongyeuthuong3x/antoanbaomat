import 'package:flutter/material.dart';
import 'package:mussic/pages/body_login.dart';
import 'package:mussic/pages/home_page.dart';
import 'package:mussic/provider/category_provider.dart';
import 'package:provider/provider.dart';

class LoginAppMusic extends StatefulWidget {
  const LoginAppMusic({Key? key}) : super(key: key);

  @override
  State<LoginAppMusic> createState() => _LoginAppMusicState();
}

class _LoginAppMusicState extends State<LoginAppMusic> {
  @override
  void initState() {
    // TODO: implement initState

    // WidgetsBinding.instance.addPostFrameCallback((timeStamp) {
    // Provider.of<CategoryProvider>(context, listen: true).getAllCategory();
    // });
    super.initState();
  }

  Widget build(BuildContext context) {
    return const Scaffold(
      body: HomePage(),
    );
  }
}
