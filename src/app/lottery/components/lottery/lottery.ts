import { Component, inject } from '@angular/core';
import { LotteryService } from '../../servieces/lottery.serviece';
import { CommonModule } from '@angular/common';

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

  // הרצת הגרלה לכל המתנות
  runAllLotteries() {
    if (confirm('האם אתה בטוח שברצונך להגריל את כל המתנות שטרם הוגרלו?')) {
      this.isLoading = true;
      this.lotteryService.runAllLotteries().subscribe({
        next: (res) => {
          this.message = 'ההגרלה הסתיימה בהצלחה!';
          this.isLoading = false;
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
        next: (res) => alert('המכירה אופסה בהצלחה'),
        error: (err) => console.error(err)
      });
    }
  }
}
