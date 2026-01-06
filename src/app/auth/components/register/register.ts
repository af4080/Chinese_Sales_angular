import { Component, inject } from "@angular/core";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { MessageModule } from "primeng/message";
import { ToastModule } from "primeng/toast";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule, ToastModule, MessageModule],
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
            email: ['', [Validators.required, Validators.email]]});

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
