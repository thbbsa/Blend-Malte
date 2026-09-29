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
      imagem: 'assets/vinho.jpg',
      descricao: 'Vinho tinto nacional de sabor marcante.'
    },
    {
      id: 2,
      nome: 'Cerveja Premium',
      categoria: 'Cervejas',
      preco: 8.99,
      estoque: 50,
      imagem: 'assets/cerveja.jpg',
      descricao: 'Cerveja premium de sabor equilibrado.'
    },
    {
      id: 3,
      nome: 'Whisky 12 Anos',
      categoria: 'Destilados',
      preco: 129.90,
      estoque: 10,
      imagem: 'assets/whisky.jpg',
      descricao: 'Whisky envelhecido por 12 anos.'
    }
  ];
}