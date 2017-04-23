import { Component } from '@angular/core';

@Component({
    selector: 'options',
    templateUrl: '/app/views/options.html'
})
export class OptionsComponent {
    patternOld = /.{4,12}/
    patternNew = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}/;
    oldInput: string = "";
    newInput: string = "";
    confirmInput: string = "";

    formValidation(): boolean{
        if(!this.patternOld.test(this.oldInput)){
            return false;
        }else if(!this.patternNew.test(this.newInput)){
            return false;
        }else if((this.confirmInput !== this.newInput)){
            return false;
        }else{
            return true;
        }
    }

    submitForm(): void{
        this.oldInput = this.newInput = this.confirmInput = "";
    }
}