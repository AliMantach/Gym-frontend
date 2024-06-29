import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from '../modules/interface_sub';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private apiUrl = 'http://localhost:3000/api/subscription';  

  constructor(private http: HttpClient) { }

  getSubscriptions(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(this.apiUrl,this.getAuthHeaders());
  }

  getSubscription(id: string): Observable<Subscription> {
    return this.http.get<Subscription>(`${this.apiUrl}/${id}`,this.getAuthHeaders());
  }

  addSubscription(subscription: any): Observable<Subscription> {
    return this.http.post<Subscription>(this.apiUrl, subscription,this.getAuthHeaders());
  }

  updateSubscription(id: string, subscription: any): Observable<Subscription> {
    return this.http.put<Subscription>(`${this.apiUrl}/${id}`, subscription,this.getAuthHeaders());
  }

  deleteSubscription(id: string): Observable<{ message: string; subscriptionInd: Subscription }> {
    return this.http.delete<{ message: string; subscriptionInd: Subscription }>(`${this.apiUrl}/${id}`,this.getAuthHeaders());
  }


  private getAuthHeaders() {
    const token = localStorage.getItem('accessToken');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }



}
