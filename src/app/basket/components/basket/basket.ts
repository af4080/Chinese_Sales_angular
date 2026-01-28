import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { ReadBasket } from '../../models/readBasket.model';
import { BasketSrevice } from '../../servieces/basket-srevice';
import { CardClasses, CardModule } from 'primeng/card';
import { InputNumber } from 'primeng/inputnumber';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-basket',
  imports: [ButtonModule, CardModule,InputNumber,TableModule,CommonModule,FormsModule],
  templateUrl: './basket.html',
  styleUrl: './basket.scss',
})
export class Basket {
  private basketService = inject(BasketSrevice);
  basketItems: ReadBasket[] = [];
  loading: boolean = false;

  ngOnInit(): void {
    this.loadBasket();
  }

  loadBasket(): void {
    this.loading = true;
    this.basketService.getMyBasket().subscribe({
      next: (items) => {
        this.basketItems = items;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  updateAmount(item: ReadBasket, delta: number): void {
    const newAmount = item.amount + delta;
    if (newAmount <= 0) return;

    // שימוש בפונקציית העדכון מהסרוויס שסיפקת
    this.basketService.updateBasket(item.id, newAmount).subscribe((updated) => {
      if (updated) {
        item.amount = updated.amount;
      }
    });
  }

  removeItem(id: number): void {
    // שימוש בפונקציית המחיקה מהסרוויס שסיפקת
    this.basketService.deleteBasket(id).subscribe(() => {
      this.basketItems = this.basketItems.filter(item => item.id !== id);
    });
  }

  get totalSum(): number {
    return this.basketItems.reduce((acc, item) => acc + (item.gift.price * item.amount), 0);
  }

}
