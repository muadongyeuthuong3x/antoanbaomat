import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:mussic/pages/welcome_page.dart';
import 'package:mussic/provider/category_provider.dart';
import 'package:mussic/theme/colors.dart';
import 'package:provider/provider.dart';

// void main() {
//   // runApp(MaterialApp(
//   //   debugShowCheckedModeBanner: false,
//   //   theme: ThemeData(
//   //     primaryColor: kPrimaryColor,
//   //     scaffoldBackgroundColor: Colors.white,
//   //   ),
//   //   home: const WelComeApp(),
//   // ));

//   runApp(

//       /// Providers are above [MyApp] instead of inside it, so that tests
//       /// can use [MyApp] while mocking the providers
//      return  MultiProvider(
//       providers: [
//         ChangeNotifierProvider(create: (_) => CategoryProvider()),
//       ]),
//       child: MaterialApp(
//         debugShowCheckedModeBanner: false,
//         theme: ThemeData(
//           primaryColor: kPrimaryColor,
//           scaffoldBackgroundColor: Colors.white,
//         ),
//         home: const WelComeApp(),
//       ));
// }

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
        providers: [
          ChangeNotifierProvider(create: (_) => CategoryProvider()),
        ],
        child: MaterialApp(
          debugShowCheckedModeBanner: false,
          theme: ThemeData(
            primaryColor: kPrimaryColor,
            scaffoldBackgroundColor: Colors.white,
          ),
          home: const WelComeApp(),
        ));
  }
}
