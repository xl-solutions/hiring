"use strict";
(() => {
var exports = {};
exports.id = 209;
exports.ids = [209];
exports.modules = {

/***/ 9648:
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ 3477:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _Backend_services_alphaVantageService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6221);
/* harmony import */ var _utils_dateUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6550);
/* harmony import */ var _utils_priceUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2074);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Backend_services_alphaVantageService__WEBPACK_IMPORTED_MODULE_0__]);
_Backend_services_alphaVantageService__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



async function handler(req, res) {
    const { stock_name  } = req.query;
    try {
        let price = await _Backend_services_alphaVantageService__WEBPACK_IMPORTED_MODULE_0__/* ["default"].getCotacaoMaisRecente */ .Z.getCotacaoMaisRecente(stock_name);
        let date = new Date();
        date = (0,_utils_dateUtils__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(date);
        price = (0,_utils_priceUtils__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)(price);
        const body = {
            name: stock_name,
            price: price,
            date: date
        };
        res.status(200).json(body);
    } catch (error) {
        res.status(500).json({
            error: "Erro ao obter cota\xe7\xe3o."
        });
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6550:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ DataFormat)
/* harmony export */ });
function DataFormat(data) {
    const dia = data.getDate().toString().padStart(2, "0");
    const mes = (data.getMonth() + 1).toString().padStart(2, "0");
    const ano = data.getFullYear().toString();
    return `${dia}/${mes}/${ano}`;
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [221], () => (__webpack_exec__(3477)));
module.exports = __webpack_exports__;

})();