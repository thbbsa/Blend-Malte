import { Component, input, output } from '@angular/core';
import { Produto } from '../../models/produto';
import { CurrencyPipe } from '@angular/common';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-product-card',
  styleUrl: './product-card.css',
  templateUrl: './product-card.html',
})
export class ProductCard {
  produto = input.required<Produto>(); 
}
