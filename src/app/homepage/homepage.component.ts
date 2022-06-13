import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ɵisDefaultChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConversionRates } from '../common/models/conversion-rates';
import { ConversionRatesService } from '../common/services/conversion-rates.service';
import { CurrenciesService } from '../common/services/currencies.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  public conversionForm !: FormGroup;

  searchable: boolean = false;
  disabled: boolean = false;


  convertToOutput: any = 0.00.toFixed(2);


  currencyRates: ConversionRates = [];


  currencies: string[] = [];

  displayCalculations1: any;
  displayCalculations2: any;
  displayCalculations3: any;

  loading: string = '';




  constructor(private currenciesService: CurrenciesService, private formBuilder: FormBuilder, private conversionRatesService: ConversionRatesService) { }

  ngOnInit(): void {
    this.conversionForm = this.formBuilder.group({
      selectFromCurrency: ['', Validators.required],
      convertFromAmount: [0.00.toFixed(2), [
        Validators.required,
        Validators.pattern(/^\d+(\.\d+)*$/)
      ]],
      selectToCurrency: ['', Validators.required],
      convertToAmount: [0.00.toFixed(2)],
    });
    this.currencies = this.currenciesService.currencies;
    this.fetchCurrencyRates(); // uncomment this line to fetch data rates

  }

  fetchCurrencyRates() {
    this.conversionRatesService.allRates().subscribe(
      (result: any) => {
        this.currencyRates = result?.rates;
      }
    )

  }

  convertAmount() {
    this.loading = 'Fetching data...';

    let selectedFromCurrency = this.conversionForm.get('selectFromCurrency')?.value;
    let selectedToCurrency = this.conversionForm.get('selectToCurrency')?.value;
    let convertFromInput = this.conversionForm.get('convertFromAmount')?.value;
    let convertToOutput = this.conversionForm.get('convertToAmount')?.value;

    let conversionRatio = this.currencyRates[selectedToCurrency].toFixed(4) / this.currencyRates[selectedFromCurrency].toFixed(4)
    convertToOutput = convertFromInput * conversionRatio;
    this.displayCalculations1 = `${this.currencyRates[selectedToCurrency].toFixed(4)} / ${this.currencyRates[selectedFromCurrency].toFixed(4)}  
                                = ${conversionRatio.toFixed(4)} (${selectedToCurrency}/${selectedFromCurrency})`;

    this.displayCalculations2 = `${selectedFromCurrency} ${convertFromInput} * ${conversionRatio} (${selectedToCurrency}/${selectedFromCurrency})  =`;
    this.displayCalculations3 = `${selectedToCurrency} ${convertToOutput.toFixed(4)}`;

    this.convertToOutput = convertToOutput.toFixed(2);

    this.loading = '';


  }

}


