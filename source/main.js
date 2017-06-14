"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hellonick_1 = require("./hellonick");
var Startup = (function () {
    function Startup() {
    }
    Startup.main = function () {
        console.log(hellonick_1.nick);
        return 0;
    };
    return Startup;
}());
Startup.main();
