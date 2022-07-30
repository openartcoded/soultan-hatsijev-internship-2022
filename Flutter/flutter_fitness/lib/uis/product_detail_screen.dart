import 'package:flutter/material.dart';
import 'package:flutter_fitness/models/consommation_model.dart';
import 'package:flutter_fitness/models/product_model.dart';
import 'package:flutter_fitness/services/consommation_service.dart';
import 'package:flutter_fitness/services/product_service.dart';

class ProductDetailScreen extends StatefulWidget {
  const ProductDetailScreen({Key? key, required this.barcode})
      : super(key: key);

  final String barcode;

  @override
  State<StatefulWidget> createState() => _ProductDetailScreenState();
}

class _ProductDetailScreenState extends State<ProductDetailScreen> {
  final ConsommationService _consommationService = ConsommationService();
  final TextEditingController _consommationController = TextEditingController();
  final ProductService _productService = ProductService();

  String _errorMessage = '';
  bool _canSaveConsommation = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.barcode),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(10),
        child: FutureBuilder<ProductModel?>(
          future: _productService.getProductFromBarcode(widget.barcode),
          builder:
              (BuildContext context, AsyncSnapshot<ProductModel?> snapshot) {
            if (snapshot.hasData) {
              if (snapshot.data == null) {
                return Center(
                  child: Text(
                    'Aucun produit avec le code bar ${widget.barcode} n\'a été '
                    'trouvé!',
                  ),
                );
              }

              ProductModel product = snapshot.data!;

              return Column(
                children: [
                  Image.network(product.imgUrl),
                  Text(
                    product.name,
                    style: const TextStyle(
                      fontSize: 24,
                    ),
                  ),
                  const Text(
                    'Les informations suivantes représente le nombre de gramme '
                    '(g) par portion de 100 grammes',
                  ),
                  const Divider(),
                  Table(
                    columnWidths: <int, TableColumnWidth>{
                      0: FixedColumnWidth(
                          MediaQuery.of(context).size.width / 100 * 50),
                      1: const IntrinsicColumnWidth(),
                    },
                    defaultVerticalAlignment: TableCellVerticalAlignment.middle,
                    children: <TableRow>[
                      const TableRow(
                        children: [
                          TableCell(
                            child: Text(
                              'Nutriment',
                              style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                          TableCell(
                            child: Text(
                              'Quantité (en g)',
                              style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ],
                      ),
                      TableRow(
                        children: [
                          const TableCell(
                            child: Text(
                              'Glucides',
                            ),
                          ),
                          TableCell(
                            verticalAlignment:
                                TableCellVerticalAlignment.middle,
                            child: Text(
                              product.carboHydrates.toString(),
                            ),
                          ),
                        ],
                      ),
                      TableRow(
                        children: [
                          const TableCell(
                            child: Text('Protides'),
                          ),
                          TableCell(
                            child: Text(
                              product.protein.toString(),
                            ),
                          ),
                        ],
                      ),
                      TableRow(
                        children: [
                          const TableCell(
                            child: Text(
                              'Lipides',
                            ),
                          ),
                          TableCell(
                            child: Text(
                              product.fat.toString(),
                            ),
                          ),
                        ],
                      ),
                      TableRow(
                        children: [
                          const Text('Vitamine A'),
                          Text(product.vitaminA.toString()),
                        ],
                      ),
                      TableRow(
                        children: [
                          const Text('Vitamine B1'),
                          Text(product.vitaminB1.toString()),
                        ],
                      ),
                      TableRow(
                        children: [
                          const Text('Vitamine B2'),
                          Text(product.vitaminB2.toString()),
                        ],
                      ),
                      TableRow(
                        children: [
                          const Text('Vitamine B6'),
                          Text(product.vitaminB6.toString()),
                        ],
                      ),
                      TableRow(
                        children: [
                          const Text('Vitamine B9'),
                          Text(product.vitaminB9.toString()),
                        ],
                      ),
                      TableRow(
                        children: [
                          const Text('Vitamine C'),
                          Text(product.vitaminC.toString()),
                        ],
                      ),
                      TableRow(
                        children: [
                          const Text('Vitamine D'),
                          Text(product.vitaminD.toString()),
                        ],
                      ),
                      TableRow(
                        children: [
                          const Text('Vitamine E'),
                          Text(product.vitaminE.toString()),
                        ],
                      ),
                      TableRow(
                        children: [
                          const Text('Vitamine K'),
                          Text(product.vitaminK.toString()),
                        ],
                      ),
                      TableRow(
                        children: [
                          const Text('Vitamine PP'),
                          Text(product.vitaminPP.toString()),
                        ],
                      ),
                    ],
                  ),
                  TextField(
                    controller: _consommationController,
                    keyboardType: const TextInputType.numberWithOptions(
                      signed: false,
                    ),
                    decoration: const InputDecoration(
                      labelText: 'Consommation en grammes',
                    ),
                    onChanged: (text) {
                      double? quantity = double.tryParse(text);

                      if (quantity == null) {
                        setState(() {
                          _errorMessage =
                              'Veuillez encoder une quantité réelle!';
                        });
                      } else {
                        setState(() {
                          _errorMessage = '';
                          _canSaveConsommation = true;
                        });
                      }
                    },
                  ),
                  Text(_errorMessage),
                  ElevatedButton(
                    style: ButtonStyle(
                      backgroundColor: _canSaveConsommation
                          ? MaterialStateProperty.all(Colors.blue)
                          : MaterialStateProperty.all(Colors.blueGrey),
                    ),
                    onPressed: () => _saveConsommation(),
                    child: const Text('Enregistrer consommation'),
                  ),
                ],
              );
            } else if (snapshot.hasError) {
              return const Center(
                child: Text(
                  'Une erreur est survenu lors du chargement des données',
                ),
              );
            } else {
              return const Center(
                child: CircularProgressIndicator(),
              );
            }
          },
        ),
      ),
    );
  }

  void _saveConsommation() {
    double? quantity = double.tryParse(_consommationController.text);

    if (quantity == null) {
      setState(() {
        _errorMessage =
            'La quantité consommées ne peut pas être convertie en nombre réel!';
      });

      return;
    }

    ConsommationModel consommation = ConsommationModel(
      id: 0,
      quantity: quantity,
      productBarcode: widget.barcode,
      consummedAt: DateTime.now(),
    );

    int id = 0;

    _consommationService
        .saveConsommation(consommation)
        .then((value) => id = value)
        .whenComplete(() {
      if (id == 0) {
        setState(() {
          _errorMessage = 'La consommation n\'a pas pu être enregistrée';
        });
      } else {
        Navigator.pop(context);
      }
    });
  }
}
