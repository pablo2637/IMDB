const favorites = {
    queryGetFavorites:`
    SELECT favorites.movie_id, favorites.api_movie
    FROM favorites
    WHERE user_id=$1
    ORDER BY favorite_id`,
    queryAddFavorite:`
    INSERT INTO favorites (user_id, movie_id, api_movie)
    VALUES ($1, $2, $3)`,
    queryDeleteFavorite:`
    DELETE FROM favorites
    WHERE user_id=$1 AND movie_id=$2`,
    queryDeleteAllFavorites:`
    DELETE FROM favorites
    WHERE movie_id=$1`,
    querySearchUserMovieByID:`
    SELECT *
    FROM favorites
    WHERE user_id=$1 AND movie_id=$2`,
    querySearchMovieByID:`
    SELECT *
    FROM favorites
    WHERE movie_id=$1`
};


module.exports = favorites;