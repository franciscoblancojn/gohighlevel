"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gohighlevel = void 0;
class Gohighlevel {
    token;
    locationId;
    version = "2021-07-28";
    url = "https://services.leadconnectorhq.com";
    constructor({ token, locationId }) {
        this.token = token;
        this.locationId = locationId;
    }
    onRequest = async ({ body, method, url, ifError, }) => {
        try {
            const response = await fetch(this.url + url, {
                method,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token}`,
                    Version: this.version,
                },
                body: body ? JSON.stringify(body) : undefined,
            });
            const result = await response.json();
            if (ifError) {
                ifError(result);
            }
            return {
                status: "ok",
                message: "Request ok",
                data: result,
            };
        }
        catch (error) {
            return {
                status: "error",
                message: [error?.message ?? null]?.flat(1)[0] ?? "Request error",
                error,
            };
        }
    };
    onContactUpsert = async ({ data, }) => {
        const result = await this.onRequest({
            url: "/contacts/upsert",
            method: "POST",
            body: {
                ...data,
                locationId: this.locationId,
            },
            ifError: (result) => {
                if (!result?.succeded) {
                    throw result;
                }
            },
        });
        return result;
    };
    onContactGet = async ({ id, }) => {
        let url = "/contacts";
        if (id) {
            url += `/${id}`;
        }
        url += `?locationId=${this.locationId}`;
        const result = await this.onRequest({
            url,
            method: "GET",
        });
        return result;
    };
    onCustomFieldsGet = async ({}) => {
        const result = await this.onRequest({
            url: `/locations/${this.locationId}/customFields`,
            method: "GET",
        });
        return result;
    };
    onBusinessCreate = async ({ data, }) => {
        const result = await this.onRequest({
            url: `/businesses/`,
            method: "POST",
            body: {
                ...data,
                locationId: this.locationId,
            },
            ifError: (result) => {
                if (!result?.business?.id) {
                    throw new Error("Error creating business: " + JSON.stringify(result));
                }
            },
        });
        return result;
    };
}
exports.Gohighlevel = Gohighlevel;
//# sourceMappingURL=index.js.map