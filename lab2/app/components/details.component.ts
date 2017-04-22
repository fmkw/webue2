import {Component, OnInit, ViewChild} from '@angular/core';
import {Device} from "../model/device";
import {DeviceService} from "../services/device.service";
import {ActivatedRoute} from "@angular/router";
import {ControlUnit} from "../model/controlUnit";
import {BaseChartDirective} from "ng2-charts";

@Component({
    selector: 'device-details',
    templateUrl: '/app/views/details.html',
    providers: [DeviceService]
})

export class DetailsComponent{
    device: Device;
    controlUnits: [ControlUnit];
    min : number;
    max : number;
    id: string;
    boolLog: string = "";
    contLog: string = "";
    currentString: string;
    currentCont: number;
    contInput: number;
    @ViewChild(BaseChartDirective) chart: BaseChartDirective;

    doughnutChartLabels: string[] = ['On', 'Off'];
    doughnutChartData: number[] = [4, 5];
    doughnutChartType: string = 'doughnut';

    public lineChartData:Array<any>;
    public lineChartLabels:Array<any>;
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';

    constructor(
        private deviceService: DeviceService,
        private route: ActivatedRoute
    ) {
        this.route.params
            .subscribe(params => {
                this.id = params['id'];
            });
        this.deviceService.getDevice(this.id).then(device => {
            this.device = device;
            this.controlUnits = device.control_units;
            for (let index = 0; index < this.controlUnits.length; ++index)
            {
                let entry = this.controlUnits[index];
                if(entry.type == 0){
                    if(entry.current == 0){
                        this.currentString = 'Deaktiviert';
                    }else{
                        this.currentString = 'Aktiviert';
                    }
                }else if(entry.type == 2){
                    this.lineChartData = [{data: [entry.current], label: 'Verlauf'}];
                    this.lineChartLabels = [this.formatDate(new Date)]
                    this.currentCont = entry.current;
                    this.contInput = entry.current;
                }

                if(entry.min != null)
                    this.min = entry.min;
                if(entry.max != null)
                    this.max = entry.max;
            }
        });
    }

    changeBool(): void{
        let from: string;
        let to: string;
        if(this.currentString === 'Aktiviert'){
            from = 'An';
            to = 'Aus';
            this.doughnutChartData[0]++;
            this.currentString = 'Deaktiviert';
        }else{
            from = 'Aus';
            to = 'An';
            this.currentString = 'Aktiviert';
            this.doughnutChartData[1]++;
        }
        this.boolLog += this.formatDate(new Date()) + ": " + from + " -> " + to +" \n";
        setTimeout(() => {
            let c = this.chart;
            c.chart.destroy();
            c.chart = c.getChartBuilder(c.ctx);
        });
    }

    changeCont(): void
    {
        if(this.contInput < this.device.control_units[0].min || this.device.control_units[0].max < this.contInput)
            return;

        let from: number = this.currentCont;
        let to: number;
        to = this.contInput;
        this.currentCont = to;

        let _data: Array<number> = new Array(this.lineChartData[0].data.length + 1);
        for (let i = 0; i < _data.length - 1; i++){
            _data[i] = this.lineChartData[0].data[i];
        }

        _data[_data.length - 1] = to;
        this.lineChartData[0].data = _data;
        let _labels: Array<string> = new Array(this.lineChartLabels.length + 1);
        for (let i = 0; i < _labels.length - 1; i++){
            _labels[i] = this.lineChartLabels[i];
            console.log(_labels);
        }

        _labels[_labels.length - 1] = this.formatDate(new Date);
        this.lineChartLabels = _labels;
        this.contLog += this.formatDate(new Date()) + ": " + from + " -> " + to +" \n";

        setTimeout(() => {
            let c = this.chart;
            c.chart.destroy();
            c.chart = c.getChartBuilder(c.ctx);
        });
    }

    formatDate(date:Date) {

        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        return day + '.' + (month + 1) + '.' + year + ' ' + hour + ':' + minute +':' + second;
    }
}