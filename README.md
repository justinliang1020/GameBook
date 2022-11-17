game:
    - id : int (rawg)


need to call API from backend?
    - if call from frontend, we expose our API key
  
backend stuff
-----------------------------------
summary:

maybe cache stuff instead of hitting API??


functions: (API endpoints)

- getGame(gameId : int) -> game:
  - returns a game object of gameId

- getGameList(listType : string) -> list[game]:
  - returns a list of json objects of list type
  - list type values can be ("trending", "{platform}", "popular")
      - {platform} -> any of ["ps4", "nintendo-switch", etc.]
  - these list values can be hardcoded

<!-- - getGameOfDay() -> game:
  - returns a game object that is game of the day (can hardcode this to be any game) -->

- getReviews(gameId : int) -> list[Review]:
  - returns a list of "Review" object of a given game

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
  - text : string (max 255 characters?)
  - username: string (user)
  - gameId: int
  - platform: string
  - rating: number

- User
  - username: string (unique)
  - reviews: list[reviewId]
  - games: list[gameId]

- Game (mostly parse from https://api.rawg.io/docs/#operation/games_read)
  - Id: int
  - description
    - string 
  - name
    - Full name (not slug)
  - platforms: list[string] (Partition key??)
    - valid: pc, xbox-one, xbox-series-x, playstation4, playstation5, nintendo-switch
  - store links: string (Partition by platform)
    - https://api.rawg.io/docs/#operation/games_stores_list
    - for PC, just use steam (if doesn't exist, use Epic)
  - num_reviews: int (partition by platform)
    - increment whenever new review is added, used to calculate ratings
  - rating: number (partition by platform)
    - use num_reviews to calculate

single table with PK: game, SK: review?

Icons from Icons8:
https://icons8.com/icon/101322/xbox
