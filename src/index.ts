export interface IGohighlevel {
    token: string;
    locationId:string
}

export type IGohighlevelType = "ok" | "error";

export interface IGohighlevelFunctionsRequest<RD = any> {
    props: {
        method: "GET" | "POST" | "PUT";
        body?: any;
        url: string;
    };
    result: {
        status: IGohighlevelType;
        message: string;
        error?: any;
        data?: RD;
    };
    respond: Promise<IGohighlevelFunctionsRequest["result"]>;
}
export interface IGohighlevelFunctionsContactCreate {
    props: {
        data: {
            firstName: string;
            lastName: string;
            name: string;
            email: string;
            gender: string;
            phone: string;
            address1: string;
            city: string;
            state: string;
            postalCode: string;
            website: string;
            timezone: string;
            dnd: boolean;
        };
    };
    result: IGohighlevelFunctionsRequest<{
        new: boolean;
        contact: {
            id: string;
            dateAdded: string;
            dateUpdated: string;
            deleted: boolean;
            tags: Array<any>;
            type: string;
            customFields: Array<any>;
            locationId: string;
            firstName: string;
            firstNameLowerCase: string;
            fullNameLowerCase: string;
            lastName: string;
            lastNameLowerCase: string;
            email: string;
            emailLowerCase: string;
            bounceEmail: boolean;
            unsubscribeEmail: boolean;
            phone: string;
            address1: string;
            city: string;
            state: string;
            country: string;
            postalCode: string;
            website: string;
            timezone: string;
            dnd: boolean;
            dndDate: string;
            gender: string;
            createdBy: {
                source: string;
                channel: string;
                sourceId: string;
                timestamp: string;
            };
            lastUpdatedBy: {
                source: string;
                channel: string;
                sourceId: string;
                timestamp: string;
            };
            lastSessionActivityAt: string;
            validEmail: any;
            validEmailDate: any;
        };
        traceId: string;
    }>["result"];
    respond: Promise<IGohighlevelFunctionsContactCreate["result"]>;
}
export interface IGohighlevelFunctions {
    onRequest: IGohighlevelFunctionsRequest;
    onContactCreate: IGohighlevelFunctionsContactCreate;
}

export class Gohighlevel {
    private token;
    private locationId;
    private version = "2021-07-28";
    constructor({ token ,locationId}: IGohighlevel) {
        this.token = token;
        this.locationId = locationId 
    }

    onRequest = async ({
        body,
        method,
        url,
    }: IGohighlevelFunctions["onRequest"]["props"]): IGohighlevelFunctions["onRequest"]["respond"] => {
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
        } catch (error: any) {
            return {
                status: "error",
                message: error?.message ?? "Request error",
                error,
            };
        }
    };

    onContactCreate = async ({
        data,
    }: IGohighlevelFunctions["onContactCreate"]["props"]): IGohighlevelFunctions["onContactCreate"]["respond"] => {
        const result = await this.onRequest({
            url: "https://services.leadconnectorhq.com/contacts/upsert",
            method: "POST",
            body: {
              ...data,
              locationId : this.locationId,
            },
        });
        return result;
    };
}
