/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : request.js
* Created at  : 2020-11-10
* Updated at  : 2021-04-14
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

const OAuth2Header        = require("./header");
const ImplementationError = require("./errors/implementation_error");

class OAuth2Request {
    constructor (req = {}) {
        if (! req.headers) {
            throw new ImplementationError('Missing parameter: `options.headers`');
        }
        if (! req.method) {
            throw new ImplementationError('Missing parameter: `options.method`');
        }
        if (! req.query) {
            throw new ImplementationError('Missing parameter: `options.query`');
        }

        this.path    = req.path;
        this.query   = req.query;
        this.method  = req.method;
        this.headers = new OAuth2Header(req.headers);
        this.body    = req.body || {};
    }

    get (key) { return this.headers.get(key); }
}

module.exports = OAuth2Request;
