backend stuff
-----------------------------------
summary:

Scrape RAWG API for a couple dozen games and store those in DB.

functions: (API endpoints)

- getGameList(listType : string) -> list[game]:
  - returns a list of json objects of list type
  - list type values can be ("trending", "popular", something else?)
  - these list values can be hardcoded

- getGameReviews(gameId : int) -> list[Review]:
  - returns a list of "Review" object of a given game

- getUserReviews(username : string) -> list[Reveiw]:
  - returns a list of "Review" object of a given user

- createReview(review : json) -> bool:
  - insert review as entry in review database
  - update rating in game
  - return True if success

- createUser(user: json) -> bool:
  - insert user as entry in user database 
  - return True if success

objects: (table in DynamoDB)

- Review
  - Id : int
  - text : string (max 255 characters, tweet-like)
  - username: string (user)
  - gameId: int
  - platform: string
  - rating: number
  - sample: {
        id: 1,
        text: "Portal is great on the xbox",
        username: "Justin",
        gameId: 1,
        platform: "xbox-series-x",
        rating: 4.5
    }

- User
  - username: string (unique)
  - reviews: list[reviewId]
  - games: list[gameId]

- Game (mostly parse from https://api.rawg.io/docs/#operation/games_read)
  - gameId: int
  - description: string
  - imageUrl: string
    - (might be called background_image)
  - screenshotUrl: string
    - get 1 Url from https://api.rawg.io/docs/#operation/games_screenshots_list
  - name
    - Full name (not slug)
  - platforms: list[string]
    - valid: pc, xbox-one, xbox-series-x, playstation4, playstation5, nintendo-switch
  - rating: number (json with key(platform): value(rating))
    - use num_reviews to calculate
  - sample: {
      name: "Portal 2",
      gameId: 1,
      imageUrl: 'https://www.mobygames.com/images/covers/l/217599-portal-2-macintosh-front-cover.jpg',
      screenshotUrl: 'https://i.ytimg.com/vi/Nz2us2JOhiU/maxresdefault.jpg',
      description: "Portal 2 is a fun puzzle game developed by Valve.",
      platforms: ['playstation5', 'playstation4', 'xbox-series-x', 'xbox-one', 'nintendo-switch', 'pc'],
      ratings: {
        'playstation5': 5,
        'playstation4': 3.4,
        'xbox-series-x': 4,
        'xbox-one': 4.5,
        'nintendo-switch': 3,
        'pc': 5
      }
    },

single table with PK: game, SK: review?

Icons from Icons8:
https://icons8.com/icon/101322/xbox
