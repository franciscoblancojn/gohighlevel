export interface IGohighlevel {
    token: string;
    locationId: string;
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
            customFields?: {
                id: string;
                key: string;
                field_value: string;
            }[];
        };
        traceId: string;
    }>["result"];
    respond: Promise<IGohighlevelFunctionsContactCreate["result"]>;
}
export interface IGohighlevelFunctionsContactGet {
    props: {
        id?: string;
    };
    result: IGohighlevelFunctionsRequest<{
        id: string;
        locationId: string;
        contactName: string;
        firstName: string;
        lastName?: string;
        firstNameRaw: string;
        lastNameRaw?: string;
        companyName: any;
        email?: string;
        phone?: string;
        dnd: boolean;
        dndSettings: {};
        type: string;
        source?: string;
        assignedTo: any;
        city?: string;
        state?: string;
        postalCode?: string;
        address1?: string;
        dateAdded: string;
        dateUpdated: string;
        dateOfBirth: any;
        businessId: any;
        tags: Array<string>;
        followers: Array<any>;
        country?: string;
        website?: string;
        timezone?: string;
        profilePhoto?: string;
        additionalEmails: Array<any>;
        customFields: Array<{
            id: string;
            value: string;
        }>;
        attributions?: Array<{
            pageUrl?: string;
            utmSessionSource: string;
            ip?: string;
            isFirst?: boolean;
            medium: string;
            mediumId?: string;
            userAgent?: string;
            url?: string;
            adSource?: string;
            utmCampaign?: string;
            utmMedium?: string;
            utmCampaignId?: string;
            utmAdId?: string;
            utmSource?: string;
            utmContent?: string;
            isLast?: boolean;
        }>;
    }>["result"];
    respond: Promise<IGohighlevelFunctionsContactGet["result"]>;
}

export interface IGohighlevelFunctionsCustomFieldsGet {
    props: {};
    result: IGohighlevelFunctionsRequest<{
        customFields: Array<{
            id: string;
            name: string;
            model: string;
            fieldKey: string;
            placeholder: string;
            dataType: string;
            position: number;
            documentType: string;
            parentId: string;
            locationId: string;
            dateAdded: string;
            standard: boolean;
            picklistOptions?: Array<string>;
        }>;
        traceId: string;
    }>["result"];
    respond: Promise<IGohighlevelFunctionsCustomFieldsGet["result"]>;
}

export interface IGohighlevelFunctions {
    onRequest: IGohighlevelFunctionsRequest;
    onContactUpsert: IGohighlevelFunctionsContactCreate;
    onContactGet: IGohighlevelFunctionsContactGet;
    onCustomFieldsGet: IGohighlevelFunctionsCustomFieldsGet;
}

export class Gohighlevel {
    private token;
    private locationId;
    private version = "2021-07-28";
    constructor({ token, locationId }: IGohighlevel) {
        this.token = token;
        this.locationId = locationId;
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

    onContactUpsert = async ({
        data,
    }: IGohighlevelFunctions["onContactUpsert"]["props"]): IGohighlevelFunctions["onContactUpsert"]["respond"] => {
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

    onContactGet = async ({
        id,
    }: IGohighlevelFunctions["onContactGet"]["props"]): IGohighlevelFunctions["onContactGet"]["respond"] => {
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

    onCustomFieldsGet =
        async ({}: IGohighlevelFunctions["onCustomFieldsGet"]["props"]): IGohighlevelFunctions["onCustomFieldsGet"]["respond"] => {
            const result = await this.onRequest({
                url: `https://services.leadconnectorhq.com/locations/${this.locationId}/customFields`,
                method: "GET",
            });
            return result;
        };
}
