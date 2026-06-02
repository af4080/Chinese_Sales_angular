export interface ReadPurchase {
    id: number;
    customerId: number;
    customerName?: string;
    customerEmail?: string;
    giftId: number;
    giftName?: string;
    giftPrice?: number;
    purchDate: Date | string; 
}