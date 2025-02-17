import { Modeling } from "./types";
export declare abstract class Resource implements Modeling {
    type: string;
    identifier: string;
    resId: string;
    constructor(type: string, identifier: string);
    toModel(): {
        resId: string;
        type: string;
        identifier: string;
    };
}
export declare class LocalResource extends Resource {
    constructor(path: string);
}
export declare class RemoteResource extends Resource {
    constructor(url: string);
}
export declare class Base64Resource extends Resource {
    constructor(content: string);
}
/**
 * Resources belong to assets dir.
 */
export declare class AssetsResource extends Resource {
    constructor(content: string);
}
export declare class AndroidResource extends Resource {
}
export declare class iOSResource extends Resource {
}
/**
 * This is for android platform
 */
export declare class DrawableResource extends AndroidResource {
    constructor(name: string);
}
export declare class RawResource extends AndroidResource {
    constructor(name: string);
}
export declare class AndroidAssetsResource extends AndroidResource {
    constructor(path: string);
}
/**
 * This is for iOS platform
 */
export declare class MainBundleResource extends iOSResource {
    constructor(fileName: string);
}
export declare class BundleResource extends iOSResource {
    constructor(bundleName: string, fileName: string);
}
export declare class ArrayBufferResource extends Resource {
    data: ArrayBuffer;
    constructor(data: ArrayBuffer);
    toModel(): {
        resId: string;
        type: string;
        identifier: string;
    };
}
