import {Component, OnInit, ViewChild} from '@angular/core';
import {Device} from "../model/device";
import {DeviceService} from "../services/device.service";
import {ActivatedRoute} from "@angular/router";
import {ControlUnit} from "../model/controlUnit";
import {BaseChartDirective} from "ng2-charts";

@Component({
    selector: 'device-details',
    template: `
    <aside class="sidebar" aria-labelledby="serverinfoheadline">
    <div class="server-info-container">
      <h2 class="accessibility" id="serverinfoheadline">Serverstatus</h2>
      <dl class="server-data properties">
        <dt class="accessibility">Serverstatus:</dt>
        <dd class="server-status">Serverstatus:</dd>
        <dt>Benutzer</dt>
        <dd>
          <span class="system-start-time">Administrator</span>
        </dd>
        <dt>Systemstartzeit</dt>
        <dd>
          <span class="system-start-time">10:00</span>
        </dd>
        <dt>Systemstartdatum</dt>
        <dd>
          <span class="system-start-datum">06.03.2017</span>
        </dd>
        <dt>Fehlgeschlagene Logins</dt>
        <dd>
          <span class="failed-logins">3</span>
        </dd>
      </dl>
    </div>
  </aside>
  <main aria-labelledby="deviceheadline" class="details-container">
    <div attr.data-device-id={{device?.id}} class="details-headline">
      <h2 class="main-headline" id="deviceheadline">{{device?.display_name}}</h2>
    </div>
    <div *ngFor="let controlUnit of controlUnits" [ngSwitch]=controlUnit.type class="details-holder">

      <div *ngSwitchCase="2" class="details-outer">
        <div class="details-image-container">
          <canvas class="details-image-lineChart" baseChart height="400px" width="700px"
                [datasets]="lineChartData"
                [labels]="lineChartLabels"
                [chartType]="lineChartType">
            </canvas>
        </div>
        <div class="details-data">
          <label class="accessibility" for="details-log">Letzte Werteänderungen</label>
          <textarea id="details-log" class="detail-logs" placeholder="Gerätelog" readonly rows="6">{{contLog}}
          </textarea>
          <div class="details-settings">
            <h3 class="details-headline">{{controlUnit.name}}</h3>

            <form class="update-form" method="post">
              <label class="update-form-field" id="current-value">
                <span class="current-value">derzeit: {{currentCont}}</span>
              </label>
              <label class="accessibility" for="new-value">Bitte gewünschten Wert eingeben.</label>
              <input [(ngModel)]="contInput" type="number" step="0.01" min="0" max="50" id="new-value" value="1"
                     class="update-form-field form-input" name="new-value" required>
              <input (click)="changeCont()" type="submit" id="submit-value" class="update-form-field button" name="submit-value"
                     value="Wert setzen">
            </form>
          </div>
        </div>
      </div>

      <div *ngSwitchCase="1" class="details-outer">
        <div class="details-image-container">
          <img class="details-image" src="../../images/placeholder_enum.PNG">
        </div>
        <div class="details-data">
          <label class="accessibility" for="details-log">Letzte Werteänderungen</label>
          <textarea id="details-log" class="detail-logs" placeholder="Gerätelog" readonly rows="6">6.3.2017 10:02:32: Ein -> Standby</textarea>
          <div class="details-settings">
            <h3 class="details-headline">Gerätezustand einstellen</h3>

            <form class="update-form" method="post">
              <label class="update-form-field" id="current-value">
                <span class="current-value">derzeit: {{controlUnit.values[controlUnit.current]}}</span>
              </label>
              <label class="accessibility" for="new-value">Bitte gewünschten Wert aus Menü auswählen.</label>
              <select id="new-value" class="update-form-field form-input" name="new-value" required>
                <option *ngFor="let value of controlUnit.values">{{value}}</option>
              </select>
              <input type="submit" id="submit-value" class="update-form-field button" name="submit-value"
                     value="Wert setzen">
            </form>
          </div>
        </div>
      </div>

      <div *ngSwitchCase="0" class="details-outer">
        <div class="details-image-container">
          <canvas class="details-image" baseChart
              [data]="doughnutChartData"
              [labels]="doughnutChartLabels"
              [chartType]="doughnutChartType">
          </canvas>
        </div>
        <div class="details-data">
          <label class="accessibility" for="details-log">Letzte Werteänderungen</label>
          <textarea id="details-log" class="detail-logs" placeholder="Gerätelog" readonly rows="6">{{boolLog}}</textarea>
          <div class="details-settings">
            <h3 class="details-headline">{{controlUnit.name}}</h3>

            <form class="update-form" method="post">

              <label class="update-form-field" id="current-value">
                <span class="current-value">derzeit: {{currentString}}</span>
              </label>

              <label class="accessibility" for="new-value">Bitte gewünschten Wert auswählen.</label>
              <input (click)="changeBool()" type="submit" id="submit-value" class="update-form-field button" name="submit-value"
                     value="On/Off">
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
`,
    providers: [DeviceService]
})

export class DetailsComponent{
    device: Device;
    controlUnits: [ControlUnit];
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
                    this.lineChartLabels = [this.formatDate(new Date)]
                    this.currentCont = entry.current;
                    this.contInput = entry.current;
                }
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

    changeCont(): void{
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