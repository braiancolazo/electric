import { Routes } from '@angular/router';
import { BudgetListComponent } from './budget-list/budget-list.component';
import { BudgetFormComponent } from './budget-form/budget-form.component';
import { BudgetViewComponent } from './budget-view/budget-view.component';

export const routes: Routes = [
    {
        path:"list",component:BudgetListComponent
    },
    {
        path:"new", component:BudgetFormComponent
    },
    {
        path:"view", component:BudgetViewComponent
    },
    {
        path:"",component:BudgetListComponent
    }
    // {
    //     path:"view",  loadChildren: () => import('./budget-view/budget-view.component').then(r => r.BudgetViewComponent)
    // }

];
