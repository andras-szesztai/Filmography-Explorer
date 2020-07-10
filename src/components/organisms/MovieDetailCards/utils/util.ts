/* eslint-disable @typescript-eslint/camelcase */
import React from 'react'
import { omit } from 'lodash'
import { Dispatch } from 'redux'

// Types
import { MovieDetails, MovieCastObject, MovieCrewObject, BookmarkedMoviesObject } from '../../../../types/movie'

// Actions
import { updateBookmarkedMovies } from '../../../../reducer/movieReducer/actions'

interface HandleBookmarkedParams {
  bookmarkedMovies: BookmarkedMoviesObject | undefined
  activeMovieID: number
  setBookmarkedMovies: React.Dispatch<React.SetStateAction<BookmarkedMoviesObject | undefined>>
  cast: MovieCastObject[]
  crew: MovieCrewObject[]
  details: MovieDetails
  dispatch: Dispatch<any>
}

export const handleBookmarkedToggle = ({
  bookmarkedMovies,
  activeMovieID,
  setBookmarkedMovies,
  cast,
  crew,
  details,
  dispatch
}: HandleBookmarkedParams) => {
  let newObject
  if (bookmarkedMovies) {
    if (bookmarkedMovies[activeMovieID]) {
      newObject = omit(bookmarkedMovies, activeMovieID.toString())
    } else {
      const castIDs = cast ? cast.map(d => d.id) : []
      const crewIDs = crew ? crew.map(d => d.id) : []
      newObject = {
        ...bookmarkedMovies,
        [activeMovieID]: {
          original_title: details.original_title,
          original_name: details.original_name,
          release_date: details.release_date,
          first_air_date: details.first_air_date,
          media_type: details.media_type,
          vote_average: details.vote_average,
          vote_count: details.vote_count,
          genres: details.genres.length ? details.genres.map(genre => genre.id) : [],
          credits: [...castIDs, ...crewIDs]
        }
      }
    }
    setBookmarkedMovies(newObject)
    dispatch(updateBookmarkedMovies(newObject))
  }
}
