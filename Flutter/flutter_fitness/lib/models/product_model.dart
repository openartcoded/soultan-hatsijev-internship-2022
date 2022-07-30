import 'package:openfoodfacts/model/Nutriments.dart';
import 'package:openfoodfacts/openfoodfacts.dart';

class ProductModel {
  const ProductModel(
      {required this.barcode,
      required this.name,
      required this.imgSmallUrl,
      required this.imgUrl,
      required this.carboHydrates,
      required this.protein,
      required this.fat,
      required this.energyKj,
      required this.energyKcal,
      required this.vitaminA,
      required this.vitaminB1,
      required this.vitaminB2,
      required this.vitaminB6,
      required this.vitaminB9,
      required this.vitaminC,
      required this.vitaminD,
      required this.vitaminE,
      required this.vitaminK,
      required this.vitaminPP});

  final String barcode;
  final String name;
  final String imgSmallUrl;
  final String imgUrl;
  final double carboHydrates;
  final double protein;
  final double fat;
  final double energyKj;
  final double energyKcal;
  final double vitaminA;
  final double vitaminB1;
  final double vitaminB2;
  final double vitaminB6;
  final double vitaminB9;
  final double vitaminC;
  final double vitaminD;
  final double vitaminE;
  final double vitaminK;
  final double vitaminPP;

  factory ProductModel.fromSDK(Product product) {
    final String barcode = product.barcode == null ? '' : product.barcode!;

    final String name =
        product.productName == null ? 'NO NAME' : product.productName!;

    final String imgSmallUrl = product.imageFrontSmallUrl == null
        ? 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg'
        : product.imageFrontSmallUrl!;

    final String imgUrl = product.imageFrontUrl == null
        ? 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg'
        : product.imageFrontUrl!;

    Nutriments? nutriments = product.nutriments;

    if (nutriments == null) {
      return ProductModel(
          barcode: barcode,
          name: name,
          imgSmallUrl: imgSmallUrl,
          imgUrl: imgUrl,
          carboHydrates: 0,
          protein: 0,
          fat: 0,
          energyKj: 0,
          energyKcal: 0,
          vitaminA: 0,
          vitaminB1: 0,
          vitaminB2: 0,
          vitaminB6: 0,
          vitaminB9: 0,
          vitaminC: 0,
          vitaminD: 0,
          vitaminE: 0,
          vitaminK: 0,
          vitaminPP: 0);
    } else {
      final double carboHydrates =
          (nutriments.carbohydrates == null) ? 0 : nutriments.carbohydrates!;

      final double protein =
          (nutriments.proteins == null) ? 0 : nutriments.proteins!;

      final double fat = (nutriments.fat == null) ? 0 : nutriments.fat!;

      final double energyKj =
          (nutriments.energy == null) ? 0 : nutriments.energy!;

      final double energyKcal =
          (nutriments.energyKcal100g == null) ? 0 : nutriments.energyKcal100g!;

      final double vitaminA =
          (nutriments.vitaminA == null) ? 0 : nutriments.vitaminA!;

      final double vitaminB1 =
          (nutriments.vitaminB1 == null) ? 0 : nutriments.vitaminB1!;

      final double vitaminB2 =
          (nutriments.vitaminB2 == null) ? 0 : nutriments.vitaminB2!;

      final double vitaminB6 =
          (nutriments.vitaminB6 == null) ? 0 : nutriments.vitaminB6!;

      final double vitaminB9 =
          (nutriments.vitaminB9 == null) ? 0 : nutriments.vitaminB9!;

      final double vitaminC =
          (nutriments.vitaminC == null) ? 0 : nutriments.vitaminC!;

      final double vitaminD =
          (nutriments.vitaminD == null) ? 0 : nutriments.vitaminD!;

      final double vitaminE =
          (nutriments.vitaminE == null) ? 0 : nutriments.vitaminE!;

      final double vitaminK =
          (nutriments.vitaminK == null) ? 0 : nutriments.vitaminK!;

      final double vitaminPP =
          (nutriments.vitaminPP == null) ? 0 : nutriments.vitaminPP!;

      return ProductModel(
          barcode: barcode,
          name: name,
          imgSmallUrl: imgSmallUrl,
          imgUrl: imgUrl,
          carboHydrates: carboHydrates,
          protein: protein,
          fat: fat,
          energyKj: energyKj,
          energyKcal: energyKcal,
          vitaminA: vitaminA,
          vitaminB1: vitaminB1,
          vitaminB2: vitaminB2,
          vitaminB6: vitaminB6,
          vitaminB9: vitaminB9,
          vitaminC: vitaminC,
          vitaminD: vitaminD,
          vitaminE: vitaminE,
          vitaminK: vitaminK,
          vitaminPP: vitaminPP);
    }
  }

  factory ProductModel.fromMap(Map<String, Object?> result) {
    final String barcode = result['barcode']! as String;
    final String name = result['name']! as String;
    final String imgSmallUrl = result['imgSmallUrl']! as String;
    final String imgUrl = result['imgUrl']! as String;
    final double carboHydrates = result['carboHydrates']! as double;
    final double fat = result['fat']! as double;
    final double protein = result['protein']! as double;
    final double energyKj = result['energyKj']! as double;
    final double energyKcal = result['energyKcal']! as double;
    final double vitaminA = result['vitaminA']! as double;
    final double vitaminB1 = result['vitaminB1']! as double;
    final double vitaminB2 = result['vitaminB2']! as double;
    final double vitaminB6 = result['vitaminB6']! as double;
    final double vitaminB9 = result['vitaminB9']! as double;
    final double vitaminC = result['vitaminC']! as double;
    final double vitaminD = result['vitaminD']! as double;
    final double vitaminE = result['vitaminE']! as double;
    final double vitaminK = result['vitaminK']! as double;
    final double vitaminPP = result['vitaminPP']! as double;

    return ProductModel(
        barcode: barcode,
        name: name,
        imgSmallUrl: imgSmallUrl,
        imgUrl: imgUrl,
        carboHydrates: carboHydrates,
        protein: protein,
        fat: fat,
        energyKj: energyKj,
        energyKcal: energyKcal,
        vitaminA: vitaminA,
        vitaminB1: vitaminB1,
        vitaminB2: vitaminB2,
        vitaminB6: vitaminB6,
        vitaminB9: vitaminB9,
        vitaminC: vitaminC,
        vitaminD: vitaminD,
        vitaminE: vitaminE,
        vitaminK: vitaminK,
        vitaminPP: vitaminPP);
  }
}
