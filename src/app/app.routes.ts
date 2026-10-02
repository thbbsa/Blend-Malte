import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Produtos } from './pages/produtos/produtos';
import { Carrinho } from './pages/carrinho/carrinho.component';

export const routes: Routes = [
    {
    path: '',
    component: Home
  },
    {
    path: 'carrinho',
    component: Carrinho
  },
  {
    path: 'produtos',
    component: Produtos
  },
];
