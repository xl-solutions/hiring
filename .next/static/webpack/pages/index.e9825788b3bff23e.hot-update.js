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

/***/ "./src/Frontend/components/commun/BoxFiltter/index.jsx":
/*!*************************************************************!*\
  !*** ./src/Frontend/components/commun/BoxFiltter/index.jsx ***!
  \*************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ FilterBox; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _ResultFiltter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ResultFiltter */ \"./src/Frontend/components/commun/ResultFiltter/index.jsx\");\n/* harmony import */ var _styles_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.module.css */ \"./src/Frontend/components/commun/BoxFiltter/styles.module.css\");\n/* harmony import */ var _styles_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_module_css__WEBPACK_IMPORTED_MODULE_3__);\n\nvar _s = $RefreshSig$();\n\n\n\nlet acao = {\n    name: \"USIM5.SA\",\n    purchasedAmount: 100,\n    purchasedAt: \"2016-05-31\",\n    priceAtDate: 3.97,\n    lastPrice: 4.33,\n    capitalGains: 36.0\n};\nfunction FilterBox() {\n    _s();\n    const [stockName, setStockName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [purchasedAmount, setPurchasedAmount] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);\n    const [purchasedAt, setPurchasedAt] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [gains, setGains] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});\n    const handleStockNameChange = (event)=>{\n        setStockName(event.target.value);\n    };\n    const handlePurchasedAmountChange = (event)=>{\n        setPurchasedAmount(event.target.value);\n    };\n    const handlePurchasedAtChange = (event)=>{\n        setPurchasedAt(event.target.value);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_3___default().container),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_3___default().inputs),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                        htmlFor: \"nome-acao\",\n                        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_3___default().label),\n                        children: \"Nome da a\\xe7\\xe3o:\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Usuario\\\\Desktop\\\\TesteIpnet\\\\hiringRissoli\\\\src\\\\Frontend\\\\components\\\\commun\\\\BoxFiltter\\\\index.jsx\",\n                        lineNumber: 26,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        type: \"text\",\n                        id: \"nome-acao\",\n                        name: \"nome-acao\",\n                        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_3___default().input)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Usuario\\\\Desktop\\\\TesteIpnet\\\\hiringRissoli\\\\src\\\\Frontend\\\\components\\\\commun\\\\BoxFiltter\\\\index.jsx\",\n                        lineNumber: 27,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                        htmlFor: \"quantia-cotas\",\n                        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_3___default().label),\n                        children: \"Quantia de cotas:\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Usuario\\\\Desktop\\\\TesteIpnet\\\\hiringRissoli\\\\src\\\\Frontend\\\\components\\\\commun\\\\BoxFiltter\\\\index.jsx\",\n                        lineNumber: 29,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        type: \"number\",\n                        id: \"quantia-cotas\",\n                        name: \"quantia-cotas\",\n                        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_3___default().input)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Usuario\\\\Desktop\\\\TesteIpnet\\\\hiringRissoli\\\\src\\\\Frontend\\\\components\\\\commun\\\\BoxFiltter\\\\index.jsx\",\n                        lineNumber: 30,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                        htmlFor: \"data-compra\",\n                        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_3___default().label),\n                        children: \"Data de compra:\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Usuario\\\\Desktop\\\\TesteIpnet\\\\hiringRissoli\\\\src\\\\Frontend\\\\components\\\\commun\\\\BoxFiltter\\\\index.jsx\",\n                        lineNumber: 32,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        type: \"date\",\n                        id: \"data-compra\",\n                        name: \"data-compra\",\n                        className: (_styles_module_css__WEBPACK_IMPORTED_MODULE_3___default().input)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Usuario\\\\Desktop\\\\TesteIpnet\\\\hiringRissoli\\\\src\\\\Frontend\\\\components\\\\commun\\\\BoxFiltter\\\\index.jsx\",\n                        lineNumber: 33,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        children: \"Calcular\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Usuario\\\\Desktop\\\\TesteIpnet\\\\hiringRissoli\\\\src\\\\Frontend\\\\components\\\\commun\\\\BoxFiltter\\\\index.jsx\",\n                        lineNumber: 34,\n                        columnNumber: 17\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\Usuario\\\\Desktop\\\\TesteIpnet\\\\hiringRissoli\\\\src\\\\Frontend\\\\components\\\\commun\\\\BoxFiltter\\\\index.jsx\",\n                lineNumber: 25,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ResultFiltter__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                gains: gains\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Usuario\\\\Desktop\\\\TesteIpnet\\\\hiringRissoli\\\\src\\\\Frontend\\\\components\\\\commun\\\\BoxFiltter\\\\index.jsx\",\n                lineNumber: 36,\n                columnNumber: 13\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Usuario\\\\Desktop\\\\TesteIpnet\\\\hiringRissoli\\\\src\\\\Frontend\\\\components\\\\commun\\\\BoxFiltter\\\\index.jsx\",\n        lineNumber: 24,\n        columnNumber: 9\n    }, this);\n}\n_s(FilterBox, \"uhhe/8StNhKwhFw94MtWI/zRlpg=\");\n_c = FilterBox;\nvar _c;\n$RefreshReg$(_c, \"FilterBox\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvRnJvbnRlbmQvY29tcG9uZW50cy9jb21tdW4vQm94RmlsdHRlci9pbmRleC5qc3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFnQztBQUNZO0FBQ0o7QUFDeEMsSUFBSUcsT0FBTztJQUFFQyxNQUFNO0lBQVlDLGlCQUFpQjtJQUFLQyxhQUFhO0lBQWNDLGFBQWE7SUFBTUMsV0FBVztJQUFNQyxjQUFjO0FBQUs7QUFFeEgsU0FBU0MsWUFBWTs7SUFDaEMsTUFBTSxDQUFDQyxXQUFXQyxhQUFhLEdBQUdaLCtDQUFRQSxDQUFDO0lBQzNDLE1BQU0sQ0FBQ0ssaUJBQWlCUSxtQkFBbUIsR0FBR2IsK0NBQVFBLENBQUM7SUFDdkQsTUFBTSxDQUFDTSxhQUFhUSxlQUFlLEdBQUdkLCtDQUFRQSxDQUFDO0lBQy9DLE1BQU0sQ0FBQ2UsT0FBT0MsU0FBUyxHQUFHaEIsK0NBQVFBLENBQUMsQ0FBQztJQUVwQyxNQUFNaUIsd0JBQXdCLENBQUNDLFFBQVU7UUFDckNOLGFBQWFNLE1BQU1DLE1BQU0sQ0FBQ0MsS0FBSztJQUNuQztJQUVBLE1BQU1DLDhCQUE4QixDQUFDSCxRQUFVO1FBQzNDTCxtQkFBbUJLLE1BQU1DLE1BQU0sQ0FBQ0MsS0FBSztJQUN6QztJQUVBLE1BQU1FLDBCQUEwQixDQUFDSixRQUFVO1FBQ3ZDSixlQUFlSSxNQUFNQyxNQUFNLENBQUNDLEtBQUs7SUFDckM7SUFDQSxxQkFDSSw4REFBQ0c7UUFBSUMsV0FBV3RCLHFFQUFnQjs7MEJBQzVCLDhEQUFDcUI7Z0JBQUlDLFdBQVd0QixrRUFBYTs7a0NBQ3pCLDhEQUFDeUI7d0JBQU1DLFNBQVE7d0JBQVlKLFdBQVd0QixpRUFBWTtrQ0FBRTs7Ozs7O2tDQUNwRCw4REFBQzJCO3dCQUFNQyxNQUFLO3dCQUFPQyxJQUFHO3dCQUFZM0IsTUFBSzt3QkFBWW9CLFdBQVd0QixpRUFBWTs7Ozs7O2tDQUUxRSw4REFBQ3lCO3dCQUFNQyxTQUFRO3dCQUFnQkosV0FBV3RCLGlFQUFZO2tDQUFFOzs7Ozs7a0NBQ3hELDhEQUFDMkI7d0JBQU1DLE1BQUs7d0JBQVNDLElBQUc7d0JBQWdCM0IsTUFBSzt3QkFBZ0JvQixXQUFXdEIsaUVBQVk7Ozs7OztrQ0FFcEYsOERBQUN5Qjt3QkFBTUMsU0FBUTt3QkFBY0osV0FBV3RCLGlFQUFZO2tDQUFFOzs7Ozs7a0NBQ3RELDhEQUFDMkI7d0JBQU1DLE1BQUs7d0JBQU9DLElBQUc7d0JBQWMzQixNQUFLO3dCQUFjb0IsV0FBV3RCLGlFQUFZOzs7Ozs7a0NBQzlFLDhEQUFDOEI7a0NBQU87Ozs7Ozs7Ozs7OzswQkFFWiw4REFBQy9CLHNEQUFhQTtnQkFBQ2MsT0FBT0E7Ozs7Ozs7Ozs7OztBQUdsQyxDQUFDO0dBakN1Qkw7S0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL0Zyb250ZW5kL2NvbXBvbmVudHMvY29tbXVuL0JveEZpbHR0ZXIvaW5kZXguanN4P2JmOTYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgUmVzdWx0RmlsdHRlciBmcm9tIFwiLi4vUmVzdWx0RmlsdHRlclwiXHJcbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4vc3R5bGVzLm1vZHVsZS5jc3NcIlxyXG5sZXQgYWNhbyA9IHsgbmFtZTogXCJVU0lNNS5TQVwiLCBwdXJjaGFzZWRBbW91bnQ6IDEwMCwgcHVyY2hhc2VkQXQ6IFwiMjAxNi0wNS0zMVwiLCBwcmljZUF0RGF0ZTogMy45NywgbGFzdFByaWNlOiA0LjMzLCBjYXBpdGFsR2FpbnM6IDM2LjAgfVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRmlsdGVyQm94KCkge1xyXG4gICAgY29uc3QgW3N0b2NrTmFtZSwgc2V0U3RvY2tOYW1lXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gICAgY29uc3QgW3B1cmNoYXNlZEFtb3VudCwgc2V0UHVyY2hhc2VkQW1vdW50XSA9IHVzZVN0YXRlKDApO1xyXG4gICAgY29uc3QgW3B1cmNoYXNlZEF0LCBzZXRQdXJjaGFzZWRBdF0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICAgIGNvbnN0IFtnYWlucywgc2V0R2FpbnNdID0gdXNlU3RhdGUoe30pO1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZVN0b2NrTmFtZUNoYW5nZSA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIHNldFN0b2NrTmFtZShldmVudC50YXJnZXQudmFsdWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVQdXJjaGFzZWRBbW91bnRDaGFuZ2UgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBzZXRQdXJjaGFzZWRBbW91bnQoZXZlbnQudGFyZ2V0LnZhbHVlKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaGFuZGxlUHVyY2hhc2VkQXRDaGFuZ2UgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBzZXRQdXJjaGFzZWRBdChldmVudC50YXJnZXQudmFsdWUpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5jb250YWluZXJ9PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmlucHV0c30+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cIm5vbWUtYWNhb1wiIGNsYXNzTmFtZT17c3R5bGVzLmxhYmVsfT5Ob21lIGRhIGHDp8Ojbzo8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJub21lLWFjYW9cIiBuYW1lPVwibm9tZS1hY2FvXCIgY2xhc3NOYW1lPXtzdHlsZXMuaW5wdXR9IC8+XHJcblxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJxdWFudGlhLWNvdGFzXCIgY2xhc3NOYW1lPXtzdHlsZXMubGFiZWx9PlF1YW50aWEgZGUgY290YXM6PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgaWQ9XCJxdWFudGlhLWNvdGFzXCIgbmFtZT1cInF1YW50aWEtY290YXNcIiBjbGFzc05hbWU9e3N0eWxlcy5pbnB1dH0gLz5cclxuXHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImRhdGEtY29tcHJhXCIgY2xhc3NOYW1lPXtzdHlsZXMubGFiZWx9PkRhdGEgZGUgY29tcHJhOjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImRhdGVcIiBpZD1cImRhdGEtY29tcHJhXCIgbmFtZT1cImRhdGEtY29tcHJhXCIgY2xhc3NOYW1lPXtzdHlsZXMuaW5wdXR9IC8+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uPkNhbGN1bGFyPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8UmVzdWx0RmlsdHRlciBnYWlucz17Z2FpbnN9IC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApXHJcbn0iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJSZXN1bHRGaWx0dGVyIiwic3R5bGVzIiwiYWNhbyIsIm5hbWUiLCJwdXJjaGFzZWRBbW91bnQiLCJwdXJjaGFzZWRBdCIsInByaWNlQXREYXRlIiwibGFzdFByaWNlIiwiY2FwaXRhbEdhaW5zIiwiRmlsdGVyQm94Iiwic3RvY2tOYW1lIiwic2V0U3RvY2tOYW1lIiwic2V0UHVyY2hhc2VkQW1vdW50Iiwic2V0UHVyY2hhc2VkQXQiLCJnYWlucyIsInNldEdhaW5zIiwiaGFuZGxlU3RvY2tOYW1lQ2hhbmdlIiwiZXZlbnQiLCJ0YXJnZXQiLCJ2YWx1ZSIsImhhbmRsZVB1cmNoYXNlZEFtb3VudENoYW5nZSIsImhhbmRsZVB1cmNoYXNlZEF0Q2hhbmdlIiwiZGl2IiwiY2xhc3NOYW1lIiwiY29udGFpbmVyIiwiaW5wdXRzIiwibGFiZWwiLCJodG1sRm9yIiwiaW5wdXQiLCJ0eXBlIiwiaWQiLCJidXR0b24iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/Frontend/components/commun/BoxFiltter/index.jsx\n"));

/***/ })

});