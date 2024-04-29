// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"hXbVG":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "e1dee4ede987e412";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && ![
        "localhost",
        "127.0.0.1",
        "0.0.0.0"
    ].includes(hostname) ? "wss" : "ws";
    var ws;
    if (HMR_USE_SSE) ws = new EventSource("/__parcel_hmr");
    else try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"1aB2c":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _rendererJs = require("./Renderer.js");
var _rendererJsDefault = parcelHelpers.interopDefault(_rendererJs);
const main = ()=>{
    const renderer = new (0, _rendererJsDefault.default)();
    renderer.draw();
    renderer.drawCameraFrame();
    const update = ()=>{
        renderer.draw();
        renderer.drawCameraFrame();
        window.requestAnimationFrame(()=>{
            update();
        });
    };
    update();
};
main();

},{"./Renderer.js":"7g7Td","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7g7Td":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _cameraFrameJs = require("./CameraFrame.js");
var _cameraFrameJsDefault = parcelHelpers.interopDefault(_cameraFrameJs);
var _gameJs = require("./Game.js");
var _gameJsDefault = parcelHelpers.interopDefault(_gameJs);
var _grayscaleObjectJs = require("./GrayscaleObject.js");
var _grayscaleObjectJsDefault = parcelHelpers.interopDefault(_grayscaleObjectJs);
var _lineJs = require("./Line.js");
var _lineJsDefault = parcelHelpers.interopDefault(_lineJs);
var _polyBlockJs = require("./PolyBlock.js");
var _polyBlockJsDefault = parcelHelpers.interopDefault(_polyBlockJs);
const CAMERA_SPACE_WIDTH = 400;
const DEPTH_RATIO = 2;
class Renderer {
    constructor(){
        this.mousePosition = {
            x: 0,
            y: 0
        };
        const game = new (0, _gameJsDefault.default)();
        const canvas = document.createElement("canvas");
        canvas.width = 1000;
        canvas.height = 1000;
        document.body.appendChild(canvas);
        const context = canvas.getContext("2d");
        const photoCanvas = document.createElement("canvas");
        photoCanvas.width = 50;
        photoCanvas.height = 1000;
        document.body.appendChild(photoCanvas);
        this.game = game;
        this.context = context;
        this.photoContext = photoCanvas.getContext("2d");
        canvas.onmousemove = (ev)=>{
            this.mousePosition.x = ev.offsetX;
            this.mousePosition.y = ev.offsetY;
        };
        document.body.onkeydown = (ev)=>{
            this.game.keysDown.add(ev.key);
        };
        document.body.onkeyup = (ev)=>{
            this.game.keysDown.delete(ev.key);
        };
        const cf = new (0, _cameraFrameJsDefault.default)();
        this.cameraFrame = cf;
    }
    draw() {
        this.game.focusPoint = this.mousePosition;
        this.game.tick();
        this.context.clearRect(0, 0, 1000, 1000);
        this.context.fillStyle = "white";
        this.context.fillRect(0, 0, 1000, 1000);
        this.context.fillStyle = "red";
        this.context.beginPath();
        // this.context.arc(this.game.player.x, this.game.player.y, 20, 0, Math.PI * 2);
        this.context.moveTo(this.game.player.x - 10, this.game.player.y - 20);
        this.context.lineTo(this.game.player.x + 10, this.game.player.y - 20);
        this.context.lineTo(this.game.player.x + 10, this.game.player.y + 20);
        this.context.lineTo(this.game.player.x - 10, this.game.player.y + 20);
        this.context.fill();
        this.context.closePath();
        this.game.visibleObjects.forEach((block)=>{
            if (block instanceof (0, _polyBlockJsDefault.default) || block instanceof (0, _grayscaleObjectJsDefault.default)) {
                this.context.fillStyle = block.color;
                this.context.moveTo(block.points[0].x, block.points[0].y);
                this.context.beginPath();
                for(let i = 0; i != block.points.length; i++)this.context.lineTo(block.points[i].x, block.points[i].y);
                this.context.closePath();
                this.context.fill();
            }
            if (block instanceof (0, _lineJsDefault.default)) {
                this.context.strokeStyle = block.color;
                this.context.beginPath();
                this.context.moveTo(block.lineSegments[0].from.x, block.lineSegments[0].from.y);
                this.context.lineTo(block.lineSegments[0].to.x, block.lineSegments[0].to.y);
                this.context.closePath();
                this.context.stroke();
            }
        });
        // draw view cone
        this.context.strokeStyle = "#cccccc";
        this.context.beginPath();
        this.context.moveTo(this.game.player.x, this.game.player.y);
        this.context.lineTo(this.game.player.x + Math.cos(this.game.viewDirection - this.game.fov) * 1e6, this.game.player.y + Math.sin(this.game.viewDirection - this.game.fov) * 1e6);
        this.context.lineTo(this.game.player.x + Math.cos(this.game.viewDirection + this.game.fov) * 1e6, this.game.player.y + Math.sin(this.game.viewDirection + this.game.fov) * 1e6);
        this.context.lineTo(this.game.player.x, this.game.player.y);
        this.context.closePath();
        this.context.stroke();
        // draw view centerline
        this.context.strokeStyle = "black";
        this.context.beginPath();
        this.context.moveTo(this.game.player.x, this.game.player.y);
        this.context.lineTo(this.game.player.x + Math.cos(this.game.viewDirection) * 1e6, this.game.player.y + Math.sin(this.game.viewDirection) * 1e6);
        this.context.closePath();
        this.context.stroke();
    }
    drawCameraFrame() {
        this.photoContext.clearRect(0, 0, 50, 1000);
        this.game.cameraFrame.segments.forEach((segment)=>{
            this.photoContext.fillStyle = segment.color;
            this.photoContext.fillRect(0, segment.start * 1000, 50, (segment.end - segment.start) * 1000);
        });
        this.photoContext.strokeStyle = "black";
        this.photoContext.beginPath();
        this.photoContext.moveTo(0, 500);
        this.photoContext.lineTo(50, 500);
        this.photoContext.closePath();
        this.photoContext.stroke();
    }
}
exports.default = Renderer;

},{"./CameraFrame.js":"eKjOm","./Game.js":"6eO1U","./GrayscaleObject.js":"bwvMi","./Line.js":"c9vOe","./PolyBlock.js":"kNaLW","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eKjOm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class CameraFrame {
    flip() {
        // start to end
        // becomes
        // (1 - end) to (1 - start)
        const newSegments = [];
        this.segments.forEach((seg)=>{
            newSegments.push({
                start: 1 - seg.end,
                end: 1 - seg.start,
                color: seg.color
            });
        });
        this.segments = newSegments;
    }
    simplify() {
        const newSegments = [];
        let lastColor = "none";
        let lastEnd = 0;
        this.segments.forEach((seg)=>{
            if (seg.color === lastColor && seg.start === lastEnd) newSegments[newSegments.length - 1].end = seg.end;
            else newSegments.push(seg);
            lastColor = seg.color;
            lastEnd = seg.end;
        });
        this.segments = newSegments;
    }
    at(position) {
        let ret = "none";
        this.segments.forEach((seg)=>{
            if (position >= seg.start && position < seg.end) ret = seg.color;
        });
        return ret;
    }
    compare(otherFrame) {
        // find all breakpoints
        const breakpoints = new Set();
        this.segments.forEach((seg)=>{
            breakpoints.add(seg.start);
            breakpoints.add(seg.end);
        });
        otherFrame.segments.forEach((seg)=>{
            breakpoints.add(seg.start);
            breakpoints.add(seg.end);
        });
        breakpoints.add(1);
        const breakpointsArray = Array.from(breakpoints.values()).sort((a, b)=>a - b);
        const similarityZones = [];
        let similarity = 0;
        breakpointsArray.forEach((breakpoint, idx)=>{
            const start = breakpointsArray[idx - 1] || 0;
            const position = (breakpoint + start) / 2;
            const thisColor = this.at(position);
            const otherColor = otherFrame.at(position);
            similarityZones.push({
                start,
                end: breakpoint,
                same: thisColor === otherColor
            });
            if (thisColor === otherColor) similarity += breakpoint - start;
        });
        return similarity;
    }
    constructor(){
        this.segments = [];
    }
}
exports.default = CameraFrame;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"6eO1U":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _cameraFrameJs = require("./CameraFrame.js");
var _cameraFrameJsDefault = parcelHelpers.interopDefault(_cameraFrameJs);
var _utilsJs = require("./utils.js");
var _level1Js = require("./levels/Level1.js");
var _level1JsDefault = parcelHelpers.interopDefault(_level1Js);
class Game {
    constructor(){
        this.visibleObjects = [];
        this.focusPoint = {
            x: 0,
            y: 0
        };
        this.viewDirection = 0;
        this.fov = 0.25;
        this.keysDown = new Set();
        this.cameraFrame = new (0, _cameraFrameJsDefault.default)();
        this.world = (0, _level1JsDefault.default).world;
        this.player = (0, _level1JsDefault.default).world.players[0];
        this.visibleObjects.push(...(0, _level1JsDefault.default).world.geometryObjects);
    }
    tick() {
        this.player.moveLeft = this.keysDown.has("a");
        this.player.moveRight = this.keysDown.has("d");
        this.player.jump = this.keysDown.has("w");
        this.world.update();
        this.viewDirection = Math.atan2(this.focusPoint.y - this.player.y, this.focusPoint.x - this.player.x);
        this.calculatePhotoContent();
    }
    calculatePhotoContent() {
        this.viewDirection = (0, _utilsJs.limitNearVerticalDirection)(this.viewDirection, this.fov);
        const cameraFrame = this.world.calculatePhotoContent({
            x: this.player.x,
            y: this.player.y
        }, this.viewDirection, this.fov);
        this.cameraFrame = cameraFrame;
    }
}
exports.default = Game;

},{"./CameraFrame.js":"eKjOm","./utils.js":"4Nvvk","./levels/Level1.js":"khQ1I","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4Nvvk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "intersects", ()=>intersects);
parcelHelpers.export(exports, "lineSegmentsIntersect", ()=>lineSegmentsIntersect);
parcelHelpers.export(exports, "distance", ()=>distance);
parcelHelpers.export(exports, "limitNearVerticalDirection", ()=>limitNearVerticalDirection);
function intersects(a, b, c, d, p, q, r, s) {
    var det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) return false;
    else {
        lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
        gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
        return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1;
    }
}
function lineSegmentsIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    var a_dx = x2 - x1;
    var a_dy = y2 - y1;
    var b_dx = x4 - x3;
    var b_dy = y4 - y3;
    var s = (-a_dy * (x1 - x3) + a_dx * (y1 - y3)) / (-b_dx * a_dy + a_dx * b_dy);
    var t = (+b_dx * (y1 - y3) - b_dy * (x1 - x3)) / (-b_dx * a_dy + a_dx * b_dy);
    const doSegmentsIntersect = s >= 0 && s <= 1 && t >= 0 && t <= 1;
    return {
        direct: doSegmentsIntersect,
        point: [
            x1 + t * a_dx,
            y1 + t * a_dy
        ]
    };
}
function distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}
function limitNearVerticalDirection(direction, disallowedRange) {
    const VERTICAL = 0.5 * Math.PI;
    if (direction > VERTICAL - disallowedRange && direction <= VERTICAL) return VERTICAL - disallowedRange;
    else if (direction > VERTICAL && direction < VERTICAL + disallowedRange) return VERTICAL + disallowedRange;
    else if (direction > -VERTICAL - disallowedRange && direction <= -VERTICAL) return -VERTICAL - disallowedRange;
    else if (direction > -VERTICAL && direction <= -VERTICAL + disallowedRange) return -VERTICAL + disallowedRange;
    return direction;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"khQ1I":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _worldJs = require("../World.js");
var _worldJsDefault = parcelHelpers.interopDefault(_worldJs);
var _lineJs = require("../Line.js");
var _lineJsDefault = parcelHelpers.interopDefault(_lineJs);
var _polyBlockJs = require("../PolyBlock.js");
var _polyBlockJsDefault = parcelHelpers.interopDefault(_polyBlockJs);
var _grayscaleObjectJs = require("../GrayscaleObject.js");
var _grayscaleObjectJsDefault = parcelHelpers.interopDefault(_grayscaleObjectJs);
var _playerJs = require("../Player.js");
var _playerJsDefault = parcelHelpers.interopDefault(_playerJs);
var _geometryObjectJs = require("../GeometryObject.js");
var _geometryObjectJsDefault = parcelHelpers.interopDefault(_geometryObjectJs);
const world = new (0, _worldJsDefault.default)();
const content = [
    new (0, _polyBlockJsDefault.default)(0, 100, 200, 200, "green", world),
    new (0, _polyBlockJsDefault.default)(200, 200, 400, 400, "blue", world),
    new (0, _lineJsDefault.default)(400, 600, 600, 600, "black", world),
    new (0, _lineJsDefault.default)(490, 605, 510, 605, "red", world),
    new (0, _grayscaleObjectJsDefault.default)(world, [
        {
            x: 600,
            y: 800
        },
        {
            x: 700,
            y: 850
        },
        {
            x: 800,
            y: 800
        },
        {
            x: 900,
            y: 850
        },
        {
            x: 900,
            y: 900
        },
        {
            x: 300,
            y: 900
        },
        {
            x: 300,
            y: 850
        },
        {
            x: 500,
            y: 850
        },
        {
            x: 500,
            y: 700
        },
        {
            x: 600,
            y: 700
        }
    ]),
    new (0, _playerJsDefault.default)(10, 40, world)
];
content.forEach((obj)=>{
    if (obj instanceof (0, _geometryObjectJsDefault.default)) world.addGeometry(obj);
});
world.objects = content;
exports.default = {
    world
};

},{"../World.js":"cw3sy","../Line.js":"c9vOe","../PolyBlock.js":"kNaLW","../GrayscaleObject.js":"bwvMi","../Player.js":"KmBFt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../GeometryObject.js":"2eshF"}],"cw3sy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _cameraFrameJs = require("./CameraFrame.js");
var _cameraFrameJsDefault = parcelHelpers.interopDefault(_cameraFrameJs);
var _geometryObjectJs = require("./GeometryObject.js");
var _geometryObjectJsDefault = parcelHelpers.interopDefault(_geometryObjectJs);
var _playerJs = require("./Player.js");
var _playerJsDefault = parcelHelpers.interopDefault(_playerJs);
var _utilsJs = require("./utils.js");
var _indexEsmJs = require("@timohausmann/quadtree-ts/src/index.esm.js");
class World {
    constructor(){
        this.objects = [];
        this.quadtree = new (0, _indexEsmJs.Quadtree)({
            width: 1000,
            height: 1000
        });
        console.log("Outer from ESM", (0, _indexEsmJs.Quadtree));
    }
    addGeometry(geometry) {
        this.objects.push(geometry);
        geometry.lineSegments.forEach((seg)=>this.quadtree.insert(new (0, _indexEsmJs.Line)({
                x1: seg.from.x,
                y1: seg.from.y,
                x2: seg.to.x,
                y2: seg.to.y,
                data: geometry
            })));
    }
    get geometryObjects() {
        return this.objects.filter((obj)=>obj instanceof (0, _geometryObjectJsDefault.default));
    }
    get players() {
        return this.objects.filter((obj)=>obj instanceof (0, _playerJsDefault.default));
    }
    calculatePhotoContent(origin, viewDirection, fov) {
        const cameraFrame = new (0, _cameraFrameJsDefault.default)();
        cameraFrame.segments = [];
        const segmentsToConsider = [];
        const breakpoints = [];
        const viewConeLow = viewDirection - fov;
        const viewConeHigh = viewDirection + fov;
        // Find all the relevant lines from the quadtree
        const lineSegments = this.quadtree.retrieve(new (0, _indexEsmJs.Rectangle)({
            x: 0,
            y: 0,
            width: 1000,
            height: 1000
        }));
        lineSegments.forEach((seg)=>{
            // is the line within fov?
            // it is iff:
            // one end or the other is in fov
            // OR
            // the line passes through fov
            let directionToLineStart = Math.atan2(seg.y1 - origin.y, seg.x1 - origin.x);
            let directionToLineEnd = Math.atan2(seg.y2 - origin.y, seg.x2 - origin.x);
            // if (Math.abs(directionToLineEnd - directionToLineStart) > Math.PI) {
            //   directionToLineStart += Math.PI * 2;
            // }
            while(directionToLineStart > viewDirection + Math.PI)directionToLineStart -= Math.PI * 2;
            while(directionToLineStart < viewDirection - Math.PI)directionToLineStart += Math.PI * 2;
            while(directionToLineEnd > viewDirection + Math.PI)directionToLineEnd -= Math.PI * 2;
            while(directionToLineEnd < viewDirection - Math.PI)directionToLineEnd += Math.PI * 2;
            if (directionToLineStart > viewConeLow && directionToLineStart < viewConeHigh && directionToLineEnd > viewConeLow && directionToLineEnd < viewConeHigh) {
                segmentsToConsider.push({
                    ...seg,
                    color: seg.data.color
                });
                breakpoints.push(directionToLineStart);
                breakpoints.push(directionToLineEnd);
            } else if (directionToLineStart > viewConeLow && directionToLineStart < viewConeHigh) {
                segmentsToConsider.push({
                    ...seg,
                    color: seg.data.color
                });
                breakpoints.push(directionToLineStart);
            } else if (directionToLineEnd > viewConeLow && directionToLineEnd < viewConeHigh) {
                segmentsToConsider.push({
                    ...seg,
                    color: seg.data.color
                });
                breakpoints.push(directionToLineEnd);
            } else if ((0, _utilsJs.intersects)(seg.x1, seg.y1, seg.x2, seg.y2, origin.x, origin.y, origin.x + Math.cos(viewDirection) * 1e6, origin.y + Math.sin(viewDirection) * 1e6)) segmentsToConsider.push({
                ...seg,
                color: seg.data.color
            });
        });
        breakpoints.push(viewConeHigh);
        breakpoints.sort((a, b)=>a - b);
        breakpoints.forEach((to, idx)=>{
            const from = idx === 0 ? viewConeLow : breakpoints[idx - 1];
            const midpoint = (to + from) / 2;
            let closest = Infinity;
            let color = "white";
            segmentsToConsider.forEach((seg)=>{
                const intersection = (0, _utilsJs.lineSegmentsIntersect)(origin.x, origin.y, origin.x + Math.cos(midpoint) * 1e6, origin.y + Math.sin(midpoint) * 1e6, seg.x1, seg.y1, seg.x2, seg.y2);
                if (intersection.direct) {
                    const thisDistance = (0, _utilsJs.distance)(intersection.point[0], intersection.point[1], origin.x, origin.y);
                    if (thisDistance < closest) {
                        closest = thisDistance;
                        color = seg.color;
                    }
                }
            });
            const startProportion = (from - viewConeLow) / (viewConeHigh - viewConeLow);
            const endProportion = (to - viewConeLow) / (viewConeHigh - viewConeLow);
            cameraFrame.segments.push({
                start: startProportion,
                end: endProportion,
                color
            });
        });
        // if it's outside -.5, .5, flip
        if (viewDirection < -(Math.PI / 2) || viewDirection > Math.PI / 2) cameraFrame.flip();
        return cameraFrame;
    }
    collisionTest(x1, y1, x2, y2, distance = 0) {
        const lines = [
            [
                x1,
                y1,
                x1,
                y2 + distance
            ],
            [
                x1,
                y2 + distance,
                x2,
                y2 + distance
            ],
            [
                x2,
                y2 + distance,
                x2,
                y1
            ],
            [
                x2,
                y1,
                x1,
                y1
            ]
        ];
        let collisionFound = false;
        const collisionLines = [];
        lines.forEach((line)=>{
            this.geometryObjects.forEach((obj)=>{
                obj.lineSegments.forEach((lineSegment)=>{
                    const collisionData = (0, _utilsJs.lineSegmentsIntersect)(line[0], line[1], line[2], line[3], lineSegment.from.x, lineSegment.from.y, lineSegment.to.x, lineSegment.to.y);
                    if (collisionData.direct) {
                        collisionFound = true;
                        collisionLines.push(lineSegment);
                    }
                });
            });
        });
        let maxSafe = distance;
        // Now iterate through and determine collision point
        // for each one...
        // draw the downward lines from the ends
        // and also check the endpoints of the lines to see if they're in the "shadow"
        collisionLines.forEach((line)=>{
            let handledThis = false;
            if (line.from.x >= x1 && line.from.x <= x2 && line.from.y >= y2 && line.from.y <= y2 + distance) {
                // endpoint in shadow
                maxSafe = Math.min(maxSafe, line.from.y - y2);
                handledThis = true;
            }
            if (line.to.x >= x1 && line.to.x <= x2 && line.to.y >= y2 && line.to.y <= y2 + distance) {
                maxSafe = Math.min(maxSafe, line.to.y - y2);
                handledThis = true;
            }
            let intersection = (0, _utilsJs.lineSegmentsIntersect)(x1, y2, x1, y2 + distance, line.from.x, line.from.y, line.to.x, line.to.y);
            if (intersection.direct) {
                maxSafe = Math.min(maxSafe, intersection.point[1] - y2);
                handledThis = true;
            }
            intersection = (0, _utilsJs.lineSegmentsIntersect)(x2, y2, x2, y2 + distance, line.from.x, line.from.y, line.to.x, line.to.y);
            if (intersection.direct) {
                maxSafe = Math.min(maxSafe, intersection.point[1] - y2);
                handledThis = true;
            }
            handledThis;
        });
        return {
            collisionFound,
            maxSafe
        };
    }
    distanceToCollision(x1, y1, x2, y2, direction = Math.PI / 2) {}
    update() {
        this.objects.forEach((obj)=>obj.tick());
    }
}
exports.default = World;

},{"./GeometryObject.js":"2eshF","./Player.js":"KmBFt","./utils.js":"4Nvvk","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","@timohausmann/quadtree-ts/src/index.esm.js":"gWSY0","./CameraFrame.js":"eKjOm"}],"2eshF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class GeometryObject {
    constructor(world){
        this.points = [];
        this.color = "black";
        this.world = world;
    }
    tick() {}
    get lineSegments() {
        if (this.points.length < 2) return [];
        if (this.points.length === 2) return [
            {
                from: {
                    x: this.points[0].x,
                    y: this.points[0].y
                },
                to: {
                    x: this.points[1].x,
                    y: this.points[1].y
                }
            }
        ];
        const segments = [];
        for(let i = 0; i != this.points.length; i++)segments.push({
            from: this.points[i],
            to: this.points[(i + 1) % this.points.length]
        });
        return segments;
    }
}
exports.default = GeometryObject;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"KmBFt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class Player {
    constructor(x, y, world){
        this.moveLeft = false;
        this.moveRight = false;
        this.jump = false;
        this.isOnGround = false;
        this.world = world;
        this.x = x;
        this.y = y;
        this.acc = 0;
    }
    tick() {
        const ANGLETHING = 4;
        const HSPEED = 4;
        if (this.jump) {
            // check collision at feet
            const collisionTest = this.world.collisionTest(this.x - 8, this.y + 16, this.x + 8, this.y + 24, 0);
            if (collisionTest.collisionFound) this.acc = -7.5;
        }
        if (this.moveLeft) {
            const collisionTest = this.world.collisionTest(this.x - 14, this.y - 24, this.x + 6, this.y + 16, ANGLETHING * 2);
            const collisionTest2 = this.world.collisionTest(this.x - 14, this.y - 24, this.x + 6, this.y + 16, 0);
            if (collisionTest2.collisionFound) ;
            else {
                console.log(collisionTest.maxSafe);
                this.x -= HSPEED;
                this.y -= ANGLETHING;
                this.y += collisionTest.maxSafe < ANGLETHING * 2 ? collisionTest.maxSafe : ANGLETHING;
            }
        } else if (this.moveRight) {
            const collisionTest = this.world.collisionTest(this.x - 6, this.y - 24, this.x + 14, this.y + 16, ANGLETHING * 2);
            const collisionTest2 = this.world.collisionTest(this.x - 6, this.y - 24, this.x + 14, this.y + 16, 0);
            if (collisionTest2.collisionFound) ;
            else {
                this.x += HSPEED;
                this.y -= ANGLETHING;
                this.y += collisionTest.maxSafe < ANGLETHING * 2 ? collisionTest.maxSafe : ANGLETHING;
            }
        }
        this.acc += 0.15;
        if (this.acc > 8) this.acc = 8;
        // collision test
        if (this.acc < 0) {
            // up
            const collisionTest = this.world.collisionTest(this.x - 10, this.y - 20 + this.acc, this.x + 10, this.y + 20 + this.acc, 0);
            if (collisionTest.collisionFound) this.acc = 0;
        } else {
            const collisionTest = this.world.collisionTest(this.x - 10, this.y - 20, this.x + 10, this.y + 20, this.acc);
            if (collisionTest.collisionFound) {
                this.acc = 0;
                this.y += collisionTest.maxSafe;
            }
        }
        this.y += this.acc;
    }
}
exports.default = Player;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gWSY0":[function(require,module,exports) {
//ESM/CJS: named exports only
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Quadtree", ()=>(0, _quadtree.Quadtree));
parcelHelpers.export(exports, "Rectangle", ()=>(0, _rectangle.Rectangle));
parcelHelpers.export(exports, "Circle", ()=>(0, _circle.Circle));
parcelHelpers.export(exports, "Line", ()=>(0, _line.Line));
var _quadtree = require("./Quadtree");
var _rectangle = require("./Rectangle");
var _circle = require("./Circle");
var _line = require("./Line");

},{"./Quadtree":"e6yMW","./Rectangle":"3OKrh","./Circle":"iVqx7","./Line":"lEAsU","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"e6yMW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Class representing a Quadtree node.
 * 
 * @example
 * ```typescript
 * const tree = new Quadtree({
 *   width: 100,
 *   height: 100,
 *   x: 0,           // optional, default:  0
 *   y: 0,           // optional, default:  0
 *   maxObjects: 10, // optional, default: 10
 *   maxLevels: 4,   // optional, default:  4
 * });
 * ```
 * 
 * @example Typescript: If you like to be explicit, you optionally can pass in a generic type for objects to be stored in the Quadtree:
 * ```typescript
 * class GameEntity extends Rectangle {
 *   ...
 * }
 * const tree = new Quadtree<GameEntity>({
 *   width: 100,
 *   height: 100,
 * });
 * ```
 */ parcelHelpers.export(exports, "Quadtree", ()=>Quadtree);
class Quadtree {
    /**
     * Quadtree Constructor
     * @param props - bounds and properties of the node
     * @param level - depth level (internal use only, required for subnodes)
     */ constructor(props, level = 0){
        this.bounds = {
            x: props.x || 0,
            y: props.y || 0,
            width: props.width,
            height: props.height
        };
        this.maxObjects = typeof props.maxObjects === "number" ? props.maxObjects : 10;
        this.maxLevels = typeof props.maxLevels === "number" ? props.maxLevels : 4;
        this.level = level;
        this.objects = [];
        this.nodes = [];
    }
    /**
     * Get the quadrant (subnode indexes) an object belongs to.
     * 
     * @example Mostly for internal use but you can call it like so:
     * ```typescript
     * const tree = new Quadtree({ width: 100, height: 100 });
     * const rectangle = new Rectangle({ x: 25, y: 25, width: 10, height: 10 });
     * const indexes = tree.getIndex(rectangle);
     * console.log(indexes); // [1]
     * ```
     * 
     * @param obj - object to be checked
     * @returns Array containing indexes of intersecting subnodes (0-3 = top-right, top-left, bottom-left, bottom-right).
     */ getIndex(obj) {
        return obj.qtIndex(this.bounds);
    }
    /**
     * Split the node into 4 subnodes.
     * @internal Mostly for internal use! You should only call this yourself if you know what you are doing.
     * 
     * @example Manual split:
     * ```typescript
     * const tree = new Quadtree({ width: 100, height: 100 });
     * tree.split();
     * console.log(tree); // now tree has four subnodes
     * ```
     */ split() {
        const level = this.level + 1, width = this.bounds.width / 2, height = this.bounds.height / 2, x = this.bounds.x, y = this.bounds.y;
        const coords = [
            {
                x: x + width,
                y: y
            },
            {
                x: x,
                y: y
            },
            {
                x: x,
                y: y + height
            },
            {
                x: x + width,
                y: y + height
            }
        ];
        for(let i = 0; i < 4; i++)this.nodes[i] = new Quadtree({
            x: coords[i].x,
            y: coords[i].y,
            width,
            height,
            maxObjects: this.maxObjects,
            maxLevels: this.maxLevels
        }, level);
    }
    /**
     * Insert an object into the node. If the node
     * exceeds the capacity, it will split and add all
     * objects to their corresponding subnodes.
     * 
     * @example you can use any shape here (or object with a qtIndex method, see README):
     * ```typescript
     * const tree = new Quadtree({ width: 100, height: 100 });
     * tree.insert(new Rectangle({ x: 25, y: 25, width: 10, height: 10, data: 'data' }));
     * tree.insert(new Circle({ x: 25, y: 25, r: 10, data: 512 }));
     * tree.insert(new Line({ x1: 25, y1: 25, x2: 60, y2: 40, data: { custom: 'property'} }));
     * ```
     * 
     * @param obj - Object to be added.
     */ insert(obj) {
        //if we have subnodes, call insert on matching subnodes
        if (this.nodes.length) {
            const indexes = this.getIndex(obj);
            for(let i = 0; i < indexes.length; i++)this.nodes[indexes[i]].insert(obj);
            return;
        }
        //otherwise, store object here
        this.objects.push(obj);
        //maxObjects reached
        if (this.objects.length > this.maxObjects && this.level < this.maxLevels) {
            //split if we don't already have subnodes
            if (!this.nodes.length) this.split();
            //add all objects to their corresponding subnode
            for(let i = 0; i < this.objects.length; i++){
                const indexes = this.getIndex(this.objects[i]);
                for(let k = 0; k < indexes.length; k++)this.nodes[indexes[k]].insert(this.objects[i]);
            }
            //clean up this node
            this.objects = [];
        }
    }
    /**
     * Return all objects that could collide with the given geometry.
     * 
     * @example Just like insert, you can use any shape here (or object with a qtIndex method, see README):
     * ```typescript 
     * tree.retrieve(new Rectangle({ x: 25, y: 25, width: 10, height: 10, data: 'data' }));
     * tree.retrieve(new Circle({ x: 25, y: 25, r: 10, data: 512 }));
     * tree.retrieve(new Line({ x1: 25, y1: 25, x2: 60, y2: 40, data: { custom: 'property'} }));
     * ```
     * 
     * @param obj - geometry to be checked
     * @returns Array containing all detected objects.
     */ retrieve(obj) {
        const indexes = this.getIndex(obj);
        let returnObjects = this.objects;
        //if we have subnodes, retrieve their objects
        if (this.nodes.length) for(let i = 0; i < indexes.length; i++)returnObjects = returnObjects.concat(this.nodes[indexes[i]].retrieve(obj));
        // remove duplicates
        if (this.level === 0) return Array.from(new Set(returnObjects));
        return returnObjects;
    }
    /**
     * Remove an object from the tree.
     * If you have to remove many objects, consider clearing the entire tree and rebuilding it or use the `fast` flag to cleanup after the last removal.
     * @beta
     * 
     * @example 
     * ```typescript
     * const tree = new Quadtree({ width: 100, height: 100 });
     * const circle = new Circle({ x: 25, y: 25, r: 10, data: 512 });
     * tree.insert(circle);
     * tree.remove(circle);
     * ```
     * 
     * @example Bulk fast removals and final cleanup:
     * ```javascript
     * const tree = new Quadtree({ width: 100, height: 100 });
     * const rects = [];
     *  for(let i=0; i<20; i++) {
     *    rects[i] = new Rectangle({ x: 25, y: 25, width: 50, height: 50 });
     *    tree.insert(rects[i]);
     *  }
     *  for(let i=rects.length-1; i>0; i--) {
     *    //fast=true – just remove the object (may leaves vacant subnodes)
     *    //fast=false – cleanup empty subnodes (default)
     *    const fast = (i !== 0);
     *    tree.remove(rects[i], fast); 
     *  }
     * ```
     * 
     * @param obj - Object to be removed.
     * @param fast - Set to true to increase performance temporarily by preventing cleanup of empty subnodes (optional, default: false).
     * @returns Weather or not the object was removed from THIS node (no recursive check).
     */ remove(obj, fast = false) {
        const indexOf = this.objects.indexOf(obj);
        // remove objects
        if (indexOf > -1) this.objects.splice(indexOf, 1);
        // remove from all subnodes
        for(let i = 0; i < this.nodes.length; i++)this.nodes[i].remove(obj);
        // remove all empty subnodes
        if (this.level === 0 && !fast) this.join();
        return indexOf !== -1;
    }
    /**
     * Update an object already in the tree (shorthand for remove and insert).
     * If you have to update many objects, consider clearing and rebuilding the 
     * entire tree or use the `fast` flag to cleanup after the last update.
     * @beta
     * 
     * @example 
     * ```typescript
     * const tree = new Quadtree({ width: 100, height: 100, maxObjects: 1 });
     * const rect1 = new Rectangle({ x: 25, y: 25, width: 10, height: 10 });
     * const rect2 = new Rectangle({ x: 25, y: 25, width: 10, height: 10 });
     * tree.insert(rect1);
     * tree.insert(rect2);
     * rect1.x = 75;
     * rect1.y = 75;
     * tree.update(rect1);
     * ```
     * @example Bulk fast update and final cleanup:
     * ```javascript
     * const tree = new Quadtree({ width: 100, height: 100 });
     * const rects = [];
     *  for(let i=0; i<20; i++) {
     *    rects[i] = new Rectangle({ x: 20, y: 20, width: 20, height: 20 });
     *    tree.insert(rects[i]);
     *  }
     *  for(let i=rects.length-1; i>0; i--) {
     *    rects[i].x = 20 + Math.random()*60;
     *    rects[i].y = 20 + Math.random()*60;
     *    //fast=true – just re-insert the object (may leaves vacant subnodes)
     *    //fast=false – cleanup empty subnodes (default)
     *    const fast = (i !== 0);
     *    tree.update(rects[i], fast); 
     *  }
     * ```
     * 
     * @param obj - Object to be updated.
     * @param fast - Set to true to increase performance temporarily by preventing cleanup of empty subnodes (optional, default: false).
     */ update(obj, fast = false) {
        this.remove(obj, fast);
        this.insert(obj);
    }
    /**
     * The opposite of a split: try to merge and dissolve subnodes.
     * @beta
     * @internal Mostly for internal use! You should only call this yourself if you know what you are doing.
     * 
     * @example Manual join:
     * ```typescript
     * const tree = new Quadtree({ width: 100, height: 100 });
     * tree.split();
     * console.log(tree.nodes.length); // 4
     * tree.join();
     * console.log(tree.nodes.length); // 0
     * ```
     * 
     * @returns The objects from this node and all subnodes combined.
     */ join() {
        // recursive join
        let allObjects = Array.from(this.objects);
        for(let i = 0; i < this.nodes.length; i++){
            const bla = this.nodes[i].join();
            allObjects = allObjects.concat(bla);
        }
        // remove duplicates
        const uniqueObjects = Array.from(new Set(allObjects));
        if (uniqueObjects.length <= this.maxObjects) {
            this.objects = uniqueObjects;
            for(let i = 0; i < this.nodes.length; i++)this.nodes[i].objects = [];
            this.nodes = [];
        }
        return allObjects;
    }
    /**
     * Clear the Quadtree.
     * 
     * @example
     * ```typescript
     * const tree = new Quadtree({ width: 100, height: 100 });
     * tree.insert(new Circle({ x: 25, y: 25, r: 10 }));
     * tree.clear();
     * console.log(tree); // tree.objects and tree.nodes are empty
     * ```
     */ clear() {
        this.objects = [];
        for(let i = 0; i < this.nodes.length; i++)if (this.nodes.length) this.nodes[i].clear();
        this.nodes = [];
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3OKrh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Class representing a Rectangle
 * @typeParam CustomDataType - Type of the custom data property (optional, inferred automatically).
 * 
 * @example Without custom data (JS/TS):
 * ```typescript
 * const rectangle = new Rectangle({ 
 *   x: 10, 
 *   y: 20, 
 *   width: 30,
 *   height: 40,
 * });
 * ```
 * 
 * @example With custom data (JS/TS):
 * ```javascript
 * const rectangle = new Rectangle({ 
 *   x: 10, 
 *   y: 20, 
 *   width: 30,
 *   height: 40,
 *   data: { 
 *     name: 'Jane', 
 *     health: 100,
 *   },
 * });
 * ```
 * 
 * @example With custom data (TS):
 * ```typescript
 * interface ObjectData {
 *   name: string
 *   health: number
 * }
 * const entity: ObjectData = {
 *   name: 'Jane',
 *   health: 100,
 * };
 * 
 * // Typescript will infer the type of the data property
 * const rectangle1 = new Rectangle({
 *   x: 10, 
 *   y: 20, 
 *   width: 30,
 *   height: 40,
 *   data: entity,
 * });
 * 
 * // You can also pass in a generic type for the data property
 * const rectangle2 = new Rectangle<ObjectData>({ 
 *   x: 10, 
 *   y: 20, 
 *   width: 30,
 *   height: 40,
 * });
 * rectangle2.data = entity;
 * ```
 * 
 * @example With custom class extending Rectangle (implements {@link RectangleGeometry} (x, y, width, height)):
 * ```javascript
 * // extending inherits the qtIndex method
 * class Box extends Rectangle {
 *   
 *   constructor(props) {
 *     // call super to set x, y, width, height (and data, if given)
 *     super(props);
 *     this.content = props.content;
 *   }
 * }
 * 
 * const box = new Box({
 *   content: 'Gravity Boots',
 *   x: 10, 
 *   y: 20, 
 *   width: 30,
 *   height: 40,
 * });
 * ```
 * 
 * @example With custom class and mapping {@link RectangleGeometry}:
 * ```javascript
 * // no need to extend if you don't implement RectangleGeometry
 * class Box {
 *   
 *   constructor(content) {
 *     this.content = content;
 *     this.position = [10, 20];
 *     this.size = [30, 40];
 *   }
 *   
 *   // add a qtIndex method to your class
 *   qtIndex(node) {
 *     // map your properties to RectangleGeometry
 *     return Rectangle.prototype.qtIndex.call({
 *       x: this.position[0],
 *       y: this.position[1],
 *       width: this.size[0],
 *       height: this.size[1],
 *     }, node);
 *   }
 * }
 * 
 * const box = new Box('Gravity Boots');
 * ```
 * 
 * @example With custom object that implements {@link RectangleGeometry}:
 * ```javascript
 * const player = {
 *   name: 'Jane', 
 *   health: 100,
 *   x: 10, 
 *   y: 20, 
 *   width: 30,
 *   height: 30,
 *   qtIndex: Rectangle.prototype.qtIndex,
 * });
 * ```
 * 
 * @example With custom object and mapping {@link RectangleGeometry}:
 * ```javascript
 * // Note: this is not recommended but possible. 
 * // Using this technique, each object would have it's own qtIndex method. 
 * // Rather add qtIndex to your prototype, e.g. by using classes like shown above.
 * const player = {
 *   name: 'Jane', 
 *   health: 100,
 *   position: [10, 20], 
 *   size: [30, 40], 
 *   qtIndex: function(node) {
 *     return Rectangle.prototype.qtIndex.call({
 *       x: this.position[0],
 *       y: this.position[1],
 *       width: this.size[0],
 *       height: this.size[1],
 *     }, node);
 *   },
 * });
 * ```
 */ parcelHelpers.export(exports, "Rectangle", ()=>Rectangle);
class Rectangle {
    constructor(props){
        this.x = props.x;
        this.y = props.y;
        this.width = props.width;
        this.height = props.height;
        this.data = props.data;
    }
    /**
     * Determine which quadrant this rectangle belongs to.
     * @param node - Quadtree node to be checked
     * @returns Array containing indexes of intersecting subnodes (0-3 = top-right, top-left, bottom-left, bottom-right)
     */ qtIndex(node) {
        const indexes = [], boundsCenterX = node.x + node.width / 2, boundsCenterY = node.y + node.height / 2;
        const startIsNorth = this.y < boundsCenterY, startIsWest = this.x < boundsCenterX, endIsEast = this.x + this.width > boundsCenterX, endIsSouth = this.y + this.height > boundsCenterY;
        //top-right quad
        if (startIsNorth && endIsEast) indexes.push(0);
        //top-left quad
        if (startIsWest && startIsNorth) indexes.push(1);
        //bottom-left quad
        if (startIsWest && endIsSouth) indexes.push(2);
        //bottom-right quad
        if (endIsEast && endIsSouth) indexes.push(3);
        return indexes;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iVqx7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Class representing a Circle.
 * @typeParam CustomDataType - Type of the custom data property (optional, inferred automatically).
 * 
 * @example Without custom data (JS/TS):
 * ```typescript
 * const circle = new Circle({ 
 *   x: 100, 
 *   y: 100, 
 *   r: 32,
 * });
 * ```
 * 
 * @example With custom data (JS/TS):
 * ```javascript
 * const circle = new Circle({ 
 *   x: 100, 
 *   y: 100, 
 *   r: 32, 
 *   data: { 
 *     name: 'Jane', 
 *     health: 100,
 *   },
 * });
 * ```
 * 
 * @example With custom data (TS):
 * ```typescript
 * interface ObjectData {
 *   name: string
 *   health: number
 * }
 * const entity: ObjectData = {
 *   name: 'Jane',
 *   health: 100,
 * };
 * 
 * // Typescript will infer the type of the data property
 * const circle1 = new Circle({ 
 *   x: 100, 
 *   y: 100, 
 *   r: 32, 
 *   data: entity,
 * });
 * 
 * // You can also pass in a generic type for the data property
 * const circle2 = new Circle<ObjectData>({ 
 *   x: 100, 
 *   y: 100, 
 *   r: 32,
 * });
 * circle2.data = entity;
 * ```
 * 
 * @example With custom class extending Circle (implements {@link CircleGeometry} (x, y, r)):
 * ```javascript
 * // extending inherits the qtIndex method
 * class Bomb extends Circle {
 *   
 *   constructor(props) {
 *     // call super to set x, y, r (and data, if given)
 *     super(props);
 *     this.countdown = props.countdown;
 *   }
 * }
 * 
 * const bomb = new Bomb({
 *   countdown: 5,
 *   x: 10, 
 *   y: 20, 
 *   r: 30,
 * });
 * ```
 * 
 * @example With custom class and mapping {@link CircleGeometry}:
 * ```javascript
 * // no need to extend if you don't implement CircleGeometry
 * class Bomb {
 *   
 *   constructor(countdown) {
 *     this.countdown = countdown;
 *     this.position = [10, 20];
 *     this.radius = 30;
 *   }
 *   
 *   // add a qtIndex method to your class
 *   qtIndex(node) {
 *     // map your properties to CircleGeometry
 *     return Circle.prototype.qtIndex.call({
 *       x: this.position[0],
 *       y: this.position[1],
 *       r: this.radius,
 *     }, node);
 *   }
 * }
 * 
 * const bomb = new Bomb(5);
 * ```
 * 
 * @example With custom object that implements {@link CircleGeometry}:
 * ```javascript
 * const player = {
 *   name: 'Jane', 
 *   health: 100,
 *   x: 10, 
 *   y: 20, 
 *   r: 30,
 *   qtIndex: Circle.prototype.qtIndex,
 * });
 * ```
 * 
 * @example With custom object and mapping {@link CircleGeometry}:
 * ```javascript
 * // Note: this is not recommended but possible. 
 * // Using this technique, each object would have it's own qtIndex method. 
 * // Rather add qtIndex to your prototype, e.g. by using classes like shown above.
 * const player = {
 *   name: 'Jane', 
 *   health: 100,
 *   position: [10, 20], 
 *   radius: 30,
 *   qtIndex: function(node) {
 *     return Circle.prototype.qtIndex.call({
 *       x: this.position[0],
 *       y: this.position[1],
 *       r: this.radius,
 *     }, node);
 *   },
 * });
 * ```
 */ parcelHelpers.export(exports, "Circle", ()=>Circle);
class Circle {
    /**
     * Circle Constructor
     * @param props - Circle properties
     * @typeParam CustomDataType - Type of the custom data property (optional, inferred automatically).
     */ constructor(props){
        this.x = props.x;
        this.y = props.y;
        this.r = props.r;
        this.data = props.data;
    }
    /**
     * Determine which quadrant this circle belongs to.
     * @param node - Quadtree node to be checked
     * @returns Array containing indexes of intersecting subnodes (0-3 = top-right, top-left, bottom-left, bottom-right)
     */ qtIndex(node) {
        const indexes = [], w2 = node.width / 2, h2 = node.height / 2, x2 = node.x + w2, y2 = node.y + h2;
        //an array of node origins where the array index equals the node index
        const nodes = [
            [
                x2,
                node.y
            ],
            [
                node.x,
                node.y
            ],
            [
                node.x,
                y2
            ],
            [
                x2,
                y2
            ]
        ];
        //test all nodes for circle intersections
        for(let i = 0; i < nodes.length; i++)if (Circle.intersectRect(this.x, this.y, this.r, nodes[i][0], nodes[i][1], nodes[i][0] + w2, nodes[i][1] + h2)) indexes.push(i);
        return indexes;
    }
    /**
     * Check if a circle intersects an axis aligned rectangle.
     * @beta
     * @see https://yal.cc/rectangle-circle-intersection-test/
     * @param x - circle center X
     * @param y - circle center Y
     * @param r - circle radius
     * @param minX - rectangle start X
     * @param minY - rectangle start Y
     * @param maxX - rectangle end X
     * @param maxY - rectangle end Y
     * @returns true if circle intersects rectangle
     *  
     * @example Check if a circle intersects a rectangle:
     * ```javascript
     * const circ = { x: 10, y: 20, r: 30 };
     * const rect = { x: 40, y: 50, width: 60, height: 70 };
     * const intersect = Circle.intersectRect(
     *   circ.x,
     *   circ.y,
     *   circ.r,
     *   rect.x,
     *   rect.y,
     *   rect.x + rect.width,
     *   rect.y + rect.height,
     * );
     * console.log(circle, rect, 'intersect?', intersect);
     * ```
     */ static intersectRect(x, y, r, minX, minY, maxX, maxY) {
        const deltaX = x - Math.max(minX, Math.min(x, maxX));
        const deltaY = y - Math.max(minY, Math.min(y, maxY));
        return deltaX * deltaX + deltaY * deltaY < r * r;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lEAsU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Class representing a Line
 * @typeParam CustomDataType - Type of the custom data property (optional, inferred automatically).
 * 
 * @example Without custom data (JS/TS):
 * ```typescript
 * const line = new Line({
 *   x1: 10, 
 *   y1: 20, 
 *   x2: 30,
 *   y2: 40,
 * });
 * ```
 * 
 * @example With custom data (JS/TS):
 * ```javascript
 * const line = new Line({
 *   x1: 10, 
 *   y1: 20, 
 *   x2: 30,
 *   y2: 40,
 *   data: { 
 *     name: 'Jane', 
 *     health: 100,
 *   },
 * });
 * ```
 * 
 * @example With custom data (TS):
 * ```typescript
 * interface ObjectData {
 *   name: string
 *   health: number
 * }
 * const entity: ObjectData = {
 *   name: 'Jane',
 *   health: 100,
 * };
 * 
 * // Typescript will infer the type of the data property
 * const line1 = new Line({ 
 *   x1: 10, 
 *   y1: 20, 
 *   x2: 30,
 *   y2: 40,
 *   data: entity,
 * });
 * 
 * // You can also pass in a generic type for the data property
 * const line2 = new Line<ObjectData>({
 *   x1: 10, 
 *   y1: 20, 
 *   x2: 30,
 *   y2: 40,
 * });
 * line2.data = entity;
 * ```
 * 
 * @example With custom class extending Line (implements {@link LineGeometry} (x1, y1, x2, y2)):
 * ```javascript
 * // extending inherits the qtIndex method
 * class Laser extends Line {
 *   
 *   constructor(props) {
 *     // call super to set x1, y1, x2, y2 (and data, if given)
 *     super(props);
 *     this.color = props.color;
 *   }
 * }
 * 
 * const laser = new Laser({
 *   color: 'green',
 *   x1: 10, 
 *   y1: 20, 
 *   x2: 30,
 *   y2: 40,
 * });
 * ```
 * 
 * @example With custom class and mapping {@link LineGeometry}:
 * ```javascript
 * // no need to extend if you don't implement LineGeometry
 * class Laser {
 *   
 *   constructor(color) {
 *     this.color = color;
 *     this.start = [10, 20];
 *     this.end = [30, 40];
 *   }
 * 
 *   // add a qtIndex method to your class  
 *   qtIndex(node) {
 *     // map your properties to LineGeometry
 *     return Line.prototype.qtIndex.call({
 *       x1: this.start[0],
 *       y1: this.start[1],
 *       x2: this.end[0],
 *       y2: this.end[1],
 *     }, node);
 *   }
 * }
 * 
 * const laser = new Laser('green');
 * ```
 * 
 * @example With custom object that implements {@link LineGeometry}:
 * ```javascript
 * const player = {
 *   name: 'Jane', 
 *   health: 100,
 *   x1: 10, 
 *   y1: 20, 
 *   x2: 30,
 *   y2: 40,
 *   qtIndex: Line.prototype.qtIndex,
 * });
 * ```
 * 
 * @example With custom object and mapping {@link LineGeometry}:
 * ```javascript
 * // Note: this is not recommended but possible. 
 * // Using this technique, each object would have it's own qtIndex method. 
 * // Rather add qtIndex to your prototype, e.g. by using classes like shown above.
 * const player = {
 *   name: 'Jane', 
 *   health: 100,
 *   start: [10, 20], 
 *   end: [30, 40],
 *   qtIndex: function(node) {
 *     return Line.prototype.qtIndex.call({
 *       x1: this.start[0],
 *       y1: this.start[1],
 *       x2: this.end[0],
 *       y2: this.end[1],
 *     }, node);
 *   },
 * });
 * ```
 */ parcelHelpers.export(exports, "Line", ()=>Line);
class Line {
    /**
     * Line Constructor
     * @param props - Line properties
     * @typeParam CustomDataType - Type of the custom data property (optional, inferred automatically).
     */ constructor(props){
        this.x1 = props.x1;
        this.y1 = props.y1;
        this.x2 = props.x2;
        this.y2 = props.y2;
        this.data = props.data;
    }
    /**
     * Determine which quadrant this line belongs to.
     * @beta
     * @param node - Quadtree node to be checked
     * @returns Array containing indexes of intersecting subnodes (0-3 = top-right, top-left, bottom-left, bottom-right)
     */ qtIndex(node) {
        const indexes = [], w2 = node.width / 2, h2 = node.height / 2, x2 = node.x + w2, y2 = node.y + h2;
        //an array of node origins where the array index equals the node index
        const nodes = [
            [
                x2,
                node.y
            ],
            [
                node.x,
                node.y
            ],
            [
                node.x,
                y2
            ],
            [
                x2,
                y2
            ]
        ];
        //test all nodes for line intersections
        for(let i = 0; i < nodes.length; i++)if (Line.intersectRect(this.x1, this.y1, this.x2, this.y2, nodes[i][0], nodes[i][1], nodes[i][0] + w2, nodes[i][1] + h2)) indexes.push(i);
        return indexes;
    }
    /**
     * check if a line segment (the first 4 parameters) intersects an axis aligned rectangle (the last 4 parameters)
     * @beta
     * 
     * @remarks 
     * There is a bug where detection fails on corner intersections
     * when the line enters/exits the node exactly at corners (45°)
     * {@link https://stackoverflow.com/a/18292964/860205}
     * 
     * @param x1 - line start X
     * @param y1 - line start Y
     * @param x2 - line end X
     * @param y2 - line end Y
     * @param minX - rectangle start X
     * @param minY - rectangle start Y
     * @param maxX - rectangle end X
     * @param maxY - rectangle end Y
     * @returns true if the line segment intersects the axis aligned rectangle
     */ static intersectRect(x1, y1, x2, y2, minX, minY, maxX, maxY) {
        // Completely outside
        if (x1 <= minX && x2 <= minX || y1 <= minY && y2 <= minY || x1 >= maxX && x2 >= maxX || y1 >= maxY && y2 >= maxY) return false;
        // Single point inside
        if (x1 >= minX && x1 <= maxX && y1 >= minY && y1 <= maxY || x2 >= minX && x2 <= maxX && y2 >= minY && y2 <= maxY) return true;
        const m = (y2 - y1) / (x2 - x1);
        let y = m * (minX - x1) + y1;
        if (y > minY && y < maxY) return true;
        y = m * (maxX - x1) + y1;
        if (y > minY && y < maxY) return true;
        let x = (minY - y1) / m + x1;
        if (x > minX && x < maxX) return true;
        x = (maxY - y1) / m + x1;
        if (x > minX && x < maxX) return true;
        return false;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"c9vOe":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _geometryObjectJs = require("./GeometryObject.js");
var _geometryObjectJsDefault = parcelHelpers.interopDefault(_geometryObjectJs);
class Line extends (0, _geometryObjectJsDefault.default) {
    constructor(x1, y1, x2, y2, color, world){
        super(world);
        this.color = "black";
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.color = color;
    }
    get lineSegments() {
        const segments = [];
        return [
            {
                from: {
                    x: this.x1,
                    y: this.y1
                },
                to: {
                    x: this.x2,
                    y: this.y2
                }
            }
        ];
    }
}
exports.default = Line;

},{"./GeometryObject.js":"2eshF","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kNaLW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _geometryObjectJs = require("./GeometryObject.js");
var _geometryObjectJsDefault = parcelHelpers.interopDefault(_geometryObjectJs);
class PolyBlock extends (0, _geometryObjectJsDefault.default) {
    constructor(x1, y1, x2, y2, color, world){
        super(world);
        this.points = [];
        this.color = "black";
        this.points.push({
            x: x1,
            y: y1
        }, {
            x: x2,
            y: y1
        }, {
            x: x2,
            y: y2
        }, {
            x: x1,
            y: y2
        });
        this.color = color;
    }
    get lineSegments() {
        const segments = [];
        for(let i = 0; i != this.points.length; i++)segments.push({
            from: this.points[i],
            to: this.points[(i + 1) % this.points.length]
        });
        return segments;
    }
}
exports.default = PolyBlock;

},{"./GeometryObject.js":"2eshF","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bwvMi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _geometryObjectJs = require("./GeometryObject.js");
var _geometryObjectJsDefault = parcelHelpers.interopDefault(_geometryObjectJs);
class GrayscaleObject extends (0, _geometryObjectJsDefault.default) {
    constructor(world, points){
        super(world);
        this.points = points;
    }
    tick() {}
}
exports.default = GrayscaleObject;

},{"./GeometryObject.js":"2eshF","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["hXbVG","1aB2c"], "1aB2c", "parcelRequire4c53")

//# sourceMappingURL=index.e987e412.js.map
