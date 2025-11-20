"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gohighlevel = void 0;
class Gohighlevel {
    token;
    locationId;
    version = "2021-07-28";
    constructor({ token, locationId }) {
        this.token = token;
        this.locationId = locationId;
    }
    onRequest = async ({ body, method, url, }) => {
        try {
            const response = await fetch(url, {
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
            return {
                status: "ok",
                message: "Request ok",
                data: result,
            };
        }
        catch (error) {
            return {
                status: "error",
                message: error?.message ?? "Request error",
                error,
            };
        }
    };
    onContactUpsert = async ({ data, }) => {
        const result = await this.onRequest({
            url: "https://services.leadconnectorhq.com/contacts/upsert",
            method: "POST",
            body: {
                ...data,
                locationId: this.locationId,
            },
        });
        return result;
    };
    onContactGet = async ({ id, }) => {
        let url = "https://services.leadconnectorhq.com/contacts";
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
            url: `https://services.leadconnectorhq.com/locations/${this.locationId}/customFields`,
            method: "GET",
        });
        return result;
    };
}
exports.Gohighlevel = Gohighlevel;
//# sourceMappingURL=index.js.map