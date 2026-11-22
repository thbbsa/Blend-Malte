import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { Footer } from '../../components/footer/footer';
import { carrinho } from '../../models/loja';
import { VendaService } from '../../services/venda.service';
import { mensagemErro } from '../../services/erro-api';

@Component({ changeDetection: ChangeDetectionStrategy.Default, imports: [FormsModule, RouterLink, HeaderComponent, Footer], selector: 'app-checkout', styleUrl: './checkout.css', templateUrl: './checkout.html' })
export class Checkout {
  carrinho = carrinho;
  concluido = false;
  salvando = false;
  erro = '';
  resumoConfirmado = { total: 0, quantidade: 0 };
  cliente = { nome: '', cpf: '', email: '', telefone: '', cep: '', endereco: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '' };
  constructor(private vendasApi: VendaService) {}
  moeda(valor: number): string { return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }
  confirmar(formulario: NgForm): void {
    if (formulario.invalid || !this.carrinho.itens.length || !this.carrinho.maiorDeIdade || this.salvando) { formulario.control.markAllAsTouched(); return; }
    this.salvando = true; this.erro = '';
    const venda = {
      cliente: { nome: this.cliente.nome.trim(), cpf: this.cliente.cpf, email: this.cliente.email.trim(), telefone: this.cliente.telefone },
      endereco: { cep: this.cliente.cep, endereco: this.cliente.endereco, numero: this.cliente.numero, complemento: this.cliente.complemento, bairro: this.cliente.bairro, cidade: this.cliente.cidade, estado: this.cliente.estado },
      itens: this.carrinho.itens.map(item => ({ ...item })),
      subtotal: this.carrinho.subtotal(), desconto: this.carrinho.desconto(), frete: this.carrinho.frete(), total: this.carrinho.total(), data: new Date().toISOString(),
    };
    this.vendasApi.registrar(venda).subscribe({
      next: () => { this.resumoConfirmado = { total: venda.total, quantidade: this.carrinho.totalGarrafas() }; this.carrinho.limpar(); formulario.resetForm(); this.salvando = false; this.concluido = true; },
      error: error => { this.salvando = false; this.erro = mensagemErro(error, 'Não foi possível salvar a venda.'); },
    });
  }
}
