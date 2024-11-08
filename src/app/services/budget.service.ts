import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Budget } from '../models/budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private readonly http: HttpClient = inject(HttpClient);
  private readonly url = 'http://localhost:3000/budgets';

  constructor() { }

  getAll(): Observable<Budget[]> {
    const observable = this.http.get<Budget[]>(this.url);
    return observable;
  }
  getByClient(client :string){
    return this.http.get<any>(this.url + '?client='+ client)
  }

  add(budget: Budget): Observable<Budget> {
    return this.http.post<Budget>(
      this.url, budget
    )
  }

  getById(id: string): Observable<Budget> {
    return this.http.get<Budget>(
      `${this.url}/${id}`
    );
  }
  

}
