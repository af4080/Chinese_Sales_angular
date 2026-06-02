import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Managegift } from '../app/gifts/components/manage-gifts/manage-gifts';

@Component({
  selector: 'app-management-wrapper',
  imports: [RouterOutlet,Managegift],
  templateUrl: './management-wrapper.html',
  styleUrl: './management-wrapper.scss',
})
export class ManagementWrapper {

}
