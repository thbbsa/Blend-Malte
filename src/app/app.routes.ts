import { Routes } from '@angular/router';
import { Produtos } from './pages/produtos/produtos';
import { Carrinho } from './pages/carrinho/carrinho.component';

export const routes: Routes = [
  {
    path: 'carrinho',
    component: Carrinho
  },
  {
    path: 'produtos',
    component: Produtos
  },
  {
    path: '',
    redirectTo: 'produtos',
    pathMatch: 'full'
  }
];
