"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var device_service_1 = require("../services/device.service");
var router_1 = require("@angular/router");
var OverviewComponent = (function () {
    function OverviewComponent(deviceService, elRef, router) {
        var _this = this;
        this.elRef = elRef;
        this.router = router;
        deviceService.getDevices().then(function (result) {
            _this.devices = result;
        });
    }
    OverviewComponent.prototype.onSelect = function (device) {
        this.selectedDevice = (device === this.selectedDevice) ? null : device;
    };
    OverviewComponent.prototype.route = function (device) {
        if (this.selectedDevice !== device)
            this.router.navigate(['/details', device.id]);
    };
    OverviewComponent = __decorate([
        core_1.Component({
            selector: 'overview',
            templateUrl: '/app/views/overview.html',
        }), 
        __metadata('design:paramtypes', [device_service_1.DeviceService, core_1.ElementRef, router_1.Router])
    ], OverviewComponent);
    return OverviewComponent;
}());
exports.OverviewComponent = OverviewComponent;
//# sourceMappingURL=overview.component.js.map