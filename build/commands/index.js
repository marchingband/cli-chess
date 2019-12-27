// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _inkGradient = _interopRequireDefault(require("ink-gradient"));

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const odd = x => x % 2 == 1;

const set = (x, y, newPiece) => (line, i) => line.map((piece, j) => j == x && i == y ? newPiece : piece);

const EMPTY_SQUARE = {
  p: ' ',
  c: 'e'
};

const Sq = ({
  p,
  cursor,
  bgIsWhite
}) => _react.default.createElement(_ink.Color, {
  hex: p.c == 'b' ? "#000000" : '#FFFFFF',
  bgHex: cursor ? '#C2BD79' : bgIsWhite ? "#555555" : "#999999"
}, _react.default.createElement(_ink.Box, {
  width: 3,
  justifyContent: "center",
  alignItems: "center"
}, p.c == 'b' ? _chalk.default.bold(' ' + p.p + ' ') : ' ' + p.p + ' '));

const initBoard = [['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'].map(x => ({
  p: x,
  c: 'w'
})), ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'].map(x => ({
  p: x,
  c: 'w'
})), [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '].map(x => ({
  p: x,
  c: 'e'
})), [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '].map(x => ({
  p: x,
  c: 'e'
})), [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '].map(x => ({
  p: x,
  c: 'e'
})), [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '].map(x => ({
  p: x,
  c: 'e'
})), ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'].map(x => ({
  p: x,
  c: 'b'
})), ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'].map(x => ({
  p: x,
  c: 'b'
}))];

const Chess = () => {
  const [curX, setCurX] = (0, _react.useState)(3);
  const [curY, setCurY] = (0, _react.useState)(3);
  const [board, setBoard] = (0, _react.useState)(initBoard);
  const [moving, setMoving] = (0, _react.useState)(false);
  const [mover, setMover] = (0, _react.useState)({});
  const [lastBoard, setLastBoard] = (0, _react.useState)([[]]);
  (0, _ink.useInput)((_, k) => {
    if (k.return && !moving && board[curY][curX].c == 'e') return; // cant pick up empty square

    k.rightArrow && curX < 7 && setCurX(curX + 1);
    k.leftArrow && curX > 0 && setCurX(curX - 1);
    k.downArrow && curY < 7 && setCurY(curY + 1);
    k.upArrow && curY > 0 && setCurY(curY - 1);
    k.return && !moving && setMover({
      x: curX,
      y: curY,
      piece: board[curY][curX]
    });
    k.return && !moving && setLastBoard(board);
    k.return && moving && setBoard(board.map(set(mover.x, mover.y, EMPTY_SQUARE)).map(set(curX, curY, mover.piece)));
    k.return && setMoving(!moving);
    k.escape && setBoard(lastBoard);
  });
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ink.Text, null, " "), _react.default.createElement(_ink.Text, null, " "), _react.default.createElement(_ink.Text, null, " "), _react.default.createElement(_inkGradient.default, {
    name: "mind"
  }, _react.default.createElement(_ink.Text, null, "return picks up and drops pieces")), _react.default.createElement(_inkGradient.default, {
    name: "mind"
  }, _react.default.createElement(_ink.Text, null, "escape will undo the last move")), _react.default.createElement(_ink.Text, null, " "), _react.default.createElement(_ink.Text, null, " "), board.map(moving ? set(mover.x, mover.y, EMPTY_SQUARE) : x => x).map(moving ? set(curX, curY, mover.piece) : x => x).map((line, i) => line.map((piece, j) => _react.default.createElement(Sq, {
    bgIsWhite: odd(i) == odd(j),
    cursor: i == curY && j == curX,
    key: j,
    p: piece
  }))).map((line, i) => _react.default.createElement(_ink.Box, {
    key: i
  }, line)));
};

var _default = Chess;
exports.default = _default;
},{}]},{},["index.js"], null)
//# sourceMappingURL=/index.js.map