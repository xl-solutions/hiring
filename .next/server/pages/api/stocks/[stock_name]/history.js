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
exports.id = "pages/api/stocks/[stock_name]/history";
exports.ids = ["pages/api/stocks/[stock_name]/history"];
exports.modules = {

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ "(api)/./pages/api/stocks/[stock_name]/history.js":
/*!**************************************************!*\
  !*** ./pages/api/stocks/[stock_name]/history.js ***!
  \**************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _Backend_services_alphaVantageService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/Backend/services/alphaVantageService */ \"(api)/./src/Backend/services/alphaVantageService.js\");\n/* harmony import */ var _utils_dateUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../utils/dateUtils */ \"(api)/./utils/dateUtils.js\");\n/* harmony import */ var _utils_priceUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../utils/priceUtils */ \"(api)/./utils/priceUtils.js\");\n/* harmony import */ var _utils_averagePrice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../utils/averagePrice */ \"(api)/./utils/averagePrice.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Backend_services_alphaVantageService__WEBPACK_IMPORTED_MODULE_0__]);\n_Backend_services_alphaVantageService__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\nasync function handler(req, res) {\n    const { stock_name , from , to  } = req.query;\n    try {\n        const arrPrices = await _Backend_services_alphaVantageService__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getHistoricalPrices(stock_name, from, to);\n        let oppening = arrPrices[1].price;\n        let close = arrPrices[arrPrices.length - 1].price;\n        let low = arrPrices[1].price;\n        let high = arrPrices[1].price;\n        for (let item of arrPrices){\n            if (item.price < low) {\n                low = item.price;\n            }\n            if (item.price > high) {\n                high = item.price;\n            }\n        }\n        const toData = new Date(to);\n        toData.setDate(toData.getDate() - 1);\n        const pricedAt = toData.toISOString();\n        oppening = (0,_utils_priceUtils__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(oppening);\n        low = (0,_utils_priceUtils__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(low);\n        high = (0,_utils_priceUtils__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(high);\n        close = (0,_utils_priceUtils__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(close);\n        const body = {\n            oppening,\n            low,\n            high,\n            close,\n            pricedAt\n        };\n        res.status(200).json(body);\n    } catch (error) {\n        console.log(error);\n        res.status(500).json({\n            error: \"Erro ao obter cota\\xe7\\xe3o.\"\n        });\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvc3RvY2tzL1tzdG9ja19uYW1lXS9oaXN0b3J5LmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQXdFO0FBQ25CO0FBQ0s7QUFDSTtBQUMvQyxlQUFlSSxRQUFRQyxHQUFHLEVBQUVDLEdBQUcsRUFBRTtJQUM1QyxNQUFNLEVBQUVDLFdBQVUsRUFBRUMsS0FBSSxFQUFFQyxHQUFFLEVBQUUsR0FBR0osSUFBSUssS0FBSztJQUUxQyxJQUFJO1FBQ0EsTUFBTUMsWUFBWSxNQUFNWCxpR0FBdUMsQ0FBQ08sWUFBWUMsTUFBTUM7UUFFbEYsSUFBSUksV0FBV0YsU0FBUyxDQUFDLEVBQUUsQ0FBQ0csS0FBSztRQUNqQyxJQUFJQyxRQUFRSixTQUFTLENBQUNBLFVBQVVLLE1BQU0sR0FBRyxFQUFHLENBQUNGLEtBQUs7UUFDbEQsSUFBSUcsTUFBTU4sU0FBUyxDQUFDLEVBQUUsQ0FBQ0csS0FBSztRQUM1QixJQUFJSSxPQUFPUCxTQUFTLENBQUMsRUFBRSxDQUFDRyxLQUFLO1FBQzdCLEtBQUssSUFBSUssUUFBUVIsVUFBVztZQUN4QixJQUFJUSxLQUFLTCxLQUFLLEdBQUdHLEtBQUs7Z0JBQ2xCQSxNQUFNRSxLQUFLTCxLQUFLO1lBQ3BCLENBQUM7WUFDRCxJQUFJSyxLQUFLTCxLQUFLLEdBQUdJLE1BQU07Z0JBQ25CQSxPQUFPQyxLQUFLTCxLQUFLO1lBQ3JCLENBQUM7UUFDTDtRQUNBLE1BQU1NLFNBQVMsSUFBSUMsS0FBS1o7UUFDeEJXLE9BQU9FLE9BQU8sQ0FBQ0YsT0FBT0csT0FBTyxLQUFLO1FBQ2xDLE1BQU1DLFdBQVdKLE9BQU9LLFdBQVc7UUFDbkNaLFdBQVdYLDZEQUFjQSxDQUFDVztRQUMxQkksTUFBTWYsNkRBQWNBLENBQUNlO1FBQ3JCQyxPQUFPaEIsNkRBQWNBLENBQUNnQjtRQUN0QkgsUUFBUWIsNkRBQWNBLENBQUNhO1FBRXZCLE1BQU1XLE9BQU87WUFDVGI7WUFDQUk7WUFDQUM7WUFDQUg7WUFDQVM7UUFFSjtRQUNBbEIsSUFBSXFCLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUNGO0lBQ3pCLEVBQUUsT0FBT0csT0FBTztRQUNaQyxRQUFRQyxHQUFHLENBQUNGO1FBQ1p2QixJQUFJcUIsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQXlCO0lBQzNEO0FBQ0osQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2hpcmluZ1Jpc3NvbGkvLi9wYWdlcy9hcGkvc3RvY2tzL1tzdG9ja19uYW1lXS9oaXN0b3J5LmpzP2RiMjUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFscGhhVmFudGFnZVNlcnZpY2UgZnJvbSBcIkAvQmFja2VuZC9zZXJ2aWNlcy9hbHBoYVZhbnRhZ2VTZXJ2aWNlXCJcclxuaW1wb3J0IERhdGFGb3JtYXQgZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2RhdGVVdGlsc1wiO1xyXG5pbXBvcnQgZm9ybWF0Q3VycmVuY3kgZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL3ByaWNlVXRpbHNcIjtcclxuaW1wb3J0IGNhbGN1bGF0ZUF2ZXJhZ2UgZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2F2ZXJhZ2VQcmljZVwiO1xyXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKHJlcSwgcmVzKSB7XHJcbiAgICBjb25zdCB7IHN0b2NrX25hbWUsIGZyb20sIHRvIH0gPSByZXEucXVlcnk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBhcnJQcmljZXMgPSBhd2FpdCBBbHBoYVZhbnRhZ2VTZXJ2aWNlLmdldEhpc3RvcmljYWxQcmljZXMoc3RvY2tfbmFtZSwgZnJvbSwgdG8pXHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IG9wcGVuaW5nID0gYXJyUHJpY2VzWzFdLnByaWNlXHJcbiAgICAgICAgbGV0IGNsb3NlID0gYXJyUHJpY2VzW2FyclByaWNlcy5sZW5ndGggLSAxIF0ucHJpY2VcclxuICAgICAgICBsZXQgbG93ID0gYXJyUHJpY2VzWzFdLnByaWNlXHJcbiAgICAgICAgbGV0IGhpZ2ggPSBhcnJQcmljZXNbMV0ucHJpY2VcclxuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGFyclByaWNlcykge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5wcmljZSA8IGxvdykge1xyXG4gICAgICAgICAgICAgICAgbG93ID0gaXRlbS5wcmljZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpdGVtLnByaWNlID4gaGlnaCkge1xyXG4gICAgICAgICAgICAgICAgaGlnaCA9IGl0ZW0ucHJpY2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB0b0RhdGEgPSBuZXcgRGF0ZSh0byk7XHJcbiAgICAgICAgdG9EYXRhLnNldERhdGUodG9EYXRhLmdldERhdGUoKSAtIDEpO1xyXG4gICAgICAgIGNvbnN0IHByaWNlZEF0ID0gdG9EYXRhLnRvSVNPU3RyaW5nKCk7XHJcbiAgICAgICAgb3BwZW5pbmcgPSBmb3JtYXRDdXJyZW5jeShvcHBlbmluZylcclxuICAgICAgICBsb3cgPSBmb3JtYXRDdXJyZW5jeShsb3cpXHJcbiAgICAgICAgaGlnaCA9IGZvcm1hdEN1cnJlbmN5KGhpZ2gpXHJcbiAgICAgICAgY2xvc2UgPSBmb3JtYXRDdXJyZW5jeShjbG9zZSlcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBib2R5ID0ge1xyXG4gICAgICAgICAgICBvcHBlbmluZyxcclxuICAgICAgICAgICAgbG93LFxyXG4gICAgICAgICAgICBoaWdoLFxyXG4gICAgICAgICAgICBjbG9zZSxcclxuICAgICAgICAgICAgcHJpY2VkQXQsXHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKGJvZHkpXHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnRXJybyBhbyBvYnRlciBjb3Rhw6fDo28uJyB9KTtcclxuICAgIH1cclxufSJdLCJuYW1lcyI6WyJBbHBoYVZhbnRhZ2VTZXJ2aWNlIiwiRGF0YUZvcm1hdCIsImZvcm1hdEN1cnJlbmN5IiwiY2FsY3VsYXRlQXZlcmFnZSIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJzdG9ja19uYW1lIiwiZnJvbSIsInRvIiwicXVlcnkiLCJhcnJQcmljZXMiLCJnZXRIaXN0b3JpY2FsUHJpY2VzIiwib3BwZW5pbmciLCJwcmljZSIsImNsb3NlIiwibGVuZ3RoIiwibG93IiwiaGlnaCIsIml0ZW0iLCJ0b0RhdGEiLCJEYXRlIiwic2V0RGF0ZSIsImdldERhdGUiLCJwcmljZWRBdCIsInRvSVNPU3RyaW5nIiwiYm9keSIsInN0YXR1cyIsImpzb24iLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/stocks/[stock_name]/history.js\n");

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

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _api_axiosConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/axiosConfig */ \"(api)/./src/Backend/api/axiosConfig.js\");\n/* harmony import */ var _utils_priceUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/priceUtils */ \"(api)/./utils/priceUtils.js\");\n/* harmony import */ var _utils_date8601__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/date8601 */ \"(api)/./utils/date8601.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api_axiosConfig__WEBPACK_IMPORTED_MODULE_0__]);\n_api_axiosConfig__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\nclass AlphaVantageService {\n    static async getCotacaoMaisRecente(symbol) {\n        try {\n            const response = await _api_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(\"\", {\n                params: {\n                    function: \"GLOBAL_QUOTE\",\n                    symbol: symbol\n                }\n            });\n            return response.data[\"Global Quote\"][\"05. price\"];\n        } catch (error) {\n            console.error(error);\n            throw new Error(\"Erro ao buscar cota\\xe7\\xe3o\");\n        }\n    }\n    static async getHistoricalPrices(stockName, from, to) {\n        try {\n            const params = {\n                function: \"TIME_SERIES_DAILY_ADJUSTED\",\n                symbol: stockName\n            };\n            if (from) {\n                params.outputsize = \"full\";\n                params.start_date = from;\n            }\n            if (to) {\n                params.end_date = to;\n            }\n            const response = await _api_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(\"\", {\n                params\n            });\n            const arrPrices = [];\n            for (const [date, values] of Object.entries(response.data[\"Time Series (Daily)\"])){\n                if (date >= from && date <= to) {\n                    arrPrices.push({\n                        date,\n                        price: values[\"4. close\"]\n                    });\n                }\n            }\n            return arrPrices;\n        } catch (error) {\n            console.error(error);\n            throw new Error(\"Erro ao obter hist\\xf3rico de pre\\xe7os\");\n        }\n    }\n    static async getGains(stockName, purchasedAmount, purchasedAt) {\n        try {\n            const currentPrice = await this.getCotacaoMaisRecente(stockName);\n            if (!currentPrice) {\n                return \"Api n\\xe3o consegui Buscar informa\\xe7\\xf5es desta a\\xe7\\xe3o para est\\xe1 data\";\n            }\n            let data = new Date();\n            data = (0,_utils_date8601__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(data);\n            const historicalPrices = await this.getHistoricalPrices(stockName, purchasedAt, data);\n            if (!historicalPrices) {\n                return \"Api n\\xe3o consegui Buscar informa\\xe7\\xf5es desta a\\xe7\\xe3o para est\\xe1 data\";\n            }\n            let purchasedPrice = historicalPrices.find((price)=>price.date === purchasedAt)?.price;\n            let lastPrice = currentPrice;\n            if (!purchasedPrice) {\n                throw new Error(\"N\\xe3o h\\xe1 dados de pre\\xe7os na data de compra\");\n            }\n            let capitalGains = (lastPrice - purchasedPrice) * purchasedAmount;\n            lastPrice = (0,_utils_priceUtils__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(lastPrice);\n            capitalGains = (0,_utils_priceUtils__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(capitalGains);\n            purchasedPrice = (0,_utils_priceUtils__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(purchasedPrice);\n            const result = {\n                name: stockName,\n                purchasedAmount: purchasedAmount,\n                purchasedAt: purchasedAt,\n                priceAtDate: purchasedPrice,\n                lastPrice: lastPrice,\n                capitalGains: capitalGains\n            };\n            return result;\n        } catch (error) {\n            console.error(error);\n            throw new Error(\"Erro ao projetar ganhos\");\n        }\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AlphaVantageService);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvQmFja2VuZC9zZXJ2aWNlcy9hbHBoYVZhbnRhZ2VTZXJ2aWNlLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBdUM7QUFDZ0I7QUFDTjtBQUNqRCxNQUFNRztJQUNKLGFBQWFDLHNCQUFzQkMsTUFBTSxFQUFFO1FBQ3pDLElBQUk7WUFDRixNQUFNQyxXQUFXLE1BQU1OLDREQUFTLENBQUMsSUFBSTtnQkFDbkNRLFFBQVE7b0JBQ05DLFVBQVU7b0JBQ1ZKLFFBQVFBO2dCQUNWO1lBQ0Y7WUFDQSxPQUFPQyxTQUFTSSxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVk7UUFDbkQsRUFBRSxPQUFPQyxPQUFPO1lBQ2RDLFFBQVFELEtBQUssQ0FBQ0E7WUFDZCxNQUFNLElBQUlFLE1BQU0sZ0NBQTBCO1FBQzVDO0lBQ0Y7SUFDQSxhQUFhQyxvQkFBb0JDLFNBQVMsRUFBRUMsSUFBSSxFQUFFQyxFQUFFLEVBQUU7UUFDcEQsSUFBSTtZQUNGLE1BQU1ULFNBQVM7Z0JBQ2JDLFVBQVU7Z0JBQ1ZKLFFBQVFVO1lBQ1Y7WUFFQSxJQUFJQyxNQUFNO2dCQUNSUixPQUFPVSxVQUFVLEdBQUc7Z0JBQ3BCVixPQUFPVyxVQUFVLEdBQUdIO1lBQ3RCLENBQUM7WUFFRCxJQUFJQyxJQUFJO2dCQUNOVCxPQUFPWSxRQUFRLEdBQUdIO1lBQ3BCLENBQUM7WUFFRCxNQUFNWCxXQUFXLE1BQU1OLDREQUFTLENBQUMsSUFBSTtnQkFDbkNRO1lBQ0Y7WUFFQSxNQUFNYSxZQUFZLEVBQUU7WUFDcEIsS0FBSyxNQUFNLENBQUNDLE1BQU1DLE9BQU8sSUFBSUMsT0FBT0MsT0FBTyxDQUFDbkIsU0FBU0ksSUFBSSxDQUFDLHNCQUFzQixFQUFHO2dCQUNqRixJQUFJWSxRQUFRTixRQUFRTSxRQUFRTCxJQUFJO29CQUM5QkksVUFBVUssSUFBSSxDQUFDO3dCQUNiSjt3QkFDQUssT0FBT0osTUFBTSxDQUFDLFdBQVc7b0JBQzNCO2dCQUNGLENBQUM7WUFDSDtZQUVBLE9BQU9GO1FBQ1QsRUFBRSxPQUFPVixPQUFPO1lBQ2RDLFFBQVFELEtBQUssQ0FBQ0E7WUFDZCxNQUFNLElBQUlFLE1BQU0sMkNBQXFDO1FBQ3ZEO0lBQ0Y7SUFDQSxhQUFhZSxTQUFTYixTQUFTLEVBQUVjLGVBQWUsRUFBRUMsV0FBVyxFQUFFO1FBQzdELElBQUk7WUFFRixNQUFNQyxlQUFlLE1BQU0sSUFBSSxDQUFDM0IscUJBQXFCLENBQUNXO1lBQ3RELElBQUcsQ0FBQ2dCLGNBQWE7Z0JBQ2YsT0FBTztZQUNULENBQUM7WUFDRCxJQUFJckIsT0FBTyxJQUFJc0I7WUFDZnRCLE9BQU9SLDJEQUFVQSxDQUFDUTtZQUVsQixNQUFNdUIsbUJBQW1CLE1BQU0sSUFBSSxDQUFDbkIsbUJBQW1CLENBQUNDLFdBQVdlLGFBQWFwQjtZQUNoRixJQUFHLENBQUN1QixrQkFBaUI7Z0JBQ25CLE9BQU87WUFDVCxDQUFDO1lBQ0QsSUFBSUMsaUJBQWlCRCxpQkFBaUJFLElBQUksQ0FBQ1IsQ0FBQUEsUUFBU0EsTUFBTUwsSUFBSSxLQUFLUSxjQUFjSDtZQUVqRixJQUFJUyxZQUFZTDtZQUVoQixJQUFJLENBQUNHLGdCQUFnQjtnQkFDbkIsTUFBTSxJQUFJckIsTUFBTSxxREFBNEM7WUFDOUQsQ0FBQztZQUVELElBQUl3QixlQUFlLENBQUNELFlBQVlGLGNBQWEsSUFBS0w7WUFFbERPLFlBQVluQyw2REFBY0EsQ0FBQ21DO1lBQzNCQyxlQUFlcEMsNkRBQWNBLENBQUNvQztZQUM5QkgsaUJBQWlCakMsNkRBQWNBLENBQUNpQztZQUVoQyxNQUFNSSxTQUFTO2dCQUNiQyxNQUFNeEI7Z0JBQ05jLGlCQUFpQkE7Z0JBQ2pCQyxhQUFhQTtnQkFDYlUsYUFBYU47Z0JBQ2JFLFdBQVdBO2dCQUNYQyxjQUFjQTtZQUNoQjtZQUVBLE9BQU9DO1FBQ1QsRUFBRSxPQUFPM0IsT0FBTztZQUNkQyxRQUFRRCxLQUFLLENBQUNBO1lBQ2QsTUFBTSxJQUFJRSxNQUFNLDJCQUEyQjtRQUM3QztJQUNGO0FBRUY7QUFFQSxpRUFBZVYsbUJBQW1CQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaGlyaW5nUmlzc29saS8uL3NyYy9CYWNrZW5kL3NlcnZpY2VzL2FscGhhVmFudGFnZVNlcnZpY2UuanM/MWM4ZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSAnLi4vYXBpL2F4aW9zQ29uZmlnJztcclxuaW1wb3J0IGZvcm1hdEN1cnJlbmN5IGZyb20gJy4uLy4uLy4uL3V0aWxzL3ByaWNlVXRpbHMnO1xyXG5pbXBvcnQgRGF0YUZvcm1hdCBmcm9tICcuLi8uLi8uLi91dGlscy9kYXRlODYwMSc7XHJcbmNsYXNzIEFscGhhVmFudGFnZVNlcnZpY2Uge1xyXG4gIHN0YXRpYyBhc3luYyBnZXRDb3RhY2FvTWFpc1JlY2VudGUoc3ltYm9sKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldCgnJywge1xyXG4gICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgZnVuY3Rpb246ICdHTE9CQUxfUVVPVEUnLFxyXG4gICAgICAgICAgc3ltYm9sOiBzeW1ib2wsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiByZXNwb25zZS5kYXRhWydHbG9iYWwgUXVvdGUnXVsnMDUuIHByaWNlJ107XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvIGFvIGJ1c2NhciBjb3Rhw6fDo28nKTtcclxuICAgIH1cclxuICB9XHJcbiAgc3RhdGljIGFzeW5jIGdldEhpc3RvcmljYWxQcmljZXMoc3RvY2tOYW1lLCBmcm9tLCB0bykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcGFyYW1zID0ge1xyXG4gICAgICAgIGZ1bmN0aW9uOiAnVElNRV9TRVJJRVNfREFJTFlfQURKVVNURUQnLFxyXG4gICAgICAgIHN5bWJvbDogc3RvY2tOYW1lLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKGZyb20pIHtcclxuICAgICAgICBwYXJhbXMub3V0cHV0c2l6ZSA9ICdmdWxsJztcclxuICAgICAgICBwYXJhbXMuc3RhcnRfZGF0ZSA9IGZyb207XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0bykge1xyXG4gICAgICAgIHBhcmFtcy5lbmRfZGF0ZSA9IHRvO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldCgnJywge1xyXG4gICAgICAgIHBhcmFtcyxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb25zdCBhcnJQcmljZXMgPSBbXTtcclxuICAgICAgZm9yIChjb25zdCBbZGF0ZSwgdmFsdWVzXSBvZiBPYmplY3QuZW50cmllcyhyZXNwb25zZS5kYXRhWydUaW1lIFNlcmllcyAoRGFpbHkpJ10pKSB7XHJcbiAgICAgICAgaWYgKGRhdGUgPj0gZnJvbSAmJiBkYXRlIDw9IHRvKSB7XHJcbiAgICAgICAgICBhcnJQcmljZXMucHVzaCh7XHJcbiAgICAgICAgICAgIGRhdGUsXHJcbiAgICAgICAgICAgIHByaWNlOiB2YWx1ZXNbJzQuIGNsb3NlJ10sXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIHJldHVybiBhcnJQcmljZXM7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvIGFvIG9idGVyIGhpc3TDs3JpY28gZGUgcHJlw6dvcycpO1xyXG4gICAgfVxyXG4gIH1cclxuICBzdGF0aWMgYXN5bmMgZ2V0R2FpbnMoc3RvY2tOYW1lLCBwdXJjaGFzZWRBbW91bnQsIHB1cmNoYXNlZEF0KSB7XHJcbiAgICB0cnkge1xyXG5cclxuICAgICAgY29uc3QgY3VycmVudFByaWNlID0gYXdhaXQgdGhpcy5nZXRDb3RhY2FvTWFpc1JlY2VudGUoc3RvY2tOYW1lKTtcclxuICAgICAgaWYoIWN1cnJlbnRQcmljZSl7XHJcbiAgICAgICAgcmV0dXJuIFwiQXBpIG7Do28gY29uc2VndWkgQnVzY2FyIGluZm9ybWHDp8O1ZXMgZGVzdGEgYcOnw6NvIHBhcmEgZXN0w6EgZGF0YVwiXHJcbiAgICAgIH1cclxuICAgICAgbGV0IGRhdGEgPSBuZXcgRGF0ZSgpXHJcbiAgICAgIGRhdGEgPSBEYXRhRm9ybWF0KGRhdGEpO1xyXG5cclxuICAgICAgY29uc3QgaGlzdG9yaWNhbFByaWNlcyA9IGF3YWl0IHRoaXMuZ2V0SGlzdG9yaWNhbFByaWNlcyhzdG9ja05hbWUsIHB1cmNoYXNlZEF0LCBkYXRhKTtcclxuICAgICAgaWYoIWhpc3RvcmljYWxQcmljZXMpe1xyXG4gICAgICAgIHJldHVybiBcIkFwaSBuw6NvIGNvbnNlZ3VpIEJ1c2NhciBpbmZvcm1hw6fDtWVzIGRlc3RhIGHDp8OjbyBwYXJhIGVzdMOhIGRhdGFcIlxyXG4gICAgICB9XHJcbiAgICAgIGxldCBwdXJjaGFzZWRQcmljZSA9IGhpc3RvcmljYWxQcmljZXMuZmluZChwcmljZSA9PiBwcmljZS5kYXRlID09PSBwdXJjaGFzZWRBdCk/LnByaWNlO1xyXG5cclxuICAgICAgbGV0IGxhc3RQcmljZSA9IGN1cnJlbnRQcmljZTtcclxuXHJcbiAgICAgIGlmICghcHVyY2hhc2VkUHJpY2UpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ07Do28gaMOhIGRhZG9zIGRlIHByZcOnb3MgbmEgZGF0YSBkZSBjb21wcmEnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgbGV0IGNhcGl0YWxHYWlucyA9IChsYXN0UHJpY2UgLSBwdXJjaGFzZWRQcmljZSkgKiBwdXJjaGFzZWRBbW91bnQ7XHJcblxyXG4gICAgICBsYXN0UHJpY2UgPSBmb3JtYXRDdXJyZW5jeShsYXN0UHJpY2UpXHJcbiAgICAgIGNhcGl0YWxHYWlucyA9IGZvcm1hdEN1cnJlbmN5KGNhcGl0YWxHYWlucylcclxuICAgICAgcHVyY2hhc2VkUHJpY2UgPSBmb3JtYXRDdXJyZW5jeShwdXJjaGFzZWRQcmljZSlcclxuICAgICAgXHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHtcclxuICAgICAgICBuYW1lOiBzdG9ja05hbWUsXHJcbiAgICAgICAgcHVyY2hhc2VkQW1vdW50OiBwdXJjaGFzZWRBbW91bnQsXHJcbiAgICAgICAgcHVyY2hhc2VkQXQ6IHB1cmNoYXNlZEF0LFxyXG4gICAgICAgIHByaWNlQXREYXRlOiBwdXJjaGFzZWRQcmljZSxcclxuICAgICAgICBsYXN0UHJpY2U6IGxhc3RQcmljZSxcclxuICAgICAgICBjYXBpdGFsR2FpbnM6IGNhcGl0YWxHYWluc1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm8gYW8gcHJvamV0YXIgZ2FuaG9zJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQWxwaGFWYW50YWdlU2VydmljZTsiXSwibmFtZXMiOlsiYXhpb3MiLCJmb3JtYXRDdXJyZW5jeSIsIkRhdGFGb3JtYXQiLCJBbHBoYVZhbnRhZ2VTZXJ2aWNlIiwiZ2V0Q290YWNhb01haXNSZWNlbnRlIiwic3ltYm9sIiwicmVzcG9uc2UiLCJnZXQiLCJwYXJhbXMiLCJmdW5jdGlvbiIsImRhdGEiLCJlcnJvciIsImNvbnNvbGUiLCJFcnJvciIsImdldEhpc3RvcmljYWxQcmljZXMiLCJzdG9ja05hbWUiLCJmcm9tIiwidG8iLCJvdXRwdXRzaXplIiwic3RhcnRfZGF0ZSIsImVuZF9kYXRlIiwiYXJyUHJpY2VzIiwiZGF0ZSIsInZhbHVlcyIsIk9iamVjdCIsImVudHJpZXMiLCJwdXNoIiwicHJpY2UiLCJnZXRHYWlucyIsInB1cmNoYXNlZEFtb3VudCIsInB1cmNoYXNlZEF0IiwiY3VycmVudFByaWNlIiwiRGF0ZSIsImhpc3RvcmljYWxQcmljZXMiLCJwdXJjaGFzZWRQcmljZSIsImZpbmQiLCJsYXN0UHJpY2UiLCJjYXBpdGFsR2FpbnMiLCJyZXN1bHQiLCJuYW1lIiwicHJpY2VBdERhdGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./src/Backend/services/alphaVantageService.js\n");

