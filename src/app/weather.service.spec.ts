import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { Temps } from './temps.model';
import { request } from 'http';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;
  let dummyCity: string = 'fakeCity'
  let mockedTemps: Temps = { 
    code: 200, 
    list: [ 
      { 
        main : { 
          temp_min: 32, 
          temp_max: 115 
        }
      }
    ]
  };

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

  it('should get expected temperatures when fetchWeather is called', async(() => {
    service.fetchWeather(dummyCity).subscribe((response) => {
      expect(response).toBe(mockedTemps, 'should match the returned mocked temperatures');
    })

    const req = httpMock.expectOne(service.BASE_URL + dummyCity + service.API_KEY);
    expect(req.request.method).toEqual('GET');

    req.flush(mockedTemps);
  }))

  it('should return expected error message when no city found', async(() => {
    service.fetchWeather(dummyCity).subscribe((response) => {
      expect(response.code).toEqual(404, 'should match the returned movked code');
    })

    const req = httpMock.expectOne(service.BASE_URL + dummyCity + service.API_KEY);
    
    const mockedErrorResponse = { code: 404, message: "city not found" };
    req.flush(mockedErrorResponse);
  
  }))
  
  it('should be OK to reutn no list of temeratures', async(() => {
    service.fetchWeather(dummyCity).subscribe((response) => {
      expect(response.list.length).toEqual(0, 'should match the empty temperatures list');
    })

    const req = httpMock.expectOne(service.BASE_URL + dummyCity + service.API_KEY);
    
    const mockedErrorResponse = { list: [] };
    req.flush(mockedErrorResponse);
  
  }))
});
