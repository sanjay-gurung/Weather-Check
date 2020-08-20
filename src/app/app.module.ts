import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from './weather.service'
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/spinner/spinner.reducer';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ spinner: reducer })
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
