import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_fitness/models/user_model.dart';
import 'package:intl/date_symbol_data_local.dart';
import 'package:intl/intl.dart';

class UserInformationPage extends StatefulWidget {
  const UserInformationPage({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => _UserInformationPageState();
}

class _UserInformationPageState extends State<UserInformationPage> {
  final TextEditingController _firstNameController = TextEditingController();
  final TextEditingController _lastNameController = TextEditingController();
  final TextEditingController _weightController = TextEditingController();
  final TextEditingController _heightController = TextEditingController();
  final TextEditingController _birthDateController = TextEditingController();
  final _formKey = GlobalKey<_UserInformationPageState>();

  String firstName = '';
  String lastName = '';
  double weight = 0;
  double height = 50;
  DateTime birthDate = DateTime.now();

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(top: 15, bottom: 50, left: 15, right: 15),
      child: Form(
        key: _formKey,
        autovalidateMode: AutovalidateMode.onUserInteraction,
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              TextFormField(
                controller: _firstNameController,
                decoration: const InputDecoration(labelText: 'Prénom'),
                style: const TextStyle(fontSize: 22),
                maxLength: 25,
                maxLengthEnforcement: MaxLengthEnforcement.enforced,
                validator: (text) {
                  if (text == null || text.isEmpty) {
                    return 'Veuillez entrer votre prénom';
                  }

                  if (text.length < 2) {
                    return 'Le prénom doit faire au moins 2 caractères!';
                  }

                  if (text.length > 25) {
                    return 'Le prénom ne peut pas faire plus de 25 caractères!';
                  }
                  return null;
                },
              ),
              const Divider(
                height: 5,
              ),
              TextFormField(
                controller: _lastNameController,
                decoration: const InputDecoration(labelText: 'Nom de famille'),
                style: const TextStyle(fontSize: 22),
                maxLengthEnforcement: MaxLengthEnforcement.enforced,
                maxLength: 50,
                validator: (text) {
                  if (text == null || text.isEmpty) {
                    return 'Veuillez entrer votre nom de famille';
                  }

                  if (text.length < 2) {
                    return 'Le nom de famille doit faire au moins 2 caractères';
                  }

                  if (text.length > 50) {
                    return 'Le nom de famille ne peut pas faire plus de 50 caractères!';
                  }
                  return null;
                },
              ),
              const Divider(
                height: 5,
              ),
              const Text(
                'Poid',
                style: TextStyle(fontSize: 20),
              ),
              const Divider(),
              Text('${weight.toStringAsFixed(2)} kg'),
              TextFormField(
                controller: _weightController,
                decoration: const InputDecoration(labelText: 'Poid'),
                keyboardType: TextInputType.number,
                inputFormatters: [
                  FilteringTextInputFormatter.digitsOnly,
                ],
                onChanged: (String value) {
                  double? dValue = double.tryParse(value);

                  if (dValue != null && (dValue >= 0 || dValue <= 200)) {
                    setState(() {
                      weight = double.parse(value);
                    });
                  }
                },
                validator: (text) {
                  double? dValue = double.tryParse(text!);

                  if (dValue == null) {
                    return null;
                  }

                  if (dValue < 0 || dValue > 200) {
                    return 'La valeur minimale est 0 et la valuer maximale 200!';
                  }
                  return null;
                },
              ),
              Slider(
                min: 0,
                max: 200,
                value: weight,
                onChanged: (value) {
                  setState(() {
                    weight = value;
                    _weightController.value = TextEditingValue(
                      text: value.toStringAsFixed(2),
                    );
                  });
                },
              ),
              const Divider(
                height: 5,
              ),
              const Text(
                'Taille',
                style: TextStyle(
                  fontSize: 20,
                ),
              ),
              const Divider(),
              Text('${height.toStringAsFixed(2)} cm'),
              TextFormField(
                controller: _heightController,
                decoration: const InputDecoration(labelText: 'Taille'),
                keyboardType: TextInputType.number,
                inputFormatters: [
                  FilteringTextInputFormatter.digitsOnly,
                ],
                onChanged: (String value) {
                  double? dValue = double.tryParse(value);

                  if (dValue != null && (dValue >= 50 || dValue <= 250)) {
                    setState(() {
                      height = double.parse(value);
                    });
                  }
                },
                validator: (text) {
                  double? dValue = double.tryParse(text!);

                  if (dValue == null) {
                    return '';
                  }

                  if (dValue < 50 || dValue > 250) {
                    return 'La valeur minimale est de 50 et la valuer maximale de 250!';
                  }
                  return null;
                },
              ),
              Slider(
                min: 50,
                max: 250,
                value: height,
                onChanged: (value) {
                  setState(() {
                    height = value;
                  });
                },
              ),
              const Divider(
                height: 5,
              ),
              GestureDetector(
                onTap: () => _selectDate(context),
                child: AbsorbPointer(
                  child: TextFormField(
                    controller: _birthDateController,
                    keyboardType: TextInputType.datetime,
                    decoration: const InputDecoration(
                      hintText: 'Date de naissance',
                    ),
                  ),
                ),
              ),
              const Divider(
                height: 5,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  ElevatedButton(
                    onPressed: () => _saveUser(),
                    child: const Text('Enregistrer'),
                  ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
        context: context,
        initialDate: birthDate,
        firstDate: DateTime(1998),
        lastDate: DateTime(2100));

    if (picked == null) {
      return;
    }

    setState(() {
      birthDate = picked;
      initializeDateFormatting();
      Intl.defaultLocale = 'fr';
      final formatter = DateFormat('dd/MM/yyyy');
      _birthDateController.value =
          TextEditingValue(text: formatter.format(picked));
    });
  }

  void _saveUser() {
    UserModel user = UserModel(
        firstName: firstName,
        lastName: lastName,
        weight: weight,
        height: height,
        birthDate: birthDate);
    // TODO : Save User information in the database
  }
}
