import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private fb:FormBuilder,private readonly authService:AuthService,
    private readonly router:Router){}
  registerForm!:FormGroup
  ngOnInit():void{
    this.registerForm= this.fb.group({
      email:['',[Validators.required,Validators.minLength(5)]],
      cedula:['',[Validators.required,Validators.pattern("^([0-9]{10,10})"),Validators.maxLength(10)]],
      name:['',[Validators.required,Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    })
  }
  limpiarForm():void{
    this.registerForm.reset();
  }
  register():void{
    if(this.registerForm.valid){
      this.authService.register(this.registerForm.value).subscribe((data:any)=>{
        console.log(data)
          this.router.navigate(['/auth/login']);
      }/* ,(error:any)=>{
        console.log(error.error.messages)
        this.limpiarForm()
      } */);
    }else{
      alert("form no valido")
    }
  }
}
