import { Component, inject } from "@angular/core";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { MessageModule } from "primeng/message";
import { ToastModule } from "primeng/toast";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Password, PasswordModule } from "primeng/password";
import { InputMask } from "primeng/inputmask";


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

    fb = inject(FormBuilder);

    formSubmitted = false;


    registerForm = this.fb.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(15),
        Validators.pattern('.*[A-Z].*'),
        Validators.pattern('.*[a-z].*'),   
        Validators.pattern('.*[0-9].*'),   
        ]],
        phone: ['', Validators.required],
    });

    onSubmit() {
        this.formSubmitted = true;
        if (this.registerForm.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Submitted', life: 3000 });
            this.registerForm.reset();
            this.formSubmitted = false;
        }
    }

    isInvalid(controlName: string) {
        const control = this.registerForm.get(controlName);
        return control?.invalid && (control.touched || this.formSubmitted);
    }
}
