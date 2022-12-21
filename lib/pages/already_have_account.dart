import 'package:flutter/material.dart';

class AlreadyHaveAnAccountCheck extends StatelessWidget {
  final bool login;
  final VoidCallback press;
  const AlreadyHaveAnAccountCheck({
    Key? key,
    this.login = true,
    required this.press,
  }) : super(key: key);

  get kPrimaryColor => null;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        Text(
          login ? "Đăng kí tài khoản ? " : 'Đăng nhập : ',
          style: TextStyle(color: kPrimaryColor),
        ),
        GestureDetector(
          onTap: press,
          child: Text(
            login ? "Sign Up" : "Sign In",
            style: const TextStyle(
                color: Colors.lightBlueAccent, fontWeight: FontWeight.bold),
          ),
        )
      ],
    );
  }
}
