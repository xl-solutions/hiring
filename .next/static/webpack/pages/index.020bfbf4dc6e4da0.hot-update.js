"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./src/Frontend/components/commun/ResultFiltter/index.jsx":
/*!****************************************************************!*\
  !*** ./src/Frontend/components/commun/ResultFiltter/index.jsx ***!
  \****************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ ResultFiltter; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.module.css */ \"./src/Frontend/components/commun/ResultFiltter/styles.module.css\");\n/* harmony import */ var _styles_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_module_css__WEBPACK_IMPORTED_MODULE_1__);\n\n\nfunction ResultFiltter(param) {\n    let { gains  } = param;\n    const isProfit = gains.capitalGains >= 0;\n    console.log(isProfit);\n    console.log(gains.capitalGains);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"\".concat((_styles_module_css__WEBPACK_IMPORTED_MODULE_1___default().results), \" \").concat(isProfit ? (_styles_module_css__WEBPACK_IMPORTED_MODULE_1___default().profit) : (_styles_module_css__WEBPACK_IMPORTED_MODULE_1___default().loss)),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_1___default().container_1_results),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_1___default().paragraph_result),\n                        children: [\n                            \"Pre\\xe7o na data de compra: \",\n                            gains.priceAtDate\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\Usuario\\\\Desktop\\\\TesteIpnet\\\\hiringRissoli\\\\src\\\\Frontend\\\\components\\\\commun\\\\ResultFiltter\\\\index.jsx\",\n                        lineNumber: 9,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_1___default().paragraph_result),\n                        children: [\n                            \"Pre\\xe7o mais recente: \",\n                            gains.lastPrice\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\Usuario\\\\Desktop\\\\TesteIpnet\\\\hiringRissoli\\\\src\\\\Frontend\\\\components\\\\commun\\\\ResultFiltter\\\\index.jsx\",\n                        lineNumber: 10,\n                        columnNumber: 17\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Usuario\\\\Desktop\\\\TesteIpnet\\\\hiringRissoli\\\\src\\\\Frontend\\\\components\\\\commun\\\\ResultFiltter\\\\index.jsx\",\n                lineNumber: 8,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_1___default().paragraph_result),\n                children: [\n                    \"Ganhos ou Perdas: \",\n                    gains.capitalGains\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Usuario\\\\Desktop\\\\TesteIpnet\\\\hiringRissoli\\\\src\\\\Frontend\\\\components\\\\commun\\\\ResultFiltter\\\\index.jsx\",\n                lineNumber: 12,\n                columnNumber: 13\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Usuario\\\\Desktop\\\\TesteIpnet\\\\hiringRissoli\\\\src\\\\Frontend\\\\components\\\\commun\\\\ResultFiltter\\\\index.jsx\",\n        lineNumber: 7,\n        columnNumber: 9\n    }, this);\n}\n_c = ResultFiltter;\nvar _c;\n$RefreshReg$(_c, \"ResultFiltter\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvRnJvbnRlbmQvY29tcG9uZW50cy9jb21tdW4vUmVzdWx0RmlsdHRlci9pbmRleC5qc3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQXdDO0FBQ3pCLFNBQVNDLGNBQWMsS0FBUyxFQUFFO1FBQVgsRUFBRUMsTUFBSyxFQUFFLEdBQVQ7SUFDbEMsTUFBTUMsV0FBV0QsTUFBTUUsWUFBWSxJQUFJO0lBQ3ZDQyxRQUFRQyxHQUFHLENBQUNIO0lBQ1pFLFFBQVFDLEdBQUcsQ0FBQ0osTUFBTUUsWUFBWTtJQUM5QixxQkFDSSw4REFBQ0c7UUFBSUMsV0FBVyxHQUFxQkwsT0FBbEJILG1FQUFjLEVBQUMsS0FBMEMsT0FBdkNHLFdBQVdILGtFQUFhLEdBQUdBLGdFQUFXOzswQkFDdkUsOERBQUNPO2dCQUFJQyxXQUFXUiwrRUFBMEI7O2tDQUN0Qyw4REFBQ2E7d0JBQUVMLFdBQVdSLDRFQUF1Qjs7NEJBQUU7NEJBQTBCRSxNQUFNYSxXQUFXOzs7Ozs7O2tDQUNsRiw4REFBQ0Y7d0JBQUVMLFdBQVdSLDRFQUF1Qjs7NEJBQUU7NEJBQXFCRSxNQUFNYyxTQUFTOzs7Ozs7Ozs7Ozs7OzBCQUUvRSw4REFBQ0g7Z0JBQUVMLFdBQVdSLDRFQUF1Qjs7b0JBQUU7b0JBQW1CRSxNQUFNRSxZQUFZOzs7Ozs7Ozs7Ozs7O0FBR3hGLENBQUM7S0FidUJIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9Gcm9udGVuZC9jb21wb25lbnRzL2NvbW11bi9SZXN1bHRGaWx0dGVyL2luZGV4LmpzeD84OGI0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdHlsZXMgZnJvbSBcIi4vc3R5bGVzLm1vZHVsZS5jc3NcIlxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSZXN1bHRGaWx0dGVyKHsgZ2FpbnMgfSkge1xyXG4gICAgY29uc3QgaXNQcm9maXQgPSBnYWlucy5jYXBpdGFsR2FpbnMgPj0gMDtcclxuICAgIGNvbnNvbGUubG9nKGlzUHJvZml0KVxyXG4gICAgY29uc29sZS5sb2coZ2FpbnMuY2FwaXRhbEdhaW5zKVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YCR7c3R5bGVzLnJlc3VsdHN9ICR7aXNQcm9maXQgPyBzdHlsZXMucHJvZml0IDogc3R5bGVzLmxvc3N9YH0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuY29udGFpbmVyXzFfcmVzdWx0c30+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9e3N0eWxlcy5wYXJhZ3JhcGhfcmVzdWx0fT5QcmXDp28gbmEgZGF0YSBkZSBjb21wcmE6IHtnYWlucy5wcmljZUF0RGF0ZX08L3A+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9e3N0eWxlcy5wYXJhZ3JhcGhfcmVzdWx0fT5QcmXDp28gbWFpcyByZWNlbnRlOiB7Z2FpbnMubGFzdFByaWNlfTwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT17c3R5bGVzLnBhcmFncmFwaF9yZXN1bHR9PkdhbmhvcyBvdSBQZXJkYXM6IHtnYWlucy5jYXBpdGFsR2FpbnN9PC9wPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG59Il0sIm5hbWVzIjpbInN0eWxlcyIsIlJlc3VsdEZpbHR0ZXIiLCJnYWlucyIsImlzUHJvZml0IiwiY2FwaXRhbEdhaW5zIiwiY29uc29sZSIsImxvZyIsImRpdiIsImNsYXNzTmFtZSIsInJlc3VsdHMiLCJwcm9maXQiLCJsb3NzIiwiY29udGFpbmVyXzFfcmVzdWx0cyIsInAiLCJwYXJhZ3JhcGhfcmVzdWx0IiwicHJpY2VBdERhdGUiLCJsYXN0UHJpY2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/Frontend/components/commun/ResultFiltter/index.jsx\n"));

/***/ })

});