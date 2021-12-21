/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
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

const is_object           = require("@jeefo/utils/is/object");
const OAuth2Token         = require("./token");
const OAuth2Request       = require("./request");
const OAuth2Authorize     = require("./authorize");
const InvalidRequest      = require("./errors/invalid_request");
const ImplementationError = require("./errors/implementation_error");

class OAuth2Server {
    constructor (options) {
        if (! is_object(options)) {
            throw new ImplementationError('Missing parameter: `options`');
        }
        if (! is_object(options.storage)) {
            throw new ImplementationError('Missing parameter: `options.storage`');
        }
        this.storage               = options.storage;
        this.token_handler         = new OAuth2Token(options.options);
        this.authorization_handler = new OAuth2Authorize(options.options);
    }

    async authorize (request, options = {}) {
        if (! (request instanceof OAuth2Request)) {
            const msg = '`request` must be instanceof OAuth2Request.';
            throw new ImplementationError(msg);
        }
        if (request.method !== "GET") {
            const http = `${request.method} ${request.path} HTTP/1.1`;
            const msg  = `${http}\n  Authorize request's method must be 'GET'.`;
            throw new ImplementationError(msg);
        }
        if (! request.query.client_id) throw new InvalidRequest();

        return await this.authorization_handler.handle(
            request, this.storage, options
        );
    }

    async token (request, options = {}) {
        if (! (request instanceof OAuth2Request)) {
            const msg = 'request must be instanceof OAuth2Request';
            throw new ImplementationError(msg);
        }
        if (request.method !== "POST") {
            const http = `${request.method} ${request.path} HTTP/1.1`;
            const msg  = `${http}\n  Token request's method must be 'POST'.`;
            throw new ImplementationError(msg);
        }

        return await this.token_handler.handle(request, this.storage, options);
    }
}

module.exports = OAuth2Server;
