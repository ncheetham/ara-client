import { DeviceCategory } from "./device-category";

export class DeviceSubCategory {
    deviceSubCategoryId: number ; 
    deviceCategory: DeviceCategory ; 
    name: string ; 

    constructor() {
        this.deviceCategory = new DeviceCategory() ; 
    }
}