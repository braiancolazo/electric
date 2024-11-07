import { Component, inject, OnInit } from '@angular/core';
import { Budget } from '../models/budget';
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

  router = inject(Router)

  ngOnInit(): void {
    this.budget = history.state.budget as Budget;
    console.log(this.budget)
    if(!this.budget){
      this.router.navigate(['/list'])
    }
  }

}
