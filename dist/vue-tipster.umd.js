(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vue-tipster"] = factory(require("vue"));
	else
		root["vue-tipster"] = factory(root["Vue"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__8bbf__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "349b");
/******/ })
/************************************************************************/
/******/ ({

/***/ "017d":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("55f2");
var getOwnPropertyDescriptor = __webpack_require__("d266").f;
var createNonEnumerableProperty = __webpack_require__("a1fa");
var redefine = __webpack_require__("49e1");
var setGlobal = __webpack_require__("8668");
var copyConstructorProperties = __webpack_require__("da6b");
var isForced = __webpack_require__("87b1");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "01e3":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "0d63":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "128e":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("eb90");
var uid = __webpack_require__("b198");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "16c3":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("e556");

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "2195":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("017d");
var parseIntImplementation = __webpack_require__("360b");

// `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix
$({ global: true, forced: parseInt != parseIntImplementation }, {
  parseInt: parseIntImplementation
});


/***/ }),

/***/ "2227":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "243a":
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__("3ac0");
var requireObjectCoercible = __webpack_require__("e527");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "2901":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "2bfb":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("9267");
var definePropertyModule = __webpack_require__("866c");
var anObject = __webpack_require__("58af");
var objectKeys = __webpack_require__("d753");

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),

/***/ "2d87":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("017d");
var $indexOf = __webpack_require__("458f").indexOf;
var arrayMethodIsStrict = __webpack_require__("ab38");
var arrayMethodUsesToLength = __webpack_require__("2eb8");

var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('indexOf');
var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "2eb8":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("9267");
var fails = __webpack_require__("dd4c");
var has = __webpack_require__("aa74");

var defineProperty = Object.defineProperty;
var cache = {};

var thrower = function (it) { throw it; };

module.exports = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;

  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !DESCRIPTORS) return true;
    var O = { length: -1 };

    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
    else O[1] = 1;

    method.call(O, argument0, argument1);
  });
};


/***/ }),

