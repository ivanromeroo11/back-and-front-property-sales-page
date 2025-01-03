/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/mapa.js":
/*!************************!*\
  !*** ./src/js/mapa.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n(function() {\n    // Logical OR\n    const lat =  document.querySelector('#lat').value || 36.9208667;\n    const lng = document.querySelector('#lng').value || -5.5388264;\n    const mapa = L.map('mapa').setView([lat, lng ], 16);\n    let marker;\n\n    //Utilizar Provider y Geocoder\n\n    const geocodeService = L.esri.Geocoding.geocodeService();\n    \n\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\n    }).addTo(mapa);\n\n    //el pin\n    marker = new L.marker([lat, lng],{\n        draggable: true,\n        autoPan: true\n    })\n    .addTo(mapa)\n\n    //Detectar el movimiento del pin \n\n    marker.on('moveend', function(e){\n        marker = e.target\n        const posicion = marker.getLatLng();\n        mapa.panTo(new L.LatLng(posicion.lat, posicion.lng));\n\n        // Obtener la información de la ubicación\n        geocodeService.reverse().latlng(posicion, 16).run(function(error, result) {\n            console.log(result);\n\n            marker.bindPopup(result.address.LongLabel);\n\n            // Llenar los campos de dirección\n\n            document.querySelector('.calle').textContent = result?.address?.Address ?? '';\n            document.querySelector('#calle').value = result?.address?.Address ?? '';\n            document.querySelector('#lat').value = result?.latlng?.lat ?? '';\n            document.querySelector('#lng').value = result?.latlng?.lng ?? '';\n        })\n           \n    })\n\n})()\n\n//# sourceURL=webpack://backend/./src/js/mapa.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/mapa.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;