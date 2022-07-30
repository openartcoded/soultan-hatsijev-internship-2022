import 'dart:convert';

import 'package:flutter_movies/models/movie.dart';
import 'package:http/http.dart' as http;

class MovieService {
  final apiKey = const String.fromEnvironment('TMDB_API_KEY',
      defaultValue: 'dc18639e3b1b2a0f84c8209abb45eab1');
  static String baseMovieUrl = 'api.themoviedb.org';

  Future<Movie> getLastMovieAsync() async {
    final queryParameters = {'api_key': apiKey};

    const String latestMovieUrl = '/3/movie/latest';

    var uri = Uri.https(baseMovieUrl, latestMovieUrl, queryParameters);

    var response = await http.get(uri);

    if (response.statusCode != 200) {
      throw Error();
    }

    return Movie.fromJson(jsonDecode(response.body));
  }

  Future<List<Movie>> getTopRateMoviesAsync(int page) async {
    final queryParameters = {'api_key': apiKey, 'page': page};

    const String topRatedMoviesUrl = '/3/movie/top_rated';

    final uri = Uri.https(baseMovieUrl, topRatedMoviesUrl, queryParameters);

    final response = await http.get(uri);

    if (response.statusCode != 200) {
      throw Error();
    }

    Map<String, dynamic> jsonResponse = jsonDecode(response.body);

    var results = jsonResponse['results'] as List<Map<String, dynamic>>;
    List<Movie> tmp = <Movie>[];

    for (var movie in results) {
      tmp.add(Movie.fromJson(movie));
    }

    return tmp;
  }

  Future<List<Movie>> getUpcomingMoviesAsync(int page) async {
    final queryParameters = {'api_key': apiKey, 'page': page.toString()};

    const String upComingMoviesUrl = '/3/movie/upcoming';

    final uri = Uri.https(baseMovieUrl, upComingMoviesUrl, queryParameters);

    final response = await http.get(uri);

    if (response.statusCode != 200) {
      throw Error();
    }

    Map<String, dynamic> jsonResponse = jsonDecode(response.body);

    List<dynamic> results = jsonResponse['results'];

    List<Movie> tmp = <Movie>[];

    for (Map<String, dynamic> movie in results) {
      final int movieId = movie['id'];

      Movie movieFromId = await getMovieById(movieId);

      tmp.add(movieFromId);
    }

    return tmp;
  }

  Future<Movie> getMovieById(int id) async {
    final queryParameters = {'api_key': apiKey};

    final String movieDetailsUrl = '/3/movie/$id';

    final uri = Uri.https(baseMovieUrl, movieDetailsUrl, queryParameters);

    final response = await http.get(uri);

    if (response.statusCode != 200) {
      throw Error();
    }

    Map<String, dynamic> jsonResult = jsonDecode(response.body);

    return Movie.fromJson(jsonResult);
  }
}
