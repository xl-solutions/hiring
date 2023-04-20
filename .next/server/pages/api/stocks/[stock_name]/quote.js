"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/stocks/[stock_name]/quote";
exports.ids = ["pages/api/stocks/[stock_name]/quote"];
exports.modules = {

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ "(api)/./pages/api/stocks/[stock_name]/quote.js":
/*!************************************************!*\
  !*** ./pages/api/stocks/[stock_name]/quote.js ***!
  \************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _Backend_services_alphaVantageService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/Backend/services/alphaVantageService */ \"(api)/./src/Backend/services/alphaVantageService.js\");\n/* harmony import */ var _utils_dateUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../utils/dateUtils */ \"(api)/./utils/dateUtils.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Backend_services_alphaVantageService__WEBPACK_IMPORTED_MODULE_0__]);\n_Backend_services_alphaVantageService__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\nasync function handler(req, res) {\n    const { stock_name  } = req.query;\n    try {\n        const price = await _Backend_services_alphaVantageService__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getCotacaoMaisRecente(stock_name);\n        let date = new Date();\n        date = (0,_utils_dateUtils__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(date);\n        const body = {\n            name: stock_name,\n            price: price,\n            date: date\n        };\n        res.status(200).json(body);\n    } catch (error) {\n        console.log(error);\n        res.status(500).json({\n            error: \"Erro ao obter cota\\xe7\\xe3o.\"\n        });\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvc3RvY2tzL1tzdG9ja19uYW1lXS9xdW90ZS5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBd0U7QUFDbkI7QUFFdEMsZUFBZUUsUUFBUUMsR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFDNUMsTUFBTSxFQUFFQyxXQUFVLEVBQUUsR0FBR0YsSUFBSUcsS0FBSztJQUNoQyxJQUFJO1FBQ0EsTUFBTUMsUUFBUSxNQUFNUCxtR0FBeUMsQ0FBQ0s7UUFDOUQsSUFBSUksT0FBTyxJQUFJQztRQUNmRCxPQUFPUiw0REFBVUEsQ0FBQ1E7UUFDbEIsTUFBTUUsT0FBTztZQUNUQyxNQUFNUDtZQUNORSxPQUFPQTtZQUNQRSxNQUFNQTtRQUNWO1FBRUFMLElBQUlTLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUNIO0lBQ3pCLEVBQUUsT0FBT0ksT0FBTztRQUNaQyxRQUFRQyxHQUFHLENBQUNGO1FBQ1pYLElBQUlTLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUF5QjtJQUMzRDtBQUNKLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oaXJpbmdSaXNzb2xpLy4vcGFnZXMvYXBpL3N0b2Nrcy9bc3RvY2tfbmFtZV0vcXVvdGUuanM/OTdiNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWxwaGFWYW50YWdlU2VydmljZSBmcm9tIFwiQC9CYWNrZW5kL3NlcnZpY2VzL2FscGhhVmFudGFnZVNlcnZpY2VcIlxyXG5pbXBvcnQgRGF0YUZvcm1hdCBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvZGF0ZVV0aWxzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKHJlcSwgcmVzKSB7XHJcbiAgICBjb25zdCB7IHN0b2NrX25hbWUgfSA9IHJlcS5xdWVyeTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcHJpY2UgPSBhd2FpdCBBbHBoYVZhbnRhZ2VTZXJ2aWNlLmdldENvdGFjYW9NYWlzUmVjZW50ZShzdG9ja19uYW1lKTtcclxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKClcclxuICAgICAgICBkYXRlID0gRGF0YUZvcm1hdChkYXRlKVxyXG4gICAgICAgIGNvbnN0IGJvZHkgPSB7XHJcbiAgICAgICAgICAgIG5hbWU6IHN0b2NrX25hbWUsXHJcbiAgICAgICAgICAgIHByaWNlOiBwcmljZSxcclxuICAgICAgICAgICAgZGF0ZTogZGF0ZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24oYm9keSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnRXJybyBhbyBvYnRlciBjb3Rhw6fDo28uJyB9KTtcclxuICAgIH1cclxufSJdLCJuYW1lcyI6WyJBbHBoYVZhbnRhZ2VTZXJ2aWNlIiwiRGF0YUZvcm1hdCIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJzdG9ja19uYW1lIiwicXVlcnkiLCJwcmljZSIsImdldENvdGFjYW9NYWlzUmVjZW50ZSIsImRhdGUiLCJEYXRlIiwiYm9keSIsIm5hbWUiLCJzdGF0dXMiLCJqc29uIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/stocks/[stock_name]/quote.js\n");

