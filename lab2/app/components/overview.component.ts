import {Component, ElementRef} from '@angular/core';
import {DeviceService} from "../services/device.service";
import {Device} from "../model/device";
import {Router} from "@angular/router";
import {defaultKeyValueDiffers} from "@angular/core/src/change_detection/change_detection";

@Component({
    selector: 'overview',
    templateUrl: '/app/views/overview.html',
})

export class OverviewComponent {
    devices: Device[];
    selectedDevice: Device;

    constructor(
        deviceService: DeviceService,
        private elRef:ElementRef,
        private router: Router
    ){
        deviceService.getDevices().then(result => {
            this.devices = result;
        })
    }

    onSelect(device: Device) : void
    {
        this.selectedDevice = (device === this.selectedDevice) ? null : device;
    }

    route(device : Device) : void
    {
        if(this.selectedDevice !== device)
            this.router.navigate(['/details', device.id]);
    }

}