import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { WeatherService } from './weather.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'weather-check';
  @ViewChild('city') city: ElementRef;
  tempsSubscription: Subscription;
  maxTemp: number;
  minTemp: number;
  medianTemp: number;
  isProcessed: boolean = false;
  isBtnClickedWithoutCity: boolean = false;
  maxBtnClicked: boolean = false;
  minBtnClicked: boolean = false;
  medianBtnClicked: boolean = false;

  constructor( private weatherService: WeatherService) {}
  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }

  process() {
    this.tempsSubscription = this.weatherService.fetchWeather(this.city.nativeElement.value).subscribe((res) => {
      const maxTemps: number[] = [];
      const minTemps: number[] = [];

      // finding max temperature
      for(let i=0; i<40; i++) {
        maxTemps.push(res.list[i].main.temp_max)
      }
      this.maxTemp = Math.max.apply(Math, maxTemps);

      // finding mix temperature
      for(let i=0; i<40; i++) {
        minTemps.push(res.list[i].main.temp_min)
      }
      this.minTemp = Math.min.apply(Math, minTemps);

      // finding median temperate
      const mid = Math.floor(maxTemps.length/2), nums = [...maxTemps].sort((a, b) => a-b);
      this.medianTemp = maxTemps.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    },
    (error) => {
      console.log('error!!!', error);
      if (error.status == 404) {
        alert("City not found, please check spellings and try again.")
        this.maxBtnClicked = false;
      } else {
        alert("Weather server is unavailable at the moment, please try again later.")
      }
    })
  }

  onMaxTemp() {
    if(!this.city.nativeElement.value) {
      alert("Please enter a city name.")
    } else {
      if(!this.isProcessed) {
        this.process();
        this.maxBtnClicked = true;
        this.minBtnClicked = false;
        this.medianBtnClicked = false;
      }
    }
  }

  onMinTemp() {
    if(!this.city.nativeElement.value) {
      alert("Please enter a city name.")
    } else {
      if(!this.isProcessed) {
        this.process();
        this.minBtnClicked = true;
        this.maxBtnClicked = false;
        this.medianBtnClicked = false
      }
    }
  }

  onMedianTemp() {
    if(!this.city.nativeElement.value) {
      alert("Please enter a city name.")
    } else {
      if(!this.isProcessed) {
        this.process();
        this.medianBtnClicked = true;
        this.maxBtnClicked = false;
        this.minBtnClicked = false;
      } 
    }
  }

  onDestroy() {
    this.tempsSubscription.unsubscribe();
  }

}
