import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mussic/model/user_model.dart';
import 'package:mussic/response_base/base_response.dart';
import 'package:mussic/response_base/user.dart';
import 'package:localstorage/localstorage.dart';

const String baseUrl = 'http://192.168.169.137:5000/';

class ApiBase {
  var client = http.Client();
  final LocalStorage storage = new LocalStorage('user');
  final String _token = '';
  // ignore: prefer_final_fields
  // Map<String, String> get _headers => {
  //     'Content-Type':'application/json-patch+json',
  //       "Accept": "application/json",
  //       "Authorization": "Bearer $_token",
  //     };

  Map<String, String> get _header => {
        'Content-Type': 'application/json; charset=UTF-8',
        'accept': 'application/json',
        "Authorization": "Bearer $_token",
      };

  Future<dynamic> get(String api) async {
    var url = Uri.parse(baseUrl + api);
    var response = await client.get(url, headers: _header);
    return response;
  }

  // POST

  Future<dynamic> postData(String api, UserModel user) async {
    var url = Uri.parse(baseUrl + api);
    var playload = jsonEncode({"email": user.email, "password": user.password});
    var response = await client.post(url, headers: _header, body: playload);
    if (response.statusCode == 200 || response.statusCode == 201) {
      var dataRes = User.fromJson(json.decode(response.body));
      return dataRes.token;
    }
  }

  Future<dynamic> postDataRegister(String api, UserModel user) async {
    var url = Uri.parse(baseUrl + api);
    var playload = jsonEncode({"email": user.email, "password": user.password});
    var response = await client.post(url, headers: _header, body: playload);
    if (response.statusCode == 200 || response.statusCode == 201) {
      var dataRes = User.fromJson(json.decode(response.body));
      return dataRes.token;
    } else {
      return;
    }
  }

  Future<dynamic> put(String api) async {}
  Future<dynamic> delete(String api) async {}
}
