import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { DonerService } from '../../servieces/doner.service';
import { Popover, PopoverModule } from 'primeng/popover';
import { ReadDonner } from '../../model/doner-read.model';
import { tab } from '@primeuix/themes/aura/tabs';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { ThisReceiver } from '@angular/compiler';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateDonner } from '../../model/doner-update.model';
import { CreateDonner } from '../../model/doner-create.model';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-manage-donor',
  imports: [PopoverModule, TableModule, ButtonModule, TagModule, CommonModule, ReactiveFormsModule,InputTextModule],
  templateUrl: './manage-donor.html',
  styleUrl: './manage-donor.scss',
  providers: [MessageService]
})
export class ManageDonor implements OnInit {
  donors: ReadDonner[] = [];
  donorForm!: FormGroup;
  addDonorForm!: FormGroup;
  selectedDonor: ReadDonner | null = null;
  isAddingDonor: boolean = false;

  @ViewChild('op') op!: Popover;
  @ViewChild('addOp') addOp!: Popover;
  private fb = inject(FormBuilder);

  constructor(private donorService: DonerService, private cdr: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.loadDonors();
    this.initializeForms();
  }

  loadDonors() {
    this.donorService.getAllDonners().subscribe(d => {
      this.donors = d;
      this.cdr.markForCheck();
      console.log(this.donors)
    });
  }

  initializeForms() {
    this.donorForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    });

    this.addDonorForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    });
  }

  displayDonor(event: Event, donor: ReadDonner) {
    if (this.selectedDonor?.id === donor.id) {
      this.op.hide();
      this.selectedDonor = null;
    }
    else {
      this.selectedDonor = donor;
      this.donorForm.patchValue({
        name: donor.name,
        email: donor.email,
        phone: donor.phone
      });
      this.op?.show(event);
    }
  }

  openAddDonorDialog(event: Event) {
    this.isAddingDonor = true;
    this.addDonorForm.reset();
    this.addOp?.show(event);
  }

  addDonor() {
    if (this.addDonorForm.valid) {
      const newDonor: CreateDonner = this.addDonorForm.value;
      this.donorService.addDonner(newDonor).subscribe(
        (response) => {
          console.log('תורם חדש נוסף:', response);
          this.donors.push(response);
          this.addDonorForm.reset();
          this.addOp?.hide();
          this.cdr.markForCheck();
        },
        (error) => console.log('שגיאה בהוספת תורם:', error)
      );
    }
  }

  closeAddDonorDialog() {
    this.isAddingDonor = false;
    this.addDonorForm.reset();
    this.addOp?.hide();
  }

  hidePopover() {
    this.selectedDonor = null;
    this.donorForm.reset();
    this.op?.hide();
  }
  updateDonor() {
      if (this.donorForm.valid && this.selectedDonor !== null) {
      const updatedValues: UpdateDonner = this.donorForm.value;
      console.log(updatedValues + "updated");

      this.donorService.updateDonner(this.selectedDonor.id, updatedValues).subscribe(
        (response) => {
          console.log('תורם נוסף:', response);
        },
        (error) => console.log('שגיאה:', error)
      );
    }
    const updated = this.donors.findIndex(d => d.id === this.selectedDonor?.id);
    if (updated != -1) {
      this.donors[updated].name = this.donorForm.value.name ?? this.donors[updated].name;
      this.donors[updated].email = this.donorForm.value.email ?? this.donors[updated].email;
      this.donors[updated].phone = this.donorForm.value.phone ?? this.donors[updated].phone;
    }
    this.hidePopover();
  }
  deleteDonor() {
    if (this.selectedDonor !== null) {
      this.donorService.deleteDonner(this.selectedDonor.id).subscribe(
        (response) => {
          console.log('תורם נמחק:', response);
        },
        (error) => console.log('שגיאה:', error)
      );
      this.donors = this.donors.filter(d => d.id !== this.selectedDonor?.id);
      this.hidePopover();
    }
  }
}
