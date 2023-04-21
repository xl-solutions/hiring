"use strict";
(() => {
var exports = {};
exports.id = 387;
exports.ids = [387];
exports.modules = {

/***/ 9648:
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ 3246:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _src_Backend_services_alphaVantageService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6221);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_src_Backend_services_alphaVantageService__WEBPACK_IMPORTED_MODULE_0__]);
_src_Backend_services_alphaVantageService__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

async function handler(req, res) {
    try {
        const { stocks  } = req.body;
        const { stock_name  } = req.query;
        if (!stocks) {
            throw new Error("\xc9 necess\xe1rio informar a lista de a\xe7\xf5es para compara\xe7\xe3o");
        }
        const result = await _src_Backend_services_alphaVantageService__WEBPACK_IMPORTED_MODULE_0__/* ["default"].compareStocks */ .Z.compareStocks(stock_name, {
            stocks
        });
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({
            error: error.message || "Ocorreu um erro ao processar a requisi\xe7\xe3o"
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
var __webpack_exports__ = __webpack_require__.X(0, [221], () => (__webpack_exec__(3246)));
module.exports = __webpack_exports__;

})();