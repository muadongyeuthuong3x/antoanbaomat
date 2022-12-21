import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:mussic/pages/backgroundLogin.dart';
import 'package:mussic/pages/login_page.dart';
import 'package:mussic/pages/register_account.dart';
import 'package:mussic/model/user_model.dart';
import 'package:mussic/pages/round_button.dart';
import 'package:mussic/base_client/apiBase.dart';
import 'package:mussic/pages/rounded_input.dart';
import 'package:mussic/pages/rounded_password.dart';
import 'package:page_transition/page_transition.dart';

import '../base_client/apiBase.dart';
import 'already_have_account.dart';

class BodyRegister extends StatefulWidget {
  const BodyRegister({Key? key}) : super(key: key);

  @override
  State<BodyRegister> createState() => _BodyRegisterState();
}

class _BodyRegisterState extends State<BodyRegister> {
  late String email, forgetPassword, password;
  ApiBase apiBase = ApiBase();
  TextEditingController emailController = TextEditingController();
  TextEditingController passWordController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    apiRegister() async {
      if (forgetPassword != password) {
        print("Hai password khong giong nhau");
        return;
      }
     await apiBase.postData(
          "user", UserModel(email: email, password: password));
    }

    return SingleChildScrollView(
      child: BackGroundLogin(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              "Register AppMusic",
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            SvgPicture.asset(
              "assets/icons/login.svg",
              height: size.height * 0.35,
            ),
            SizedBox(
              height: size.height * 0.01,
            ),
            RoundInputFile(
              hindText: "Your email",
              onChanged: (value) {
                setState(() {
                  email = value;
                });
              },
              icon: Icons.person,
            ),
            SizedBox(
              height: size.height * 0.01,
            ),
            RoundedPassword(
              onChanged: (value) {
                setState(() {
                  password = value;
                });
              },
            ),
            RoundedPassword(
              onChanged: (value) {
                setState(() {
                  forgetPassword = value;
                });
              },
              textDescript: 'Forget Password',
            ),
            SizedBox(
              height: size.height * 0.01,
            ),
            RoundButton(
                text: "Register",
                onPressed: () async {
                  await apiRegister();
                }),
            SizedBox(
              height: size.height * 0.01,
            ),
            AlreadyHaveAnAccountCheck(
              press: () {
                Navigator.push(
                    context,
                    PageTransition(
                      child: const LoginAppMusic(),
                      type: PageTransitionType.fade,
                    ));
              },
              login: false,
            )
          ],
        ),
      ),
    );
  }
}
