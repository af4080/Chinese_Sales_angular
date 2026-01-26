import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GiftService } from '../../services/gift.service';
import { ReadGift } from '../../models/gift.model';
import { Button, ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@Component({
  selector: 'app-single-gift',
  imports: [ButtonModule,CommonModule,CardModule,ProgressSpinnerModule],
  templateUrl: './single-gift.html',
  styleUrl: './single-gift.scss',
})
export class SingleGift {
  route = inject(ActivatedRoute);
  giftService = inject(GiftService);
  // gift: ReadGift | null = null;
  cdr = inject(ChangeDetectorRef);
   @Input()
  gift: ReadGift | null = null;
  name:string = this.gift?.name || ''; 


  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   const name = params['name'];
      // this.giftService.getByName(this.name).subscribe(gift=> {
      //   this.gift = gift;
      //   console.log(gift);
       
      // });
    // });
     this.cdr.detectChanges();

  }
}
