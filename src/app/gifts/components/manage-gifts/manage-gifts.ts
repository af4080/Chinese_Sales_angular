import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { Popover, PopoverModule } from 'primeng/popover';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { ThisReceiver } from '@angular/compiler';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ReadGift } from '../../models/gift.model';
import { GiftService } from '../../services/gift.service';
import { UpdateGift } from '../../models/update-gift.model';
import { CreateGift } from '../../models/create-gift.model';
import { ReadDonner } from '../../../doner/model/doner-read.model';
import { DonerService } from '../../../doner/servieces/doner.service';
import { AutoCompleteModule } from 'primeng/autocomplete';


@Component({
    selector: 'app-manage-gift',
    imports: [PopoverModule, TableModule,
        ButtonModule,
        TagModule,
        CommonModule,
        ReactiveFormsModule,
        InputTextModule,
        AutoCompleteModule,
        FormsModule],
    templateUrl: './manage-gifts.html',
    styleUrl: './manage-gifts.scss',
    providers: [MessageService]
})
export class Managegift implements OnInit {
    gifts: ReadGift[] = [];
    giftForm!: FormGroup;
    addGiftForm!: FormGroup;
    updateGiftForm!: FormGroup;
    selectedgift: ReadGift | null = null;
    isAddinggift: boolean = false;

    @ViewChild('op') op!: Popover;
    @ViewChild('addOp') addOp!: Popover;
    donors: ReadDonner[] = [];
    filteredDonors: ReadDonner[] = [];
    selectedDonor: ReadDonner | null = null;
    donorDisplayControl = new FormControl< ReadDonner | null>(null);
    private fb = inject(FormBuilder);
    private giftService = inject(GiftService);
    private cdr = inject(ChangeDetectorRef);
    private donerService = inject(DonerService);
    private name = '';


    ngOnInit() {
        this.loadgifts();
        this.loadDonors();
        this.initializeForms();
    }
    // Load donors for autocomplete
    loadDonors() {
        this.donerService.getAllDonners().subscribe(d => {
            this.donors = d;
            this.cdr.markForCheck();
        });
    }
    filterDonors(event: any) {
        const query = event.query.toLowerCase();
        console.log(query);
        
        this.filteredDonors = this.donors.filter(donor => donor.name.toLowerCase().includes(query));
    }

    onDonorSelect(event: any) {
        const donor: ReadDonner = event.value;
        this.addGiftForm.patchValue({ donerId: donor.id });
        this.selectedDonor = donor;
        this.donorDisplayControl.setValue(donor);
    }

    loadgifts() {
        this.giftService.getAll().subscribe(g => {
            this.gifts = g;
            this.cdr.markForCheck();
            console.log(this.gifts)
        });
    }

    initializeForms() {
        this.giftForm = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(50)]],
            description: ['', [Validators.required, Validators.maxLength(200)]],
            price: ['', [Validators.required, Validators.min(0)]],
            donerName: ['', [Validators.required, Validators.maxLength(50)]],
            imagePath: ['', [Validators.required, Validators.maxLength(100)]],
            categoryName: ['', [Validators.required, Validators.maxLength(50)]],
        });

        this.addGiftForm = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(50)]],
            description: ['', [Validators.required, Validators.maxLength(200)]],
            price: ['', [Validators.required, Validators.min(0)]],
            donerId: ['', [Validators.required, Validators.min(1)]],
            imagePath: ['', [Validators.required, Validators.maxLength(100)]],
            categoryId: ['', [Validators.required, Validators.min(1)]],
        });
        this.updateGiftForm = this.fb.group({
            name: ['', [Validators.maxLength(50)]],
            description: ['', [Validators.maxLength(200)]],
            price: ['', [Validators.min(0)]],
            imagePath: ['', [Validators.maxLength(100)]],
            categoryId: ['', [Validators.required, Validators.min(1)]],
        });
    }

    displaygift(event: Event, gift: ReadGift) {
        if (this.selectedgift?.id === gift.id) {
            this.op.hide();
            this.selectedgift = null;
        }
        else {
            this.selectedgift = gift;
            this.giftForm.patchValue({
                name: gift.name,
                description: gift.description,
                price: gift.price,
                donerName: gift.donerName,
                imagePath: gift.imagePath,
                categoryName: gift.categoryName
            });
            this.updateGiftForm.patchValue({
                name: gift.name,
                description: gift.description,
                price: gift.price,
                imagePath: gift.imagePath,
                categoryId: gift.categoryId
            });
            this.op?.show(event);
        }
    }

    openAddgiftDialog(event: Event) {
        this.isAddinggift = true;
        this.addGiftForm.reset();
        this.addOp?.show(event);
    }

    addgift() {
        if (this.addGiftForm.valid) {
            const newgift: CreateGift = this.addGiftForm.value;
            this.giftService.create(newgift).subscribe(
                (response) => {
                    console.log('מתנה חדשה נוספה:', response);
                    this.gifts.push(response);
                    this.addGiftForm.reset();
                    this.addOp?.hide();
                    this.cdr.markForCheck();
                },
                (error) => console.log('שגיאה בהוספת מתנה:', error)
            );
        }
    }

    closeAddgiftDialog() {
        this.isAddinggift = false;
        this.addGiftForm.reset();
        this.addOp?.hide();
    }

    hidePopover() {
        this.selectedgift = null;
        this.giftForm.reset();
        this.op?.hide();
    }
    updategift() {
        if (this.updateGiftForm.valid && this.selectedgift !== null) {
            const updatedValues: UpdateGift = this.updateGiftForm.value;
            console.log(updatedValues + "updated");

            this.giftService.update(this.selectedgift.name, updatedValues).subscribe(
                (response) => {
                    console.log('מתנה עודכנה:', response);
                    const updated = this.gifts.findIndex(d => d.id === this.selectedgift?.id);
                    if (updated != -1) {
                        this.gifts[updated].name = updatedValues.name ?? this.gifts[updated].name;
                        this.gifts[updated].description = updatedValues.description ?? this.gifts[updated].description;
                        this.gifts[updated].price = updatedValues.price ?? this.gifts[updated].price;
                        this.gifts[updated].categoryId = updatedValues.categoryId ?? this.gifts[updated].categoryId;
                        this.gifts[updated].imagePath = updatedValues.imagePath ?? this.gifts[updated].imagePath;
                    }
                    this.hidePopover();
                },
                (error) => console.log('שגיאה:', error)
            );
            return;
        }
        this.hidePopover();
    }
    deletegift() {
        if (this.selectedgift !== null) {
            this.giftService.delete(this.selectedgift.id).subscribe(
                (response) => {
                    console.log('מתנה נמחקה:', response);
                },
                (error) => console.log('שגיאה:', error)
            );
            this.gifts = this.gifts.filter(d => d.id !== this.selectedgift?.id);
            this.hidePopover();
        }
    }
}