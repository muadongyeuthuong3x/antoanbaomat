import 'package:flutter/material.dart';
import 'package:mussic/pages/text_file_container.dart';
import 'package:mussic/theme/colors.dart';

class RoundInputFile extends StatelessWidget {
  final String hindText;
  final IconData icon;
  final ValueChanged<String> onChanged;
  const RoundInputFile(
      {Key? key,
      required this.hindText,
      required this.icon,
      required this.onChanged})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextFileContainer(
      child: TextField(
        onChanged: onChanged,
        decoration: InputDecoration(
            icon: Icon(
              icon,
              color: kPrimaryColor,
            ),
            hintText: hindText,
            border: InputBorder.none),
      ),
    );
  }
}
