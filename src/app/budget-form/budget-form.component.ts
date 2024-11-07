import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { DateValidator } from '../validators/date.validators';
import { Budget, ModuleType, Zone } from '../models/budget';
import { Subscription } from 'rxjs';
import { ModuleTypeService } from '../services/module-type.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BudgetService } from '../services/budget.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-budget-form',
  standalone: true,

  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './budget-form.component.html',
  styleUrl: './budget-form.component.css',
})
export class BudgetFormComponent implements OnInit {

  types:ModuleType[]= []
  zones = Zone
  subscription = new Subscription();
  constructor(private moduleservice:ModuleTypeService){

  }


  ngOnInit(): void {
    this.llenarDatos()
    

  }
  
  llenarDatos(){
    const addSubscription = this.moduleservice.getAll().subscribe({
      next: (value: ModuleType[]) => {
        this.types=value
      },
      error: (err) => {
        alert('Error al comunicarse con la API')
      }
    });
  }


  /* ADDITIONAL DOCS:
    - https://angular.dev/guide/forms/typed-forms#formarray-dynamic-homogenous-collections
    - https://dev.to/chintanonweb/angular-reactive-forms-mastering-dynamic-form-validation-and-user-interaction-32pe
  */
 form:FormGroup= new UntypedFormGroup({
  nombre: new FormControl('',[Validators.required]),
  fecha:new FormControl(new Date(),[Validators.required,DateValidator.greaterThanToday]),
  modulos:new UntypedFormArray([]),
  
 })


 


 get modulos() {
  return this.form.controls["modulos"] as UntypedFormArray;
}
onNewModule() {
  const formArray = this.form.controls["modulos"] as FormArray;
  const moduloForm = new UntypedFormGroup({
    type2: new UntypedFormControl([]),
    ambiente2: new UntypedFormControl('',[Validators.required]),
    precio2:new UntypedFormControl('',[]),
    lugares2: new UntypedFormControl('',[]),

  });
  moduloForm.get('type2')?.valueChanges.subscribe({
    next: ()=> {
      console.log(moduloForm.get('type2')?.value)
      this.types.forEach(e => {
        if(moduloForm.get('type2')?.value === e.name){
          moduloForm.patchValue({
            precio2: e.price,
            lugares2:e.slots
          })
        }
      })  
    },error: ()=> {
      alert('error')
    }
  })
  this.modulos.push(moduloForm)
  
  }
  onDeleteEvent(index: number) {
    this.modulos.removeAt(index);
  }

  budgetservice = inject(BudgetService)
  save() {
    if(this.form.invalid){
      alert('formulario invaliudo')
      return
    }
    console.log(this.form.get('fecha')?.value)
    const budget:Budget = {
      id:'',
      client: this.form.get('nombre')?.value,
      date: this.form.get('fecha')?.value,
      module: this.form.get('modulos')?.value,
    }
    console.log(budget)
    this.budgetservice.add(budget).subscribe({
      next: (value:Budget) => {
        console.log(value)
      },
      error: () => {
        alert('error al cargar el budget');
      },
    })

  }














}


