# RocksmithSaveProgress

### Description

Rocksmith saves Difficulty and Speed globally across all songs

Rocksmith Save Progress allows you to keep track of the last
settings for both Difficulty and Speed

https://rocksmith.ubisoft.com/rocksmith/en-us/home/

https://www.youtube.com/watch?v=XHM9uB2kNkU

## Install
`npm install`

To Run
`node app`


## Modules used
- express
- mongoose
- bodypraser
- morgan
- bluebird

## Services used
- auth0

https://auth0.com/

## Schema for Song Progress
```json
{
    "songName": "{type: String}",
	"artistName": "{type: String}",
	"difficulty": "{type: Number}",
	"speed": "{type: Number}",
	"dateCreated": "{type: Date, required: true, default: Date.now}"
}
```

## API

| Routes        | Calls     | Scopes          | Description         |
|:-------------:|:---------:|:---------------:|:-------------------:|
| /progress     | Get       | progress:index  | Get all songs       |
| /progress:id  | Get       | progress:show   | Get a specific song |
| /progress     | Post      | progress:create | Create a new song   |
| /progress/:id | Put       | progress:update | Update a song       |
| /progress/:id | Delete    | progress:delete | Delete a song       |
