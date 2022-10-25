"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
exports.__esModule = true;
exports.line_file = exports.line_video = exports.line_image = exports.line_message = void 0;
var node_fetch_1 = require("node-fetch");
var mbLineChannelID = "cfe72aa08a9c42659bc7851e6a82a79b";
function line_message(key, channelID, message) {
    return __awaiter(this, void 0, void 0, function () {
        var response, result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, (0, node_fetch_1["default"])('https://conversations.messagebird.com/v1/send', {
                            method: 'POST',
                            body: JSON.stringify({
                                to: channelID,
                                from: mbLineChannelID,
                                type: "text",
                                content: {
                                    text: "Hi there! \n            \n".concat(message, "\n            \nThanks!")
                                }
                            }),
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8',
                                'Authorization': "AccessKey ".concat(key)
                            }
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Error! status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 3:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.line_message = line_message;
function line_image(key, channelID, contentType, mediaURL) {
    return __awaiter(this, void 0, void 0, function () {
        var response, result, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, (0, node_fetch_1["default"])("https://conversations.messagebird.com/v1/send", {
                            method: 'POST',
                            body: JSON.stringify({
                                to: channelID,
                                from: mbLineChannelID,
                                type: "image",
                                content: {
                                    image: {
                                        url: mediaURL
                                    }
                                }
                            }),
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8',
                                'Authorization': "AccessKey ".concat(key)
                            }
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Error! status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 3:
                    err_2 = _a.sent();
                    console.log(err_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.line_image = line_image;
function line_video(key, channelID, contentType, mediaURL) {
    return __awaiter(this, void 0, void 0, function () {
        var response, result, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, (0, node_fetch_1["default"])("https://conversations.messagebird.com/v1/send", {
                            method: 'POST',
                            body: JSON.stringify({
                                to: channelID,
                                from: mbLineChannelID,
                                type: "video",
                                content: {
                                    video: {
                                        url: mediaURL
                                    }
                                }
                            }),
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8',
                                'Authorization': "AccessKey ".concat(key)
                            }
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Error! status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 3:
                    err_3 = _a.sent();
                    console.log(err_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.line_video = line_video;
function line_file(key, channelID, mediaURL) {
    return __awaiter(this, void 0, void 0, function () {
        var response, result, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, (0, node_fetch_1["default"])('https://conversations.messagebird.com/v1/send', {
                            method: 'POST',
                            body: JSON.stringify({
                                to: channelID,
                                from: mbLineChannelID,
                                type: "text",
                                content: {
                                    text: mediaURL
                                }
                            }),
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8',
                                'Authorization': "AccessKey ".concat(key)
                            }
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Error! status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 3:
                    err_4 = _a.sent();
                    console.log(err_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.line_file = line_file;
