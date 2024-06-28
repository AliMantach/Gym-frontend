import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/register`, userData);
  }

  loginUser(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/login`, userData);
  }

  getContacts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/contacts`, this.getAuthHeaders());
  }

  addContact(contactData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/contacts`, contactData, this.getAuthHeaders());
  }

  updateContact(contactId: string, contactData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/contacts/${contactId}`, contactData, this.getAuthHeaders());
  }

  deleteContact(contactId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/contacts/${contactId}`, this.getAuthHeaders());
  }
}
