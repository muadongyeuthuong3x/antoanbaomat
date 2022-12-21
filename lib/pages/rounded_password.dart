import 'package:flutter/material.dart';
import 'package:mussic/pages/text_file_container.dart';
import 'package:mussic/theme/colors.dart';

// ignore: must_be_immutable
class RoundedPassword extends StatefulWidget {
  final ValueChanged<String> onChanged;
  final String textDescript;
  late bool viewIconPassword = false;
  RoundedPassword(
      {Key? key,
      required this.onChanged,
      this.textDescript = "Password",
      viewIconPassword})
      : super(key: key);

  @override
  State<RoundedPassword> createState() => _RoundedPassword();
}

class _RoundedPassword extends State<RoundedPassword> {
  @override
  Widget build(BuildContext context) {
    return TextFileContainer(
        child: TextField(
      obscureText: widget.viewIconPassword,
      onChanged: widget.onChanged,
      decoration: InputDecoration(
          hintText: widget.textDescript,
          icon: const Icon(Icons.lock, color: kPrimaryColor),
          suffixIcon: IconButton(
            icon: Icon(
              (widget.viewIconPassword)
                  ? Icons.visibility
                  : Icons.visibility_off,
              color: kPrimaryColor,
            ),
            onPressed: () {
              setState(() {
                widget.viewIconPassword = !widget.viewIconPassword;
              });
            },
          ),
          border: InputBorder.none),
    ));
  }
}
