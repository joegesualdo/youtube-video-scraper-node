let YoutubeScraper = require('./../dist').default;

new YoutubeScraper('D_U6luQ6I90')
.then(scraper => {
  scraper.getMetaInformation()
  .then(meta => {
    console.log(meta)
  })
  .catch(err => {
    console.log(err)
  })
  // scraper.getAuthorInfo()
  // .then(meta => {
  //   console.log(meta)
  // })
  // scraper.getDescriptionExtras()
  // .then(result => {
  //   console.log(result)
  // })
  // scraper.getViewCount()
  // .then(meta => {
  //   console.log(meta)
  // })
})
