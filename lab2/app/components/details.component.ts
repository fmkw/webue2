import {Component, OnInit, ViewChild} from '@angular/core';
import {Device} from "../model/device";
import {DeviceService} from "../services/device.service";
import {ActivatedRoute} from "@angular/router";
import {ControlUnit} from "../model/controlUnit";
import {ControlType} from '../model/controlType';
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

      <div *ngSwitchCase="typeEnum.continuous" class="details-outer">
        <div class="details-image-container">
          <img class="details-image" src="../../images/placeholder_continuous.PNG">
        </div>
        <div class="details-data">
          <label class="accessibility" for="details-log">Letzte Werteänderungen</label>
          <textarea id="details-log" class="detail-logs" placeholder="Gerätelog" readonly rows="6">6.3.2017 10:01:30: 20 -> 25
          </textarea>
          <div class="details-settings">
            <h3 class="details-headline">Temperatur einstellen</h3>

            <form class="update-form" method="post">
              <label class="update-form-field" id="current-value">
                <span class="current-value">derzeit: 0</span>
              </label>
              <label class="accessibility" for="new-value">Bitte gewünschten Wert eingeben.</label>
              <input type="number" step="0.01" min="0" max="50" id="new-value" value="1"
                     class="update-form-field form-input" name="new-value" required>
              <input type="submit" id="submit-value" class="update-form-field button" name="submit-value"
                     value="Wert setzen">
            </form>
          </div>
        </div>
      </div>

      <div *ngSwitchCase="typeEnum.enum" class="details-outer">
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

      <div *ngSwitchCase="typeEnum.boolean" [ngSwitch]=controlUnit.current class="details-outer">
        <div class="details-image-container">
          <canvas class="details-image" baseChart
              [data]="doughnutChartData"
              [labels]="doughnutChartLabels"
              [chartType]="doughnutChartType">
          </canvas>
        </div>
        <div class="details-data">
          <label class="accessibility" for="details-log">Letzte Werteänderungen</label>
          <textarea [(ngModel)]="boolLog" id="details-log" class="detail-logs" placeholder="Gerätelog" readonly rows="6">{{boolLog}}</textarea>
          <div class="details-settings">
            <h3 class="details-headline">Ein-/Ausschalten</h3>

            <form class="update-form" method="post">

              <label class="update-form-field" id="current-value">
                <span *ngSwitchCase="0" class="current-value">derzeit: Deaktiviert</span>
                <span *ngSwitchCase="1" class="current-value">derzeit: Aktiviert</span>
              </label>

              <label class="accessibility" for="new-value">Bitte gewünschten Wert auswählen.</label>
              <input type="checkbox" id="new-value" class="update-checkbox-input form-input"
                     name="new-value" [(ngModel)]="checkBoxBool">
              <input (click)="changeBool()" type="submit" id="submit-value" class="update-form-field button" name="submit-value"
                     value="Wert setzen">
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
`,
    providers: [DeviceService]
})

export class DetailsComponent implements OnInit{
    device: Device;
    controlUnits: [ControlUnit];
    typeEnum = ControlType;
    id: string;
    checkBoxBool: boolean = false;
    @ViewChild(BaseChartDirective) chart: BaseChartDirective;
    boolLog: string = "";
    boolCurrent: boolean;

    doughnutChartLabels: string[] = ['On', 'Off'];
    doughnutChartData: number[] = [0, 0];
    doughnutChartType: string = 'doughnut';

    constructor(private deviceService: DeviceService, private route: ActivatedRoute,) {

    }

    ngOnInit(): void {
        this.route.params
            .subscribe(params => {
                this.id = params['id'];
            });
        this.deviceService.getDevice(this.id).then(device => {
            this.device = device;
            this.controlUnits = device.control_units;
        });
    }

    changeBool(): void{
        let from: string;
        let to: string;
        if(this.checkBoxBool){
            this.doughnutChartData[0]++;
            from = 'An';
            to = 'Aus';
        }else{
            this.doughnutChartData[1]++;
            from = 'Aus';
            to = 'An';
        }
        this.boolCurrent = false;
        this.boolLog += this.formatDate(new Date()) + ": " + from + " -> " + to +" \n";
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