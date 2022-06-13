import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BASE_URL = 'https://api.apilayer.com/fixer/';

@Injectable({
  providedIn: 'root'
})
export class ConversionRatesService {

  API_KEY = '';
  baseCurrency = 'USD';

  constructor(private http: HttpClient) { }

  allRates() {
    return this.http.get(this.getUrl());
  }

  private getUrl() {
    return `${BASE_URL}latest?base=${this.baseCurrency}&apikey=${this.API_KEY}`;
  }
}
