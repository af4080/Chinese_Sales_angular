export interface ReadGift {
  id: number;
  name: string;
  description: string;
  price: number;
  imagePath: string;

  categoryId: number;
  categoryName: string;

  donerId: number;
  donerName: string;
}
