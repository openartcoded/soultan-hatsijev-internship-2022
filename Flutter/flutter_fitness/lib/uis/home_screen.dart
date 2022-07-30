import 'package:flutter/material.dart';
import 'package:flutter_fitness/uis/barcode_scan_screen.dart';
import 'package:flutter_fitness/uis/history_page.dart';
import 'package:flutter_fitness/uis/home_page.dart';
import 'package:flutter_fitness/uis/settings_page.dart';
import 'package:flutter_fitness/uis/user_information_page.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final PageController _homeScreenController = PageController();
  int _selectedIndex = 0;

  static const List<Widget> _pages = <Widget>[
    // Center(
    //   child: Text('Home page'),
    // ),
    HomePage(),
    HistoryPage(),
    UserInformationPage(),
    SettingsPage(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('My fitness pal'),
      ),
      body: PageView(
        controller: _homeScreenController,
        children: _pages,
        onPageChanged: (index) => _onPageChanged,
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => const BarcodeScanScreen(),
            ),
          );
        },
        child: const Icon(Icons.camera_alt_outlined),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      bottomNavigationBar: BottomAppBar(
        color: Colors.lightBlueAccent,
        shape: const CircularNotchedRectangle(),
        notchMargin: 5,
        child: Row(
          mainAxisSize: MainAxisSize.max,
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: <Widget>[
            IconButton(
              icon: const Icon(
                Icons.home_outlined,
                color: Colors.white,
              ),
              onPressed: () => _onPageChanged(0),
            ),
            IconButton(
              icon: const Icon(
                Icons.history_outlined,
                color: Colors.white,
              ),
              onPressed: () => _onPageChanged(1),
            ),
            IconButton(
              icon: const Icon(
                Icons.question_mark,
                color: Colors.white,
              ),
              onPressed: () => _onPageChanged(2),
            ),
            IconButton(
              icon: const Icon(
                Icons.settings_outlined,
                color: Colors.white,
              ),
              onPressed: () => _onPageChanged(3),
              focusColor: Colors.blue,
            )
          ],
        ),
      ),
    );
  }

  _onPageChanged(int index) {
    setState(() {
      _selectedIndex = index;
    });

    _homeScreenController.jumpToPage(_selectedIndex);
  }
}