/***/ }),

/***/ "(api)/./src/Backend/api/axiosConfig.js":
/*!****************************************!*\
  !*** ./src/Backend/api/axiosConfig.js ***!
  \****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);\naxios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst instance = axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].create({\n    baseURL: \"https://www.alphavantage.co/query\",\n    params: {\n        apikey: \"MARAEQTHHUDW2NMJ\"\n    }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (instance);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvQmFja2VuZC9hcGkvYXhpb3NDb25maWcuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBMEI7QUFFMUIsTUFBTUMsV0FBV0Qsb0RBQVksQ0FBQztJQUM1QkcsU0FBUztJQUNUQyxRQUFRO1FBQ05DLFFBQVE7SUFDVjtBQUNGO0FBRUEsaUVBQWVKLFFBQVFBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oaXJpbmdSaXNzb2xpLy4vc3JjL0JhY2tlbmQvYXBpL2F4aW9zQ29uZmlnLmpzPzk0NjgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcclxuXHJcbmNvbnN0IGluc3RhbmNlID0gYXhpb3MuY3JlYXRlKHtcclxuICBiYXNlVVJMOiAnaHR0cHM6Ly93d3cuYWxwaGF2YW50YWdlLmNvL3F1ZXJ5JyxcclxuICBwYXJhbXM6IHtcclxuICAgIGFwaWtleTogJ01BUkFFUVRISFVEVzJOTUonLFxyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaW5zdGFuY2U7Il0sIm5hbWVzIjpbImF4aW9zIiwiaW5zdGFuY2UiLCJjcmVhdGUiLCJiYXNlVVJMIiwicGFyYW1zIiwiYXBpa2V5Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/Backend/api/axiosConfig.js\n");

/***/ }),

/***/ "(api)/./src/Backend/services/alphaVantageService.js":
/*!*****************************************************!*\
  !*** ./src/Backend/services/alphaVantageService.js ***!
  \*****************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _api_axiosConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/axiosConfig */ \"(api)/./src/Backend/api/axiosConfig.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api_axiosConfig__WEBPACK_IMPORTED_MODULE_0__]);\n_api_axiosConfig__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nclass AlphaVantageService {\n    static async getCotacaoMaisRecente(symbol) {\n        try {\n            const response = await _api_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(\"\", {\n                params: {\n                    function: \"GLOBAL_QUOTE\",\n                    symbol: symbol\n                }\n            });\n            return response.data[\"Global Quote\"][\"05. price\"];\n        } catch (error) {\n            console.error(error);\n            throw new Error(\"Erro ao buscar cota\\xe7\\xe3o\");\n        }\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AlphaVantageService);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvQmFja2VuZC9zZXJ2aWNlcy9hbHBoYVZhbnRhZ2VTZXJ2aWNlLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQXVDO0FBRXZDLE1BQU1DO0lBQ0osYUFBYUMsc0JBQXNCQyxNQUFNLEVBQUU7UUFDekMsSUFBSTtZQUNGLE1BQU1DLFdBQVcsTUFBTUosNERBQVMsQ0FBQyxJQUFJO2dCQUNuQ00sUUFBUTtvQkFDTkMsVUFBVTtvQkFDVkosUUFBUUE7Z0JBQ1Y7WUFDRjtZQUNBLE9BQU9DLFNBQVNJLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWTtRQUNuRCxFQUFFLE9BQU9DLE9BQU87WUFDZEMsUUFBUUQsS0FBSyxDQUFDQTtZQUNkLE1BQU0sSUFBSUUsTUFBTSxnQ0FBMEI7UUFDNUM7SUFDRjtBQUNGO0FBRUEsaUVBQWVWLG1CQUFtQkEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2hpcmluZ1Jpc3NvbGkvLi9zcmMvQmFja2VuZC9zZXJ2aWNlcy9hbHBoYVZhbnRhZ2VTZXJ2aWNlLmpzPzFjOGYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gJy4uL2FwaS9heGlvc0NvbmZpZyc7XHJcblxyXG5jbGFzcyBBbHBoYVZhbnRhZ2VTZXJ2aWNlIHtcclxuICBzdGF0aWMgYXN5bmMgZ2V0Q290YWNhb01haXNSZWNlbnRlKHN5bWJvbCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQoJycsIHtcclxuICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgIGZ1bmN0aW9uOiAnR0xPQkFMX1FVT1RFJyxcclxuICAgICAgICAgIHN5bWJvbDogc3ltYm9sLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YVsnR2xvYmFsIFF1b3RlJ11bJzA1LiBwcmljZSddO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXJybyBhbyBidXNjYXIgY290YcOnw6NvJyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBbHBoYVZhbnRhZ2VTZXJ2aWNlOyJdLCJuYW1lcyI6WyJheGlvcyIsIkFscGhhVmFudGFnZVNlcnZpY2UiLCJnZXRDb3RhY2FvTWFpc1JlY2VudGUiLCJzeW1ib2wiLCJyZXNwb25zZSIsImdldCIsInBhcmFtcyIsImZ1bmN0aW9uIiwiZGF0YSIsImVycm9yIiwiY29uc29sZSIsIkVycm9yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/Backend/services/alphaVantageService.js\n");

