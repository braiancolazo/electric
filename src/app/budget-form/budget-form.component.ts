import { CommonModule, formatDate } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormControl, FormGroup, ReactiveFormsModule, UntypedFormArray, UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { DateValidator } from '../validators/date.validators';
import { Budget, Module, ModuleType, Zone } from '../models/budget';
import { catchError, map, Observable, of, Subscription } from 'rxjs';
import { ModuleTypeService } from '../services/module-type.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BudgetService } from '../services/budget.service';
import { Router, RouterModule } from '@angular/router';
import { minModulesValidator } from '../validators/minModuile.validators';


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
    this.form.controls['fecha'].valueChanges.subscribe({
      next: () => {
        console.log(new Date()
      )
        console.log(new Date(this.form.controls['fecha'].value + 'T00:00:00')
      )
      }
    })
    

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
 form:FormGroup= new FormGroup({
  nombre: new FormControl('',[Validators.required],this.clienteUnico()),
  fecha:new FormControl(new Date(),[Validators.required,DateValidator.greaterThanToday]),
  modulos:new FormArray([],[minModulesValidator]),
 })


 


 get modulos() {
  return this.form.controls["modulos"] as UntypedFormArray;
}
onNewModule() {
  const formArray = this.form.controls["modulos"] as FormArray;
  const moduloForm = new FormGroup({
    type2: new FormControl('',[]),
    ambiente2: new FormControl('',[Validators.required]),
    precio2:new FormControl(0,[]),
    lugares2: new FormControl(0,[]),

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
  clienteUnico(): AsyncValidatorFn {
    return (control:AbstractControl):Observable<ValidationErrors | null>=> {
      return this.budgetservice.getByClient(control.value).pipe(
        map(data =>{
          return data.length > 0 ? {clienteUnico:true} : null
        }),
        catchError(() => {
          alert("error en la api")
          return of({apiCaida : true})
        })

      )
    }
  }
  router = inject(Router)
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
      module: this.form.get('modulos')?.value.map((modulo:any) => {
              // Buscar el ModuleType usando el nombre
      const moduleType = this.types.find((e) => e.name === modulo.type2);

      // Crear el objeto Module para cada modulo en el FormArray
      return {
        zone: modulo.ambiente2,           // El valor de 'lugares2' se mapea a 'zone'
        moduletype: moduleType || {      // Si no se encuentra un 'moduleType', utilizar uno vacío (deberías manejar esto mejor)
          id: 0, 
          name: 'Unknown',
          slots: 0,
          price: 0
        }
      } as Module;
      })
        
    }
     
    console.log(budget)
    this.budgetservice.add(budget).subscribe({
      next: (value:Budget) => {
        console.log(value)
        this.router.navigate(['/list'])
        
      },
      error: () => {
        alert('error al cargar el budget');
      },
    })
    
  }














}


