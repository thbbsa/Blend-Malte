import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { Footer } from '../../components/footer/footer';
import { carrinho } from '../../models/loja';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [FormsModule, RouterLink, HeaderComponent, Footer],
  selector: 'app-checkout',
  styleUrl: './checkout.css',
  templateUrl: './checkout.html',
})
export class Checkout {
  carrinho = carrinho;
  concluido = false;
  resumoConfirmado = { total: 0, quantidade: 0 };
  cliente = {
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
  };

  moeda(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  confirmar(formulario: NgForm): void {
    if (formulario.invalid || !this.carrinho.itens.length || !this.carrinho.maiorDeIdade) {
      formulario.control.markAllAsTouched();
      return;
    }
    this.resumoConfirmado = {
      total: this.carrinho.total(),
      quantidade: this.carrinho.totalGarrafas(),
    };
    this.carrinho.limpar();
    formulario.resetForm();
    this.concluido = true;
  }
}
