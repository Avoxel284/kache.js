# kache.js

A really simple and lightweight module used to cache items for code optimization. In the future, I may update the module to be more smarter and advanced.

(And yes, I know Redis and other similar modules exist out there but I wanted something really simple with a cool name)

## Installation
I won't be putting this on NPM for obvious reasons, however it is still really easy to install since NPM allows installation of GitHub repos.
`npm i https://github.com/Avoxel284/kache.js`

## Usage

Example

```JS
const kache = require("kache.js")

let lyrics = functionThatRequestsAnAPIAndGetsSongLyrics()
kache.s("urlOfTheSongLyrics/API/songName", lyrics);
// The lyrics are stored in the kache for later use.. pretty simple really


let lyrics = kache.r("urlOfTheSongLyrics/API/whatever") || functionThatRequestsAnAPIAndGetsSongLyrics();
// Boom! You have your lyrics fresh from the kache instead of ringing up your local ratelimited lyric API. And if you don't (retrieve function will just return null),.... uh well I guess you'll have to make that call then..

let lyrics = kache.a(
	"urlOfTheSongLyrics/API/songName",
	lyricRetrieverFunction,
	anyArguments,
	ToBe,
	Passed
);
// If this module could get any better, it did. The allInOne() function will do all of the above in one simple function.
```

## External kache file

In your .env file, specify a relative file path to store an external kache file. Note that the file will be read-only!

```ini
KACHE_PATH = "/data"
# (your project directory)/data/kache.json
```

<br>
<br>
<br>
<br>
<br>
i'm now realising this is a glorified object.. but oh well
