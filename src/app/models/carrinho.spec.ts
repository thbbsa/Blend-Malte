import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Cliente } from './cliente';
import { Usuario } from './usuario';
import { carrinho, sessao } from './loja';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Carrinho } from './carrinho';
import { HeaderComponent } from '../components/header/header.component';
import { ProductCard } from '../components/product-card/product-card';
import { CarrinhoComponent } from '../pages/carrinho/carrinho.component';
import { Checkout } from '../pages/checkout/checkout';
import { Produto } from './produto';

const produto: Produto = { id: 1, nome: 'Vinho', categoria: 'Vinhos', preco: 50, estoque: 3, imagem: 'imgs/produtos/vinho.png', descricao: 'Teste' };

@Component({
  imports: [HeaderComponent, ProductCard],
  changeDetection: ChangeDetectionStrategy.Default,
  template: '<app-header /><app-product-card [produto]="produto" />'
})
class VitrineTeste { produto = produto; }

describe('Fluxo do carrinho e checkout', () => {
  beforeEach(() => { carrinho.limpar(); sessao.sair(); TestBed.configureTestingModule({ providers: [provideRouter([])] }); });

  it('adiciona pelo card e atualiza automaticamente o contador na mesma tela', async () => {
    const tela = TestBed.createComponent(VitrineTeste);
    await tela.whenStable();
    const botao = tela.nativeElement.querySelector('app-product-card button');
    botao.click();
    await tela.whenStable();
    botao.click();
    await tela.whenStable();
    expect(carrinho.itens.length).toBe(1);
    expect(carrinho.totalGarrafas()).toBe(2);
    expect(tela.nativeElement.querySelector('.contador').textContent).toBe('2');
    const pagina = TestBed.createComponent(CarrinhoComponent);
    tela.destroy();
    await pagina.whenStable();
    pagina.nativeElement.querySelector('[aria-label="Diminuir quantidade"]').click();
    await pagina.whenStable();
    expect(carrinho.totalGarrafas()).toBe(1);
    expect(pagina.nativeElement.querySelector('.contador').textContent).toBe('1');
    pagina.nativeElement.querySelector('.remover').click();
    await pagina.whenStable();
    expect(pagina.nativeElement.querySelector('.contador').textContent).toBe('0');
  });

  it('respeita estoque, limite por item e cupons', () => {

    for (let i = 0; i < 20; i++) carrinho.adicionar(produto);
    expect(carrinho.totalGarrafas()).toBe(3);
    expect(carrinho.podeAdicionar(produto)).toBe(false);
    carrinho.adicionar({ ...produto, id: 2, estoque: 50 });
    carrinho.alterarQuantidade(2, 50);
    expect(carrinho.itens[1].quantidade).toBe(12);
    expect(carrinho.aplicarCupom(' adega10 ')).toBe(true);
    expect(carrinho.desconto()).toBe(75);
    expect(carrinho.frete()).toBe(0);
    expect(carrinho.aplicarCupom('constructor')).toBe(false);
  });

  it('mantém os produtos e o desconto ao abrir o checkout e valida o formulário', async () => {

    carrinho.adicionar(produto);
    carrinho.aplicarCupom('ADEGA10');
    carrinho.maiorDeIdade = true;
    const telaCarrinho = TestBed.createComponent(CarrinhoComponent);
    telaCarrinho.detectChanges();
    telaCarrinho.destroy();
    const tela = TestBed.createComponent(Checkout);
    tela.detectChanges();
    await tela.whenStable();
    const form = tela.nativeElement.querySelector('form.painel');
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    tela.detectChanges();
    expect(tela.componentInstance.concluido).toBe(false);
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
    expect(tela.componentInstance.concluido).toBe(true);
    expect(tela.componentInstance.resumoConfirmado.total).toBe(70);
    expect(carrinho.totalGarrafas()).toBe(0);
    expect(tela.componentInstance.cliente.nome).toBeNull();
  });

  it('não permite concluir o checkout sem itens ou sem confirmação de maioridade', async () => {
    const tela = TestBed.createComponent(Checkout);
    tela.detectChanges();
    expect(tela.nativeElement.querySelector('form.painel')).toBeNull();
    carrinho.adicionar(produto);
    tela.changeDetectorRef.markForCheck();
    await tela.whenStable();
    expect(tela.nativeElement.querySelector('form.painel')).toBeNull();
  });
});



describe('Modelagem do Marco 1', () => {
  it('Cliente herda Usuario e possui o carrinho compartilhado', () => {
    TestBed.configureTestingModule({});
    carrinho.limpar(); sessao.sair();

    expect(sessao.entrar('cliente@blendmalte.com', 'errada')).toBe(false);
    expect(sessao.entrar(' CLIENTE@BLENDMALTE.COM ', '123456')).toBe(true);
    expect(sessao.cliente).toBeInstanceOf(Cliente);
    expect(sessao.cliente).toBeInstanceOf(Usuario);
    expect(sessao.cliente?.carrinho).toBe(carrinho);
    carrinho.adicionar(new Produto(5, 'Vinho', 'Vinhos', 25, 10, '', ''));
    expect(sessao.cliente?.carrinho.totalGarrafas()).toBe(1);
    sessao.sair();
    expect(sessao.cliente).toBeNull();
  });
});

