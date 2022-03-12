/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : token.js
* Created at  : 2020-11-10
* Updated at  : 2022-03-12
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

const expires_at           = require("./utils/expires_at");
const Unauthorized         = require("./errors/unauthorized");
const Unimplemented        = require("./errors/unimplemented");
const InvalidGrant         = require("./errors/invalid_grant");
const InvalidRequest       = require("./errors/invalid_request");
const token_generator      = require("./token_generator");
const ImplementationError  = require("./errors/implementation_error");

const SECONDS_PER_HOUR       = 60*60;
const ACCESS_TOKEN_LIFETIME  =  90*24 * SECONDS_PER_HOUR;
const REFRESH_TOKEN_LIFETIME = 365*24 * SECONDS_PER_HOUR;

const ATL_KEY = "access_token_lifetime";
const RTL_KEY = "refresh_token_lifetime";

class OAuth2Token {
  constructor (options = {}) {
    this.access_token_lifetime  = options[ATL_KEY] || ACCESS_TOKEN_LIFETIME;
    this.refresh_token_lifetime = options[RTL_KEY] || REFRESH_TOKEN_LIFETIME;
    if (this.access_token_lifetime <= 0) {
      const msg = "Invalid argument: `options.access_token_lifetime`";
      throw new ImplementationError(msg);
    }
    if (this.refresh_token_lifetime <= 0) {
      const msg = "Invalid argument: `options.refresh_token_lifetime`";
      throw new ImplementationError(msg);
    }

    this.access_token_generator  = token_generator(options.access_token);
    this.refresh_token_generator = token_generator(options.refresh_token);
  }

  async handle(request, storage, options) {
    switch (request.body.grant_type) {
      case "password":
        const {username, password} = request.body;
        if (!username || !password) throw new InvalidRequest();

        const user = await storage.get_user(request);
        if (user) return await this.renew_token({user}, storage, options);

        throw new Unauthorized();
      case "authorization_code":
        const {code, client_id, redirect_uri} = request.body;
        if (! code || ! client_id || ! redirect_uri) {
          throw new InvalidRequest();
        }

        const args = [code, client_id, options];
        const _code = await storage.get_authorization_code(...args);
        if (_code) {
          if (_code.redirect_uri !== redirect_uri) {
            throw new InvalidRequest();
          }
          const user   = {id: _code.user_id};
          const client = {id: _code.client_id};
          const token  = await this.renew_token(
            {user, client}, storage, options
          );
          await storage.revoke_authorization_code(...args);
          return token;
        }

        throw new Unauthorized();
      case "refresh_token":
        const {refresh_token} = request.body;
        if (!refresh_token) throw new InvalidRequest();

        const old_token = await storage.get_token({refresh_token});
        if (!old_token) throw new Unauthorized();

        const new_token = await this.generate_token(null, storage, options);
        await storage.update_token(old_token, new_token, options);
        new_token.type = old_token.type;
        return new_token;
      case "client_credentials":
        throw new Unimplemented();
      default:
        throw new InvalidGrant();
    }
  }

  async generate_access_token (user, storage, options) {
    const token                   = Object.create(null);
    const {access_token_lifetime} = options;

    token.value      = this.access_token_generator();
    token.expires_at = expires_at(
      access_token_lifetime || this.access_token_lifetime
    );

    return token;
  }

  async generate_refresh_token (user, storage, options) {
    const token                    = Object.create(null);
    const {refresh_token_lifetime} = options;

    token.value      = this.refresh_token_generator();
    token.expires_at = expires_at(
      refresh_token_lifetime || this.refresh_token_lifetime
    );

    return token;
  }

  async generate_token(user, storage, options) {
    const promises = [];
    for (const type of ["access", "refresh"]) {
      const method = `generate_${type}_token`;
      const promise = this[method](user, storage, options).then(token => {
        return {type, token};
      });
      promises.push(promise);
    }

    const result = Object.create(null);
    for (const {type, token} of await Promise.all(promises)) {
      result[`${type}_token`]            = token.value;
      result[`${type}_token_expires_at`] = token.expires_at;
    }
    return result;
  }

  async renew_token ({user, client}, storage, options) {
    const token = await this.generate_token(user, storage, options);
    await storage.store_token(token, user, client, options);
    return token;
  }
}

module.exports = OAuth2Token;