import 'package:flutter_fitness/models/consommation_model.dart';
import 'package:flutter_fitness/sql_helper.dart';

class ConsommationService {
  Future<int> saveConsommation(ConsommationModel consommationModel) async {
    final db = await SqlHelper.db();

    final data = {
      'quantity': consommationModel.quantity,
      'barcode': consommationModel.productBarcode,
      'consummed_at': consommationModel.consummedAt.toString()
    };

    return await db.insert('consommations', data);
  }

  Future<List<ConsommationModel>> getConsommationStartingFrom(
      DateTime start) async {
    final db = await SqlHelper.db();

    final results = await db.query('consommations');

    final List<ConsommationModel> consommations = [];

    for (final result in results) {
      consommations.add(ConsommationModel.fromMap(result));
    }

    return consommations
        .where((element) => element.consummedAt.isAfter(start))
        .toList();
  }
}
