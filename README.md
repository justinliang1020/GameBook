game:
    - id : int (rawg)


need to call API from backend?
    - if call from frontend, we expose our API key
  
backend stuff
-----------------------------------
summary:

maybe cache stuff instead of hitting API??


functions:

- getGame(gameId : int) -> json:
  - returns a json object from https://api.rawg.io/api/games/{id}

- getGameList(listType : string) -> list[json]:
  - returns a list of json objects of list type
  - list type values can be ("trending", "{platform}", "popular")
      - {platform} -> any of ["ps4", "switch", etc.]
  - these list values can be hardcoded

- getReviews(gameId : int) -> list[Review]:
  - returns a list of "Review" object of a given game

objects: (basically a table in DynamoDB)
note: a lot of these objects have list[thing], not sure if they should have them

- Review
  - text : string
  - Id : int
  - userId: int (user)
  - gameId: int

- User
  - Id: int
  - reviews: list[reviewId]
  - games: list[Game]

- Game
  - Id: int
  - platforms: list[platform]

single table with PK: game, SK: review?