import { Component, ViewChild, ElementRef, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { WeatherService } from './weather.service';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as Actions from './state/spinner/spinner.action';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather-check';
  @ViewChild('city') city: ElementRef;
  tempsSubscription: Subscription;
  maxTemp: number;
  minTemp: number;
  medianTemp: number;
  maxTempInFah: String; 
  minTempInFah: String;
  medianTempInFah: String;
  isProcessed: boolean = false;
  isBtnClickedWithoutCity: boolean = false;
  maxBtnClicked: boolean = false;
  minBtnClicked: boolean = false;
  medianBtnClicked: boolean = false;
  hasError: boolean = false;
  errorText: string = "";

  spinner: Observable<boolean>;
  

  constructor( 
    private weatherService: WeatherService,
    private store: Store<any>
    ) {}

    
  // ngOnInit(): void {
  //   this.spinner = this.store.pipe(select(state => state.spinner.isOn));
  // }


  process() {
    // this.store.dispatch({ type: 'startSpinner' });
    this.store.dispatch(new Actions.StartSpinner)
    this.tempsSubscription = this.weatherService.fetchWeather(this.city.nativeElement.value).subscribe((res) => {
      const maxTemps: number[] = [];
      const minTemps: number[] = [];
      console.log("Response=" , res);

      // finding max temperature
      for(let i=0; i<40; i++) {
        maxTemps.push(res.list[i].main.temp_max)
      }
      this.maxTemp = Math.max.apply(Math, maxTemps);
      this.maxTempInFah = (1.8 * (this.maxTemp - 273) + 32).toFixed(2);

      // finding mix temperature
      for(let i=0; i<40; i++) {
        minTemps.push(res.list[i].main.temp_min)
      }
      this.minTemp = Math.min.apply(Math, minTemps);
      this.minTempInFah = (1.8 * (this.minTemp - 273) + 32).toFixed(2);

      // finding median temperate
      const mid = Math.floor(maxTemps.length/2), nums = [...maxTemps].sort((a, b) => a-b);
      this.medianTemp = maxTemps.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
      this.medianTempInFah = (1.8 * (this.medianTemp - 273) + 32).toFixed(2);
      
      // this.store.dispatch({ type: 'stopSpinner' })
      this.store.dispatch( new Actions.StopSpinner );
    },
    (error) => {
      this.store.dispatch( new Actions.StopSpinner );
      if (error.status == 404) {
        this.hasError = true;
        this.errorText = "City not found!  Please check the spellings and try again.";
      } else {
        this.hasError = true;
        this.errorText = "Weather server is unavailable at the moment. Please try again later.";
      }
    })
  }

  onMaxTemp() {
    if(!this.city.nativeElement.value) {
      this.isBtnClickedWithoutCity = true;
      this.errorText = "Please enter a city and try again.";
    } else {
      this.process();
      this.maxBtnClicked = true;
      this.minBtnClicked = false;
      this.medianBtnClicked = false;
      this.hasError = false;
      this.isBtnClickedWithoutCity = false;
    }
  }

  onMinTemp() {
    if(!this.city.nativeElement.value) {
      this.isBtnClickedWithoutCity = true;
      this.errorText = "Please enter a city and try again.";
    } else {
      if(!this.isProcessed) {
        this.process();
        this.minBtnClicked = true;
        this.maxBtnClicked = false;
        this.medianBtnClicked = false;
        this.hasError = false;
        this.isBtnClickedWithoutCity = false;
      }
    }
  }

  onMedianTemp() {
    if(!this.city.nativeElement.value) {
      this.isBtnClickedWithoutCity = true;
      this.errorText = "Please enter a city and try again.";
    } else {
      if(!this.isProcessed) {
        this.process();
        this.medianBtnClicked = true;
        this.maxBtnClicked = false;
        this.minBtnClicked = false;
        this.hasError = false;
        this.isBtnClickedWithoutCity = false;
      } 
    }
  }

  onEnterKeyPress() {
    this.onMaxTemp();
  }

  onDismiss() {
    this.isBtnClickedWithoutCity = false;
    this.hasError = false;
    this.maxBtnClicked = false;
    this.minBtnClicked = false;
    this.medianBtnClicked = false;

  }

  onDestroy() {
    this.tempsSubscription.unsubscribe();
  }

}
