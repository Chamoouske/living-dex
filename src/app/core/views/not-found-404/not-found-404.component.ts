import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found-404',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './not-found-404.component.html',
  styleUrl: './not-found-404.component.scss',
  standalone: true
})
export class NotFound404 {

}
