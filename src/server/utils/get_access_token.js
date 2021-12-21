/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : get_access_token.js
* Created at  : 2020-11-11
* Updated at  : 2021-04-16
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

const Unauthorized   = require("../errors/unauthorized");
const InvalidRequest = require("../errors/invalid_request");

const CAPTURE_TOKEN_REGEX = /Bearer\s+(\S+)/;
module.exports = req => {
    const access_token = req.headers.get("Authorization");
    if (! access_token) throw new Unauthorized("No authentication given");

    const matches = access_token.match(CAPTURE_TOKEN_REGEX);
    if (! matches) throw new InvalidRequest("Malformed authorization header");
    return matches[1];
};