/***/ }),

/***/ "(api)/./utils/dateUtils.js":
/*!****************************!*\
  !*** ./utils/dateUtils.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ DataFormat)\n/* harmony export */ });\nfunction DataFormat(data) {\n    const dia = data.getDate().toString().padStart(2, \"0\");\n    const mes = (data.getMonth() + 1).toString().padStart(2, \"0\");\n    const ano = data.getFullYear().toString();\n    return `${dia}/${mes}/${ano}`;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi91dGlscy9kYXRlVXRpbHMuanMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFlLFNBQVNBLFdBQVdDLElBQUksRUFBRTtJQUNyQyxNQUFNQyxNQUFNRCxLQUFLRSxPQUFPLEdBQUdDLFFBQVEsR0FBR0MsUUFBUSxDQUFDLEdBQUc7SUFDbEQsTUFBTUMsTUFBTSxDQUFDTCxLQUFLTSxRQUFRLEtBQUssR0FBR0gsUUFBUSxHQUFHQyxRQUFRLENBQUMsR0FBRztJQUN6RCxNQUFNRyxNQUFNUCxLQUFLUSxXQUFXLEdBQUdMLFFBQVE7SUFFdkMsT0FBTyxDQUFDLEVBQUVGLElBQUksQ0FBQyxFQUFFSSxJQUFJLENBQUMsRUFBRUUsSUFBSSxDQUFDO0FBQ2pDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oaXJpbmdSaXNzb2xpLy4vdXRpbHMvZGF0ZVV0aWxzLmpzPzJkZDEiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGF0YUZvcm1hdChkYXRhKSB7XHJcbiAgICBjb25zdCBkaWEgPSBkYXRhLmdldERhdGUoKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyk7XHJcbiAgICBjb25zdCBtZXMgPSAoZGF0YS5nZXRNb250aCgpICsgMSkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpO1xyXG4gICAgY29uc3QgYW5vID0gZGF0YS5nZXRGdWxsWWVhcigpLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgcmV0dXJuIGAke2RpYX0vJHttZXN9LyR7YW5vfWA7XHJcbn0iXSwibmFtZXMiOlsiRGF0YUZvcm1hdCIsImRhdGEiLCJkaWEiLCJnZXREYXRlIiwidG9TdHJpbmciLCJwYWRTdGFydCIsIm1lcyIsImdldE1vbnRoIiwiYW5vIiwiZ2V0RnVsbFllYXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./utils/dateUtils.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/stocks/[stock_name]/quote.js"));
module.exports = __webpack_exports__;

})();