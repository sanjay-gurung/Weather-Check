import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { Temps } from './temps.model';
import { request } from 'http';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;
  let dummyCity: string = 'seattle'

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        WeatherService
    ]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get temperatures when fetchMethod is called', () => {
    inject([HttpTestingController, WeatherService],
      (httpMock: HttpTestingController, service: WeatherService) => {

        //calling the service
        service.fetchWeather(dummyCity).subscribe(data => {
          expect(data.code).toBe(200);
        });

        //setting the expectation for the Httpclient mock
        const  request = httpMock.expectOne('http://dummyDomain/dummyUri/dummuQueryString');
        expect(request.request.method).toEqual('GET');
      })
    })
});
