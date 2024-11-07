import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ModuleType } from "../models/budget";


@Injectable({
  providedIn: 'root'
})
export class ModuleTypeService {

  private readonly http: HttpClient = inject(HttpClient);
  private readonly url = 'http://localhost:3000/module-types/';

  constructor() { }

  getAll(): Observable<ModuleType[]> {
    const observable = this.http.get<ModuleType[]>(this.url);
    return observable;
  }

  
}