/***/ "2fd0":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4323");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "349b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("2227")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"941e22d0-vue-loader-template"}!/Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!/Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/cache-loader/dist/cjs.js??ref--0-0!/Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib??vue-loader-options!./vue-tipster.vue?vue&type=template&id=490e0f89&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{attrs:{"data-init":"0"}},[_vm._t("default"),_c('div',{ref:"backdrop",style:({'position':'fixed','top':'0px','right':'0px','left':'0px','bottom':'0px','background-color':_vm.backdrop_bg_color,'display':_vm.backdrop_visible?'block':'none','transition':'opacity 0.3s'})}),_c('div',{ref:"popupcontent",style:({'display':'none',width:'auto','position':(_vm.type=='dialog' || _vm.type=='notification'?'fixed':'absolute'),'max-width':_vm.max_width,'width':_vm.width,'min-width':_vm.min_width,'left':_vm.popup_left+'px','top':_vm.popup_top+'px','visibility':'hidden','transition':'opacity 0.4s'})},[(_vm.type=='tooltip'?true:false)?_c('span',{staticClass:"tipster-caret-bg tipster-caret-bg-top",style:({'display':_vm.current_placement=='bottom'?'inline-block':'none',width:0,height:0,borderLeft:'9px solid transparent',borderRight:'9px solid transparent',borderBottom:'9px solid '+_vm.border_color,'left':(_vm.placement=='bottom-left'?'10px':(_vm.placement=='bottom-right'?_vm.popup_width*2-25+'px':(_vm.popup_width)-9+'px')),'position':'absolute','top':'-8px'})},[_c('span',{staticClass:"tipster-caret",style:({width:0,height:0,borderLeft:'7px solid transparent',borderRight:'7px solid transparent',borderBottom:'7px solid '+_vm.caret_bg_color,'left':'-7px','position':'absolute','top':'2px'})})]):_vm._e(),(_vm.type=='tooltip'?true:false)?_c('span',{staticClass:"tipster-caret-bg tipster-caret-bg-right",style:({'display':_vm.current_placement=='left'?'inline-block':'none',width:0,height:0,borderLeft:'9px solid '+_vm.border_color,borderBottom:'9px solid transparent',borderTop:'9px solid transparent','left':(_vm.popup_width*2)+'px','position':'absolute','top':_vm.popup_height-9+'px'})},[_c('span',{staticClass:"tipster-caret",style:({width:0,height:0,borderLeft:'7px solid '+_vm.caret_bg_color,borderBottom:'7px solid transparent',borderTop:'7px solid transparent','left':'-9px','position':'absolute','top':'-7px'})})]):_vm._e(),_c('div',{staticClass:"tipster-container",style:({'border-color':_vm.border_color,'border-style':'solid',borderWidth:'1px','border-radius':'10px'})},[_c('div',{staticClass:"tipster-header",style:({'display':_vm.has_header?'block':'none','background-color':_vm.header_bg_color,'border-radius':'10px 10px 0px 0px', padding:'5px','position':'relative'})},[_vm._t("title",[_c('div',{domProps:{"innerHTML":_vm._s(_vm.title)}})]),(_vm.closable)?_c('a',{style:({'cursor':'pointer','position':'absolute','top':'5px','right':'5px','display':'inline-block','height':'14px','width':'14px'}),on:{"click":_vm.close}},[_vm._t("close-icon",[_c('span',{style:({'display':'inline-block','height':'14px','width':'2px','transform':'rotate(45deg)',backgroundColor:'#fff'})}),_c('span',{style:({'display':'inline-block','height':'14px','width':'2px','transform':'rotate(-45deg)',backgroundColor:'#fff','position':'relative','left':'-2px'})})])],2):_vm._e()],2),_c('div',{staticClass:"tipster-content",style:({'background-color':_vm.content_bg_color,'padding':'5px','border-radius':_vm.has_header && _vm.has_footer?'0px':(_vm.has_header?'0px 0px 10px 10px':(_vm.has_footer?'10px 10px 0px 0px':'10px'))})},[_vm._t("content",[_c('div',{domProps:{"innerHTML":_vm._s(_vm.content)}})])],2),_c('div',{staticClass:"tipster-footer",style:({display:_vm.has_footer?'block':'none','border-radius':'0px 0px 10px 10px','background-color':_vm.footer_bg_color,padding:'5px'})},[_vm._t("footer",[_c('div',{domProps:{"innerHTML":_vm._s(_vm.footer)}})])],2)]),(_vm.type=='tooltip'?true:false)?_c('span',{staticClass:"tipster-caret-bg tipster-caret-bg-right",style:({'display':_vm.current_placement=='right'?'inline-block':'none',width:0,height:0,borderRight:'9px solid '+_vm.border_color,borderBottom:'9px solid transparent',borderTop:'9px solid transparent','left':'-9px','position':'absolute','top':_vm.popup_height-9+'px'})},[_c('span',{staticClass:"tipster-caret",style:({width:0,height:0,borderRight:'7px solid '+_vm.caret_bg_color,borderBottom:'7px solid transparent',borderTop:'7px solid transparent','left':'2px','position':'absolute','top':'-7px'})})]):_vm._e(),(_vm.type=='tooltip'?true:false)?_c('span',{staticClass:"tipster-caret-bg tipster-caret-bg-bottom",style:({'display':_vm.current_placement=='top'?'inline-block':'none',width:0,height:0,borderLeft:'9px solid transparent',borderRight:'9px solid transparent',borderTop:'9px solid '+_vm.border_color,'left':(_vm.popup_width)-9+'px','position':'absolute','bottom':'-8px'})},[_c('span',{staticClass:"tipster-caret",style:({width:0,height:0,borderLeft:'7px solid transparent',borderRight:'7px solid transparent',borderTop:'7px solid '+_vm.caret_bg_color,'left':'-7px','position':'absolute','top':'-9px'})})]):_vm._e()])],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./vue-tipster.vue?vue&type=template&id=490e0f89&

