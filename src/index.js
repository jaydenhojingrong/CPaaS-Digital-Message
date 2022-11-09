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
exports.testLinecontact = exports.testcontact = exports.testLINEFunctionThree = exports.testLINEFunctionTwo = exports.testLINEFunctionOne = exports.testWhatsappFunctionFour = exports.testWhatsappFunctionThree = exports.testWhatsappFunctionTwo = exports.testWhatsappFunctionOne = exports.overall = exports.makeRequest = void 0;
var WhatsApp_1 = require("../digital-message/services/WhatsApp");
var Line_1 = require("../digital-message/services/Line");
var retrieveContacts_1 = require("../digital-message/services/retrieveContacts");
var node_fetch_1 = require("node-fetch");
function makeRequest() {
    return __awaiter(this, void 0, void 0, function () {
        var response, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, node_fetch_1["default"])('http://localhost:7071/api/health')];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.status]; // 👉️ 200
                case 2:
                    err_1 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.makeRequest = makeRequest;
function createUser() {
    return __awaiter(this, void 0, void 0, function () {
        var response, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, (0, node_fetch_1["default"])('https://cpaas-digital-message.azurewebsites.net/api/digital-message', {
                            method: 'POST',
                            body: JSON.stringify({
                                data: {
                                    entry: {
                                        channels_to_publish: [
                                            "LINE"
                                        ],
                                        audience_group: [
                                            "Institutional"
                                        ],
                                        content_type: "Text",
                                        created_at: "2022-10-12T06:10:16.157Z",
                                        created_by: "blt437013b967bb61fc",
                                        link_file: {
                                            title: "",
                                            href: ""
                                        },
                                        messages: "This is a testing message",
                                        rich_media: null
                                    }
                                }
                            }),
                            headers: {
                                'Content-Type': 'application/json',
                                Accept: 'application/json'
                            }
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Error! status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = (_a.sent());
                    console.log('result is: ', JSON.stringify(result, null, 4));
                    return [2 /*return*/, result];
                case 3:
                    error_1 = _a.sent();
                    if (error_1 instanceof Error) {
                        console.log('error message: ', error_1.message);
                        return [2 /*return*/, error_1.message];
                    }
                    else {
                        console.log('unexpected error: ', error_1);
                        return [2 /*return*/, 'An unexpected error occurred'];
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function overall() {
    return __awaiter(this, void 0, void 0, function () {
        var funcValue, overallValue;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createUser()];
                case 1:
                    funcValue = _a.sent();
                    overallValue = funcValue["code"];
                    return [2 /*return*/, overallValue];
            }
        });
    });
}
exports.overall = overall;
console.log(overall());
function testWhatsappFunctionOne() {
    return __awaiter(this, void 0, void 0, function () {
        var content, value;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, WhatsApp_1.messageContent)('OD9JjrVluF4ON00310kMWXJLa', '6583685216', 'hi')];
                case 1:
                    content = _a.sent();
                    value = content["status"];
                    return [2 /*return*/, value];
            }
        });
    });
}
exports.testWhatsappFunctionOne = testWhatsappFunctionOne;
function testWhatsappFunctionTwo() {
    return __awaiter(this, void 0, void 0, function () {
        var content, value;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, WhatsApp_1.imageContent)('OD9JjrVluF4ON00310kMWXJLa', '6583685216', 'image/png', 'hi', 'https://eu-images.contentstack.com/v3/assets/blt2233c63cb81d9b74/blt5dc0dc4e42905d70/634c03d196c0500f0511b5f6/cat.png')];
                case 1:
                    content = _a.sent();
                    value = content["status"];
                    return [2 /*return*/, value];
            }
        });
    });
}
exports.testWhatsappFunctionTwo = testWhatsappFunctionTwo;
function testWhatsappFunctionThree() {
    return __awaiter(this, void 0, void 0, function () {
        var content, value;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, WhatsApp_1.videoContent)('OD9JjrVluF4ON00310kMWXJLa', '6583685216', 'Video', 'hi', 'https://eu-assets.contentstack.com/v3/assets/blt2233c63cb81d9b74/blt2bfc06495cdfb725/634a28328f37810f03d5b749/catVideo.mp4')];
                case 1:
                    content = _a.sent();
                    value = content["status"];
                    return [2 /*return*/, value];
            }
        });
    });
}
exports.testWhatsappFunctionThree = testWhatsappFunctionThree;
function testWhatsappFunctionFour() {
    return __awaiter(this, void 0, void 0, function () {
        var content, value;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, WhatsApp_1.documentContent)('OD9JjrVluF4ON00310kMWXJLa', '6583685216', 'Document', 'hi', 'https://eu-assets.contentstack.com/v3/assets/blt2233c63cb81d9b74/bltab4224846f2fae19/634a2e67c473a75d5c5e76ea/Schroders_transcript.pdf')];
                case 1:
                    content = _a.sent();
                    value = content["status"];
                    return [2 /*return*/, value];
            }
        });
    });
}
exports.testWhatsappFunctionFour = testWhatsappFunctionFour;
function testLINEFunctionOne() {
    return __awaiter(this, void 0, void 0, function () {
        var content, value;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, Line_1.line_message)('OD9JjrVluF4ON00310kMWXJLa', 'Uba3d02f75bbe48738a9c47926a2f173d/', 'hi')];
                case 1:
                    content = _a.sent();
                    value = content["status"];
                    return [2 /*return*/, value];
            }
        });
    });
}
exports.testLINEFunctionOne = testLINEFunctionOne;
function testLINEFunctionTwo() {
    return __awaiter(this, void 0, void 0, function () {
        var content, value;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, Line_1.line_image)('OD9JjrVluF4ON00310kMWXJLa', 'Uba3d02f75bbe48738a9c47926a2f173d/', 'image', 'https://eu-images.contentstack.com/v3/assets/blt2233c63cb81d9b74/bltd201a6de6c6cb58c/631f5165ad808074367e0a6f/olivia.png')];
                case 1:
                    content = _a.sent();
                    value = content["status"];
                    return [2 /*return*/, value];
            }
        });
    });
}
exports.testLINEFunctionTwo = testLINEFunctionTwo;
function testLINEFunctionThree() {
    return __awaiter(this, void 0, void 0, function () {
        var content, value;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, Line_1.line_video)('OD9JjrVluF4ON00310kMWXJLa', 'Uba3d02f75bbe48738a9c47926a2f173d/', 'Video', 'https://eu-assets.contentstack.com/v3/assets/blt2233c63cb81d9b74/blt2bfc06495cdfb725/634a28328f37810f03d5b749/catVideo.mp4')];
                case 1:
                    content = _a.sent();
                    value = content["status"];
                    return [2 /*return*/, value];
            }
        });
    });
}
exports.testLINEFunctionThree = testLINEFunctionThree;
function testcontact() {
    return __awaiter(this, void 0, void 0, function () {
        var hi, items, loop, dict, returnNum, dicTrue, final, i, z;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retrieveContacts_1.retrieveContacts)('OD9JjrVluF4ON00310kMWXJLa', "Insurance")];
                case 1:
                    hi = _a.sent();
                    items = hi["items"];
                    loop = "";
                    dict = [];
                    returnNum = "True";
                    dicTrue = [];
                    final = "True";
                    for (i = 0; i < items.length; i++) {
                        loop = items[i]["lastName"];
                        dict.push(loop);
                    }
                    for (z = 0; z < dict.length; z++) {
                        if (dict[z] != 'WhatsApp' && dict[z] != 'LINE') {
                            returnNum = "False";
                        }
                        else {
                            returnNum = "True";
                        }
                        dicTrue.push(returnNum);
                    }
                    if (dicTrue.includes('False')) {
                        final = "False";
                    }
                    return [2 /*return*/, final];
            }
        });
    });
}
exports.testcontact = testcontact;
function testLinecontact() {
    return __awaiter(this, void 0, void 0, function () {
        var hi, items, loop, dictCustom, dictvalue, dictLength, returnValue, i, k, a;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, retrieveContacts_1.retrieveContacts)('OD9JjrVluF4ON00310kMWXJLa', "Insurance")];
                case 1:
                    hi = _a.sent();
                    items = hi["items"];
                    loop = "";
                    dictCustom = [];
                    dictvalue = "";
                    dictLength = [];
                    returnValue = "True";
                    for (i = 0; i < items.length; i++) {
                        loop = items[i]["customDetails"];
                        if (items[i]["lastName"] == 'LINE') {
                            dictCustom.push(loop["custom1"]);
                        }
                    }
                    for (k = 0; k < dictCustom.length; k++) {
                        dictvalue = dictCustom[k];
                        dictLength.push(dictvalue.length);
                    }
                    for (a = 0; a < dictLength.length; a++) {
                        if (dictLength[a] == '0') {
                            returnValue = "False";
                        }
                        else {
                            returnValue = "True";
                        }
                        return [2 /*return*/, returnValue];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.testLinecontact = testLinecontact;
