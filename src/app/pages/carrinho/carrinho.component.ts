import { Component, signal, computed } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
type Tipo = 'vinho' | 'cerveja' | 'destilado';

interface ItemCarrinho {
  id: number;
  nome: string;
  produtor: string;
  origem: string;
  tipo: Tipo;
  imagem: string;
  preco: number;
  quantidade: number;
}

const EXEMPLO: ItemCarrinho[] = [
  { id: 1, nome: 'Vinho Reservado Cabernet Sauvignon 750ml', produtor: 'Concha y Toro', origem: 'Chile', tipo: 'vinho', imagem: 'imgs/produtos/vinho.png', preco: 27.9, quantidade: 1 },
  { id: 2, nome: 'Cerveja Puro Malte Black Princess Gold Lata 350ml', produtor: 'Cervejaria Monte Claro', origem: 'Minas Gerais, Brasil', tipo: 'cerveja', imagem: 'imgs/produtos/cerveja.png', preco: 4.7, quantidade: 4 },
  { id: 3, nome: 'Whisky Johnnie Walker Black Label 12 Anos 750ml', produtor: 'Diageo BR', origem: 'Highlands, Escócia', tipo: 'destilado', imagem: 'imgs/produtos/whisky.png', preco: 122.6, quantidade: 1 },
];

@Component({
  imports: [HeaderComponent],
  selector: 'app-carrinho',
  styleUrl: './carrinho.component.css',
  templateUrl: './carrinho.component.html',
})

export class CarrinhoComponent {
  // Regras
  readonly limitePorItem = 12;
  readonly freteFixo = 25;
  readonly freteGratisAcima = 300;

  readonly tipos: Record<Tipo, string> = {
    vinho: 'Vinho',
    destilado: 'Destilado',
    cerveja: 'Cerveja',
  };

  // Record serve para identificar o codigo e retornar o valor do desconto, caso o codigo seja valido.
  private readonly cupons: Record<string, number> = { ADEGA10: 0.1, BEMVINDO: 0.05 };

  // Estado da tela
  itens = signal<ItemCarrinho[]>(this.copiarExemplo()); // lista de itens no carrinho
  cupomAplicado = signal<string | null>(null); // código do cupom ativo (ou nenhum)
  mensagemCupom = signal(''); // mensagem de erro do cupom
  maiorDeIdade = signal(false); // se o checkbox de 18+ está marcado
  pedidoConfirmado = signal<{ total: number; garrafas: number } | null>(null);

  // Valores calculados (computed)
  // Recalculados automaticamente sempre que os signals que usam mudarem.

  // Total de garrafas (soma das quantidades).
  totalGarrafas = computed(() => this.itens().reduce((t, i) => t + i.quantidade, 0));

  // Soma de preço x quantidade de cada item (antes de desconto e frete).
  subtotal = computed(() => this.itens().reduce((t, i) => t + i.preco * i.quantidade, 0));

  // Percentual do cupom aplicado (10, 5 ou 0 se não houver cupom).
  percentualCupom = computed(() => {
    const codigo = this.cupomAplicado();
    return codigo ? this.cupons[codigo] * 100 : 0;
  });

  // Valor do desconto em reais.
  desconto = computed(() => this.subtotal() * (this.percentualCupom() / 100));

  // Subtotal já com o desconto. A regra do frete grátis usa este valor.
  valorComDesconto = computed(() => this.subtotal() - this.desconto());

  // Frete: zero se o carrinho está vazio ou passou do mínimo; senão, o frete fixo.
  frete = computed(() =>
    this.itens().length === 0 || this.valorComDesconto() >= this.freteGratisAcima ? 0 : this.freteFixo
  );

  // Total final a pagar.
  total = computed(() => this.valorComDesconto() + this.frete());

  // Quanto falta para ganhar frete grátis (nunca negativo).
  faltaParaFreteGratis = computed(() => Math.max(0, this.freteGratisAcima - this.valorComDesconto()));

  // Porcentagem (0 a 100) usada para preencher a barra de progresso do frete.
  progressoFrete = computed(() => Math.min(100, (this.valorComDesconto() / this.freteGratisAcima) * 100));

  // Ações

  // Formata um número como dinheiro brasileiro (ex.: 189.9 -> "R$ 189,90").
  moeda(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  // Soma (+1) ou subtrai (-1) a quantidade de um item.
  alterarQuantidade(id: number, delta: number): void {
    this.itens.update((lista) =>
      lista.map((i) =>
        i.id === id
          ? // Math.max garante mínimo 1 e Math.min garante o máximo.
            { ...i, quantidade: Math.min(this.limitePorItem, Math.max(1, i.quantidade + delta)) }
          : i // os outros itens ficam iguais
      )
    );
  }

  // Remove um item do carrinho (filter mantém só os de id diferente).
  remover(id: number): void {
    this.itens.update((lista) => lista.filter((i) => i.id !== id));
  }

  // Esvazia o carrinho e também tira o cupom.
  limpar(): void {
    this.itens.set([]);
    this.removerCupom();
  }

  // Valida o código digitado e, se existir, ativa o cupom.
  aplicarCupom(codigo: string): void {
    const c = codigo.trim().toUpperCase(); // tira espaços e deixa em maiúsculas
    if (!c) {
      this.mensagemCupom.set('Digite o código do cupom.');
      return;
    }
    if (this.cupons[c] === undefined) {
      this.mensagemCupom.set('Cupom inválido ou expirado.');
      return;
    }
    this.cupomAplicado.set(c); // os computed recalculam sozinhos
    this.mensagemCupom.set('');
  }

  // Desativa o cupom.
  removerCupom(): void {
    this.cupomAplicado.set(null);
    this.mensagemCupom.set('');
  }

  // Conclui o pedido.
  finalizar(): void {
    // Só segue se o cliente confirmou a maioridade e há itens no carrinho.
    if (!this.maiorDeIdade() || this.itens().length === 0) return;
    // Guarda o resumo ANTES de esvaziar, senão o total viraria zero.
    this.pedidoConfirmado.set({ total: this.total(), garrafas: this.totalGarrafas() });
    this.limpar();
  }

  // Volta tudo ao estado inicial.
  restaurarExemplo(): void {
    this.itens.set(this.copiarExemplo());
    this.removerCupom();
    this.maiorDeIdade.set(false);
    this.pedidoConfirmado.set(null);
  }

  // Cópia da lista de exemplo, para que mexer nas quantidades não altere o original.
  private copiarExemplo(): ItemCarrinho[] {
    return EXEMPLO.map((i) => ({ ...i }));
  }
}
