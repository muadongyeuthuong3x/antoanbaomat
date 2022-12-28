import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:mussic/base_client/apiBase.dart';
import 'package:mussic/model/user_model.dart';
import 'package:mussic/pages/backgroundLogin.dart';
import 'package:mussic/pages/home_page.dart';
import 'package:mussic/pages/register_account.dart';
import 'package:mussic/pages/round_button.dart';
import 'package:mussic/pages/rounded_input.dart';
import 'package:mussic/pages/rounded_password.dart';
import 'package:page_transition/page_transition.dart';
import 'package:localstorage/localstorage.dart';
import 'package:flutter_bcrypt/flutter_bcrypt.dart';

import 'already_have_account.dart';

class BodyLogin extends StatefulWidget {
  const BodyLogin({Key? key}) : super(key: key);
  @override
  State<BodyLogin> createState() => _BodyLoginState();
}

class _BodyLoginState extends State<BodyLogin> {
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
  }

  ApiBase apiBase = ApiBase();
  TextEditingController emailController = TextEditingController();
  TextEditingController passWordController = TextEditingController();

  apiLogin() async {
    try {
      var hash = await FlutterBcrypt.hashPw(
          password: passWordController.text,
          salt: r'$2b$06$C6UzMDM.H6dfI/f/IKxGhu');
      // var response = await apiBase.postData(
      //     "user/login", UserModel(email: emailController.text, password: hash));

      var response = await apiBase.postData("user/login",
          UserModel(email: "test11@gmail.com", password: "123456"));
      print(response);
      final LocalStorage storage = LocalStorage('user');
      await storage.setItem('token', response);

      print(response.length);
      // ignore: use_build_context_synchronously
      if (response.length > 0) {
        // ignore: use_build_context_synchronously
        Navigator.push(context, MaterialPageRoute(builder: (context) {
          return const HomePage();
        }));
      }
    } catch (_) {}
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return SingleChildScrollView(
      child: BackGroundLogin(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              "Login AppMusic",
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
                emailController.text = value;
              },
              icon: Icons.person,
            ),
            SizedBox(
              height: size.height * 0.01,
            ),
            RoundedPassword(
              onChanged: (value) {
                passWordController.text = value;
              },
            ),
            SizedBox(
              height: size.height * 0.01,
            ),
            RoundButton(
                text: "Login",
                onPressed: () async {
                //  await apiLogin();
                  Navigator.push(context, MaterialPageRoute(builder: (context) {
                    return const HomePage();
                  }));
                }),
            SizedBox(
              height: size.height * 0.01,
            ),
            AlreadyHaveAnAccountCheck(
              press: () {
                Navigator.push(
                    context,
                    PageTransition(
                      child: const RegisterAppMusic(),
                      type: PageTransitionType.fade,
                    ));
              },
              login: true,
            )
          ],
        ),
      ),
    );
  }
}
