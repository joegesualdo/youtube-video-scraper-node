import XRay from 'x-ray';
import getMetaInformationFromHTML from '@joegesualdo/get-meta-information-from-html';

const xray = XRay();

class YoutubeScraper {
  constructor(videoId) {
    if (!videoId) {
      throw new Error('Missing constructor argument: \'videoId\'');
    }
    return new Promise((resolve, reject) => {
      const url = `https://www.youtube.com/watch?v=${videoId}`;

      xray(url, 'html@html')((err, html) => {
        if (err) {
          reject(err);
        } else {
          this.html = html;
          resolve(this);
        }
      });
    });
  }

  getMetaInformation() {
    return new Promise((resolve, reject) => {
      xray(this.html, 'head@html')((e, headHtml) => {
        if (e) {
          reject(e);
        } else {
          xray(this.html, '.watch-main-col@html')((err, mainColHtml) => {
            if (err) {
              reject(e);
            } else {
              getMetaInformationFromHTML(headHtml)
              .then(headMetas => {
                getMetaInformationFromHTML(mainColHtml)
                .then(mainColMetas => {
                  const metas = headMetas.concat(mainColMetas);
                  resolve(metas);
                })
                .catch(pErr => {
                  reject(pErr);
                });
              })
              .catch(pErr => {
                reject(pErr);
              });
            }
          });
        }
      });
    });
  }

  getDescriptionExtras() {
    return new Promise((resolve, reject) => {
      xray(this.html, '#watch-description-extras', {
        descriptionExtras: xray('.watch-meta-item', [
          {
            title: '.title',
            value: '.content.watch-info-tag-list',
          },
        ]),
      })((err, data) => {
        if (err) {
          reject(err);
        } else {
          const extraObj = {};

          data.descriptionExtras.forEach(extra => {
            extraObj[extra.title.trim().toLowerCase()] = extra.value.trim();
          });

          resolve(extraObj);
        }
      });
    });
  }

  getAuthorInfo() {
    return new Promise((resolve, reject) => {
      xray(this.html, '.yt-user-info', {
        name: 'a',
        channelId: 'a@data-ytid',
      })((err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  getViewCount() {
    return new Promise((resolve, reject) => {
      xray(this.html, '.watch-view-count')((err, data) => {
        if (err) {
          reject(err);
        } else {
          const result = Number(data.split(' ')[0].replace(/,/g, ''));

          resolve(result);
        }
      });
    });
  }
}

export default YoutubeScraper;
