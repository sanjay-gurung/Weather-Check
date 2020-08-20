import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { Observable } from 'rxjs';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let service: WeatherService;
  let mockBaseUri: any;
  let mockApiKey: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
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

  it('should call featchWeather method when process methos is called', () => {
    spyOn(service, 'fetchWeather')
    component.process();
    expect(service.fetchWeather).toHaveBeenCalled();
  })
});
