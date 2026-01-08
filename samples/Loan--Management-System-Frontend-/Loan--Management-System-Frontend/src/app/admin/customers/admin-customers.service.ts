import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminCustomersService {

  private BASE_URL = 'http://localhost:9090/api/customers';

  constructor(private http: HttpClient) {}

  getAllCustomers(): Observable<any> {
    return this.http.get<any>(this.BASE_URL);
  }

  deactivateCustomer(customerId: string): Observable<void> {
    return this.http.put<void>(
      `${this.BASE_URL}/${customerId}/deactivate`,
      {}
    );
  }

  activateCustomer(customerId: string): Observable<void> {
    return this.http.put<void>(
      `${this.BASE_URL}/${customerId}/activate`,
      {}
    );
  }

  deleteCustomer(customerId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.BASE_URL}/${customerId}`
    );
  }
  getCustomerById(customerId: string) {
  return this.http.get<any>(
    `${this.BASE_URL}/${customerId}`
  );
}

}
