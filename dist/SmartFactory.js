(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.SmartFactory = factory());
})(this, (function () { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var SmartFactory = /** @class */ (function () {
        function SmartFactory(containerElementQuery) {
            var _this = this;
            this.element = {
                container: null,
                canvas: null
            };
            this.unityEventKey = Math.random().toString().replace(".", "");
            if (typeof containerElementQuery === "string") {
                this.element.container = document.querySelector(containerElementQuery);
            }
            else {
                this.element.container = containerElementQuery;
            }
            this.element.canvas = document.createElement("canvas");
            this.element.canvas.id = this.unityEventKey;
            this.element.container.appendChild(this.element.canvas);
            var onWindowResize = function () {
                var boundingRect = _this.element.container.getBoundingClientRect();
                var canvas = _this.element.canvas;
                canvas.width = boundingRect.width;
                canvas.height = boundingRect.height;
                canvas.style.width = "".concat(canvas.width, "px");
                canvas.style.height = "".concat(canvas.height, "px");
            };
            window.addEventListener("resize", onWindowResize);
            onWindowResize();
        }
        SmartFactory.ready = function (libraryRootUrl) {
            if (libraryRootUrl === void 0) { libraryRootUrl = SmartFactory.LibraryRootUrl; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            if (libraryRootUrl !== SmartFactory.LibraryRootUrl) {
                                SmartFactory.LibraryRootUrl = libraryRootUrl;
                            }
                            var libraryUrl = "".concat(SmartFactory.LibraryRootUrl, "/SmartFactoryLibrary.loader.js");
                            if (document.querySelector("script[src='".concat(libraryUrl, "']")) != null) {
                                reject(new Error("이미 SmartFactoryLibrary 스크립트가 로드되었습니다."));
                            }
                            var libraryScriptNode = document.createElement("script");
                            libraryScriptNode.addEventListener("load", function () {
                                resolve();
                            });
                            libraryScriptNode.src = libraryUrl;
                            var headNode = document.querySelector('head');
                            headNode.appendChild(libraryScriptNode);
                        })];
                });
            });
        };
        SmartFactory.prototype.ready = function () {
            return __awaiter(this, void 0, void 0, function () {
                var rafId, waitForUnityReady;
                var _this = this;
                return __generator(this, function (_a) {
                    rafId = null;
                    waitForUnityReady = function () {
                        if (window.createUnityInstance == null) {
                            rafId = requestAnimationFrame(waitForUnityReady);
                            return;
                        }
                        cancelAnimationFrame(rafId);
                        createUnityInstance(_this.element.canvas, {
                            dataUrl: "".concat(SmartFactory.LibraryRootUrl, "/SmartFactoryLibrary.data"),
                            frameworkUrl: "".concat(SmartFactory.LibraryRootUrl, "/SmartFactoryLibrary.framework.js"),
                            codeUrl: SmartFactory.LibraryRootUrl + "/SmartFactoryLibrary.wasm",
                            streamingAssetsUrl: "StreamingAssets",
                            companyName: "DefaultCompany",
                            productName: "SmartFactoryLibrary",
                            productVersion: "0.1",
                            showBanner: null
                        }, function (progress) {
                            console.log(100 * progress + "%");
                        }).then(function (unityInstance) {
                            return new Promise(function (resolve, reject) {
                                _this.unityInstance = unityInstance;
                                function onCompleteSetEventKey() {
                                    window.removeEventListener("completeSetEventKey", onCompleteSetEventKey, false);
                                    resolve(null);
                                }
                                window.addEventListener("completeSetEventKey", onCompleteSetEventKey, false);
                                _this.unityInstance.SendMessage("SmartFactory", "setEventKey", _this.unityEventKey);
                            });
                        })["catch"](function (message) {
                            alert(message);
                        });
                    };
                    waitForUnityReady();
                    return [2 /*return*/];
                });
            });
        };
        SmartFactory.LibraryRootUrl = "./Build";
        return SmartFactory;
    }());

    return SmartFactory;

}));
