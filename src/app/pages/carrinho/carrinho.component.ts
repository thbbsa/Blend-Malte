import { Component } from '@angular/core';

type Tipo = 'tinto' | 'branco' | 'rose' | 'espumante';

interface ItemCarrinho {
  id: number;
  nome: string;
  produtor: string;
  origem: string;
  safra: string;
  tipo: Tipo;
  preco: number;
  quantidade: number;
}

@Component({
  imports: [],
  selector: 'app-carrinho',
  styleUrl: './carrinho.component.css',
  templateUrl: './carrinho.component.html',
})

export class Carrinho {

}
