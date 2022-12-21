import 'package:flutter/material.dart';
import 'package:mussic/theme/colors.dart';

class RoundButton extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;
  final Color color, textColor;

  const RoundButton({
    Key? key,
    required this.text,
    required this.onPressed,
    this.color = kPrimaryColor,
    this.textColor = Colors.white,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Container(
      margin: EdgeInsets.symmetric(vertical: 10),
      width: size.width * 0.8,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(29),
        child: ElevatedButton(
          style: ElevatedButton.styleFrom(
            primary: kPrimaryColor,
            padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 40),
          ),
          onPressed: () => onPressed(),
          child: Text(
            text,
            style: TextStyle(color: textColor),
          ),
        ),
      ),
    );
  }
}
