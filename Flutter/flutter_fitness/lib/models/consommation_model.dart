class ConsommationModel {
  const ConsommationModel(
      {required this.id,
      required this.quantity,
      required this.productBarcode,
      required this.consummedAt});

  final int id;
  final double quantity;
  final String productBarcode;
  final DateTime consummedAt;

  factory ConsommationModel.fromMap(Map<String, Object?> result) {
    final id = result['id']! as int;
    final quantity = result['quantity']! as double;
    final productBarcode = result['barcode']! as String;
    final consummedAt = DateTime.parse(result['consummed_at']! as String);

    return ConsommationModel(
        id: id,
        quantity: quantity,
        productBarcode: productBarcode,
        consummedAt: consummedAt);
  }
}
