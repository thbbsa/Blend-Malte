import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CarrinhoService } from './carrinho.service';
import { HeaderComponent } from '../components/header/header.component';
import { ProductCard } from '../components/product-card/product-card';
import { CarrinhoComponent } from '../pages/carrinho/carrinho.component';
import { Checkout } from '../pages/checkout/checkout';
import { Produto } from '../models/produto';

const produto: Produto = { id: 1, nome: 'Vinho', categoria: 'Vinhos', preco: 50, estoque: 3, imagem: 'imgs/produtos/vinho.png', descricao: 'Teste' };

describe('Fluxo do carrinho e checkout', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter([])] }));

  it('adiciona pelo card e atualiza o contador conforme a quantidade', () => {
    const header = TestBed.createComponent(HeaderComponent);
    const card = TestBed.createComponent(ProductCard);
    card.componentRef.setInput('produto', produto);
    card.detectChanges();
    card.nativeElement.querySelector('button').click();
    card.nativeElement.querySelector('button').click();
    header.detectChanges();
    const carrinho = TestBed.inject(CarrinhoService);
    expect(carrinho.itens().length).toBe(1);
    expect(carrinho.totalGarrafas()).toBe(2);
    expect(header.nativeElement.querySelector('.contador').textContent).toBe('2');
    carrinho.alterarQuantidade(1, -1);
    expect(carrinho.totalGarrafas()).toBe(1);
    carrinho.remover(1);
    header.detectChanges();
    expect(header.nativeElement.querySelector('.contador').textContent).toBe('0');
  });

  it('respeita estoque, limite por item e cupons', () => {
    const carrinho = TestBed.inject(CarrinhoService);
    for (let i = 0; i < 20; i++) carrinho.adicionar(produto);
    expect(carrinho.totalGarrafas()).toBe(3);
    expect(carrinho.podeAdicionar(produto)).toBe(false);
    carrinho.adicionar({ ...produto, id: 2, estoque: 50 });
    carrinho.alterarQuantidade(2, 50);
    expect(carrinho.itens()[1].quantidade).toBe(12);
    expect(carrinho.aplicarCupom(' adega10 ')).toBe(true);
    expect(carrinho.desconto()).toBe(75);
    expect(carrinho.frete()).toBe(0);
    expect(carrinho.aplicarCupom('constructor')).toBe(false);
  });

  it('mantém os produtos e o desconto ao abrir o checkout e valida o formulário', async () => {
    const carrinho = TestBed.inject(CarrinhoService);
    carrinho.adicionar(produto);
    carrinho.aplicarCupom('ADEGA10');
    carrinho.maiorDeIdade.set(true);
    const telaCarrinho = TestBed.createComponent(CarrinhoComponent);
    telaCarrinho.detectChanges();
    const tela = TestBed.createComponent(Checkout);
    tela.detectChanges();
    await tela.whenStable();
    const form = tela.nativeElement.querySelector('form.painel');
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    tela.detectChanges();
    expect(tela.componentInstance.concluido()).toBe(false);
    expect(carrinho.total()).toBe(70);
    const dados = { nome: 'Maria Silva', cpf: '12345678901', email: 'maria@example.com', telefone: '11999999999', cep: '01001000', endereco: 'Praça da Sé', numero: '1', complemento: '', bairro: 'Sé', cidade: 'São Paulo', estado: 'SP' };
    for (const [nome, valor] of Object.entries(dados)) {
      const campo = form.querySelector(`[name="${nome}"]`) as HTMLInputElement;
      campo.value = valor;
      campo.dispatchEvent(new Event(nome === 'estado' ? 'change' : 'input', { bubbles: true }));
    }
    tela.detectChanges();
    await tela.whenStable();
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    tela.detectChanges();
    expect(tela.componentInstance.concluido()).toBe(true);
    expect(tela.componentInstance.resumoConfirmado().total).toBe(70);
    expect(carrinho.totalGarrafas()).toBe(0);
    expect(tela.componentInstance.cliente.nome).toBeNull();
  });

  it('não permite concluir o checkout sem itens ou sem confirmação de maioridade', () => {
    const tela = TestBed.createComponent(Checkout);
    tela.detectChanges();
    expect(tela.nativeElement.querySelector('form.painel')).toBeNull();
    TestBed.inject(CarrinhoService).adicionar(produto);
    tela.detectChanges();
    expect(tela.nativeElement.querySelector('form.painel')).toBeNull();
  });
});


