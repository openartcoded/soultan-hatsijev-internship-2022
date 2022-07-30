import 'package:flutter/material.dart';

class SettingsPage extends StatelessWidget {
  const SettingsPage({Key? key}) : super(key: key);
  final bool _isConnected = false;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(5),
      child: Flex(
        direction: Axis.vertical,
        mainAxisSize: MainAxisSize.max,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: const [Text('Version 0.1-alpha')],
          ),
          const Divider(),
          OutlinedButton(
            onPressed: () {},
            child: Text(_isConnected ? 'Se déconnecter' : 'Se connecter'),
          ),
        ],
      ),
    );
  }
}
