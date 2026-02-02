import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GiftService } from '../../services/gift.service';
import { ReadGift } from '../../models/gift.model';
import { Button, ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CreateBasket } from '../../../basket/models/createBasket.model';
import { BasketService } from '../../../basket/servieces/basket-srevice';
import { AuthService } from '../../../auth/servieces/auth.service';
@Component({
  selector: 'app-single-gift',
  imports: [ButtonModule,CommonModule,CardModule,ProgressSpinnerModule,RouterLink],
  templateUrl: './single-gift.html',
  styleUrl: './single-gift.scss',
})
export class SingleGift {
  route = inject(ActivatedRoute);
  giftService = inject(GiftService);
  // gift: ReadGift | null = null;
  cdr = inject(ChangeDetectorRef);
  basketService = inject(BasketService);
   @Input()
  gift: ReadGift | null = null;
  name:string = this.gift?.name || ''; 
  authService = inject(AuthService);
  hasBasket: boolean = !this.authService.isAdmin();
  isFullPage: boolean = false;


ngOnInit() {
  if (!this.gift) {
    this.isFullPage = true;
    this.route.params.subscribe(params => {
      const nameFromUrl = params['name'];
      if (nameFromUrl) {
        this.giftService.getByName(nameFromUrl).subscribe(gift => {
          this.gift = gift;
          this.cdr.detectChanges();
        });
      }
    });
  }
}
  addToCart(gift: ReadGift | null)
  {
    if(gift) {
       const basket :CreateBasket = {
        amount: 1,
        giftId: gift.id
       };
       this.basketService.createBasket(basket).subscribe({
        next: (res) => {
          console.log('Gift added to basket:', res);
        },
        error: (err) => {
          console.error('Error adding gift to basket:', err);
        }
       });
    } 
  }
}
