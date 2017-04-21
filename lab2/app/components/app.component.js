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
var router_1 = require('@angular/router');
var AppComponent = (function () {
    function AppComponent(router) {
        var _this = this;
        this.router = router;
        router.events.subscribe(function (url) {
            _this.showNavigation = url.url !== '/login';
        });
    }
    AppComponent.prototype.checkPermission = function () {
        if (this.router.url != '/login')
            this.router.navigate(['/overview']);
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            template: "\n        <div role=\"navigation\" aria-label=\"jumplinks\">\n            <a href=\"#devicesheadline\" class=\"accessibility\">Zum Inhalt springen</a>\n        </div>\n        \n        <header aria-labelledby=\"bannerheadline\">\n            <a (click)=\"checkPermission()\"><img class=\"title-image\" src=\"../../images/big-logo-small.png\" alt=\"BIG Smart Home logo\"></a>\n        \n            <h1 class=\"header-title\" id=\"bannerheadline\">\n                BIG Smart Home\n            </h1>\n            <div *ngIf=\"showNavigation\">\n                <navigation></navigation>\n            </div>\n        </header>\n        <div class=\"main-container\">\n            <router-outlet></router-outlet>\n        </div>\n        <footer>\n            \u00A9 2017 BIG Smart Home\n        </footer>\n        ",
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map