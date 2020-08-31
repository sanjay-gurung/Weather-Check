import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/spinner/spinner.reducer';
import { Temps } from './temps.model';
import { of } from 'rxjs';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let service: WeatherService;
  let mockBaseUri: any;
  let mockApiKey: any;
  let testCity: string = "seattle";
  let mockResponse: Temps = { 
    code: 200, 
    list: [ 
      { 
        main : { 
          temp_min: 32, 
          temp_max: 115 
        }
      }
    ]
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({ spinner: reducer })
      ],
      declarations: [ AppComponent ],
      providers: [ WeatherService ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    service = TestBed.get(WeatherService);
    mockBaseUri = jasmine.createSpy('dummyWeatherBaseUri');
    mockApiKey = jasmine.createSpy('dummyApiKey')
    fixture.detectChanges();
  }) 

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'weather-check'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('weather-check');
  });

  it('should render text - Weather Check', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Weather Check');
  });

  it('should call featchWeather method when process methos is called', async (() => {
    const spy1 = spyOn(service, 'fetchWeather').and.returnValue(of(mockResponse));
    const spy2 = spyOn(service.fetchWeather(testCity), 'subscribe');
    component.process();
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  }))

  it('should display alert when button clicked without city', async(() => {
    const compiled = fixture.nativeElement;
    component.onMaxTemp();
    fixture.detectChanges();
    const alert = compiled.querySelector("#alertMsg");
    expect(alert).toBeTruthy();
  }));

  it('should display alert when invalid city entered', async(() => {
    const compiled = fixture.nativeElement;
    const inputBox = compiled.querySelector("input");
    inputBox.label = "";
    component.onMaxTemp();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const alert = compiled.querySelector("#alertMsg");
      expect(alert).toBeTruthy();
    })
  }));

  it('should display temperature info when a button is clicked and the city is found', async(() => {
    const compiled = fixture.nativeElement;
    const inputBox = compiled.querySelector("input");
    inputBox.value = "las vegas";
    component.onMaxTemp();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const tempInfo = compiled.querySelector("h5[name]");
      expect(tempInfo).toBeTruthy();
    })
  }));


})
