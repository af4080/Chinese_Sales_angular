import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ReadPurchase } from '../../models/ReadPurchase.model';
import { PurchaseService } from '../../services/purchase.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-manage-purchase',
  imports: [TableModule, ButtonModule, TagModule, CommonModule, ToastModule],
  templateUrl: './manage-purchase.html',
  styleUrl: './manage-purchase.scss',
  providers: [MessageService]
})
export class ManagePurchase implements OnInit {
  // מערך לאחסון הרכישות שיחזרו מהשרת
  purchases: ReadPurchase[] = [];

  private purchaseService = inject(PurchaseService);
  private cdr = inject(ChangeDetectorRef);
  loading: boolean = false;

  ngOnInit() {
    this.loadPurchases();
  }
  loadPurchases() {
    this.loading = true; // התחלת טעינה
    this.purchaseService.getBuyersDetails().subscribe({
      next: (data) => {
        this.purchases = data;
        this.loading = false; // סיום טעינה
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.loading = false; // סיום טעינה גם במקרה של שגיאה
        console.error('שגיאה:', err);
      }
    });
  }
  sortByPrice() {
    this.loading = true;
    this.purchaseService.getPurchasesOrderedByPrice().subscribe({
      next: (data) => {
        this.purchases = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => this.loading = false
    });
  }
}



