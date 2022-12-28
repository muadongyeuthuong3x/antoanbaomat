import 'package:flutter/cupertino.dart';
import 'package:mussic/datamodel.dart';
import '../services/get_category.dart';

class CategoryProvider extends ChangeNotifier {
  final _serviceCategory = GetCategoryService();
  bool isLoading = false;
  List<DataModelCategory> _lists = [];
  List<DataModelCategory> get lists => _lists;

  Future<void> getAllCategory() async {
    isLoading = true;
    notifyListeners();
    final response = await _serviceCategory.getAll("category");
    _lists = response;
    isLoading = false;
    notifyListeners();
  }
}
