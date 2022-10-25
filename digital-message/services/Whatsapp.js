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
exports.documentContent = exports.videoContent = exports.imageContent = exports.messageContent = void 0;
var node_fetch_1 = require("node-fetch");
var mbWhatsappChannelID = "0d80abd0-6ab4-4b51-b91c-a034d7c62669";
function messageContent(key, to, message) {
    return __awaiter(this, void 0, void 0, function () {
        var response, result, err_1, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, (0, node_fetch_1["default"])('https://conversations.messagebird.com/v1/send', {
                            method: 'POST',
                            body: JSON.stringify({
                                to: '+' + to,
                                type: "hsm",
                                from: mbWhatsappChannelID,
                                content: {
                                    hsm: {
                                        namespace: "320b2259_c43d_4d2b_966e_628d091cd90b",
                                        templateName: "inform",
                                        language: {
                                            policy: "deterministic",
                                            code: "en"
                                        },
                                        components: [
                                            {
                                                type: "body",
                                                parameters: [
                                                    {
                                                        type: "text",
                                                        text: message
                                                    }
                                                ]
                                            },
                                        ]
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
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = _a.sent();
                    // handle error by throwing crafted error message
                    error_handler(result, to);
                    return [2 /*return*/, result];
                case 3:
                    err_1 = _a.sent();
                    console.log(err_1);
                    result = {
                        "id": "",
                        "status": err_1,
                        "fallback": ""
                    };
                    return [2 /*return*/, result];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.messageContent = messageContent;
function imageContent(key, to, contentType, message, mediaURL) {
    return __awaiter(this, void 0, void 0, function () {
        var response, result, err_2, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, (0, node_fetch_1["default"])('https://conversations.messagebird.com/v1/send', {
                            method: 'POST',
                            body: JSON.stringify({
                                to: '+' + to,
                                type: 'hsm',
                                from: mbWhatsappChannelID,
                                content: {
                                    hsm: {
                                        namespace: "320b2259_c43d_4d2b_966e_628d091cd90b",
                                        templateName: "sendimage",
                                        language: {
                                            policy: "deterministic",
                                            code: "en"
                                        },
                                        components: [
                                            {
                                                type: "body",
                                                parameters: [
                                                    {
                                                        type: "text",
                                                        text: message
                                                    }
                                                ]
                                            },
                                            {
                                                type: "header",
                                                parameters: [
                                                    {
                                                        type: "image",
                                                        image: {
                                                            url: "".concat(mediaURL)
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
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
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = _a.sent();
                    // handle error by throwing crafted error message
                    error_handler(result, to);
                    return [2 /*return*/, result];
                case 3:
                    err_2 = _a.sent();
                    result = {
                        "id": "",
                        "status": err_2,
                        "fallback": ""
                    };
                    return [2 /*return*/, result];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.imageContent = imageContent;
function videoContent(key, to, contentType, message, mediaURL) {
    return __awaiter(this, void 0, void 0, function () {
        var response, result, err_3, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, (0, node_fetch_1["default"])('https://conversations.messagebird.com/v1/send', {
                            method: 'POST',
                            body: JSON.stringify({
                                to: '+' + to,
                                type: 'hsm',
                                from: mbWhatsappChannelID,
                                content: {
                                    hsm: {
                                        namespace: "320b2259_c43d_4d2b_966e_628d091cd90b",
                                        templateName: "videocontent",
                                        language: {
                                            policy: "deterministic",
                                            code: "en"
                                        },
                                        components: [
                                            {
                                                type: "body",
                                                parameters: [
                                                    {
                                                        type: "text",
                                                        text: message
                                                    }
                                                ]
                                            },
                                            {
                                                type: "header",
                                                parameters: [
                                                    {
                                                        type: contentType,
                                                        video: {
                                                            url: "".concat(mediaURL)
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
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
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = _a.sent();
                    // handle error by throwing crafted error message
                    error_handler(result, to);
                    return [2 /*return*/, result];
                case 3:
                    err_3 = _a.sent();
                    result = {
                        "id": "",
                        "status": err_3,
                        "fallback": ""
                    };
                    return [2 /*return*/, result];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.videoContent = videoContent;
function documentContent(key, to, contentType, message, mediaURL) {
    return __awaiter(this, void 0, void 0, function () {
        var response, result, err_4, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, (0, node_fetch_1["default"])('https://conversations.messagebird.com/v1/send', {
                            method: 'POST',
                            body: JSON.stringify({
                                to: '+' + to,
                                type: 'hsm',
                                from: mbWhatsappChannelID,
                                content: {
                                    hsm: {
                                        namespace: "320b2259_c43d_4d2b_966e_628d091cd90b",
                                        templateName: "file_content",
                                        language: {
                                            policy: "deterministic",
                                            code: "en"
                                        },
                                        components: [
                                            {
                                                type: "body",
                                                parameters: [
                                                    {
                                                        type: "text",
                                                        text: message
                                                    }
                                                ]
                                            },
                                            {
                                                type: "header",
                                                parameters: [
                                                    {
                                                        type: contentType,
                                                        document: {
                                                            url: "".concat(mediaURL)
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
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
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = _a.sent();
                    // handle error by throwing crafted error message
                    error_handler(result, to);
                    return [2 /*return*/, result];
                case 3:
                    err_4 = _a.sent();
                    result = {
                        "id": "",
                        "status": err_4,
                        "fallback": ""
                    };
                    return [2 /*return*/, result];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.documentContent = documentContent;
function error_handler(result, to) {
    if (result["errors"] != undefined && result["errors"].length > 0) {
        var error_message = result["errors"][0]["description"];
        if (error_message == "Value is not a valid msisdn") {
            var edited_error_message = to + " " + error_message;
            throw edited_error_message;
        }
        throw error_message;
    }
}
// async function whatsappImageText(key, to, message, urlTitle, urlLink, image): Promise<MessageBirdResponse> {
//   try {
//     const response = await fetch('https://conversations.messagebird.com/v1/send',
//     {
//       method: 'POST',
//       body: JSON.stringify({
//         to: '+6590666038',
//         // to: '+' + to,
//         type: 'hsm',
//         from: mbWhatsappChannelID,
//         content: {
//           hsm: {
//             namespace: "320b2259_c43d_4d2b_966e_628d091cd90b",
//             templateName: "thanking",
//             language: {
//               policy: "deterministic",
//               code: "en"
//             },
//             components: [
//               {
//                 type: "body",
//                 parameters: [
//                   {
//                     type: "text",
//                     text: urlTitle
//                   },
//                   {
//                     type: "text",
//                     text: message
//                   },
//                   {
//                     type: "text",
//                     text: urlLink
//                   }
//                 ],
//               },
//               {
//                 type: "header",
//                 parameters: [
//                   {
//                     type: "image",
//                     image: {
//                       url: `${image}`
//                     }
//                   }
//                 ]
//               }
//             ]
//           }
//         }
//       }),
//       headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//         'Authorization': `AccessKey ${key}`,
//       }
//     });
//   if (!response.ok) {
//     throw new Error(`Error!!!!!`);
//   }
//   const result = await response.json();
//   return result as MessageBirdResponse;
// } catch (err) {
//   const result = {
//     "id": "",
//     "status": "Invalid Recipient ID",
//     "fallback": ""
//   };
//   return result as MessageBirdResponse;
// }
// }
