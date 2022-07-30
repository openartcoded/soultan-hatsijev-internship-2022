class UserModel {
  const UserModel(
      {required this.firstName,
      required this.lastName,
      required this.weight,
      required this.height,
      required this.birthDate});

  final String firstName;
  final String lastName;
  final double weight;
  final double height;
  final DateTime birthDate;
}
