import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_movies/models/movie.dart';
import 'package:flutter_movies/widgets/tag_widget.dart';

class MovieWidget extends StatelessWidget {
  const MovieWidget({Key? key, required this.movie}) : super(key: key);

  final Movie movie;

  @override
  Widget build(BuildContext context) {
    Image image = Image.network(
      movie.posterPath,
      width: 150,
      height: 300,
    );

    CachedNetworkImage img = CachedNetworkImage(
      placeholder: ((context, url) => const CircularProgressIndicator()),
      imageUrl: movie.posterPath,
      width: 150,
      height: 300,
    );

    return Flex(
      direction: Axis.vertical,
      children: [
        img,
        const Divider(),
        Text(
          movie.originalTitle,
          textWidthBasis: TextWidthBasis.longestLine,
          textAlign: TextAlign.center,
          style: const TextStyle(fontSize: 18),
        ),
        const Divider(),
        Text('Langue: ' + movie.language),
        const Divider(),
        Text('Date de sortie :' + movie.releaseDate),
        const Divider(),
        TagWidget(genres: movie.genres)
      ],
    );
  }
}
