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
        const cameraFrame = new (0, _cameraFrameJsDefault.default)();
        cameraFrame.segments = [];
        this.cameraFrame = cameraFrame;
        const segmentsToConsider = [];
        const breakpoints = [];
        // If too close to vertical, snap to nearest good point
        // -.5 and .5 are the breaks
        // 
        this.viewDirection = (0, _utilsJs.limitNearVerticalDirection)(this.viewDirection, this.fov);
        const viewConeLow = this.viewDirection - this.fov;
        const viewConeHigh = this.viewDirection + this.fov;
        this.visibleObjects.forEach((block)=>{
            block.lineSegments.forEach((seg)=>{
                // is the line within fov?
                // it is iff:
                // one end or the other is in fov
                // OR
                // the line passes through fov
                let directionToLineStart = Math.atan2(seg.from.y - this.player.y, seg.from.x - this.player.x);
                let directionToLineEnd = Math.atan2(seg.to.y - this.player.y, seg.to.x - this.player.x);
                // if (Math.abs(directionToLineEnd - directionToLineStart) > Math.PI) {
                //   directionToLineStart += Math.PI * 2;
                // }
                while(directionToLineStart > this.viewDirection + Math.PI)directionToLineStart -= Math.PI * 2;
                while(directionToLineStart < this.viewDirection - Math.PI)directionToLineStart += Math.PI * 2;
                while(directionToLineEnd > this.viewDirection + Math.PI)directionToLineEnd -= Math.PI * 2;
                while(directionToLineEnd < this.viewDirection - Math.PI)directionToLineEnd += Math.PI * 2;
                if (directionToLineStart > viewConeLow && directionToLineStart < viewConeHigh && directionToLineEnd > viewConeLow && directionToLineEnd < viewConeHigh) {
                    segmentsToConsider.push({
                        ...seg,
                        color: block.color
                    });
                    breakpoints.push(directionToLineStart);
                    breakpoints.push(directionToLineEnd);
                } else if (directionToLineStart > viewConeLow && directionToLineStart < viewConeHigh) {
                    segmentsToConsider.push({
                        ...seg,
                        color: block.color
                    });
                    breakpoints.push(directionToLineStart);
                } else if (directionToLineEnd > viewConeLow && directionToLineEnd < viewConeHigh) {
                    segmentsToConsider.push({
                        ...seg,
                        color: block.color
                    });
                    breakpoints.push(directionToLineEnd);
                } else if ((0, _utilsJs.intersects)(seg.from.x, seg.from.y, seg.to.x, seg.to.y, this.player.x, this.player.y, this.player.x + Math.cos(this.viewDirection) * 1e6, this.player.y + Math.sin(this.viewDirection) * 1e6)) segmentsToConsider.push({
                    ...seg,
                    color: block.color
                });
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
                const intersection = (0, _utilsJs.lineSegmentsIntersect)(this.player.x, this.player.y, this.player.x + Math.cos(midpoint) * 1e6, this.player.y + Math.sin(midpoint) * 1e6, seg.from.x, seg.from.y, seg.to.x, seg.to.y);
                if (intersection.direct) {
                    const thisDistance = (0, _utilsJs.distance)(intersection.point[0], intersection.point[1], this.player.x, this.player.y);
                    if (thisDistance < closest) {
                        closest = thisDistance;
                        color = seg.color;
                    }
                }
            });
            const startProportion = (from - viewConeLow) / (viewConeHigh - viewConeLow);
            const endProportion = (to - viewConeLow) / (viewConeHigh - viewConeLow);
            this.cameraFrame.segments.push({
                start: startProportion,
                end: endProportion,
                color
            });
        });
        // if it's outside -.5, .5, flip
        if (this.viewDirection < -(Math.PI / 2) || this.viewDirection > Math.PI / 2) cameraFrame.flip();
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
world.objects = content;
exports.default = {
    world
};

},{"../World.js":"cw3sy","../Line.js":"c9vOe","../PolyBlock.js":"kNaLW","../GrayscaleObject.js":"bwvMi","../Player.js":"KmBFt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cw3sy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _geometryObjectJs = require("./GeometryObject.js");
var _geometryObjectJsDefault = parcelHelpers.interopDefault(_geometryObjectJs);
var _playerJs = require("./Player.js");
var _playerJsDefault = parcelHelpers.interopDefault(_playerJs);
var _utilsJs = require("./utils.js");
class World {
    constructor(){
        this.objects = [];
    }
    get geometryObjects() {
        return this.objects.filter((obj)=>obj instanceof (0, _geometryObjectJsDefault.default));
    }
    get players() {
        return this.objects.filter((obj)=>obj instanceof (0, _playerJsDefault.default));
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

},{"./GeometryObject.js":"2eshF","./Player.js":"KmBFt","./utils.js":"4Nvvk","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2eshF":[function(require,module,exports) {
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
