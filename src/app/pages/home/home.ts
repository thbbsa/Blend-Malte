import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLink } from '@angular/router';
import { ProductCard } from '../../components/product-card/product-card';
import { CATALOGO } from '../../models/catalogo';
import { Footer } from '../../components/footer/footer';

@Component({
  imports: [HeaderComponent, ProductCard, Footer, RouterLink],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  readonly produtos = CATALOGO;
}
