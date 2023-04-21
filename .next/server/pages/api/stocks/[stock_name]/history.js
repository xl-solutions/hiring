"use strict";
(() => {
var exports = {};
exports.id = 576;
exports.ids = [576];
exports.modules = {

/***/ 9648:
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ 307:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _Backend_services_alphaVantageService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6221);
/* harmony import */ var _utils_priceUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2074);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Backend_services_alphaVantageService__WEBPACK_IMPORTED_MODULE_0__]);
_Backend_services_alphaVantageService__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




async function handler(req, res) {
    const { stock_name , from , to  } = req.query;
    try {
        const arrPrices = await _Backend_services_alphaVantageService__WEBPACK_IMPORTED_MODULE_0__/* ["default"].getHistoricalPrices */ .Z.getHistoricalPrices(stock_name, from, to);
        let oppening = arrPrices[1].price;
        let close = arrPrices[arrPrices.length - 1].price;
        let low = arrPrices[1].price;
        let high = arrPrices[1].price;
        for (let item of arrPrices){
            if (item.price < low) {
                low = item.price;
            }
            if (item.price > high) {
                high = item.price;
            }
        }
        const toData = new Date(to);
        toData.setDate(toData.getDate() - 1);
        const pricedAt = toData.toISOString();
        oppening = (0,_utils_priceUtils__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(oppening);
        low = (0,_utils_priceUtils__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(low);
        high = (0,_utils_priceUtils__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(high);
        close = (0,_utils_priceUtils__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(close);
        const body = {
            oppening,
            low,
            high,
            close,
            pricedAt
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

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [221], () => (__webpack_exec__(307)));
module.exports = __webpack_exports__;

})();