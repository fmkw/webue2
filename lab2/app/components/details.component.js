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
var controlType_1 = require('../model/controlType');
var DetailsComponent = (function () {
    function DetailsComponent(deviceService, route) {
        this.deviceService = deviceService;
        this.route = route;
        this.typeEnum = controlType_1.ControlType;
    }
    DetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .subscribe(function (params) {
            _this.id = params['id'];
        });
        this.deviceService.getDevice(this.id).then(function (device) {
            _this.device = device;
            _this.controlUnits = device.control_units;
        });
    };
    DetailsComponent = __decorate([
        core_1.Component({
            selector: 'device-details',
            template: "\n  <main aria-labelledby=\"deviceheadline\" class=\"details-container\">\n    <div attr.data-device-id={{device?.id}} class=\"details-headline\">\n      <h2 class=\"main-headline\" id=\"deviceheadline\">{{device?.display_name}}</h2>\n    </div>\n    <div *ngFor=\"let controlUnit of controlUnits\" [ngSwitch]=controlUnit.type class=\"details-holder\">\n\n      <div *ngSwitchCase=\"typeEnum.continuous\" class=\"details-outer\">\n        <div class=\"details-image-container\">\n          <img class=\"details-image\" src=\"../../images/placeholder_continuous.PNG\">\n        </div>\n        <div class=\"details-data\">\n          <label class=\"accessibility\" for=\"details-log\">Letzte Werte\u00E4nderungen</label>\n          <textarea id=\"details-log\" class=\"detail-logs\" placeholder=\"Ger\u00E4telog\" readonly rows=\"6\">6.3.2017 10:01:30: 20 -> 25\n          </textarea>\n          <div class=\"details-settings\">\n            <h3 class=\"details-headline\">Temperatur einstellen</h3>\n\n            <form class=\"update-form\" method=\"post\">\n              <label class=\"update-form-field\" id=\"current-value\">\n                <span class=\"current-value\">derzeit: 0</span>\n              </label>\n              <label class=\"accessibility\" for=\"new-value\">Bitte gew\u00FCnschten Wert eingeben.</label>\n              <input type=\"number\" step=\"0.01\" min=\"0\" max=\"50\" id=\"new-value\" value=\"1\"\n                     class=\"update-form-field form-input\" name=\"new-value\" required>\n              <input type=\"submit\" id=\"submit-value\" class=\"update-form-field button\" name=\"submit-value\"\n                     value=\"Wert setzen\">\n            </form>\n          </div>\n        </div>\n      </div>\n\n      <div *ngSwitchCase=\"typeEnum.enum\" class=\"details-outer\">\n        <div class=\"details-image-container\">\n          <img class=\"details-image\" src=\"../../images/placeholder_enum.PNG\">\n        </div>\n        <div class=\"details-data\">\n          <label class=\"accessibility\" for=\"details-log\">Letzte Werte\u00E4nderungen</label>\n          <textarea id=\"details-log\" class=\"detail-logs\" placeholder=\"Ger\u00E4telog\" readonly rows=\"6\">6.3.2017 10:02:32: Ein -> Standby</textarea>\n          <div class=\"details-settings\">\n            <h3 class=\"details-headline\">Ger\u00E4tezustand einstellen</h3>\n\n            <form class=\"update-form\" method=\"post\">\n              <label class=\"update-form-field\" id=\"current-value\">\n                <span class=\"current-value\">derzeit: Standby</span>\n              </label>\n              <label class=\"accessibility\" for=\"new-value\">Bitte gew\u00FCnschten Wert aus Men\u00FC ausw\u00E4hlen.</label>\n              <select id=\"new-value\" class=\"update-form-field form-input\" name=\"new-value\" required>\n                <option *ngFor=\"let value of controlUnit.values\">{{value}}</option>\n              </select>\n              <input type=\"submit\" id=\"submit-value\" class=\"update-form-field button\" name=\"submit-value\"\n                     value=\"Wert setzen\">\n            </form>\n          </div>\n        </div>\n      </div>\n\n      <div *ngSwitchCase=\"typeEnum.boolean\" class=\"details-outer\">\n        <div class=\"details-image-container\">\n          <img class=\"details-image\" src=\"../../images/placeholder_boolean.PNG\">\n        </div>\n        <div class=\"details-data\">\n          <label class=\"accessibility\" for=\"details-log\">Letzte Werte\u00E4nderungen</label>\n          <textarea id=\"details-log\" class=\"detail-logs\" placeholder=\"Ger\u00E4telog\" readonly rows=\"6\">6.3.2017 10:03:30: Aus -> An</textarea>\n          <div class=\"details-settings\">\n            <h3 class=\"details-headline\">Ein-/Ausschalten</h3>\n\n            <form class=\"update-form\" method=\"post\">\n\n              <label class=\"update-form-field\" id=\"current-value\">\n                <span class=\"current-value\">derzeit: Aktiviert</span>\n              </label>\n\n              <label class=\"accessibility\" for=\"new-value\">Bitte gew\u00FCnschten Wert ausw\u00E4hlen.</label>\n              <input type=\"checkbox\" id=\"new-value\" class=\"update-checkbox-input form-input\" checked\n                     name=\"new-value\">\n              <input type=\"submit\" id=\"submit-value\" class=\"update-form-field button\" name=\"submit-value\"\n                     value=\"Wert setzen\">\n            </form>\n          </div>\n        </div>\n      </div>\n    </div>\n  </main>\n",
            providers: [device_service_1.DeviceService]
        }), 
        __metadata('design:paramtypes', [device_service_1.DeviceService, router_1.ActivatedRoute])
    ], DetailsComponent);
    return DetailsComponent;
}());
exports.DetailsComponent = DetailsComponent;
//# sourceMappingURL=details.component.js.map