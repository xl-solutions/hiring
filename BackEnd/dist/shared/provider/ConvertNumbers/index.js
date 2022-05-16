"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertAndParseFloat = void 0;

const convertAndParseFloat = priceClose => {
  return Number(parseFloat(priceClose).toFixed(2));
};

exports.convertAndParseFloat = convertAndParseFloat;