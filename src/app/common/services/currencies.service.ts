import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  currencies: string[] = [
    'USD',
    'EUR',
    'GBP',
    'JPY',
    'NGN'
  ]
}
