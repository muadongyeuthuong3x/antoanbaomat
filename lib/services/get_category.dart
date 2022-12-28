import 'dart:convert';
import 'package:mussic/datamodel.dart';
import 'package:http/http.dart' as http;

const String baseUrl = 'http://192.168.169.137:5000/';

class GetCategoryService {
  Map<String, String> get _header => {
        'Content-Type': 'application/json; charset=UTF-8',
        'accept': 'application/json',
      };

  Future<List<DataModelCategory>> getAll(String api) async {
    var url = Uri.parse(baseUrl + api);
    var client = http.Client();
    var response = await client.get(url, headers: _header);
    if (response.statusCode == 200) {
      final json = jsonDecode(response.body) as List;
      final data = json.map((e) {
        return DataModelCategory(id: e['id'], name: e['name']);
      }).toList();
      return data;
    }
    return [];
  }
}
