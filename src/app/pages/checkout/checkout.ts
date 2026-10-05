import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { Footer } from '../../components/footer/footer';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  imports: [FormsModule, RouterLink, HeaderComponent, Footer],
  selector: 'app-checkout',
  styleUrl: './checkout.css',
  templateUrl: './checkout.html',
})
export class Checkout {
  readonly carrinho = inject(CarrinhoService);
  readonly concluido = signal(false);
  readonly resumoConfirmado = signal({ total: 0, quantidade: 0 });
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
    if (formulario.invalid || !this.carrinho.itens().length || !this.carrinho.maiorDeIdade()) {
      formulario.control.markAllAsTouched();
      return;
    }
    this.resumoConfirmado.set({
      total: this.carrinho.total(),
      quantidade: this.carrinho.totalGarrafas(),
    });
    this.carrinho.limpar();
    formulario.resetForm();
    this.concluido.set(true);
  }
}
