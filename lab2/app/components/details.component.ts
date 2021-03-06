import {Component, ViewChildren, QueryList} from '@angular/core';
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
    enumLog: string = "";
    currentString: string;
    currentCont: number;
    currentEnum: number;
    contInput: number;
    enumInput: string;
    @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective>;
    chart: BaseChartDirective;

    doughnutChartLabels: string[] = ['On', 'Off'];
    doughnutChartData: number[] = [4, 5];
    doughnutChartType: string = 'doughnut';

    lineChartData:Array<any>;
    lineChartLabels:Array<any>;
    lineChartLegend:boolean = true;
    lineChartType:string = 'line';

    polarAreaChartLabels:string[];
    polarAreaChartData:number[];
    polarAreaLegend:boolean = true;
    polarAreaChartType:string = 'polarArea';

    constructor(private deviceService: DeviceService, private route: ActivatedRoute,) {
        this.route.params
            .subscribe(params => {
                this.id = params['id'];
            });
        this.deviceService.getDevice(this.id).then(device => {
            this.device = device;
            this.controlUnits = device.control_units;
            for (let index = 0; index < this.controlUnits.length; ++index) {
                let entry = this.controlUnits[index];
                if(entry.type == 0){
                    if(entry.current == 0){
                        this.currentString = 'Deaktiviert';
                    }else{
                        this.currentString = 'Aktiviert';
                    }
                }else if(entry.type == 2){
                    this.lineChartData = [{data: [entry.current], label: 'Verlauf'}];
                    this.lineChartLabels = [this.formatDate(new Date)];
                    this.currentCont = entry.current;
                    this.contInput = entry.current;
                }else if(entry.type == 1){
                    this.polarAreaChartLabels = entry.values;
                    this.polarAreaChartData = new Array(entry.values.length);
                    for(let i = 0; i < this.polarAreaChartData.length; i++){
                        this.polarAreaChartData[i] = 0;
                    }
                    this.polarAreaChartData[entry.current]++;
                    this.currentEnum = entry.current;
                    this.enumInput = entry.values[this.currentEnum];
                }
                if(entry.min != null)
                    this.min = entry.min;
                if(entry.max != null)
                    this.max = entry.max;

                console.log(this.charts);
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
        this.charts.forEach((child) => {
            if(child.chartType === this.doughnutChartType){
                this.chart = child;
            }
        });
        setTimeout(() => {
            let c = this.chart;
            c.chart.destroy();
            c.chart = c.getChartBuilder(c.ctx);
        });
    }

    changeCont(): void{
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
        }
        _labels[_labels.length - 1] = this.formatDate(new Date);
        this.lineChartLabels = _labels;
        this.contLog += this.formatDate(new Date()) + ": " + from + " -> " + to +" \n";
        this.charts.forEach((child) => {
            if(child.chartType === this.lineChartType){
                this.chart = child;
            }
        });
        setTimeout(() => {
            let c = this.chart;
            c.chart.destroy();
            c.chart = c.getChartBuilder(c.ctx);
        });
    }

    changeEnum(): void{
        let from: string = this.polarAreaChartLabels[this.currentEnum];
        let to: string = this.enumInput;
        if(from === to){
            return;
        }
        let index: number;
        for(let i = 0; i < this.polarAreaChartLabels.length; i++){
            if(this.polarAreaChartLabels[i] === this.enumInput){
                index = i;
            }
        }
        this.currentEnum = index;
        this.polarAreaChartData[index]++;
        this.enumLog += this.formatDate(new Date()) + ": " + from + " -> " + to +" \n";
        this.charts.forEach((child) => {
            if(child.chartType === this.polarAreaChartType){
                this.chart = child;
            }
        });
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