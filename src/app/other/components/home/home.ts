import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit{

  private router = inject(Router);

  ngOnInit() {
    // אפקט קונפטי עדין כשנכנסים כדי ליצור התרגשות
    this.launchWelcomeConfetti();
  }

  // פונקציה לניווט לעמוד המתנות
  goToGifts() {
    this.router.navigate(['/gifts']);
  }

  private launchWelcomeConfetti() {
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#712059', '#D4AF37'] // סגול וזהב של המותג
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#712059', '#D4AF37']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }
}
