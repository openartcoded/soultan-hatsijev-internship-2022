import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_movies/models/genre.dart';

class TagWidget extends StatefulWidget {
  const TagWidget({Key? key, required this.genres}) : super(key: key);

  final List<Genre> genres;

  @override
  State<StatefulWidget> createState() {
    return _TagWidgetState();
  }
}

class _TagWidgetState extends State<TagWidget> {
  final double _fontSize = 15;

  @override
  Widget build(BuildContext context) {
    return Wrap(
      direction: Axis.horizontal,
      children: _generateTags(),
    );
  }

  List<Container> _generateTags() {
    List<Container> tmp = <Container>[];

    for (var genre in widget.genres) {
      double width = (genre.name.length * _fontSize) + 2;

      tmp.add(Container(
        height: _fontSize * 2,
        width: width,
        color: Colors.white,
        child: Material(
          borderRadius: BorderRadius.all(Radius.circular(_fontSize * 2)),
          child: Padding(
            padding: const EdgeInsets.all(1.5),
            child: Container(
              alignment: Alignment.center,
              child: Text(genre.name,
                  style: TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.bold,
                      fontSize: _fontSize)),
            ),
          ),
        ),
      ));
    }

    return tmp;
  }
}
