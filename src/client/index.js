/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : index.js
* Created at  : 2020-11-13
* Updated at  : 2021-04-16
* Author      : jeefo
* Purpose     :
* Description :
* Reference   :
.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.*/
// ignore:start
"use strict";

/* globals URLSearchParams*/
/* exported*/

// ignore:end

const is_object          = require("@jeefo/utils/is/object");
const EventEmitter       = require("@jeefo/utils/event_emitter");
const IOAuth2Storage     = require("./i_storage");
const InvalidArgumnet    = require("./invalid_argument");
const IOAuth2Transporter = require("./i_transporter");

class OAuth2Client extends EventEmitter {
    constructor (options) {
        super(true);
        if (! is_object(options)) {
            const args = ["options", IOAuth2Storage.name];
            throw new InvalidArgumnet(OAuth2Client.name, ...args);
        }
        if (! (options.storage instanceof IOAuth2Storage)) {
            const args = ["options.storate", IOAuth2Storage.name, true];
            throw new InvalidArgumnet(OAuth2Client.name, ...args);
        }
        if (! (options.transporter instanceof IOAuth2Transporter)) {
            const args = ["options.transporter", IOAuth2Transporter.name, true];
            throw new InvalidArgumnet(OAuth2Client.name, ...args);
        }

        this.uri         = options.uri;
        this.user        = null;
        this.token       = null;
        this.username    = options.username    || null;
        this.password    = options.password    || null;
        this.credentials = options.credentials || null;
        this.storage     = options.storage;
        this.transporter = options.transporter;
    }

    async authorize (body) {
        const url  = `${this.uri}/oauth2/token`;
        const init = {
            body   : this.transporter.url_encode(body),
            method : "POST",
        };
        const req = this.transporter.request(url, init);
        const res = await this.transporter.fetch(req);
        if (res.status === 200) this.store(await res.json());
        return res;
    }

    async authenticate () {
        if (! this.token) {
            if (await this.storage.is_empty()) return null;
            this.set_credentials(await this.storage.get());
        }

        this.is_authenticating = true;
        const res = await this.request("oauth2/authenticate");
        switch (res.status) {
            case 200 :
                this.user = await res.json();
                this.emit("authenticated", this.user);
                break;
            case 401 :
                await this.storage.delete();
                break;
        }
        this.is_authenticating = false;
        return this.user;
    }

    set_credentials (token) {
        this.token = token;
        for (const type of ["access", "refresh"]) {
            const key = `${type}_token_expires_at`;
            this.token[key] = new Date(token[key]);
        }
    }

    store (token) {
        this.set_credentials(token);
        return this.storage.save(this.token);
    }

    async refresh_token () {
        if (! this.token) {
            if (await this.storage.is_empty()) return;
            this.set_credentials(await this.storage.get());
        }

        const url  = `${this.uri}/oauth2/token`;
        const body = {
            grant_type    : "refresh_token",
            token_type    : this.token.token_type,
            refresh_token : this.token.refresh_token,
        };
        this.emit("refresh_token", body);
        const init = {
            body   : this.transporter.url_encode(body),
            method : "POST",
        };
        const req = this.transporter.request(url, init);
        const res = await this.transporter.fetch(req);
        switch (res.status) {
            case 200 :
                this.set_credentials(await res.json());
                await this.storage.save(this.token);
                if (! this.user && ! this.is_authenticating) {
                    await this.authenticate();
                }
                return true;
            case 401 :
                await this.storage.delete();
                break;
        }
        return false;
    }

    async logout () {
        if (! this.token && ! await this.storage.is_empty()) {
            this.set_credentials(await this.storage.get());
        }
        let res;
        if (this.token) {
            res = await this.request("oauth2/token", {method: "DELETE"});
            await this.storage.delete();
            this.user  = null;
            this.token = null;
            this.emit("unauthenticated");
        }
        return res || {status: 401};
    }

    async request (uri, init = {}) {
        init.headers = this.transporter.headers(init.headers);
        if (is_object(init.body) && ! (init.body instanceof URLSearchParams)) {
            init.body = JSON.stringify(init.body);
            init.headers.set("content-type", "application/json");
        }
        if (this.token) {
            const access_token = `Bearer ${this.token.access_token}`;
            init.headers.set("Authorization", access_token);
        }
        init.headers.set("X-Background-Request", true);

        let url = `${this.uri}/${uri}`;
        let res = await this.transporter.fetch(url, init);
        if (res.status === 401 && await this.refresh_token()) {
            const access_token = `Bearer ${this.token.access_token}`;
            init.headers.set("Authorization", access_token);
            res = await this.transporter.fetch(url, init);
        }
        return res;
    }

    get (uri, req = {}) {
        req.method = "GET";
        return this.request(uri, req);
    }

    put (uri, req = {}) {
        req.method = "PUT";
        return this.request(uri, req);
    }

    post (uri, req = {}) {
        req.method = "POST";
        return this.request(uri, req);
    }

    update (uri, body, req = {}) {
        if (! is_object(body)) {
            const args = ["body", "object"];
            throw new InvalidArgumnet(`${OAuth2Client.name}.update`, ...args);
        }
        req.body   = body;
        req.method = "PUT";
        return this.request(uri, req);
    }

    save (uri, body, req = {}) {
        if (! is_object(body)) {
            const args = ["body", "object"];
            throw new InvalidArgumnet(`${OAuth2Client.name}.save`, ...args);
        }
        req.body   = body;
        req.method = "POST";
        return this.request(uri, req);
    }

    delete (uri, req = {}) {
        req.method = "DELETE";
        return this.request(uri, req);
    }
}

module.exports = OAuth2Client;
