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
  imports: [SingleGift,CommonModule,CardModule,ButtonModule],
  templateUrl: './all-gifts.html',
  styleUrl: './all-gifts.scss',
})

export class AllGifts {

  giftService = inject(GiftService);
  gifts: ReadGift[] = [];
  cdr = inject(ChangeDetectorRef);

  
 

  ngOnInit() {
    this.giftService.getAll().subscribe(gifts => {
      this.gifts = gifts;
      console.log(gifts);
      this.cdr.detectChanges();
    });
  }


}
