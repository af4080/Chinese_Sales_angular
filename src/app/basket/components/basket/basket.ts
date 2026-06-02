import { ChangeDetectorRef, Component, EventEmitter, inject, Output, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ReadBasket } from '../../models/readBasket.model';
import { BasketService } from '../../servieces/basket-srevice';
import {  CardModule } from 'primeng/card';
import { InputNumber } from 'primeng/inputnumber';
import {  TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { baseItem } from '@primeuix/themes/aura/megamenu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  imports: [ButtonModule, CardModule,InputNumber,TableModule,CommonModule,FormsModule],
  templateUrl: './basket.html',
  styleUrl: './basket.scss',
})
export class Basket {
  private basketService = inject(BasketService);
  basketItems: ReadBasket[] = [];
  loading: boolean = false;
  cdr = inject(ChangeDetectorRef)
  router = inject(Router)
  @Output() onClose = new EventEmitter<void>();

  ngOnInit(): void {
    this.loadBasket();
  }

  loadBasket(): void {
    this.loading = true;
    this.basketService.getMyBasket().subscribe({
      next: (items) => {
        this.basketItems = items;
        this.cdr.detectChanges();
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  updateAmount(item: ReadBasket, delta: number): void {
    const newAmount = item.amount + delta;
    if (newAmount <= 0) return;

    // עדכון
    this.basketService.updateBasket(item.id, newAmount).subscribe((updated) => {
      if (updated) {
        item.amount = updated.amount;
      }
      this.cdr.detectChanges();
    });
  }

  removeItem(id: number): void {
    // מחיקה
    this.basketService.deleteBasket(id).subscribe(() => {
      this.basketItems = this.basketItems.filter(item => item.id !== id);
      this.cdr.detectChanges();
    });
  }

  get totalSum(): number {
    return this.basketItems.reduce((acc, item) => acc + (item.gift.price * item.amount), 0);
  }
 buyAll() {
  this.basketService.buyAll().subscribe({
    next: () => {
      this.basketItems = [];
      this.cdr.detectChanges();
      this.onClose.emit();
      
 
      this.router.navigate(['/purchase-success']); 
    },
    error: (err) => {
      console.error('הרכישה נכשלה:', err);
    }
  });
 

  }

}
