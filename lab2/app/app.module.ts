import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { AppComponent }         from './components/app.component';
import {LoginComponent} from "./components/login.component";
import {RouterModule, Routes} from "@angular/router";
import {OverviewComponent} from "./components/overview.component";
import {OptionsComponent} from "./components/options.component";
import {DetailsComponent} from "./components/details.component";
import {NavigationComponent} from "./components/navigation.component";
import {DeviceService} from "./services/device.service";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'options', component: OptionsComponent },
  { path: 'details/:id', component: DetailsComponent },
];

@NgModule({
  imports: [
      BrowserModule,
      FormsModule,
      ChartsModule,
      RouterModule.forRoot(routes),
  ],
  declarations: [
      AppComponent,
      LoginComponent,
      OverviewComponent,
      OptionsComponent,
      DetailsComponent,
      NavigationComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [ DeviceService]
})
export class AppModule { }
