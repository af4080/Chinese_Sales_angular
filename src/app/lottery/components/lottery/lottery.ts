import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { LotteryService } from '../../servieces/lottery.serviece';
import { CommonModule } from '@angular/common';
import { ReadGift } from '../../../gifts/models/gift.model';

@Component({
  selector: 'app-lottery',
  imports: [CommonModule],
  templateUrl: './lottery.html',
  styleUrl: './lottery.scss',
})
export class Lottery {


  lotteryService = inject(LotteryService);
  isLoading = false;
  message = '';
  winners:any[] = [];
  cdr= inject(ChangeDetectorRef);
  ngOnInit() {
    this.loadWinners();
  }

loadWinners() {
  this.lotteryService.getallwinners().subscribe({
    next: (res: any[]) => {  
      this.winners = res.map((winner: any) => 
        `זוכה: ${winner.winnerName}, מתנה: ${winner.giftName}`
      );
       if(this.winners.length > 0) {
        this.isLoading =true;
      }
      console.log('Winners loaded successfully');
       this.cdr.detectChanges();
    },
    error: (err) => {
      this.message = 'שגיאה בטעינת הזוכים';
      console.error('Error:', err);
      // עדכון התצוגה במקרה של שגיאה
    }
  });
}


  runAllLotteries() {
    if (confirm('האם אתה בטוח שברצונך להגריל את כל המתנות שטרם הוגרלו?')) {
      this.isLoading = true;
      this.lotteryService.runAllLotteries().subscribe({
        next: (res) => {
          console.log(res);

          this.message = 'ההגרלה הסתיימה בהצלחה!';
          this.isLoading = false;
          this.loadWinners();
           this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Server Error:', err.error);
          this.message = 'שגיאה בהרצת ההגרלה';
          this.isLoading = false;
        }
      });
    }
  }

  // הורדת דוח זוכים ב-ZIP
  downloadWinners() {
    this.lotteryService.downloadWinnersZip().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'winners_report.zip';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => alert('לא נמצאו נתוני זוכים להורדה')
    });
  }

  // איפוס מכירה
  resetSale() {
    if (confirm('אזהרה! פעולה זו תמחק את כל הזוכים ותאפס את המכירה. האם להמשיך?')) {
      this.lotteryService.startNewChineseSale().subscribe({
        next: (res) => {
          alert('המכירה אופסה בהצלחה');
          this.loadWinners(); // טעינת רשימת הזוכים לאחר האיפוס
          this.cdr.detectChanges();
          this.isLoading = false;
        },
        error: (err) => console.error(err)
      });
    }
  }
}
