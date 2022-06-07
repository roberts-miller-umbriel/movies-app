export const GenreColumn = (movies) => {
    return movies.map(movie =>
        MovieCard(movie.title, movie.director, movie.rating, movie.genre)
    ).join();

};


export const MovieCard = (title, director, rating, genre) => {
    return `
    
    `;
};