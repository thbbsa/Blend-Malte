import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Produto } from '../../models/produto';

@Component({
  selector: 'app-produtos',
  imports: [CommonModule],
  templateUrl: './produtos.html',
  styleUrl: './produtos.css'
})
export class Produtos {
  produtos: Produto[] = [
    {
      id: 1,
      nome: 'Vinho Tinto Reservado',
      categoria: 'Vinhos',
      preco: 49.90,
      estoque: 20,
      imagem: 'imgs/produtos/vinho.png',
      descricao: 'Vinho tinto nacional de sabor marcante.'
    },
    {
      id: 2,
      nome: 'Cerveja Black Princess',
      categoria: 'Cervejas',
      preco: 6.99,
      estoque: 50,
      imagem: 'imgs/produtos/cerveja.png',
      descricao: 'Cerveja premium de sabor equilibrado.'
    },
    {
      id: 3,
      nome: 'Whisky Black Label',
      categoria: 'Destilados',
      preco: 169.90,
      estoque: 10,
      imagem: 'imgs/produtos/whisky.png',
      descricao: 'Whisky Black Label envelhecido por 12 anos.'
    }
  ];
}