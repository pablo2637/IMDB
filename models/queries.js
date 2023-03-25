const favorites = {
    queryGetFavorites:`
    SELECT favorites.movie_id, favorites.api_movie
    FROM favorites
    WHERE user_id=$1
    ORDER BY favorite_id`,
    queryAddFavorite:`
    INSERT INTO favorites (user_id, movie_id, api_movie)
    VALUES ($1, $2, $3)`,
    querySearchMovieByID:`
    SELECT *
    FROM favorites
    WHERE user_id=$1 AND movie_id=$2`
};


module.exports = favorites;