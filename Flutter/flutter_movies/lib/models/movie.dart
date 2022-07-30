import 'genre.dart';

class Movie {
  const Movie(
      {required this.id,
      required this.posterPath,
      required this.originalTitle,
      required this.language,
      required this.releaseDate,
      required this.genres});

  final int id;
  final String posterPath;
  final String originalTitle;
  final String language;
  final String releaseDate;

  final List<Genre> genres;

  factory Movie.fromJson(Map<String, dynamic> json) {
    List<Genre> genresTmp = <Genre>[];

    for (var genreJson in json['genres']) {
      genresTmp.add(Genre.fromJson(genreJson));
    }

    String? img = json['poster_path'];

    if (img == null) {
      img =
          'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-768x1129.jpg';
    } else {
      img = 'http://image.tmdb.org/t/p/original/$img';
    }

    return Movie(
        id: json['id'],
        posterPath: img,
        originalTitle: json['original_title'],
        language: json['original_language'],
        releaseDate: json['release_date'],
        genres: genresTmp);
  }

  factory Movie.emptyMovie() {
    return const Movie(
        genres: <Genre>[],
        id: 0,
        posterPath: '',
        originalTitle: '',
        language: '',
        releaseDate: '');
  }

  factory Movie.fromMovie(Movie movie) {
    return Movie(
        genres: movie.genres,
        id: movie.id,
        language: movie.language,
        originalTitle: movie.originalTitle,
        posterPath: movie.posterPath,
        releaseDate: movie.releaseDate);
  }
}
