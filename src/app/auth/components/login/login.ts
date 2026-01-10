
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api'; // לשימוש בניווט לאחר התחברות
import { ButtonModule } from 'primeng/button';
import { InputMask } from 'primeng/inputmask';
import { InputText, InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../servieces/auth.serviece';
import {  LoginUser } from '../../models/user-login.model';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,
        ButtonModule,
        ToastModule,
        MessageModule,
        PasswordModule,
       InputMask,
       CommonModule,
      InputText,
    CardModule,
    CommonModule,
    InputTextModule],   
  templateUrl: './login.html',
  styleUrl: './login.scss',
  providers:[MessageService]
})
export class Login {
 
    messageService = inject(MessageService);
    
    fb = inject(FormBuilder);
    authService = inject(AuthService);

    loginForm: FormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(15),
        Validators.pattern('.*[A-Z].*'),
        Validators.pattern('.*[a-z].*'),   
        Validators.pattern('.*[0-9].*'),   
        ]],
    });

    formSubmitted = false;

    onSubmit() {
        this.formSubmitted = true;
        if (this.loginForm.valid) {
            const loginData : LoginUser = this.loginForm.value;
            this.authService.login(loginData).subscribe({
                next: (response) => {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successful', life: 3000 });
                    this.loginForm.reset();
                    this.formSubmitted = false;
                    console.log(response.token);
                    
                },
                error: (error) => {
                    console.log(error);
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message ??  'Login failed', life: 3000 });
                }
            });
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all fields correctly.', life: 3000 });
        }
    }

    isInvalid(controlName: string) {
        const control = this.loginForm.get(controlName);
        return control?.invalid && (control?.touched || this.formSubmitted);
    }
}

