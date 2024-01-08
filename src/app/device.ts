import { DeviceCategory } from "./device-category";
import { DeviceSubCategory } from "./device-subcatgory";
import { DeviceType } from "./device-type";
import { Engagement } from "./engagement/engagement";

export class Device {
    deviceId: number ; 
    name: string ; 
    location: string ; 
    ITOwner: string ; 
    OSFamily: string ;
    applicationServiceName: string ; 
    environment: string ; 
    lifecycleStatus: string ; 
    deviceType: DeviceType ; 
    OSDetail: string ; 
    purpose: string ; 
    category: DeviceCategory ; 
    subCategory: DeviceSubCategory ;
    engagement: Engagement ; 

    constructor() {

        this.deviceType = new DeviceType() ;
        this.category = new DeviceCategory() ; 
        this.subCategory = new DeviceSubCategory() ;  
        this.engagement = new Engagement() ;
    
    }

}