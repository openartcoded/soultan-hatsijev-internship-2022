import 'package:flutter/widgets.dart';
import 'package:flutter_bacteria/models/bacteria.dart';

import 'bacteria_collection_painter.dart';

class BacteriaCollectionCanvas extends StatelessWidget {
  const BacteriaCollectionCanvas({required this.bacteriaList});

  final List<Bacteria> bacteriaList;

  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      painter: BacteriaCollectionPainter(bacteriaList: bacteriaList),
    );
  }
}
