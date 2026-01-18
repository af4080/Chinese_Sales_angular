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

@Component({
  selector: 'app-manage-donor',
  imports: [PopoverModule, TableModule, ButtonModule, TagModule, CommonModule, ReactiveFormsModule],
  templateUrl: './manage-donor.html',
  styleUrl: './manage-donor.scss',
  providers: [MessageService]
})
export class ManageDonor implements OnInit {
  donors: ReadDonner[] = [];
  donorForm!: FormGroup;
  selectedDonor: ReadDonner | null = null;

  @ViewChild('op') op!: Popover;
  private fb = inject(FormBuilder);

  constructor(private donorService: DonerService, private cdr: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.donorService.getAllDonners().subscribe(d => {
      this.donors = d;
      this.cdr.markForCheck();
      console.log(this.donors)
    });
    this.donorForm = this.fb.group({
      name: [this.selectedDonor?.name, [Validators.maxLength(50)]],
      email: [this.selectedDonor?.email, [Validators.email]],
      phone: [this.selectedDonor?.phone, [Validators.pattern(/^[0-9]{10}$/)]],
    });

  }

  displayDonor(event: Event, donor: ReadDonner) {
    if (this.selectedDonor?.id === donor.id) {
      this.op.hide();
      this.selectedDonor = null;
    }
    else {
      this.selectedDonor = donor;
      this.op?.show(event);
    }
    this.donorService.getAllDonners().subscribe(d => {
      this.donors = d;
      this.cdr.markForCheck();
      console.log(this.donors)
    });

  }

  hidePopover() {
    if (this.donorForm.valid && this.selectedDonor !== null) {
      const updatedValues: UpdateDonner = this.donorForm.value;
      console.log(updatedValues+"updated");
      
      this.donorService.updateDonner(this.selectedDonor.id , updatedValues).subscribe(
        (response) => {
          console.log('תורם נוסף:', response);
        },
        (error) => console.log('שגיאה:', error)
      );
    }
    this.donorForm.reset();
    this.op?.hide();

  }
}
