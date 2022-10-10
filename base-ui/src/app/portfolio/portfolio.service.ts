import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<any> {
		const formData: FormData = new FormData();
	
		formData.append('file', file);
	
		const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData);
	
		return this.http.request(req);
	  }
}
