import { Produto } from './produto';

export const CATALOGO: Produto[] = [
  new Produto(1, 'Vinho Tinto Reservado', 'Vinhos', 49.90, 20, 'imgs/produtos/vinho.png', 'Vinho tinto nacional de sabor marcante.'),
  new Produto(2, 'Cerveja Black Princess', 'Cervejas', 6.99, 50, 'imgs/produtos/cerveja.png', 'Cerveja premium de sabor equilibrado.'),
  new Produto(3, 'Whisky Black Label', 'Destilados', 169.90, 10, 'imgs/produtos/whisky.png', 'Whisky Black Label envelhecido por 12 anos.'),
];
