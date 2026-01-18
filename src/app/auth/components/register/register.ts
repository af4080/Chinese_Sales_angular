import { Component, inject } from "@angular/core";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { MessageModule } from "primeng/message";
import { ToastModule } from "primeng/toast";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Password, PasswordModule } from "primeng/password";
import { InputMask } from "primeng/inputmask";
import { AuthService } from "../../servieces/auth.service";
import { CreateUser } from "../../models/user-create.model";
import { Router } from "@angular/router";


@Component({
    selector: 'app-register',
    imports: [ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        ToastModule,
        MessageModule,
        PasswordModule,
       InputMask],
    templateUrl: './register.html',
    styleUrl: './register.scss',
    providers: [MessageService]
})
export class Register {


    messageService = inject(MessageService);

    authService = inject(AuthService)

    fb = inject(FormBuilder);

    formSubmitted = false;
    route = inject(Router);


    registerForm = this.fb.group({
        name: ['', [Validators.required,Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.email,Validators.maxLength(50)]],
        password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(15),
        Validators.pattern('.*[A-Z].*'),
        Validators.pattern('.*[a-z].*'),   
        Validators.pattern('.*[0-9].*'),   
        ]],
        phone: ['', Validators.required],
    });
onSubmit() {
        console.log("submit");
        
        this.formSubmitted = true;
        if (this.registerForm.valid) {
            const newUser : CreateUser = {
                name: this.registerForm.value.name ?? '',
                email: this.registerForm.value.email ?? '',
                password: this.registerForm.value.password ?? '',
                phone: this.registerForm.value.phone ?? ''
            }
            this.authService.register(newUser).subscribe({
                next: (response) => {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted', life: 3000 });
                    this.registerForm.reset();
                    this.formSubmitted = false;
                    this.route.navigate(['/login']);
                    console.log(response);
                },
                error: (error) => {
                    console.log(error);
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message ??  'Form Submission Failed', life: 3000 });
                    
                }
            });
        }
    }

    isInvalid(controlName: string) {
        const control = this.registerForm.get(controlName);
        return control?.invalid && (control.touched || this.formSubmitted);
    }
}
