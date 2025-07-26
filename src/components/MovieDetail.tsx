import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface MovieDetails {
  imdbID: string;
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
  Type: string;
}

interface MovieDetailProps {
  movieId: string;
  onClose: () => void;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=68afd1d5`);
        const data = await response.json();
        
        if (data.Response === 'True') {
          setMovie(data);
        } else {
          setError(data.Error);
        }
      } catch (err) {
        setError('Failed to fetch movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-center">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 max-w-md">
          <p className="text-center mb-4">{error || 'Movie not found'}</p>
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://images.unsplash.com/photo-1489599511657-70c4da5e1bce?w=400&h=600&fit=crop'}
                alt={movie.Title}
                className="w-full rounded-lg"
              />
            </div>
            
            <div className="md:w-2/3">
              <h1 className="text-2xl font-bold mb-2">{movie.Title}</h1>
              <p className="text-gray-600 mb-4">{movie.Year} • {movie.Runtime} • {movie.Rated}</p>
              
              {movie.imdbRating !== 'N/A' && (
                <div className="mb-4">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-semibold">
                    ⭐ {movie.imdbRating}/10
                  </span>
                </div>
              )}
              
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold mb-1">Plot</h3>
                  <p className="text-gray-700 text-sm">{movie.Plot}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-1">Genre</h3>
                  <p className="text-gray-700 text-sm">{movie.Genre}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-1">Director</h3>
                  <p className="text-gray-700 text-sm">{movie.Director}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-1">Cast</h3>
                  <p className="text-gray-700 text-sm">{movie.Actors}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;