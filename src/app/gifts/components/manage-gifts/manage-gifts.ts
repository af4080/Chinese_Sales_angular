import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { Popover, PopoverModule } from 'primeng/popover';

import { tab } from '@primeuix/themes/aura/tabs';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { ThisReceiver } from '@angular/compiler';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ReadGift } from '../../models/gift.model';
import { GiftService } from '../../services/gift.service';
import { UpdateGift } from '../../models/update-gift.model';
import { CreateGift } from '../../models/create-gift.model';

@Component({
    selector: 'app-manage-gift',
    imports: [PopoverModule, TableModule, ButtonModule, TagModule, CommonModule, ReactiveFormsModule, InputTextModule],
    templateUrl: './manage-gifts.html',
    styleUrl: './manage-gifts.scss',
    providers: [MessageService]
})
export class Managegift implements OnInit {
    gifts: ReadGift[] = [];
    giftForm!: FormGroup;
    addGiftForm!: FormGroup;
    selectedgift: ReadGift | null = null;
    isAddinggift: boolean = false;

    @ViewChild('op') op!: Popover;
    @ViewChild('addOp') addOp!: Popover;
    private fb = inject(FormBuilder);

    constructor(private giftService: GiftService, private cdr: ChangeDetectorRef) {

    }

    ngOnInit() {
        this.loadgifts();
        this.initializeForms();
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
            donerName: ['', [Validators.required, Validators.maxLength(50)]],
            imagePath: ['', [Validators.required, Validators.maxLength(100)]],
            categoryName: ['', [Validators.required, Validators.maxLength(50)]],
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
                    console.log('תורם חדש נוסף:', response);
                    this.gifts.push(response);
                    this.addGiftForm.reset();
                    this.addOp?.hide();
                    this.cdr.markForCheck();
                },
                (error) => console.log('שגיאה בהוספת תורם:', error)
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
        if (this.giftForm.valid && this.selectedgift !== null) {
            const updatedValues: UpdateGift = this.giftForm.value;
            console.log(updatedValues + "updated");

            this.giftService.update(this.selectedgift.name, updatedValues).subscribe(
                (response) => {
                    console.log('תורם נוסף:', response);
                },
                (error) => console.log('שגיאה:', error)
            );
        }
        const updated = this.gifts.findIndex(d => d.id === this.selectedgift?.id);
        if (updated != -1) {
            this.gifts[updated].name = this.giftForm.value.name ?? this.gifts[updated].name;
        }
        this.hidePopover();
    }
    deletegift() {
        if (this.selectedgift !== null) {
            this.giftService.delete(this.selectedgift.id).subscribe(
                (response) => {
                    console.log('תורם נמחק:', response);
                },
                (error) => console.log('שגיאה:', error)
            );
            this.gifts = this.gifts.filter(d => d.id !== this.selectedgift?.id);
            this.hidePopover();
        }
    }
}
