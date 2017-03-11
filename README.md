# RocksmithSaveProgress

https://rocksmith.ubisoft.com/rocksmith/en-us/home/

https://www.youtube.com/watch?v=XHM9uB2kNkU


## Modules used
- express
- mongoose
- bodypraser



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