// EXTERNAL MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es.array.index-of.js
var es_array_index_of = __webpack_require__("2d87");

// EXTERNAL MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es.date.to-string.js
var es_date_to_string = __webpack_require__("5f5d");

// EXTERNAL MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("3685");

// EXTERNAL MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/core-js/modules/es.parse-int.js
var es_parse_int = __webpack_require__("2195");

// EXTERNAL MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/core-js/modules/web.timers.js
var web_timers = __webpack_require__("a11f");

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// CONCATENATED MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/thread-loader/dist/cjs.js!/Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/babel-loader/lib??ref--12-1!/Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/cache-loader/dist/cjs.js??ref--0-0!/Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib??vue-loader-options!./vue-tipster.vue?vue&type=script&lang=js&





//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var lib_vue_loader_options_vue_tipstervue_type_script_lang_js_ = ({
  name: 'vue-tipster',
  props: {
    backdrop: {
      required: false,
      type: Boolean,
      "default": false
    },
    backdrop_bg_color: {
      required: false,
      type: String,
      "default": 'rgba(0,0,0,0.3)'
    },
    backdrop_closable: {
      required: false,
      type: Boolean,
      "default": false
    },
    closable: {
      required: false,
      type: Boolean,
      "default": false
    },
    type: {
      required: false,
      type: String,
      "default": 'tooltip' //tooltip, dialog or notification

    },
    timeout: {
      required: false,
      type: Number,
      "default": 2500
    },
    title: {
      required: false,
      type: String,
      "default": ''
    },
    content: {
      required: false,
      type: String,
      "default": ''
    },
    footer: {
      required: false,
      type: String,
      "default": ''
    },
    min_width: {
      required: false,
      type: String,
      "default": 'auto'
    },
    width: {
      required: false,
      type: String,
      "default": 'auto'
    },
    max_width: {
      required: false,
      type: String,
      "default": '100%'
    },
    header_bg_color: {
      required: false,
      type: String,
      "default": '#ccc'
    },
    footer_bg_color: {
      required: false,
      type: String,
      "default": '#ccc'
    },
    content_bg_color: {
      required: false,
      type: String,
      "default": '#fff'
    },
    border_color: {
      required: false,
      type: String,
      "default": '#afafaf'
    },
    placement: {
      required: false,
      type: String,
      "default": 'auto' //for notification
      //top, top-left, top-right, center, center-left, center-right, bottom, bottom-left, bottom-right
      //for tooltip
      //top, bottom, left, right

    },
    target: {
      required: false,
      type: String,
      "default": null
    },
    manual: {
      required: false,
      type: Boolean,
      "default": false
    },
    toggle: {
      required: false,
      type: Boolean,
      "default": false
    },
    keep_on_over: {
      required: false,
      type: Boolean,
      "default": false
    },
    close_on_click: {
      required: false,
      type: Boolean,
      "default": false
    }
  },
  watch: {
    type: function type(newval, oldval) {
      if (newval != oldval) {
        throw new Error('You cannot change my type');
      }
    },
    target: function target(newval, oldval) {
      //console.log(newval,oldval);
      if (newval != oldval) {
        this.removeHandlers();
        this.dsDom = document.querySelector(newval);
        this['setupHandlers_' + this.type]();
      }
    }
  },
  computed: {
    caret_position_top: function caret_position_top() {
      if (this.current_placement == 'bottom') {
        return 'auto';
      }

      return '-8px';
    },
    caret_position_bottom: function caret_position_bottom() {
      if (this.current_placement == 'top') {
        return 'auto';
      }

      return '-8px';
    },
    has_header: function has_header() {
      return this.title != '' || typeof this.$slots.title !== 'undefined' && this.$slots.title.length > 0 ? true : false;
    },
    has_footer: function has_footer() {
      return this.footer != '' || typeof this.$slots.footer !== 'undefined' && this.$slots.footer.length > 0 ? true : false;
    },
    caret_bg_color: function caret_bg_color() {
      var bg_color = this.content_bg_color;

      if (this.has_header && this.current_placement == 'bottom') {
        bg_color = this.header_bg_color;
      } //console.log('caret bg color',bg_color);


      return bg_color;
    }
  },
  data: function data() {
    return {
      id: null,
      dsDom: null,
      //default slot dom
      popupO: null,
      original_target: '',
      //keep track if it was a slot or a target attribute (because target attribute can be track for changes)
      original_type: '',
      popup_left: '0px',
      popup_top: '0px',
      popup_opacity: 0,
      popup_width: 0,
      popup_height: 0,
      hide_timeout: -1,
      hide_styles_timeout: -1,
      is_showing: false,
      current_placement: 'bottom',
      //top, top-left, top-right, bottom, bottom-left, bottom-right (default is bottom)
      backdrop_visible: false,
      backdropO: null
    };
  },
  methods: {
    toggle_show: function toggle_show() {
      if (this.is_showing) {
        this.hide();
      } else {
        this.show();
      }
    },
    isShowning: function isShowning() {
      return this.is_showing;
    },
    setupHandlers_notification: function setupHandlers_notification() {
      var _this = this;

      var me = this;

      if (this.backdrop_closable) {
        //alert(true)
        this.backdropO.addEventListener('click', this.hide);
      }

      if (this.close_on_click) {
        this.popupO.addEventListener('click', this.hide);
      }

      if (!this.manual) {
        if (this.keep_on_over) {
          this.popupO.addEventListener('mouseover', function () {
            //console.log('on over');
            me.show();
            clearTimeout(_this.hide_timeout);
            clearTimeout(_this.hide_styles_timeout);
          });
          this.popupO.addEventListener('mouseout', function () {
            _this.hide_timeout = setTimeout(function () {
              me.hide();
            }, _this.timeout);
          });
        }
      }
    },
    setupHandlers_tooltip: function setupHandlers_tooltip() {
      if (this.dsDom != null) {
        var me = this;

        if (!this.manual) {
          if (this.toggle) {
            this.dsDom.addEventListener('click', this.toggle_show);
          } else {
            if (this.keep_on_over) {
              this.popupO.addEventListener('mouseover', function () {
                // console.log('on over');
                me.show();
              });
              this.popupO.addEventListener('mouseout', function () {
                me.hide();
              });
            }

            this.dsDom.addEventListener('focus', this.show);
            this.dsDom.addEventListener('mouseover', this.show);
            this.dsDom.addEventListener('blur', this.hide);
            this.dsDom.addEventListener('mouseout', this.hide);
          }
        }

        if (this.close_on_click) {
          this.popupO.addEventListener('click', this.hide);
        }
      }
    },
    removeHandlers: function removeHandlers() {
      this.dsDom.removeEventListener('mouseover', this.show);
      this.dsDom.removeEventListener('focus', this.show);
      this.dsDom.removeEventListener('click', this.toggle_show);
      this.dsDom.removeEventListener('mouseout', this.hide);
      this.dsDom.removeEventListener('blur', this.hide);

      if (this.keep_on_over && this.popupO != null) {
        this.popupO.removeEventListener('mouseover', this.show);
        this.popupO.removeEventListener('mouseout', this.hide);
      }

      if (this.backdrop_closable) {
        this.backdropO.removeEventListener('click', this.hide);
      }
    },
    measureViewport: function measureViewport() {
      var div = document.createElement('div');
      div.style.zIndex = -1;
      div.style.position = 'fixed';
      div.style.visibility = 'hidden';
      div.style.opacity = 0;
      div.style.top = '0px';
      div.style.left = '0px';
      div.style.right = '0px';
      div.style.bottom = '0px';
      document.body.appendChild(div);
      var dim = div.getBoundingClientRect();
      var view = {
        width: dim.width,
        height: dim.height
      };
      document.body.removeChild(div); //console.log(view);

      return view;
    },
    show: function show() {
      //console.log(this.dsDom);
      clearTimeout(this.hide_styles_timeout);
      clearTimeout(this.hide_timeout);
      this.popupO.style.opacity = 0;
      this.popupO.style.display = 'inline-block'; //viewport dimensions

      var view_dim = this.measureViewport();
      var target_dim = this.type == 'tooltip' ? this.target_dim() : view_dim; //measure after we set display to inline-block because in hidden it can report wrongly

      var tipster_dim = this.tipster_dim();
      var left = 0;
      var top = 0; //console.log(view_dim);

      if (this.type == 'tooltip') {
        this.current_placement = 'bottom';
        left = target_dim.left + target_dim.width / 2 - tipster_dim.width / 2;

        if (this.placement == 'top-left' || this.placement == 'bottom-left') {
          left = target_dim.left;
        } else if (this.placement == 'top-right' || this.placement == 'bottom-right') {
          left = target_dim.left + target_dim.width - tipster_dim.width;
        }

        if (left < 0) {
          left = target_dim.left;
        } else if (left + tipster_dim.width > view_dim.width) {
          left = target_dim.left + target_dim.width - tipster_dim.width;
        } //always default to bottom


        top = target_dim.top + target_dim.height + 10;

        if (this.placement == 'top' || this.placement == 'top-left' || this.placement == 'top-right') {
          top = target_dim.top - tipster_dim.height - 10;
        } else if (this.placement == 'left') {
          top = target_dim.top + target_dim.height / 2 - tipster_dim.height / 2;
          left = target_dim.left - tipster_dim.width - 10;
          this.current_placement = 'left';
        } else if (this.placement == 'right') {
          top = target_dim.top + target_dim.height / 2 - tipster_dim.height / 2;
          left = target_dim.left + target_dim.width + 10;
          this.current_placement = 'right';
        }

        if (top + tipster_dim.height > view_dim.height) {
          top = target_dim.top - tipster_dim.height - 10; //move to top

          this.current_placement = 'top';
        }

        top = top + window.scrollY;
      } else {
        //assume left is always top-left, center-left, bottom-left
        left = 10;

        if (['center', 'top', 'bottom'].indexOf(this.placement) != -1) {
          left = view_dim.width / 2 - tipster_dim.width / 2;
        } else if (['top-right', 'center-right', 'bottom-right'].indexOf(this.placement) != -1) {
          left = view_dim.width - tipster_dim.width - 10;
        }

        top = 10;

        if (this.placement == 'center') {
          top = view_dim.height / 2 - tipster_dim.height / 2;
        } else if (['bottom-left', 'bottom', 'bottom-right'].indexOf(this.placement) != -1) {
          top = view_dim.height - tipster_dim.height - 10;
        }
      }

      this.popup_left = left;
      this.popup_top = top;
      this.popupO.style.visibility = 'visible'; //this.popupO.style.transition='0.5s';

      this.popup_width = tipster_dim.width / 2;
      this.popup_height = tipster_dim.height / 2; //console.log(tipster_dim);

      if (this.backdrop) {
        this.backdrop_visible = true;
        this.backdropO.style.zIndex = 99;
        this.backdropO.style.opacity = 1;
      }

      this.popupO.style.opacity = 1;
      this.popupO.style.zIndex = 100;
      this.is_showing = true; //this.shown({instance:this});

      this.$emit('shown', {
        instance: this
      });

      if (this.type == 'notification') {
        if (!this.close_on_click && !this.manual) {
          this.hide_timeout = setTimeout(this.hide, this.timeout);
        }
      }
    },
    close: function close() {
      //this.closed();
      this.$emit('closed', {
        instance: this
      });
      this.hide();
    },
    hide: function hide() {
      var _this2 = this;

      clearTimeout(this.hide_timeout);
      clearTimeout(this.hide_styles_timeout);
      this.hide_timeout = setTimeout(function () {
        //this.hidden({instance:this})
        _this2.$emit('hidden', {
          instance: _this2
        }); //this.popup_opacity = 0;


        _this2.backdropO.style.opacity = 0;
        _this2.popupO.style.opacity = 0;
        _this2.is_showing = false;
        _this2.hide_styles_timeout = setTimeout(function () {
          _this2.backdropO.style.zIndex = -1;
          _this2.backdrop_visible = false;
          _this2.popupO.style.zIndex = -1;
          _this2.popupO.style.visibility = 'hidden'; //this.popup_display='none';

          _this2.popupO.style.display = 'none';
        }, 500);
      }, 100);
    },
    target_dim: function target_dim() {
      return this.dsDom.getBoundingClientRect();
    },
    tipster_dim: function tipster_dim() {
      return this.popupO.getBoundingClientRect();
    },
    resized: function resized() {
      //console.log(window.scrollY);
      if (this.is_showing && this.type == 'tooltip') {
        //find the new coordinates
        this.show();
      }
    },
    getDateTime: function getDateTime() {
      var d = new Date();
      var month = d.getMonth() + 1;
      var day = d.getDate() + 1;
      var hours = d.getHours();
      var mins = d.getMinutes();
      var secs = d.getSeconds();
      var mills = d.getMilliseconds();
      return d.getFullYear() + '' + (month < 10 ? '0' + month : month) + '' + (day < 10 ? '0' + day : day) + '' + (hours < 10 ? '0' + hours : hours) + '' + (mins < 10 ? '0' + mins : mins) + '' + (secs < 10 ? '0' + secs : secs) + '.' + mills;
    }
  },
  created: function created() {
    if (typeof this.$vtipster == 'undefined') {
      external_commonjs_vue_commonjs2_vue_root_Vue_default.a.prototype.$vtipster = external_commonjs_vue_commonjs2_vue_root_Vue_default.a.observable({
        instances: 0,
        creations: 0,
        listeners: []
      });
      external_commonjs_vue_commonjs2_vue_root_Vue_default.a.prototype.$vtipster.actions = {
        increaseInstance: function increaseInstance() {}
      };

      external_commonjs_vue_commonjs2_vue_root_Vue_default.a.prototype.$vtipster.subscribe = function (name, callback) {
        this.listeners[name].push(callback);
      };
    }

    this.$vtipster.instances++;
    this.$vtipster.creations++;
    this.id = 'vue-tipster-' + this.getDateTime() + '.' + this.$vtipster.creations;
  },
  mounted: function mounted() {
    var popup_e = document.querySelector("[data-id='" + this.id + "']");

    if (popup_e != null) {
      document.body.removeChild(popup_e); //console.log('remove from mounted');
    }

    var inited = this.$el.getAttribute('data-init');

    if (parseInt(inited) == 1) {
      //console.log('inited');
      this.$el.setAttribute('data-init', 1);
    } //console.log(this.id);
    //console.log(this.$slots.default[0].elm);


    this.original_type = this.type;
    this.backdropO = this.$refs['backdrop'];
    this.backdropO.setAttribute('data-id', 'background-' + this.id);
    document.body.appendChild(this.backdropO);
    this.popupO = this.$refs['popupcontent'];
    this.popupO.setAttribute('data-id', this.id); //append to body and it will automatically move to end of the <body> tag

    document.body.appendChild(this.popupO); //only tooltip needs the default slot or target as a trigger (other types do not need a trigger)

    if (this.original_type == 'tooltip') {
      if (typeof this.$slots["default"] !== 'undefined' && this.$slots["default"].length > 0) {
        this.dsDom = this.$slots["default"][0].elm;
        this.original_target = 'slot';
      } else if (this.target != null) {
        this.dsDom = document.querySelector(this.target);
        this.$el.style.display = 'none';
        this.original_target = 'target';
      }
    }

    this['setupHandlers_' + this.type]();
    window.addEventListener('resize', this.resized);
  },
  beforeDestroy: function beforeDestroy() {
    //alert('before')
    this.$vtipster.instances--; //console.log(this.$vtipster.instances);

    document.body.removeChild(this.popupO);
  },
  destroy: function destroy() {
    this.$vtipster.instances -= 1;
    window.removeEventListener('resize', this.resized);
    this.removeHandlers(); //document.body.removeChild( this.popupO );
    //document.body.removeChild( this.popupO );
    //console.log('removed popupO');
  }
});
// CONCATENATED MODULE: ./vue-tipster.vue?vue&type=script&lang=js&
 /* harmony default export */ var vue_tipstervue_type_script_lang_js_ = (lib_vue_loader_options_vue_tipstervue_type_script_lang_js_); 
