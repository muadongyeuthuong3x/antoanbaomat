class BaseResponse<T> {
  String? message;
  T? data;

  BaseResponse({required this.message, required this.data});

  factory BaseResponse.fromJson(
      Map<String, dynamic> json, Function(Map<String, dynamic>) build) {
    //   print(message);
    return BaseResponse(message: json['message'], data: json['token']);
  }
}
