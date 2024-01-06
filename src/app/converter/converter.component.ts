// Import necessary modules and services from Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Import the CurrencyConversionService for currency conversion functionality
import { CurrencyConversionService } from '../service/currency-conversion.service';

@Component({
  // Define the component metadata
  selector: 'app-converter',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [CurrencyConversionService],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.css'
})
export class ConverterComponent implements OnInit {
  // Initialize component properties
  amount = 0;
  fromCurrency = 'EUR';
  toCurrency = 'GBP';
  result = 0;
  currencies: string[] = ['USD', 'ARS', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD', 'NOK', 'MXN', 'SGD', 'HKD', 'KRW', 'TRY', 'INR', 'BRL', 'ZAR', 'RUB'];

  // Inject CurrencyConversionService into the component
  constructor(private conversionService: CurrencyConversionService) { }

  // Lifecycle hook: ngOnInit is called after the component is initialized
  ngOnInit(): void {
    // Any initialization logic can be placed here
  }

  /**
   * Perform currency conversion based on user input.
   */
  convert(): void {
    // Call the getExchangeRate method of the conversion service
    this.conversionService.getExchangeRate(this.fromCurrency, this.toCurrency)
      .subscribe({
        // Handle the successful response
        next: exchangeRate => {
          // Calculate the result based on the exchange rate
          this.result = this.amount * exchangeRate;
        },
        // Handle errors during the API call
        error: error => {
          console.error('Error fetching exchange rate:', error);
        }
      });
  }
}
