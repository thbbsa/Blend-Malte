import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Produtos } from './pages/produtos/produtos';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { ManutencaoProdutos } from './pages/manutencao-produtos/manutencao-produtos';
import { CadastroCliente } from './pages/cadastro-cliente/cadastro-cliente';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'carrinho',
    component: CarrinhoComponent,
  },
  {
    path: 'produtos',
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
];

