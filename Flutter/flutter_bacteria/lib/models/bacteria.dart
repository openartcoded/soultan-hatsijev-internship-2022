import 'dart:math';
import 'dart:ui';

class Bacteria {
  Bacteria(this.x, this.y, this.rotation);

  double x;
  double y;
  double rotation;
  final double height = 18;
  final double width = 6;

  factory Bacteria.createRandomFromBounds(double width, double height) {
    final double x = Random().nextDouble() * width;
    final double y = Random().nextDouble() * height;
    final double rotation = Random().nextDouble() * pi;

    return Bacteria(x, y, rotation);
  }

  factory Bacteria.createRandomFromExistingBacteria(
    Size environmentSize,
    Bacteria existingBacteria,
  ) {
    double newX = existingBacteria.x + existingBacteria._getMovementAddition();
    double newY = existingBacteria.y + existingBacteria._getMovementAddition();

    if (newY < -existingBacteria.height) {
      newY = environmentSize.height;
    } else if (newY > environmentSize.height + existingBacteria.height) {
      newY = 0;
    }

    final double x = newX;
    final double y = newY;

    final double rotation =
        existingBacteria.rotation + (Random().nextDouble() * 2 - 1) * pi / 40;

    return Bacteria(x, y, rotation);
  }

  double _getMovementAddition() {
    final double movementMax = width / 6;
    return Random().nextDouble() * movementMax - movementMax / 2;
  }
}
