/* eslint-disable @typescript-eslint/camelcase */
import React from 'react'
import { omit, uniq } from 'lodash'
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
  mediaType: string
}

export const handleBookmarkedToggle = ({
  bookmarkedMovies,
  activeMovieID,
  setBookmarkedMovies,
  cast,
  crew,
  details,
  dispatch,
  mediaType
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
          media_type: mediaType,
          vote_average: details.vote_average,
          vote_count: details.vote_count,
          date: details.first_air_date || details.release_date,
          title: details.original_name || details.original_title,
          id: details.id,
          genres: details.genres.map(d => d.id),
          credits: uniq([...castIDs, ...crewIDs]),
          poster_path: details.poster_path
        }
      }
    }
    setBookmarkedMovies(newObject)
    dispatch(updateBookmarkedMovies(newObject))
  }
}