/***/ }),

/***/ "(api)/./utils/averagePrice.js":
/*!*******************************!*\
  !*** ./utils/averagePrice.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ calculateAverage)\n/* harmony export */ });\n/* harmony import */ var _priceUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./priceUtils */ \"(api)/./utils/priceUtils.js\");\n\nfunction calculateAverage(high, low) {\n    high = high.replace(/[^\\d.]/g, \"\");\n    low = low.replace(/[^\\d.]/g, \"\");\n    high = parseFloat(high);\n    low = parseFloat(low);\n    let average = (high + low) / 2 / 100;\n    average = (0,_priceUtils__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(average);\n    return average;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi91dGlscy9hdmVyYWdlUHJpY2UuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBMEM7QUFFM0IsU0FBU0MsaUJBQWlCQyxJQUFJLEVBQUVDLEdBQUcsRUFBRTtJQUNoREQsT0FBT0EsS0FBS0UsT0FBTyxDQUFDLFdBQVc7SUFDL0JELE1BQU1BLElBQUlDLE9BQU8sQ0FBQyxXQUFXO0lBQzdCRixPQUFPRyxXQUFXSDtJQUNsQkMsTUFBTUUsV0FBV0Y7SUFDakIsSUFBSUcsVUFBVSxDQUFFSixPQUFPQyxHQUFFLElBQUssSUFBRztJQUNqQ0csVUFBVU4sdURBQWNBLENBQUNNO0lBQ3pCLE9BQU9BO0FBQ1gsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2hpcmluZ1Jpc3NvbGkvLi91dGlscy9hdmVyYWdlUHJpY2UuanM/ODlhMyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZm9ybWF0Q3VycmVuY3kgZnJvbSBcIi4vcHJpY2VVdGlsc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2FsY3VsYXRlQXZlcmFnZShoaWdoLCBsb3cpIHtcclxuICAgIGhpZ2ggPSBoaWdoLnJlcGxhY2UoL1teXFxkLl0vZywgJycpXHJcbiAgICBsb3cgPSBsb3cucmVwbGFjZSgvW15cXGQuXS9nLCAnJylcclxuICAgIGhpZ2ggPSBwYXJzZUZsb2F0KGhpZ2gpXHJcbiAgICBsb3cgPSBwYXJzZUZsb2F0KGxvdylcclxuICAgIGxldCBhdmVyYWdlID0gKChoaWdoICsgbG93KSAvIDIpLzEwMFxyXG4gICAgYXZlcmFnZSA9IGZvcm1hdEN1cnJlbmN5KGF2ZXJhZ2UpXHJcbiAgICByZXR1cm4gYXZlcmFnZTtcclxufSJdLCJuYW1lcyI6WyJmb3JtYXRDdXJyZW5jeSIsImNhbGN1bGF0ZUF2ZXJhZ2UiLCJoaWdoIiwibG93IiwicmVwbGFjZSIsInBhcnNlRmxvYXQiLCJhdmVyYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./utils/averagePrice.js\n");

