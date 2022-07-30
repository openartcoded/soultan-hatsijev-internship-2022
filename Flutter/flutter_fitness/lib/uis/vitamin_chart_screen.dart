import 'package:flutter/material.dart';
import 'package:charts_flutter/flutter.dart' as charts;
import 'package:flutter_fitness/models/nutriment_consommation_model.dart';
import 'package:flutter_fitness/services/consommation_service.dart';
import 'package:flutter_fitness/services/product_service.dart';

class VitaminChartScreen extends StatelessWidget {
  VitaminChartScreen({Key? key}) : super(key: key);

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
              width: MediaQuery.of(context).size.width - 100,
              child: _generateVitaminsChart(),
            ),
          ],
        ),
      ),
    );
  }

  FutureBuilder<List<charts.Series<NutrimentConsommation, String>>>
      _generateVitaminsChart() {
    return FutureBuilder(
        future: _generateVitaminsSeries(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          } else {
            if (snapshot.hasData) {
              if (snapshot.data == null) {
                return const Center(
                  child: Text('Aucunes données dans la liste'),
                );
              }

              return charts.PieChart(
                snapshot.data!,
                animate: true,
                animationDuration: const Duration(seconds: 2),
                defaultRenderer: charts.ArcRendererConfig(
                  arcRendererDecorators: [
                    charts.ArcLabelDecorator(
                        labelPosition: charts.ArcLabelPosition.outside),
                  ],
                ),
              );
            } else if (snapshot.hasError) {
              return const Center(
                child: Text(
                    'Une erreur est survenue lors du chargement des données'),
              );
            } else {
              return const Center(
                child: CircularProgressIndicator(),
              );
            }
          }
        });
  }

  Future<List<charts.Series<NutrimentConsommation, String>>>
      _generateVitaminsSeries() async {
    final consommations =
        await _consommationService.getConsommationStartingFrom(
      DateTime.now().subtract(
        const Duration(days: 7),
      ),
    );

    double vitaminA = 0;
    double vitaminB1 = 0;
    double vitaminB2 = 0;
    double vitaminB6 = 0;
    double vitaminB9 = 0;
    double vitaminC = 0;
    double vitaminD = 0;
    double vitaminE = 0;
    double vitaminK = 0;
    double vitaminPP = 0;

    if (consommations.isNotEmpty) {
      for (var consommation in consommations) {
        final product = (await _productService
            .getProductFromBarcode(consommation.productBarcode))!;

        vitaminA += product.vitaminA;
        vitaminB1 += product.vitaminB1;
        vitaminB2 += product.vitaminB2;
        vitaminB6 += product.vitaminB6;
        vitaminB9 += product.vitaminB9;
        vitaminC += product.vitaminC;
        vitaminD += product.vitaminD;
        vitaminE += product.vitaminE;
        vitaminK += product.vitaminK;
        vitaminPP += product.vitaminPP;
      }
    }

    final data = [
      NutrimentConsommation(nutriment: 'Vitamin A', consummed: vitaminA),
      NutrimentConsommation(nutriment: 'Vitamin B1', consummed: vitaminB1),
      NutrimentConsommation(nutriment: 'Vitamin B2', consummed: vitaminB2),
      NutrimentConsommation(nutriment: 'Vitamin B6', consummed: vitaminB6),
      NutrimentConsommation(nutriment: 'Vitamin B9', consummed: vitaminB9),
      NutrimentConsommation(nutriment: 'Vitamin C', consummed: vitaminC),
      NutrimentConsommation(nutriment: 'Vitamin D', consummed: vitaminD),
      NutrimentConsommation(nutriment: 'Vitamin E', consummed: vitaminE),
      NutrimentConsommation(nutriment: 'Vitamin K', consummed: vitaminK),
      NutrimentConsommation(nutriment: 'Vitamin PP', consummed: vitaminPP),
    ];

    return [
      charts.Series(
        id: 'Vitamins',
        domainFn: (nutrimentsConsommation, _) =>
            nutrimentsConsommation.nutriment,
        measureFn: (nutrimentsConsommation, _) =>
            nutrimentsConsommation.consummed,
        data: data,
        labelAccessorFn: (nutrimentConsommation, _) =>
            '${nutrimentConsommation.nutriment.split(' ').last} : ${nutrimentConsommation.consummed}',
      )
    ];
  }
}
