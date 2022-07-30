import 'package:flutter/material.dart';
import 'package:flutter_fitness/services/consommation_service.dart';
import 'package:flutter_fitness/services/product_service.dart';
import 'package:flutter_fitness/uis/nutriment_chart_screen.dart';
import 'package:flutter_fitness/uis/vitamin_chart_screen.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final _productService = ProductService();
  final _consommationService = ConsommationService();
  // TODO : Statistique de consommation des 7 derniers jours :
  // - Lipides
  // - Glucide
  // - Proteines
  // TODO : Statistiques sur les vitamines consommés et les carences
  // TODO : Statistiques sur les KCal consommés

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        ElevatedButton(
          onPressed: (() {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => NutrimentChartScreen(),
              ),
            );
          }),
          child: const Text('Nutriments'),
        ),
        ElevatedButton(
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => VitaminChartScreen(),
                ),
              );
            },
            child: const Text('Vitamines'))
      ],
    );
  }
}
