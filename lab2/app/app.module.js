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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var ng2_charts_1 = require('ng2-charts');
var app_component_1 = require('./components/app.component');
var login_component_1 = require("./components/login.component");
var router_1 = require("@angular/router");
var overview_component_1 = require("./components/overview.component");
var options_component_1 = require("./components/options.component");
var details_component_1 = require("./components/details.component");
var navigation_component_1 = require("./components/navigation.component");
var device_service_1 = require("./services/device.service");
var routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'overview', component: overview_component_1.OverviewComponent },
    { path: 'options', component: options_component_1.OptionsComponent },
    { path: 'details/:id', component: details_component_1.DetailsComponent },
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                ng2_charts_1.ChartsModule,
                router_1.RouterModule.forRoot(routes),
            ],
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                overview_component_1.OverviewComponent,
                options_component_1.OptionsComponent,
                details_component_1.DetailsComponent,
                navigation_component_1.NavigationComponent
            ],
            bootstrap: [app_component_1.AppComponent],
            providers: [device_service_1.DeviceService]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map