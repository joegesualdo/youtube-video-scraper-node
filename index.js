import parse5 from 'parse5';
import XRay from 'x-ray';

const xray = XRay();

class YoutubeScraper {
  constructor(videoId) {
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
      getMetaInformationFromHTML(this.html)
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        reject(err);
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

// Helper
function getMetaInformationFromHTML(html) {
  return new Promise((resolve) => {
    const metas = [];
    const htmlFragment = parse5.parseFragment(html);
    htmlFragment.childNodes.forEach(child => {
      if (child.nodeName === 'meta') {
        const obj = {};

        child.attrs.forEach(attr => {
          if (attr.name !== 'content') {
            obj.typeKey = attr.name;
            obj.typeValue = attr.value;
          } else {
            obj.value = attr.value;
          }
        });

        metas.push(obj);
      }
    });

    resolve(metas);
  });
}

export default YoutubeScraper;