// CONCATENATED MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./vue-tipster.vue





/* normalize component */

var component = normalizeComponent(
  vue_tipstervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var vue_tipster = (component.exports);
// CONCATENATED MODULE: /Users/fisigma/.nvm/versions/node/v12.16.1/lib/node_modules/@vue/cli-service-global/node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (vue_tipster);



/***/ }),

/***/ "35f2":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "360b":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("55f2");
var trim = __webpack_require__("4079").trim;
var whitespaces = __webpack_require__("b808");

var $parseInt = global.parseInt;
var hex = /^[+-]?0[Xx]/;
var FORCED = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22;

// `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix
module.exports = FORCED ? function parseInt(string, radix) {
  var S = trim(String(string));
  return $parseInt(S, (radix >>> 0) || (hex.test(S) ? 16 : 10));
} : $parseInt;


/***/ }),

/***/ "3685":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("9267");
var global = __webpack_require__("55f2");
var isForced = __webpack_require__("87b1");
var redefine = __webpack_require__("49e1");
var has = __webpack_require__("aa74");
var classof = __webpack_require__("2901");
var inheritIfRequired = __webpack_require__("da1b");
var toPrimitive = __webpack_require__("16c3");
var fails = __webpack_require__("dd4c");
var create = __webpack_require__("edbc");
var getOwnPropertyNames = __webpack_require__("a162").f;
var getOwnPropertyDescriptor = __webpack_require__("d266").f;
var defineProperty = __webpack_require__("866c").f;
var trim = __webpack_require__("4079").trim;

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;

