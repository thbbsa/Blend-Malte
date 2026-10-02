import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header';

@Component({
  imports: [HeaderComponent],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}
