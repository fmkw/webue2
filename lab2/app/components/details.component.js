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
var ng2_charts_1 = require("ng2-charts");
var DetailsComponent = (function () {
    function DetailsComponent(deviceService, route) {
        var _this = this;
        this.deviceService = deviceService;
        this.route = route;
        this.boolLog = "";
        this.contLog = "";
        this.enumLog = "";
        this.doughnutChartLabels = ['On', 'Off'];
        this.doughnutChartData = [4, 5];
        this.doughnutChartType = 'doughnut';
        this.lineChartLegend = true;
        this.lineChartType = 'line';
        this.polarAreaLegend = true;
        this.polarAreaChartType = 'polarArea';
        this.route.params
            .subscribe(function (params) {
            _this.id = params['id'];
        });
        this.deviceService.getDevice(this.id).then(function (device) {
            _this.device = device;
            _this.controlUnits = device.control_units;
            for (var index = 0; index < _this.controlUnits.length; ++index) {
                var entry = _this.controlUnits[index];
                if (entry.type == 0) {
                    if (entry.current == 0) {
                        _this.currentString = 'Deaktiviert';
                    }
                    else {
                        _this.currentString = 'Aktiviert';
                    }
                }
                else if (entry.type == 2) {
                    _this.lineChartData = [{ data: [entry.current], label: 'Verlauf' }];
                    _this.lineChartLabels = [_this.formatDate(new Date)];
                    _this.currentCont = entry.current;
                    _this.contInput = entry.current;
                }
                else if (entry.type == 1) {
                    _this.polarAreaChartLabels = entry.values;
                    _this.polarAreaChartData = new Array(entry.values.length);
                    for (var i = 0; i < _this.polarAreaChartData.length; i++) {
                        _this.polarAreaChartData[i] = 0;
                    }
                    _this.polarAreaChartData[entry.current]++;
                    _this.currentEnum = entry.current;
                    _this.enumInput = entry.values[_this.currentEnum];
                }
                if (entry.min != null)
                    _this.min = entry.min;
                if (entry.max != null)
                    _this.max = entry.max;
                console.log(_this.charts);
            }
        });
    }
    DetailsComponent.prototype.changeBool = function () {
        var _this = this;
        var from;
        var to;
        if (this.currentString === 'Aktiviert') {
            from = 'An';
            to = 'Aus';
            this.doughnutChartData[0]++;
            this.currentString = 'Deaktiviert';
        }
        else {
            from = 'Aus';
            to = 'An';
            this.currentString = 'Aktiviert';
            this.doughnutChartData[1]++;
        }
        this.boolLog += this.formatDate(new Date()) + ": " + from + " -> " + to + " \n";
        this.charts.forEach(function (child) {
            if (child.chartType === _this.doughnutChartType) {
                _this.chart = child;
            }
        });
        setTimeout(function () {
            var c = _this.chart;
            c.chart.destroy();
            c.chart = c.getChartBuilder(c.ctx);
        });
    };
    DetailsComponent.prototype.changeCont = function () {
        var _this = this;
        if (this.contInput < this.device.control_units[0].min || this.device.control_units[0].max < this.contInput)
            return;
        var from = this.currentCont;
        var to;
        to = this.contInput;
        this.currentCont = to;
        var _data = new Array(this.lineChartData[0].data.length + 1);
        for (var i = 0; i < _data.length - 1; i++) {
            _data[i] = this.lineChartData[0].data[i];
        }
        _data[_data.length - 1] = to;
        this.lineChartData[0].data = _data;
        var _labels = new Array(this.lineChartLabels.length + 1);
        for (var i = 0; i < _labels.length - 1; i++) {
            _labels[i] = this.lineChartLabels[i];
        }
        _labels[_labels.length - 1] = this.formatDate(new Date);
        this.lineChartLabels = _labels;
        this.contLog += this.formatDate(new Date()) + ": " + from + " -> " + to + " \n";
        this.charts.forEach(function (child) {
            if (child.chartType === _this.lineChartType) {
                _this.chart = child;
            }
        });
        setTimeout(function () {
            var c = _this.chart;
            c.chart.destroy();
            c.chart = c.getChartBuilder(c.ctx);
        });
    };
    DetailsComponent.prototype.changeEnum = function () {
        var _this = this;
        var from = this.polarAreaChartLabels[this.currentEnum];
        var to = this.enumInput;
        if (from === to) {
            return;
        }
        var index;
        for (var i = 0; i < this.polarAreaChartLabels.length; i++) {
            if (this.polarAreaChartLabels[i] === this.enumInput) {
                index = i;
            }
        }
        this.currentEnum = index;
        this.polarAreaChartData[index]++;
        this.enumLog += this.formatDate(new Date()) + ": " + from + " -> " + to + " \n";
        this.charts.forEach(function (child) {
            if (child.chartType === _this.polarAreaChartType) {
                _this.chart = child;
            }
        });
        setTimeout(function () {
            var c = _this.chart;
            c.chart.destroy();
            c.chart = c.getChartBuilder(c.ctx);
        });
    };
    DetailsComponent.prototype.formatDate = function (date) {
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return day + '.' + (month + 1) + '.' + year + ' ' + hour + ':' + minute + ':' + second;
    };
    __decorate([
        core_1.ViewChildren(ng2_charts_1.BaseChartDirective), 
        __metadata('design:type', core_1.QueryList)
    ], DetailsComponent.prototype, "charts", void 0);
    DetailsComponent = __decorate([
        core_1.Component({
            selector: 'device-details',
            templateUrl: '/app/views/details.html',
            providers: [device_service_1.DeviceService]
        }), 
        __metadata('design:paramtypes', [device_service_1.DeviceService, router_1.ActivatedRoute])
    ], DetailsComponent);
    return DetailsComponent;
}());
exports.DetailsComponent = DetailsComponent;
//# sourceMappingURL=details.component.js.map