/***/ }),

/***/ "(api)/./utils/date8601.js":
/*!***************************!*\
  !*** ./utils/date8601.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ DataFormat)\n/* harmony export */ });\nfunction DataFormat(data) {\n    const dia = data.getDate().toString().padStart(2, \"0\");\n    const mes = (data.getMonth() + 1).toString().padStart(2, \"0\");\n    const ano = data.getFullYear().toString();\n    return `${ano}-${dia}-${mes}/`;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi91dGlscy9kYXRlODYwMS5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQWUsU0FBU0EsV0FBV0MsSUFBSSxFQUFFO0lBQ3JDLE1BQU1DLE1BQU1ELEtBQUtFLE9BQU8sR0FBR0MsUUFBUSxHQUFHQyxRQUFRLENBQUMsR0FBRztJQUNsRCxNQUFNQyxNQUFNLENBQUNMLEtBQUtNLFFBQVEsS0FBSyxHQUFHSCxRQUFRLEdBQUdDLFFBQVEsQ0FBQyxHQUFHO0lBQ3pELE1BQU1HLE1BQU1QLEtBQUtRLFdBQVcsR0FBR0wsUUFBUTtJQUV2QyxPQUFPLENBQUMsRUFBRUksSUFBSSxDQUFDLEVBQUVOLElBQUksQ0FBQyxFQUFFSSxJQUFJLENBQUMsQ0FBQztBQUNsQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaGlyaW5nUmlzc29saS8uL3V0aWxzL2RhdGU4NjAxLmpzP2JhOWIiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGF0YUZvcm1hdChkYXRhKSB7XHJcbiAgICBjb25zdCBkaWEgPSBkYXRhLmdldERhdGUoKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyk7XHJcbiAgICBjb25zdCBtZXMgPSAoZGF0YS5nZXRNb250aCgpICsgMSkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpO1xyXG4gICAgY29uc3QgYW5vID0gZGF0YS5nZXRGdWxsWWVhcigpLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgcmV0dXJuIGAke2Fub30tJHtkaWF9LSR7bWVzfS9gO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJEYXRhRm9ybWF0IiwiZGF0YSIsImRpYSIsImdldERhdGUiLCJ0b1N0cmluZyIsInBhZFN0YXJ0IiwibWVzIiwiZ2V0TW9udGgiLCJhbm8iLCJnZXRGdWxsWWVhciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./utils/date8601.js\n");

/***/ }),

