/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : i_storage.js
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

class IOAuth2Storage extends Interface {
    constructor () {
        super(IOAuth2Storage);

        for (const method of ["is_empty", "get", "save", "delete"]) {
            if (! is.function(this[method])) {
                throw new TypeError(`${method}() method is not implemented`);
            }
        }
    }
}

module.exports = IOAuth2Storage;