import 'package:flutter/material.dart';
import 'package:charts_flutter/flutter.dart' as charts;
import 'package:flutter_fitness/models/nutriment_consommation_model.dart';
import 'package:flutter_fitness/services/consommation_service.dart';
import 'package:flutter_fitness/services/product_service.dart';

class NutrimentChartScreen extends StatelessWidget {
  NutrimentChartScreen({Key? key}) : super(key: key);

  final _productService = ProductService();
  final _consommationService = ConsommationService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Nutriments consommés'),
      ),
      body: Padding(
        padding: const EdgeInsets.only(
          left: 10,
          right: 10,
          top: 10,
          bottom: 25,
        ),
        child: Column(
          children: [
            const Text(
              'Nutriments',
              style: TextStyle(
                fontSize: 22,
                decoration: TextDecoration.underline,
              ),
            ),
            SizedBox(
              height: 450,
              child: _generateNutrimentsChart(),
            ),
          ],
        ),
      ),
    );
  }

  FutureBuilder<List<charts.Series<NutrimentConsommation, String>>>
      _generateNutrimentsChart() {
    return FutureBuilder<List<charts.Series<NutrimentConsommation, String>>>(
        future: _generateNutrimentsList(),
        builder: (BuildContext context,
            AsyncSnapshot<List<charts.Series<NutrimentConsommation, String>>>
                snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          } else {
            if (snapshot.hasData) {
              return charts.BarChart(
                animate: true,
                animationDuration: const Duration(seconds: 2),
                snapshot.data!,
              );
            } else {
              return const Center(
                child: Text('Aucune données'),
              );
            }
          }
        });
  }

  Future<List<charts.Series<NutrimentConsommation, String>>>
      _generateNutrimentsList() async {
    final consommations =
        await _consommationService.getConsommationStartingFrom(
      DateTime.now().subtract(
        const Duration(days: 7),
      ),
    );

    double consummedFat = 0;
    double consummedProtein = 0;
    double consummedCarboHydrates = 0;

    if (consommations.isNotEmpty) {
      for (var consommation in consommations) {
        final product = (await _productService
            .getProductFromBarcode(consommation.productBarcode))!;

        consummedFat += product.fat;
        consummedProtein += product.protein;
        consummedCarboHydrates = product.carboHydrates;
      }
    }

    final data = [
      NutrimentConsommation(
        nutriment: 'Glucides',
        consummed: consummedCarboHydrates,
      ),
      NutrimentConsommation(
        nutriment: 'Protides',
        consummed: consummedProtein,
      ),
      NutrimentConsommation(
        nutriment: 'Lipides',
        consummed: consummedFat,
      )
    ];

    return [
      charts.Series<NutrimentConsommation, String>(
          id: 'Nutriments',
          colorFn: (_, __) => charts.MaterialPalette.blue.shadeDefault,
          domainFn: (NutrimentConsommation nutrimentConsommation, _) =>
              nutrimentConsommation.nutriment,
          measureFn: (NutrimentConsommation nutrimentConsommation, _) =>
              nutrimentConsommation.consummed,
          data: data),
    ];
  }
}
