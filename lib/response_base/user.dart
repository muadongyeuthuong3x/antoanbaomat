class User {
  String token;
  String message;

  User({required this.token, required this.message});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(token: json['token'], message: json['message']);
  }
}