/***/ "(api)/./utils/dateUtils.js":
/*!****************************!*\
  !*** ./utils/dateUtils.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ DataFormat)\n/* harmony export */ });\nfunction DataFormat(data) {\n    const dia = data.getDate().toString().padStart(2, \"0\");\n    const mes = (data.getMonth() + 1).toString().padStart(2, \"0\");\n    const ano = data.getFullYear().toString();\n    return `${dia}/${mes}/${ano}`;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi91dGlscy9kYXRlVXRpbHMuanMuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFlLFNBQVNBLFdBQVdDLElBQUksRUFBRTtJQUNyQyxNQUFNQyxNQUFNRCxLQUFLRSxPQUFPLEdBQUdDLFFBQVEsR0FBR0MsUUFBUSxDQUFDLEdBQUc7SUFDbEQsTUFBTUMsTUFBTSxDQUFDTCxLQUFLTSxRQUFRLEtBQUssR0FBR0gsUUFBUSxHQUFHQyxRQUFRLENBQUMsR0FBRztJQUN6RCxNQUFNRyxNQUFNUCxLQUFLUSxXQUFXLEdBQUdMLFFBQVE7SUFFdkMsT0FBTyxDQUFDLEVBQUVGLElBQUksQ0FBQyxFQUFFSSxJQUFJLENBQUMsRUFBRUUsSUFBSSxDQUFDO0FBQ2pDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oaXJpbmdSaXNzb2xpLy4vdXRpbHMvZGF0ZVV0aWxzLmpzPzJkZDEiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGF0YUZvcm1hdChkYXRhKSB7XHJcbiAgICBjb25zdCBkaWEgPSBkYXRhLmdldERhdGUoKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyk7XHJcbiAgICBjb25zdCBtZXMgPSAoZGF0YS5nZXRNb250aCgpICsgMSkudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpO1xyXG4gICAgY29uc3QgYW5vID0gZGF0YS5nZXRGdWxsWWVhcigpLnRvU3RyaW5nKCk7XHJcblxyXG4gICAgcmV0dXJuIGAke2RpYX0vJHttZXN9LyR7YW5vfWA7XHJcbn1cclxuIl0sIm5hbWVzIjpbIkRhdGFGb3JtYXQiLCJkYXRhIiwiZGlhIiwiZ2V0RGF0ZSIsInRvU3RyaW5nIiwicGFkU3RhcnQiLCJtZXMiLCJnZXRNb250aCIsImFubyIsImdldEZ1bGxZZWFyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./utils/dateUtils.js\n");

/***/ }),

