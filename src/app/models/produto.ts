export interface Produto {
  id?: number;
  nome: string;
  categoria: string;
  origem: string;
  teorAlcoolico: number;
  volumeMl: number;
  preco: number;
  estoque: number;
  descricao: string;
  imagem?: string;
}

export const CATEGORIAS = [
  'Single Malt',
  'Blended',
  'Bourbon',
  'Tennessee',
  'Irish',
  'Rye',
];