// Opera ~12 has broken Object#toString
var BROKEN_CLASSOF = classof(create(NumberPrototype)) == NUMBER;

// `ToNumber` abstract operation
// https://tc39.github.io/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  var first, third, radix, maxCode, digits, length, index, code;
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = it.charCodeAt(0);
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = it.slice(2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.github.io/ecma262/#sec-number-constructor
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var dummy = this;
    return dummy instanceof NumberWrapper
      // check on 1..constructor(foo) case
      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classof(dummy) != NUMBER)
        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
  };
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(NativeNumber, key = keys[j]) && !has(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global, NUMBER, NumberWrapper);
}


/***/ }),

/***/ "3964":
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__("985e");
var global = __webpack_require__("55f2");

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "3ac0":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("dd4c");
var classof = __webpack_require__("2901");

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "4079":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("e527");
var whitespaces = __webpack_require__("b808");

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ "4323":
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ "443e":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("55f2");
var isObject = __webpack_require__("e556");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "458f":
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__("243a");
var toLength = __webpack_require__("2fd0");
var toAbsoluteIndex = __webpack_require__("ed09");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "49e1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("55f2");
var createNonEnumerableProperty = __webpack_require__("a1fa");
var has = __webpack_require__("aa74");
var setGlobal = __webpack_require__("8668");
var inspectSource = __webpack_require__("8999");
var InternalStateModule = __webpack_require__("58c7");

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ "4af3":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("3964");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "55f2":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("01e3")))

