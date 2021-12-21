/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : authorize.js
* Created at  : 2020-11-10
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

const url                 = require("url");
const date_expire         = require("./utils/expires_at");
const OAuth2Response      = require("./response");
const Unauthorized        = require("./errors/unauthorized");
const Unimplemented       = require("./errors/unimplemented");
const InvalidRequest      = require("./errors/invalid_request");
const token_generator     = require("./token_generator");
const get_access_token    = require("./utils/get_access_token");
const ImplementationError = require("./errors/implementation_error");

const AUTH_CODE_LIFETIME = 5 * 60; // 5 minutes

class OAuth2Authorize {
    constructor (options = {}) {
        this.code_lifetime = (
            options.code_lifetime || AUTH_CODE_LIFETIME
        );
        if (this.code_lifetime <= 0) {
            const msg = "Invalid argument: `options.auth_code_lifetime`";
            throw new ImplementationError(msg);
        }

        this.code_generator = token_generator(options.authorization);
    }

    async handle (request, storage) {
        switch (request.query.response_type) {
            case "code":
                const access_token = get_access_token(request);
                const {
                    client_id,
                    redirect_uri,
                    state,
                } = request.query;

                const [token, client] = await Promise.all([
                    storage.get_token({access_token}),
                    storage.get_client(client_id),
                ]);

                if (token && client) {
                    if (! client.redirect_uri.includes(redirect_uri)) {
                        throw new InvalidRequest();
                    }

                    const code = await this.code_generator();
                    const data = {
                        code,
                        redirect_uri,
                        user_id    : token.user_id,
                        client_id  : client.id,
                        expires_at : date_expire(this.code_lifetime),
                    };
                    await storage.store_authorization_code(data);

                    const res = new OAuth2Response();
                    const query = {code};
                    if (state) query.state = state;
                    const redirect_url=`${redirect_uri}${url.format({query})}`;
                    if (request.headers.get("X-Redirect") === "manual") {
                        res.body = redirect_url;
                    } else {
                        res.redirect(redirect_url);
                    }
                    return res;
                }

                throw new Unauthorized();
            case "token":
                throw new Unimplemented();
            default:
                throw new InvalidRequest();
        }
    }
}

module.exports = OAuth2Authorize;
