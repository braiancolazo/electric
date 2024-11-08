import { AbstractControl, UntypedFormArray, ValidationErrors } from "@angular/forms";

export function minModulesValidator(control: AbstractControl): ValidationErrors | null {
    const formArray = control as UntypedFormArray;
    return formArray.length >= 5 ? null : { minModules: true };  // Si tiene menos de 5 módulos, retorna un error
}