module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _xRay = __webpack_require__(1);

	var _xRay2 = _interopRequireDefault(_xRay);

	var _getMetaInformationFromHtml = __webpack_require__(2);

	var _getMetaInformationFromHtml2 = _interopRequireDefault(_getMetaInformationFromHtml);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var xray = (0, _xRay2.default)();

	var YoutubeScraper = function () {
	  function YoutubeScraper(videoId) {
	    var _this = this;

	    _classCallCheck(this, YoutubeScraper);

	    if (!videoId) {
	      throw new Error('Missing constructor argument: \'videoId\'');
	    }
	    return new Promise(function (resolve, reject) {
	      var url = 'https://www.youtube.com/watch?v=' + videoId;

	      xray(url, 'html@html')(function (err, html) {
	        if (err) {
	          reject(err);
	        } else {
	          _this.html = html;
	          resolve(_this);
	        }
	      });
	    });
	  }

	  _createClass(YoutubeScraper, [{
	    key: 'getMetaInformation',
	    value: function getMetaInformation() {
	      var _this2 = this;

	      return new Promise(function (resolve, reject) {
	        xray(_this2.html, 'head@html')(function (e, headHtml) {
	          if (e) {
	            reject(e);
	          } else {
	            xray(_this2.html, '.watch-main-col@html')(function (err, mainColHtml) {
	              if (err) {
	                reject(e);
	              } else {
	                (0, _getMetaInformationFromHtml2.default)(headHtml).then(function (headMetas) {
	                  (0, _getMetaInformationFromHtml2.default)(mainColHtml).then(function (mainColMetas) {
	                    var metas = headMetas.concat(mainColMetas);
	                    resolve(metas);
	                  }).catch(function (pErr) {
	                    reject(pErr);
	                  });
	                }).catch(function (pErr) {
	                  reject(pErr);
	                });
	              }
	            });
	          }
	        });
	      });
	    }
	  }, {
	    key: 'getDescriptionExtras',
	    value: function getDescriptionExtras() {
	      var _this3 = this;

	      return new Promise(function (resolve, reject) {
	        xray(_this3.html, '#watch-description-extras', {
	          descriptionExtras: xray('.watch-meta-item', [{
	            title: '.title',
	            value: '.content.watch-info-tag-list'
	          }])
	        })(function (err, data) {
	          if (err) {
	            reject(err);
	          } else {
	            (function () {
	              var extraObj = {};

	              data.descriptionExtras.forEach(function (extra) {
	                extraObj[extra.title.trim().toLowerCase()] = extra.value.trim();
	              });

	              resolve(extraObj);
	            })();
	          }
	        });
	      });
	    }
	  }, {
	    key: 'getAuthorInfo',
	    value: function getAuthorInfo() {
	      var _this4 = this;

	      return new Promise(function (resolve, reject) {
	        xray(_this4.html, '.yt-user-info', {
	          name: 'a',
	          channelId: 'a@data-ytid'
	        })(function (err, data) {
	          if (err) {
	            reject(err);
	          } else {
	            resolve(data);
	          }
	        });
	      });
	    }
	  }, {
	    key: 'getViewCount',
	    value: function getViewCount() {
	      var _this5 = this;

	      return new Promise(function (resolve, reject) {
	        xray(_this5.html, '.watch-view-count')(function (err, data) {
	          if (err) {
	            reject(err);
	          } else {
	            var result = Number(data.split(' ')[0].replace(/,/g, ''));

	            resolve(result);
	          }
	        });
	      });
	    }
	  }]);

	  return YoutubeScraper;
	}();

	exports.default = YoutubeScraper;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("x-ray");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports =
	/******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};

	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {

	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;

	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};

	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;

	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}


	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;

	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;

	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";

	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = getMetaInformationFromHTML;

		var _parse = __webpack_require__(1);

		var _parse2 = _interopRequireDefault(_parse);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function getMetaInformationFromHTML(html) {
		  return new Promise(function (resolve) {
		    var metas = [];
		    var htmlFragment = _parse2.default.parseFragment(html);
		    var nodes = void 0;
		    if (htmlFragment.childNodes.length === 1 && htmlFragment.childNodes[0].nodeName !== 'meta') {
		      nodes = htmlFragment.childNodes[0].childNodes;
		    } else {
		      nodes = htmlFragment.childNodes;
		    }
		    nodes.forEach(function (child) {
		      if (child.nodeName === 'meta') {
		        (function () {
		          var obj = {};

		          child.attrs.forEach(function (attr) {
		            if (attr.name !== 'content') {
		              obj.typeKey = attr.name;
		              obj.typeValue = attr.value;
		            } else {
		              obj.value = attr.value;
		            }
		          });

		          metas.push(obj);
		        })();
		      }
		    });

		    resolve(metas);
		  });
		}

	/***/ },
	/* 1 */
	/***/ function(module, exports) {

		module.exports = __webpack_require__(3);

	/***/ }
	/******/ ]);

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("parse5");

/***/ }
/******/ ]);