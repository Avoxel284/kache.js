# kache.js

A really simple and lightweight module used to cache items for code optimization. In the future, I may update the module to be more smarter and advanced.

(And yes, I know Redis and other similar modules exist out there but I wanted something really simple with a cool name)

## Usage

Example

```JS
let lyrics = functionThatRequestsAnAPIAndGetsSongLyrics()
kache.s("urlOfTheSongLyrics/API/songName", lyrics);
// The lyrics are stored in the kache for later use.. pretty simple really


let lyrics = kache.r("urlOfTheSongLyrics/API/whatever") || functionThatRequestsAnAPIAndGetsSongLyrics();
// Boom! You have your lyrics fresh from the kache instead of ringing up your local ratelimited lyric API. And if you don't (retrieve function will just return null), well I guess you'll have to make that call.
```

## External kache file

Create a directory for the JSON file to go and specify in index.js under `_kachePath`.
Note that the file will be read-only!

<br>
<br>
<br>
<br>
<br>
i'm now realising this is a glorified object.. but oh well