/***/ "(api)/./utils/priceUtils.js":
/*!*****************************!*\
  !*** ./utils/priceUtils.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ formatCurrency)\n/* harmony export */ });\nfunction formatCurrency(value) {\n    const formattedValue = new Intl.NumberFormat(\"pt-BR\", {\n        style: \"currency\",\n        currency: \"BRL\"\n    }).format(value);\n    return formattedValue;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi91dGlscy9wcmljZVV0aWxzLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBZSxTQUFTQSxlQUFlQyxLQUFLLEVBQUU7SUFDMUMsTUFBTUMsaUJBQWlCLElBQUlDLEtBQUtDLFlBQVksQ0FBQyxTQUFTO1FBQ3BEQyxPQUFPO1FBQ1BDLFVBQVU7SUFDWixHQUFHQyxNQUFNLENBQUNOO0lBRVYsT0FBT0M7QUFDVCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaGlyaW5nUmlzc29saS8uL3V0aWxzL3ByaWNlVXRpbHMuanM/OTI1NCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmb3JtYXRDdXJyZW5jeSh2YWx1ZSkge1xyXG4gICAgY29uc3QgZm9ybWF0dGVkVmFsdWUgPSBuZXcgSW50bC5OdW1iZXJGb3JtYXQoJ3B0LUJSJywge1xyXG4gICAgICBzdHlsZTogJ2N1cnJlbmN5JyxcclxuICAgICAgY3VycmVuY3k6ICdCUkwnXHJcbiAgICB9KS5mb3JtYXQodmFsdWUpO1xyXG4gICAgXHJcbiAgICByZXR1cm4gZm9ybWF0dGVkVmFsdWU7XHJcbiAgfSJdLCJuYW1lcyI6WyJmb3JtYXRDdXJyZW5jeSIsInZhbHVlIiwiZm9ybWF0dGVkVmFsdWUiLCJJbnRsIiwiTnVtYmVyRm9ybWF0Iiwic3R5bGUiLCJjdXJyZW5jeSIsImZvcm1hdCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./utils/priceUtils.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/stocks/[stock_name]/history.js"));
module.exports = __webpack_exports__;

})();