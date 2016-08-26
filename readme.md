## @joegesualdo/youtube-video-scraper-node [![Build Status](https://travis-ci.org/joegesualdo/youtube-video-scraper-node.svg?branch=master)](https://travis-ci.org/joegesualdo/youtube-video-scraper-node)
> Get information from the html of a youtube video page.

## Install
```
$ npm install --save @joegesualdo/youtube-video-scraper-node 
```

## Usage
```javascript
import YoutubeVideoScraper from "@joegesualdo/youtube-video-scraper-node"

let videoId = 'D_U6luQ6I90'
new YoutubeVideoScraper(videoId)
.then(scraper => {
  scraper.getMetaInformation()
  .then(meta => {
    console.log(meta)
  })
  .catch(err => {
    console.log(err)
  })
  scraper.getAuthorInfo()
  .then(author => {
    console.log(author)
  })
  scraper.getDescriptionExtras()
  .then(result => {
    console.log(result)
  })
  scraper.getViewCount()
  .then(viewCount=> {
    console.log(viewCount)
  })
})
```

## API
### `YoutubeVideoScraper(videoId)`
> Constructor: Creates a scraper instance

| Name | Type | Description |
|------|------|-------------|
| videoId | `String` | The ID of the youtube video|

Returns: `Promise`, and passes the instance of `YoutubeVideoScraper`

```javascript
import YoutubeVideoScraper from "@joegesualdo/youtube-video-scraper-node"

let videoId = 'D_U6luQ6I90'
new YoutubeVideoScraper(videoId)
.then(scraper => {
  scraper.getAuthorInfo()
  .then(meta => {
    console.log(meta)
  })
})
```
### `getMetaInformation()`
> Get the meta information of the youtube video

Returns: `Object`, that represent all the meta information.

```javascript
import YoutubeVideoScraper from "@joegesualdo/youtube-video-scraper-node"

let videoId = 'D_U6luQ6I90'
new YoutubeVideoScraper(videoId)
.then(scraper => {
  scraper.getMetaInformation()
  .then(meta => {
    console.log(meta)
  })
  .catch(err => {
    console.log(err)
  })
})
```
### `getAuthorInfo()`
> Get information about the author of the video

Returns: `Object`, with the keys `name` and `channelId`

```javascript
import YoutubeVideoScraper from "@joegesualdo/youtube-video-scraper-node"

let videoId = 'D_U6luQ6I90'
new YoutubeVideoScraper(videoId)
.then(scraper => {
  scraper.getAuthorInfo()
  .then(author=> {
    console.log(author)
  })
  .catch(err => {
    console.log(err)
  })
})
```
### `getDescriptionExtras()`
> Gets extra information

Returns: `Object`

```javascript
import YoutubeVideoScraper from "@joegesualdo/youtube-video-scraper-node"

let videoId = 'D_U6luQ6I90'
new YoutubeVideoScraper(videoId)
.then(scraper => {
  scraper.getDescriptionExtras()
  .then(result => {
    console.log(result)
  })
  .catch(err => {
    console.log(err)
  })
})
```
### `getViewCount()`
> Get the number of views.

Returns: `Number` that represent number of view a video has

```javascript
import YoutubeVideoScraper from "@joegesualdo/youtube-video-scraper-node"

let videoId = 'D_U6luQ6I90'
new YoutubeVideoScraper(videoId)
.then(scraper => {
  scraper.getViewCount()
  .then(meta => {
    console.log(meta)
  })
  .catch(err => {
    console.log(err)
  })
})
```
## Test
```
$ npm test
```
## Build
```
$ npm run build
```

## Related
- [example-package]() - Add description of the example package here.

## License
MIT © [Joe Gesualdo]()
