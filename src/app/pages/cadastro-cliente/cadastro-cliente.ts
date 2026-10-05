import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { Footer } from '../../components/footer/footer';
import { Cliente } from '../../models/cliente';
import { carrinho } from '../../models/loja';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-cadastro-cliente',
  imports: [FormsModule, RouterLink, HeaderComponent, Footer],
  templateUrl: './cadastro-cliente.html', styleUrl: './cadastro-cliente.css',
})
export class CadastroCliente {
  private carrinho = carrinho;
  mensagem = '';
  cliente = { nome: '', cpf: '', usuario: '', email: '', telefone: '', senha: '', confirmarSenha: '' };

  cadastrar(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      this.mensagem = 'Preencha todos os campos corretamente.';
      return;
    }
    if (this.cliente.senha !== this.cliente.confirmarSenha) {
      this.mensagem = 'As senhas não coincidem.';
      return;
    }
    const cliente = new Cliente(0, this.cliente.nome.trim(), this.cliente.email.trim(), this.cliente.senha,
      this.cliente.cpf, this.cliente.telefone, this.carrinho);
    const nome = cliente.nome;
    form.resetForm();
    this.mensagem = `${nome}, seu cadastro foi validado na demonstração. Os dados não foram salvos. Use a conta de demonstração para entrar.`;
  }
}
