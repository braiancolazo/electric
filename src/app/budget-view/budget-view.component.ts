import { Component, inject, OnInit } from '@angular/core';
import { Budget, Zone } from '../models/budget';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budget-view',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './budget-view.component.html',
  styleUrl: './budget-view.component.css',
})
export class BudgetViewComponent implements OnInit{

  // ADDITIONAL DOCS: same as BudgetListComponent
  budget:Budget = {} as Budget;
  caja:number = 0;
  total: number =0;
  zones = Zone
  router = inject(Router)

  ngOnInit(): void {
    this.budget = history.state.budget as Budget;
    console.log(this.budget)
    if(!this.budget){
      this.router.navigate(['/list'])
    }
    this.calcularCajayTotal()
  }

  calcularCajayTotal(){
    let numero = 0;
    let total = 0;
      for (const e of this.budget.module) {
        numero +=e.moduletype.slots
        total += e.moduletype.price
      }
      this.caja= Math.floor(numero/3)
      this.total =total
  }
}
