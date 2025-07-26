import React, { useState, useEffect } from 'react';
import { Film } from 'lucide-react';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

  const searchMovies = async (query: string = searchTerm) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=68afd1d5`
      );
      const data: SearchResponse = await response.json();

      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setError(data.Error || 'No movies found');
        setMovies([]);
      }
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovieId(movie.imdbID);
  };

  const handleCloseDetail = () => {
    setSelectedMovieId(null);
  };

  // Load some default movies
  useEffect(() => {
    searchMovies('batman');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Film className="w-8 h-8 text-blue-500" />
              <h1 className="text-3xl font-bold text-gray-900">Movie Search</h1>
            </div>
            <p className="text-gray-600 mb-6">
              Search for movies and TV shows
            </p>
            
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onSearch={() => searchMovies()}
              isLoading={loading}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {loading && (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Searching...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && movies.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {searchTerm ? `Results for "${searchTerm}"` : 'Movies'} ({movies.length})
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <MovieCard 
                  key={movie.imdbID} 
                  movie={movie} 
                  onClick={handleMovieClick}
                />
              ))}
            </div>
          </div>
        )}

        {!loading && !error && movies.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <Film className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No movies found. Try a different search term.</p>
          </div>
        )}
      </main>

      {/* Movie Detail Modal */}
      {selectedMovieId && (
        <MovieDetail 
          movieId={selectedMovieId} 
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
}

export default App;