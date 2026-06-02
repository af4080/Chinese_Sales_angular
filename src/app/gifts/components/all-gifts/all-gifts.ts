import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { SingleGift } from '../single-gift/single-gift';
import { GiftService } from '../../services/gift.service';
import { ReadGift } from '../../models/gift.model';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-gifts',
  imports: [SingleGift, CommonModule, CardModule, ButtonModule],
  templateUrl: './all-gifts.html',
  styleUrl: './all-gifts.scss',
})

export class AllGifts {

  giftService = inject(GiftService);
  gifts: ReadGift[] = [];
  cdr = inject(ChangeDetectorRef);
  filteredGifts: ReadGift[] = [];
  selectedCategory: string = 'הכל';

  ngOnInit() {
    this.giftService.getAll().subscribe(gifts => {
      this.gifts = gifts;
      console.log(gifts);
      this.filteredGifts = gifts;
      this.cdr.detectChanges();
    });
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    if (category === 'הכל') {
      this.filteredGifts = this.gifts;
    } else {
      this.filteredGifts = this.gifts.filter(g => g.categoryName === category);
    }
}
    getCategories(): string[] {
      const categories = this.gifts.map(g => g.categoryName).filter(c => !!c);
      return [...new Set(categories)];
     
    }


  }

