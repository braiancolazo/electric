import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Budget } from '../models/budget';
import { BudgetService } from '../services/budget.service';
import { Subscription } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { BudgetViewComponent } from '../budget-view/budget-view.component';


@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [BudgetViewComponent,RouterModule],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.css',
})
export class BudgetListComponent implements OnInit,OnDestroy{

  /* ADDITIONAL DOCS:
    - https://angular.dev/guide/components/lifecycle#
    - https://angular.dev/guide/http/making-requests#http-observables
    - https://angular.dev/guide/http/setup#providing-httpclient-through-dependency-injection
    - https://angular.dev/guide/http/making-requests#setting-request-headers
    - https://angular.dev/guide/http/making-requests#handling-request-failure
    - https://angular.dev/guide/http/making-requests#best-practices (async pipe)
    - https://angular.dev/guide/testing/components-scenarios#example-17 (async pipe)
  */
    subscription = new Subscription()

    lst:Budget[] = []
    router = inject(Router)
    constructor(private budgetService:BudgetService){
      
    }


    ngOnInit(): void {
      this.llenarTabla()
      
    }
    ngOnDestroy(): void {
      this.subscription.unsubscribe()
    }

    llenarTabla(){
      this.budgetService.getAll().subscribe({
        next: (value:Budget[]) => {
          this.lst = value
          console.log(value)
        },
        error: () => {
          alert('error al cargar la lst')
        }
      })
    }

    mostrar(budget:Budget) {
      this.router.navigate(['/view'],{state:{budget}})
    }



}
