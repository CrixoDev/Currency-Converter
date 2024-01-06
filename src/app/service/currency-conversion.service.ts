// Import necessary modules from Angular and RxJS
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Import environment configuration
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConversionService {
  // API base URL and API key from environment configuration
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  // Inject the HttpClient service into the constructor
  constructor(private http: HttpClient) { }

  /**
   * Get the exchange rate between two currencies.
   * @param fromCurrency The source currency code.
   * @param toCurrency The target currency code.
   * @returns An observable containing the exchange rate.
   */
  getExchangeRate(fromCurrency: string, toCurrency: string): Observable<number> {
    // Construct the URL for the exchange rate API endpoint
    const url = `${this.apiUrl}/${this.apiKey}/pair/${fromCurrency}/${toCurrency}`;

    // Make an HTTP GET request to the API endpoint, handle response and errors
    return this.http.get<any>(url).pipe(
      map(response => this.extractExchangeRate(response)),
      catchError(this.handleError)
    );
  }

  /**
   * Extract the exchange rate from the API response.
   * @param response The API response containing exchange rate information.
   * @returns The extracted exchange rate.
   */
  private extractExchangeRate(response: any): number {
    // Assuming the response contains the exchange rate information
    return response.conversion_rate;
  }

  /**
   * Handle errors that may occur during the HTTP request.
   * @param error The error object.
   * @returns An observable that throws the error.
   */
  private handleError(error: any): Observable<never> {
    // Log the error to the console
    console.error('Error fetching exchange rate:', error);
    // Throw the error to be handled by the calling code
    throw error;
  }
}
