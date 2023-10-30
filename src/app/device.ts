import { DeviceType } from "./device-type";

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

    constructor() {
        this.deviceType = new DeviceType() ; 
    }

}