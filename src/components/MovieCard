import React from 'react';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1489599511657-70c4da5e1bce?w=300&h=450&fit=crop';
  };

  return (
    <div
      onClick={() => onClick(movie)}
      className="cursor-pointer bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
    >
      <div className="aspect-[2/3]">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://images.unsplash.com/photo-1489599511657-70c4da5e1bce?w=300&h=450&fit=crop'}
          alt={movie.Title}
          onError={handleImageError}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
          {movie.Title}
        </h3>
        <p className="text-gray-600 text-sm">
          {movie.Year} • {movie.Type}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
