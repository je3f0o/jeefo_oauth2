/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : parse_access_token.js
* Created at  : 2020-11-11
* Updated at  : 2020-11-11
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

const CAPTURE_TOKEN_REGEX = /^Bearer\s+(\S+)$/;
module.exports = string => {
    const matches = string.match(CAPTURE_TOKEN_REGEX);
    if (matches) return matches[1];
};
