/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : i_transporter.js
* Created at  : 2020-11-13
* Updated at  : 2020-11-14
* Author      : jeefo
* Purpose     :
* Description :
* Reference   :
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals*/
/* exported*/

// ignore:end

const is        = require("@jeefo/utils/is");
const Interface = require("@jeefo/utils/class/interface");

class IOAuth2Transporter extends Interface {
    constructor () {
        super(IOAuth2Transporter);
        for (const method of ["fetch", "headers", "request", "url_encode"]) {
            if (! is.function(this[method])) {
                throw new TypeError(`${method} method is not implemented`);
            }
        }
    }
}

module.exports = IOAuth2Transporter;