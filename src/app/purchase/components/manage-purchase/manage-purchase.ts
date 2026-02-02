import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ReadPurchase } from '../../models/ReadPurchase.model';
import { PurchaseService } from '../../services/purchase';

@Component({
  selector: 'app-manage-purchase',
imports: [TableModule, ButtonModule, TagModule, CommonModule],
  templateUrl: './manage-purchase.html',
  styleUrl: './manage-purchase.scss',
})
export class ManagePurchase implements OnInit {
  // מערך לאחסון הרכישות שיחזרו מהשרת
  purchases: ReadPurchase[] = [];
  
  private purchaseService = inject(PurchaseService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.loadPurchases();
  }

  loadPurchases() {
    // קריאה ל-API שמחזיר פרטי קונים ומתנות
    this.purchaseService.getBuyersDetails().subscribe({
      next: (data) => {
        this.purchases = data;
        this.cdr.markForCheck(); // עדכון התצוגה
      },
      error: (err) => console.error('שגיאה בטעינת רכישות:', err)
    });
  }
}


