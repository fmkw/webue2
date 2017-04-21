import { Component } from '@angular/core';
import {DeviceService} from "../services/device.service";
import {Device} from "../model/device";

@Component({
    selector: 'overview',
    templateUrl: '/app/views/overview.html',
})

export class OverviewComponent {
    devices: Device[];

    constructor(deviceService: DeviceService){
        deviceService.getDevices().then(result => {
            this.devices = result;
        })
    }
}