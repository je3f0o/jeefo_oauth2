/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : unimplemented.js
* Created at  : 2020-11-10
* Updated at  : 2020-11-10
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

const IOAuth2Error = require("./i_oauth_error");

class Unimplemented extends IOAuth2Error {
    constructor () {
        super(500, "unimplemented", null);
    }
}

module.exports = Unimplemented;
