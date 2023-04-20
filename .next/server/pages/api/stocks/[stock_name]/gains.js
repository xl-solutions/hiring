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
exports.id = "pages/api/stocks/[stock_name]/gains";
exports.ids = ["pages/api/stocks/[stock_name]/gains"];
exports.modules = {

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ "(api)/./pages/api/stocks/[stock_name]/gains.js":
/*!************************************************!*\
  !*** ./pages/api/stocks/[stock_name]/gains.js ***!
  \************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _Backend_services_alphaVantageService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/Backend/services/alphaVantageService */ \"(api)/./src/Backend/services/alphaVantageService.js\");\n/* harmony import */ var _utils_dateUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../utils/dateUtils */ \"(api)/./utils/dateUtils.js\");\n/* harmony import */ var _utils_priceUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../utils/priceUtils */ \"(api)/./utils/priceUtils.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Backend_services_alphaVantageService__WEBPACK_IMPORTED_MODULE_0__]);\n_Backend_services_alphaVantageService__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\nasync function handler(req, res) {\n    const { stock_name , purchasedAmount , purchasedAt  } = req.query;\n    try {\n        const response = await _Backend_services_alphaVantageService__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getGains(stock_name, purchasedAmount, purchasedAt);\n        res.status(200).json(response);\n    } catch (error) {\n        console.log(error);\n        res.status(500).json({\n            error: \"Erro ao obter cota\\xe7\\xe3o.\"\n        });\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvc3RvY2tzL1tzdG9ja19uYW1lXS9nYWlucy5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQXdFO0FBQ25CO0FBQ0s7QUFDM0MsZUFBZUcsUUFBUUMsR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFDNUMsTUFBTSxFQUFFQyxXQUFVLEVBQUNDLGdCQUFlLEVBQUVDLFlBQVcsRUFBRSxHQUFHSixJQUFJSyxLQUFLO0lBRTdELElBQUk7UUFDQSxNQUFNQyxXQUFXLE1BQU1WLHNGQUE0QixDQUFDTSxZQUFXQyxpQkFBZ0JDO1FBRy9FSCxJQUFJTyxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDSDtJQUN6QixFQUFFLE9BQU9JLE9BQU87UUFDWkMsUUFBUUMsR0FBRyxDQUFDRjtRQUNaVCxJQUFJTyxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBeUI7SUFDM0Q7QUFDSixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaGlyaW5nUmlzc29saS8uL3BhZ2VzL2FwaS9zdG9ja3MvW3N0b2NrX25hbWVdL2dhaW5zLmpzPzE0NmQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFscGhhVmFudGFnZVNlcnZpY2UgZnJvbSBcIkAvQmFja2VuZC9zZXJ2aWNlcy9hbHBoYVZhbnRhZ2VTZXJ2aWNlXCJcclxuaW1wb3J0IERhdGFGb3JtYXQgZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2RhdGVVdGlsc1wiO1xyXG5pbXBvcnQgZm9ybWF0Q3VycmVuY3kgZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL3ByaWNlVXRpbHNcIjtcclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihyZXEsIHJlcykge1xyXG4gICAgY29uc3QgeyBzdG9ja19uYW1lLHB1cmNoYXNlZEFtb3VudCwgcHVyY2hhc2VkQXQgfSA9IHJlcS5xdWVyeTtcclxuICAgXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgQWxwaGFWYW50YWdlU2VydmljZS5nZXRHYWlucyhzdG9ja19uYW1lLHB1cmNoYXNlZEFtb3VudCxwdXJjaGFzZWRBdClcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24ocmVzcG9uc2UpXHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnRXJybyBhbyBvYnRlciBjb3Rhw6fDo28uJyB9KTtcclxuICAgIH1cclxufSJdLCJuYW1lcyI6WyJBbHBoYVZhbnRhZ2VTZXJ2aWNlIiwiRGF0YUZvcm1hdCIsImZvcm1hdEN1cnJlbmN5IiwiaGFuZGxlciIsInJlcSIsInJlcyIsInN0b2NrX25hbWUiLCJwdXJjaGFzZWRBbW91bnQiLCJwdXJjaGFzZWRBdCIsInF1ZXJ5IiwicmVzcG9uc2UiLCJnZXRHYWlucyIsInN0YXR1cyIsImpzb24iLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/stocks/[stock_name]/gains.js\n");

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

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _api_axiosConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/axiosConfig */ \"(api)/./src/Backend/api/axiosConfig.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api_axiosConfig__WEBPACK_IMPORTED_MODULE_0__]);\n_api_axiosConfig__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nclass AlphaVantageService {\n    static async getCotacaoMaisRecente(symbol) {\n        try {\n            const response = await _api_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(\"\", {\n                params: {\n                    function: \"GLOBAL_QUOTE\",\n                    symbol: symbol\n                }\n            });\n            return response.data[\"Global Quote\"][\"05. price\"];\n        } catch (error) {\n            console.error(error);\n            throw new Error(\"Erro ao buscar cota\\xe7\\xe3o\");\n        }\n    }\n    static async getHistoricalPrices(stockName, from, to) {\n        try {\n            const params = {\n                function: \"TIME_SERIES_DAILY_ADJUSTED\",\n                symbol: stockName\n            };\n            if (from) {\n                params.outputsize = \"full\";\n                params.start_date = from;\n            }\n            if (to) {\n                params.end_date = to;\n            }\n            const response = await _api_axiosConfig__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(\"\", {\n                params\n            });\n            const prices = [];\n            for (const [date, values] of Object.entries(response.data[\"Time Series (Daily)\"])){\n                if (date >= from && date <= to) {\n                    prices.push({\n                        date,\n                        price: values[\"4. close\"]\n                    });\n                }\n            }\n            return prices;\n        } catch (error) {\n            console.error(error);\n            throw new Error(\"Erro ao obter hist\\xf3rico de pre\\xe7os\");\n        }\n    }\n    static async getGains(stockName, purchasedAmount, purchasedAt) {\n        try {\n            const currentPrice = await this.getCotacaoMaisRecente(stockName);\n            let data = new Date();\n            const ano = data.getFullYear();\n            const mes = (data.getMonth() + 1).toString().padStart(2, \"0\");\n            const dia = data.getDate().toString().padStart(2, \"0\");\n            data = `${ano}-${mes}-${dia}`;\n            const historicalPrices = await this.getHistoricalPrices(stockName, purchasedAt, data);\n            const purchasedPrice = historicalPrices.find((price)=>price.date === purchasedAt)?.price;\n            const lastPrice = currentPrice;\n            if (!purchasedPrice) {\n                throw new Error(\"N\\xe3o h\\xe1 dados de pre\\xe7os na data de compra\");\n            }\n            const capitalGains = (lastPrice - purchasedPrice) * purchasedAmount;\n            const result = {\n                name: stockName,\n                purchasedAmount: purchasedAmount,\n                purchasedAt: purchasedAt,\n                priceAtDate: purchasedPrice,\n                lastPrice: lastPrice,\n                capitalGains: capitalGains\n            };\n            return result;\n        } catch (error) {\n            console.error(error);\n            throw new Error(\"Erro ao projetar ganhos\");\n        }\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AlphaVantageService);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvQmFja2VuZC9zZXJ2aWNlcy9hbHBoYVZhbnRhZ2VTZXJ2aWNlLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQXVDO0FBRXZDLE1BQU1DO0lBQ0osYUFBYUMsc0JBQXNCQyxNQUFNLEVBQUU7UUFDekMsSUFBSTtZQUNGLE1BQU1DLFdBQVcsTUFBTUosNERBQVMsQ0FBQyxJQUFJO2dCQUNuQ00sUUFBUTtvQkFDTkMsVUFBVTtvQkFDVkosUUFBUUE7Z0JBQ1Y7WUFDRjtZQUNBLE9BQU9DLFNBQVNJLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWTtRQUNuRCxFQUFFLE9BQU9DLE9BQU87WUFDZEMsUUFBUUQsS0FBSyxDQUFDQTtZQUNkLE1BQU0sSUFBSUUsTUFBTSxnQ0FBMEI7UUFDNUM7SUFDRjtJQUNBLGFBQWFDLG9CQUFvQkMsU0FBUyxFQUFFQyxJQUFJLEVBQUVDLEVBQUUsRUFBRTtRQUNwRCxJQUFJO1lBQ0YsTUFBTVQsU0FBUztnQkFDYkMsVUFBVTtnQkFDVkosUUFBUVU7WUFDVjtZQUVBLElBQUlDLE1BQU07Z0JBQ1JSLE9BQU9VLFVBQVUsR0FBRztnQkFDcEJWLE9BQU9XLFVBQVUsR0FBR0g7WUFDdEIsQ0FBQztZQUVELElBQUlDLElBQUk7Z0JBQ05ULE9BQU9ZLFFBQVEsR0FBR0g7WUFDcEIsQ0FBQztZQUVELE1BQU1YLFdBQVcsTUFBTUosNERBQVMsQ0FBQyxJQUFJO2dCQUNuQ007WUFDRjtZQUVBLE1BQU1hLFNBQVMsRUFBRTtZQUNqQixLQUFLLE1BQU0sQ0FBQ0MsTUFBTUMsT0FBTyxJQUFJQyxPQUFPQyxPQUFPLENBQUNuQixTQUFTSSxJQUFJLENBQUMsc0JBQXNCLEVBQUc7Z0JBQ2pGLElBQUlZLFFBQVFOLFFBQVFNLFFBQVFMLElBQUk7b0JBQzlCSSxPQUFPSyxJQUFJLENBQUM7d0JBQ1ZKO3dCQUNBSyxPQUFPSixNQUFNLENBQUMsV0FBVztvQkFDM0I7Z0JBQ0YsQ0FBQztZQUNIO1lBQ0EsT0FBT0Y7UUFDVCxFQUFFLE9BQU9WLE9BQU87WUFDZEMsUUFBUUQsS0FBSyxDQUFDQTtZQUNkLE1BQU0sSUFBSUUsTUFBTSwyQ0FBcUM7UUFDdkQ7SUFDRjtJQUNBLGFBQWFlLFNBQVNiLFNBQVMsRUFBRWMsZUFBZSxFQUFFQyxXQUFXLEVBQUU7UUFDN0QsSUFBSTtZQUVGLE1BQU1DLGVBQWUsTUFBTSxJQUFJLENBQUMzQixxQkFBcUIsQ0FBQ1c7WUFFdEQsSUFBSUwsT0FBTyxJQUFJc0I7WUFDZixNQUFNQyxNQUFNdkIsS0FBS3dCLFdBQVc7WUFDNUIsTUFBTUMsTUFBTSxDQUFDekIsS0FBSzBCLFFBQVEsS0FBSyxHQUFHQyxRQUFRLEdBQUdDLFFBQVEsQ0FBQyxHQUFHO1lBQ3pELE1BQU1DLE1BQU03QixLQUFLOEIsT0FBTyxHQUFHSCxRQUFRLEdBQUdDLFFBQVEsQ0FBQyxHQUFHO1lBQ2xENUIsT0FBTyxDQUFDLEVBQUV1QixJQUFJLENBQUMsRUFBRUUsSUFBSSxDQUFDLEVBQUVJLElBQUksQ0FBQztZQUU3QixNQUFNRSxtQkFBbUIsTUFBTSxJQUFJLENBQUMzQixtQkFBbUIsQ0FBQ0MsV0FBV2UsYUFBYXBCO1lBRWhGLE1BQU1nQyxpQkFBaUJELGlCQUFpQkUsSUFBSSxDQUFDaEIsQ0FBQUEsUUFBU0EsTUFBTUwsSUFBSSxLQUFLUSxjQUFjSDtZQUVuRixNQUFNaUIsWUFBWWI7WUFFbEIsSUFBSSxDQUFDVyxnQkFBZ0I7Z0JBQ25CLE1BQU0sSUFBSTdCLE1BQU0scURBQTRDO1lBQzlELENBQUM7WUFFRCxNQUFNZ0MsZUFBZSxDQUFDRCxZQUFZRixjQUFhLElBQUtiO1lBQ3BELE1BQU1pQixTQUFTO2dCQUNiQyxNQUFNaEM7Z0JBQ05jLGlCQUFpQkE7Z0JBQ2pCQyxhQUFhQTtnQkFDYmtCLGFBQWFOO2dCQUNiRSxXQUFXQTtnQkFDWEMsY0FBY0E7WUFDaEI7WUFFQSxPQUFPQztRQUNULEVBQUUsT0FBT25DLE9BQU87WUFDZEMsUUFBUUQsS0FBSyxDQUFDQTtZQUNkLE1BQU0sSUFBSUUsTUFBTSwyQkFBMkI7UUFDN0M7SUFDRjtBQUVGO0FBRUEsaUVBQWVWLG1CQUFtQkEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2hpcmluZ1Jpc3NvbGkvLi9zcmMvQmFja2VuZC9zZXJ2aWNlcy9hbHBoYVZhbnRhZ2VTZXJ2aWNlLmpzPzFjOGYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gJy4uL2FwaS9heGlvc0NvbmZpZyc7XHJcblxyXG5jbGFzcyBBbHBoYVZhbnRhZ2VTZXJ2aWNlIHtcclxuICBzdGF0aWMgYXN5bmMgZ2V0Q290YWNhb01haXNSZWNlbnRlKHN5bWJvbCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQoJycsIHtcclxuICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgIGZ1bmN0aW9uOiAnR0xPQkFMX1FVT1RFJyxcclxuICAgICAgICAgIHN5bWJvbDogc3ltYm9sLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YVsnR2xvYmFsIFF1b3RlJ11bJzA1LiBwcmljZSddO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXJybyBhbyBidXNjYXIgY290YcOnw6NvJyk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHN0YXRpYyBhc3luYyBnZXRIaXN0b3JpY2FsUHJpY2VzKHN0b2NrTmFtZSwgZnJvbSwgdG8pIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHtcclxuICAgICAgICBmdW5jdGlvbjogJ1RJTUVfU0VSSUVTX0RBSUxZX0FESlVTVEVEJyxcclxuICAgICAgICBzeW1ib2w6IHN0b2NrTmFtZSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmIChmcm9tKSB7XHJcbiAgICAgICAgcGFyYW1zLm91dHB1dHNpemUgPSAnZnVsbCc7XHJcbiAgICAgICAgcGFyYW1zLnN0YXJ0X2RhdGUgPSBmcm9tO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodG8pIHtcclxuICAgICAgICBwYXJhbXMuZW5kX2RhdGUgPSB0bztcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQoJycsIHtcclxuICAgICAgICBwYXJhbXMsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3QgcHJpY2VzID0gW107XHJcbiAgICAgIGZvciAoY29uc3QgW2RhdGUsIHZhbHVlc10gb2YgT2JqZWN0LmVudHJpZXMocmVzcG9uc2UuZGF0YVsnVGltZSBTZXJpZXMgKERhaWx5KSddKSkge1xyXG4gICAgICAgIGlmIChkYXRlID49IGZyb20gJiYgZGF0ZSA8PSB0bykge1xyXG4gICAgICAgICAgcHJpY2VzLnB1c2goe1xyXG4gICAgICAgICAgICBkYXRlLFxyXG4gICAgICAgICAgICBwcmljZTogdmFsdWVzWyc0LiBjbG9zZSddLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBwcmljZXM7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvIGFvIG9idGVyIGhpc3TDs3JpY28gZGUgcHJlw6dvcycpO1xyXG4gICAgfVxyXG4gIH1cclxuICBzdGF0aWMgYXN5bmMgZ2V0R2FpbnMoc3RvY2tOYW1lLCBwdXJjaGFzZWRBbW91bnQsIHB1cmNoYXNlZEF0KSB7XHJcbiAgICB0cnkge1xyXG5cclxuICAgICAgY29uc3QgY3VycmVudFByaWNlID0gYXdhaXQgdGhpcy5nZXRDb3RhY2FvTWFpc1JlY2VudGUoc3RvY2tOYW1lKTtcclxuXHJcbiAgICAgIGxldCBkYXRhID0gbmV3IERhdGUoKVxyXG4gICAgICBjb25zdCBhbm8gPSBkYXRhLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgIGNvbnN0IG1lcyA9IChkYXRhLmdldE1vbnRoKCkgKyAxKS50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyk7XHJcbiAgICAgIGNvbnN0IGRpYSA9IGRhdGEuZ2V0RGF0ZSgpLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcclxuICAgICAgZGF0YSA9IGAke2Fub30tJHttZXN9LSR7ZGlhfWA7XHJcblxyXG4gICAgICBjb25zdCBoaXN0b3JpY2FsUHJpY2VzID0gYXdhaXQgdGhpcy5nZXRIaXN0b3JpY2FsUHJpY2VzKHN0b2NrTmFtZSwgcHVyY2hhc2VkQXQsIGRhdGEpO1xyXG4gICAgICBcclxuICAgICAgY29uc3QgcHVyY2hhc2VkUHJpY2UgPSBoaXN0b3JpY2FsUHJpY2VzLmZpbmQocHJpY2UgPT4gcHJpY2UuZGF0ZSA9PT0gcHVyY2hhc2VkQXQpPy5wcmljZTtcclxuICAgICBcclxuICAgICAgY29uc3QgbGFzdFByaWNlID0gY3VycmVudFByaWNlO1xyXG5cclxuICAgICAgaWYgKCFwdXJjaGFzZWRQcmljZSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTsOjbyBow6EgZGFkb3MgZGUgcHJlw6dvcyBuYSBkYXRhIGRlIGNvbXByYScpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBjYXBpdGFsR2FpbnMgPSAobGFzdFByaWNlIC0gcHVyY2hhc2VkUHJpY2UpICogcHVyY2hhc2VkQW1vdW50O1xyXG4gICAgICBjb25zdCByZXN1bHQgPSB7XHJcbiAgICAgICAgbmFtZTogc3RvY2tOYW1lLFxyXG4gICAgICAgIHB1cmNoYXNlZEFtb3VudDogcHVyY2hhc2VkQW1vdW50LFxyXG4gICAgICAgIHB1cmNoYXNlZEF0OiBwdXJjaGFzZWRBdCxcclxuICAgICAgICBwcmljZUF0RGF0ZTogcHVyY2hhc2VkUHJpY2UsXHJcbiAgICAgICAgbGFzdFByaWNlOiBsYXN0UHJpY2UsXHJcbiAgICAgICAgY2FwaXRhbEdhaW5zOiBjYXBpdGFsR2FpbnNcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvIGFvIHByb2pldGFyIGdhbmhvcycpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFscGhhVmFudGFnZVNlcnZpY2U7Il0sIm5hbWVzIjpbImF4aW9zIiwiQWxwaGFWYW50YWdlU2VydmljZSIsImdldENvdGFjYW9NYWlzUmVjZW50ZSIsInN5bWJvbCIsInJlc3BvbnNlIiwiZ2V0IiwicGFyYW1zIiwiZnVuY3Rpb24iLCJkYXRhIiwiZXJyb3IiLCJjb25zb2xlIiwiRXJyb3IiLCJnZXRIaXN0b3JpY2FsUHJpY2VzIiwic3RvY2tOYW1lIiwiZnJvbSIsInRvIiwib3V0cHV0c2l6ZSIsInN0YXJ0X2RhdGUiLCJlbmRfZGF0ZSIsInByaWNlcyIsImRhdGUiLCJ2YWx1ZXMiLCJPYmplY3QiLCJlbnRyaWVzIiwicHVzaCIsInByaWNlIiwiZ2V0R2FpbnMiLCJwdXJjaGFzZWRBbW91bnQiLCJwdXJjaGFzZWRBdCIsImN1cnJlbnRQcmljZSIsIkRhdGUiLCJhbm8iLCJnZXRGdWxsWWVhciIsIm1lcyIsImdldE1vbnRoIiwidG9TdHJpbmciLCJwYWRTdGFydCIsImRpYSIsImdldERhdGUiLCJoaXN0b3JpY2FsUHJpY2VzIiwicHVyY2hhc2VkUHJpY2UiLCJmaW5kIiwibGFzdFByaWNlIiwiY2FwaXRhbEdhaW5zIiwicmVzdWx0IiwibmFtZSIsInByaWNlQXREYXRlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/Backend/services/alphaVantageService.js\n");

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
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/stocks/[stock_name]/gains.js"));
module.exports = __webpack_exports__;

})();