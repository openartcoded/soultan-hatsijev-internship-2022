import 'package:flutter/material.dart';
import 'package:flutter_movies/models/movie.dart';
import 'package:flutter_movies/services/movie_service.dart';
import 'package:flutter_movies/widgets/movie_widget.dart';

class MoviesPage extends StatefulWidget {
  const MoviesPage({Key? key}) : super(key: key);

  @override
  State<StatefulWidget> createState() => _MoviesPage();
}

class _MoviesPage extends State<MoviesPage> {
  final MovieService _movieService = MovieService();
  List<Movie> _upComingMovies = <Movie>[];
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    var latestMovieBuilder = FutureBuilder(
        future: _movieService.getLastMovieAsync(),
        builder: (BuildContext context, AsyncSnapshot<Movie> snapshot) {
          // if (snapshot.connectionState == ConnectionState.waiting) {
          //   return const Center(
          //     child: CircularProgressIndicator(),
          //   );
          // } else {
          if (snapshot.hasData) {
            return MovieWidget(movie: snapshot.data ?? Movie.emptyMovie());
          } else if (snapshot.hasError) {
            return const Center(
              child: Text(
                'Une erreur est survenue',
              ),
            );
          } else {
            return const Center(child: CircularProgressIndicator());
          }
          // }
        });

    var upcomingMovies = FutureBuilder(
        future: _getUpcomingMovies(),
        builder: (BuildContext context, AsyncSnapshot<List<Movie>> snapshot) {
          final PageController controller = PageController();

          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          }

          if (snapshot.hasData) {
            if (snapshot.data != null) {
              var movieWidgets = <MovieWidget>[];

              for (var movie in snapshot.data as List<Movie>) {
                movieWidgets.add(MovieWidget(movie: movie));
              }

              return PageView(
                controller: controller,
                children: movieWidgets,
              );
            } else {
              return const Center(
                child: Text('Pas de films!'),
              );
            }
          } else {
            return const Center(
              child: Text('Pas de films!'),
            );
          }
        });

    var widgets = <Widget>[latestMovieBuilder, upcomingMovies];

    return Scaffold(
      appBar: AppBar(title: const Text('Films')),
      body: widgets.elementAt(_selectedIndex),
      bottomNavigationBar: BottomNavigationBar(
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.theaters_outlined),
            label: 'Latest',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.theaters),
            label: 'Upcoming',
          )
        ],
        selectedItemColor: Colors.grey,
        currentIndex: _selectedIndex,
        onTap: _onTapItem,
      ),
    );
  }

  void _onTapItem(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  Future<List<Movie>> _getUpcomingMovies() async {
    if (_upComingMovies.isEmpty) {
      _upComingMovies = await _movieService.getUpcomingMoviesAsync(1);
      return _upComingMovies;
    } else {
      return _upComingMovies;
    }
  }
}
