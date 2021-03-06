const sharedPoints = [
  {
    title: 'Circles and their various sizes',
    text:
      'Each dot represents a movie or series associated with the person searched for, while their size depends on the number of votes they have received. The more votes they have the bigger the circles are.'
  },
  {
    title: 'The position of the circles',
    text:
      'The horizontal position of the dot shows the date the movie/series was released or first aired, the vertical is the average user score it has received. The better rated moves are higher up on the horizontal scale.'
  },
  {
    title: 'Interacting with the circles',
    text:
      'Hovering over circles will give you more information about the movie/series they represent, while clicking on them will open a card for you with more information about the clicked item.'
  }
]

export const EXPLORER_EXPLAINER = [
  {
    title: 'First time here?',
    text:
      'Please start a search for a person in the film industry, a movie or a series you would like to find out more about. In case you are a veteran filmography explorer, please click on the next dot below this very text!'
  },
  ...sharedPoints,
  {
    title: 'Quick search and filter',
    text:
      'After you clicked a dot and a movie/series card is opened, you can use the genres, as well as the lead cast and crew members listed as quick search or quick filters by simply clicking on them.'
  },
  {
    title: 'Quick search favorite persons',
    text:
      'At the bottom of this page, the list persons you recently marked as your favorites will be displayed, which by clicking on them can help you do a quick search for your favorites. '
  },
  {
    title: 'Favoriting persons',
    text:
      'You can mark any person as your favorite by clicking on their name or the star next to it. This, being saved, can quicken your search for next time and can also serve as a filter for your bookmarked movies.'
  },
  {
    title: 'Bookmarked movies',
    text:
      'You can bookmark any movie or series you like by clicking on their title or the little bookmark icon in their card. They will be saved and if multiple, you can also compare them on the My Watchlist page.'
  }
]

export const BOOKMARKED_EXPLAINER = [
  {
    title: 'First time here?',
    text:
      'Please start a search for persons in the film industry you would like to find out more about, then bookmark or more of their movies/series to compare them on this page'
  },
  ...sharedPoints
]
