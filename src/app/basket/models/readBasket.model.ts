import { ReadUser } from "../../auth/models/user.model";
import { ReadGift } from "../../gifts/models/gift.model";


export interface ReadBasket {
  id: number;
  amount: number;
  userId: number;
  user: ReadUser;
  giftId: number;
  gift: ReadGift;
}
