import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Produtos } from './pages/produtos/produtos';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { ManutencaoProdutos } from './pages/manutencao-produtos/manutencao-produtos';
import { CadastroCliente } from './pages/cadastro-cliente/cadastro-cliente';

import { Login } from './pages/login/login';
import { Checkout } from './pages/checkout/checkout';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  { path: 'login', component: Login },
  { path: 'checkout', component: Checkout },
  {
    path: 'carrinho',
    component: CarrinhoComponent,
  },
  {
    path: 'produtos',
    component: Produtos,
  },
  {
    path: 'produtos/:categoria',
    component: Produtos,
  },
  {
    path: 'manutencao-produtos',
    component: ManutencaoProdutos,
  },
  {
    path: 'cadastro-cliente',
    component: CadastroCliente,
  },
  { path: '**', redirectTo: '' },
];