/***/ }),

/***/ "58af":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("e556");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ "58c7":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__("dd12");
var global = __webpack_require__("55f2");
var isObject = __webpack_require__("e556");
var createNonEnumerableProperty = __webpack_require__("a1fa");
var objectHas = __webpack_require__("aa74");
var sharedKey = __webpack_require__("128e");
var hiddenKeys = __webpack_require__("8065");

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "5f5d":
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__("49e1");

var DatePrototype = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var nativeDateToString = DatePrototype[TO_STRING];
var getTime = DatePrototype.getTime;

// `Date.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-date.prototype.tostring
if (new Date(NaN) + '' != INVALID_DATE) {
  redefine(DatePrototype, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? nativeDateToString.call(this) : INVALID_DATE;
  });
}


/***/ }),

/***/ "6611":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("55f2");
var setGlobal = __webpack_require__("8668");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ "6c26":
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "7ff3":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("3964");

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ "8065":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "8668":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("55f2");
var createNonEnumerableProperty = __webpack_require__("a1fa");

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "866c":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("9267");
var IE8_DOM_DEFINE = __webpack_require__("e650");
var anObject = __webpack_require__("58af");
var toPrimitive = __webpack_require__("16c3");

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "87b1":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("dd4c");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "8999":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("6611");

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8bbf__;

