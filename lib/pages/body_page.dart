
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:mussic/pages/background.dart';
import 'package:mussic/pages/login_page.dart';
import 'package:mussic/pages/round_button.dart';
import 'package:mussic/theme/colors.dart';

class BodyPage extends StatefulWidget {
  const BodyPage({Key? key}) : super(key: key);

  @override
  State<BodyPage> createState() => _BodyPageState();
}

class _BodyPageState extends State<BodyPage> {
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Background(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          const Text(
            "WELCOME TO APP MUSIC",
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
          SvgPicture.asset(
            "assets/icons/chat.svg",
            height: size.height * 0.45,
          ),
          SizedBox(height: size.height * 0.05),
          RoundButton(
              text: "LOGIN",
              onPressed: () {
                Navigator.push(context, MaterialPageRoute(builder: (context) {
                  return const LoginAppMusic();
                }));
              }),
          RoundButton(
              text: "REGISTER",
              color: kPrimaryColor,
              textColor: Colors.lightBlue,
              onPressed: () {})
        ],
      ),
    );
  }
}
