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
        ifError?: (result: any) => void;
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
            customFields?: {
                id: string;
                key: string;
                field_value: string;
            }[];
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
        dndSettings: any;
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
export declare class Gohighlevel {
    private token;
    private locationId;
    private version;
    private url;
    constructor({ token, locationId }: IGohighlevel);
    onRequest: ({ body, method, url, ifError, }: IGohighlevelFunctions["onRequest"]["props"]) => IGohighlevelFunctions["onRequest"]["respond"];
    onContactUpsert: ({ data, }: IGohighlevelFunctions["onContactUpsert"]["props"]) => IGohighlevelFunctions["onContactUpsert"]["respond"];
    onContactGet: ({ id, }: IGohighlevelFunctions["onContactGet"]["props"]) => IGohighlevelFunctions["onContactGet"]["respond"];
    onCustomFieldsGet: ({}: IGohighlevelFunctions["onCustomFieldsGet"]["props"]) => IGohighlevelFunctions["onCustomFieldsGet"]["respond"];
}
