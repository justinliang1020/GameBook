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

- getGameOfDay() -> game:
  - returns a game object that is game of the day (can hardcode this to be any game)

- getReviews(gameId : int) -> list[Review]:
  - returns a list of "Review" object of a given game

- createReview(game : json) -> bool:
  - insert review as entry in review database
  - return True if success

- createUser(user: json) -> bool:
  - insert user as entry in user database 
  - return True if success

objects: (table in DynamoDB)

- Review
  - text : string (max 255 characters?)
  - Id : int
  - userId: int (user)
  - gameId: int
  - platform: string
  - gameplay_rating: int
  - performance: int
  - fun: int

- User
  - username: string (unique)
  - reviews: list[reviewId]
  - games: list[Game]

- Game
  - Id: int
  - platforms: list[platform]
    - valid: pc, xbox-one, xbox-series-x, playstation4, playstation5, nintendo-switch
  - description
    - string 
  - name
    - Full name (not slug)
  - store links: json{store_id: link}
    - store_id 

single table with PK: game, SK: review?

Icons from Icons8:
https://icons8.com/icon/101322/xbox
