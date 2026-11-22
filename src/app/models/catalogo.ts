import { Produto } from './produto';

export const CATALOGO: Produto[] = [
  { id: 1, nome: 'Vinho Tinto Reservado', categoria: 'Vinhos', origem: 'Nacional', teorAlcoolico: 13.5, volumeMl: 750, preco: 49.90, estoque: 20, imagem: 'imgs/produtos/vinho.png',  descricao: 'Vinho tinto nacional de sabor marcante.', },
 
 
    { id: 2,  nome: 'Cerveja Black Princess', categoria: 'Cervejas', origem: 'Nacional', teorAlcoolico: 4.8, volumeMl: 355, preco: 6.99, estoque: 50, imagem: 'imgs/produtos/cerveja.png', descricao: 'Cerveja premium de sabor equilibrado.', },

  
    { id: 3,nome: 'Whisky Black Label', categoria: 'Destilados',origem: 'Escócia',teorAlcoolico: 40,volumeMl: 750, preco: 169.90,estoque: 10,imagem: 'imgs/produtos/whisky.png', descricao: 'Whisky Black Label envelhecido por 12 anos.',},

    { id: 4,nome: 'Vodka Grey Goose', categoria: 'Destilados',origem: 'Rússia',teorAlcoolico: 40,volumeMl: 1000, preco: 248.90,estoque: 40,imagem: 'imgs/produtos/vodka.png', descricao: 'Vodka premium de sabor suave e puro.',},

    { id: 5,nome: 'Vinho Pergola', categoria: 'Vinhos',origem: 'Inglaterra',teorAlcoolico: 47.3,volumeMl: 750, preco: 119.90,estoque: 15,imagem: 'imgs/produtos/pergola.png', descricao: 'Vinho Pergola de sabor intenso.',},
  
    { id: 6,nome: 'Corona Extra', categoria: 'Cervejas',origem: 'México',teorAlcoolico: 6.5,volumeMl: 500, preco: 9.99,estoque: 30,imagem: 'imgs/produtos/corona.png', descricao: 'Cerveja mexicana de sabor refrescante.',},
  
  ];