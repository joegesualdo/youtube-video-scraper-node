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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var parse5 = __webpack_require__(2);

	var xray = (0, _xRay2.default)();

	var YoutubeScraper = function () {
	  function YoutubeScraper(videoId) {
	    var _this = this;

	    _classCallCheck(this, YoutubeScraper);

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
	        getMetaInformationFromHTML(_this2.html).then(function (result) {
	          resolve(result);
	        }).catch(function (err) {
	          reject(err);
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
	            var result = data.split(" ")[0].replace(/,/g, '');
	            resolve(result);
	          }
	        });
	      });
	    }
	  }]);

	  return YoutubeScraper;
	}();

	// Helper


	function getMetaInformationFromHTML(html) {
	  return new Promise(function (resolve, reject) {
	    var metas = [];
	    var fragment = parse5.parseFragment(html);
	    fragment.childNodes.forEach(function (child) {
	      if (child.nodeName === 'meta') {
	        var a = {};
	        var name = '';
	        child.attrs.forEach(function (attr) {
	          if (attr.name !== 'content') {
	            a.typeKey = attr.name;
	            a.typeValue = attr.value;
	          } else {
	            a.value = attr.value;
	          }
	        });
	        metas.push(a);
	      }
	    });
	    resolve(metas);
	  });
	}

	exports.default = YoutubeScraper;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("x-ray");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("parse5");

/***/ }
/******/ ]);