/***/ }),

/***/ "9267":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("dd4c");

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "985e":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("55f2");

module.exports = global;


/***/ }),

/***/ "a11f":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("017d");
var global = __webpack_require__("55f2");
var userAgent = __webpack_require__("7ff3");

var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check

var wrap = function (scheduler) {
  return function (handler, timeout /* , ...arguments */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
    } : handler, timeout);
  };
};

// ie9- setTimeout & setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
$({ global: true, bind: true, forced: MSIE }, {
  // `setTimeout` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
  setTimeout: wrap(global.setTimeout),
  // `setInterval` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
  setInterval: wrap(global.setInterval)
});


/***/ }),

/***/ "a162":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("b7f5");
var enumBugKeys = __webpack_require__("6c26");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "a1fa":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("9267");
var definePropertyModule = __webpack_require__("866c");
var createPropertyDescriptor = __webpack_require__("a7ed");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "a7ed":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "aa74":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "aaa6":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("e556");

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


/***/ }),

/***/ "ab38":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("dd4c");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ "b198":
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ "b7f5":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("aa74");
var toIndexedObject = __webpack_require__("243a");
var indexOf = __webpack_require__("458f").indexOf;
var hiddenKeys = __webpack_require__("8065");

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "b808":
/***/ (function(module, exports) {

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "c78a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),

/***/ "d266":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("9267");
var propertyIsEnumerableModule = __webpack_require__("c78a");
var createPropertyDescriptor = __webpack_require__("a7ed");
var toIndexedObject = __webpack_require__("243a");
var toPrimitive = __webpack_require__("16c3");
var has = __webpack_require__("aa74");
var IE8_DOM_DEFINE = __webpack_require__("e650");

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ "d753":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("b7f5");
var enumBugKeys = __webpack_require__("6c26");

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "da1b":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("e556");
var setPrototypeOf = __webpack_require__("f6c0");

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ "da6b":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("aa74");
var ownKeys = __webpack_require__("fad0");
var getOwnPropertyDescriptorModule = __webpack_require__("d266");
var definePropertyModule = __webpack_require__("866c");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "dd12":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("55f2");
var inspectSource = __webpack_require__("8999");

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "dd4c":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "e527":
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "e556":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "e650":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("9267");
var fails = __webpack_require__("dd4c");
var createElement = __webpack_require__("443e");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "eb90":
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__("35f2");
var store = __webpack_require__("6611");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.5',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "ed09":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4323");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "edbc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("58af");
var defineProperties = __webpack_require__("2bfb");
var enumBugKeys = __webpack_require__("6c26");
var hiddenKeys = __webpack_require__("8065");
var html = __webpack_require__("4af3");
var documentCreateElement = __webpack_require__("443e");
var sharedKey = __webpack_require__("128e");

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),

/***/ "f6c0":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("58af");
var aPossiblePrototype = __webpack_require__("aaa6");

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "fad0":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("3964");
var getOwnPropertyNamesModule = __webpack_require__("a162");
var getOwnPropertySymbolsModule = __webpack_require__("0d63");
var anObject = __webpack_require__("58af");

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=vue-tipster.umd.js.map