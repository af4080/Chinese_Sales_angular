import { ChangeDetectorRef, Component ,ViewChild} from '@angular/core';
import { GiftService } from '../../services/gift.service';
import { Popover, PopoverModule } from 'primeng/popover';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { Gift } from '../../models/gift.model';

@Component({
  selector: 'app-manage-gifts',
  imports: [PopoverModule,TableModule,ButtonModule,TagModule],
  templateUrl: './manage-gifts.html',
  styleUrl: './manage-gifts.scss',
  providers:[MessageService]
})
export class ManageGifts {



    constructor(
        private giftServiece: GiftService,
        private cdr: ChangeDetectorRef,
    ) {}

    @ViewChild('op') op!: Popover;

    gifts: Gift[] | undefined;

    selectedProduct: Gift | undefined;

    // ngOnInit() {
    //     this.productService.getAll().then((gifts) => {
    //         this.gifts = gifts;
    //         this.cdr.markForCheck();
    //     });
    // }

    // displayProduct(event, gift) {
    //     if (this.selectedProduct?.id === product.id) {
    //         this.op.hide();
    //         this.selectedProduct = null;
    //     } else {
    //         this.selectedProduct = product;
    //         this.op.show(event);

    //         if (this.op.container) {
    //             this.op.align();
    //         }
    //     }
    // }

    hidePopover() {
        this.op.hide();
    }

}