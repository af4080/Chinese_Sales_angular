import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-success',
  imports: [CommonModule, ButtonModule, RouterLink],
  templateUrl: './success.html',
  styleUrl: './success.scss',
})
export class Success {

}
