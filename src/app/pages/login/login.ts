import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';


@Component({
  selector: 'app-login',
  imports: [HeaderComponent, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  // credenciais fixas, só para teste
  private readonly EMAIL = 'cliente@email.com';
  private readonly SENHA = '123456';

  erro = signal('');
  sucesso = signal('');

  entrar(evento: Event, email: string, senha: string) {
    evento.preventDefault();

    if (!email.trim() || !senha) {
      this.erro.set('Preencha o e-mail e a senha.');
      return;
    }

    if (email.trim().toLowerCase() !== this.EMAIL || senha !== this.SENHA) {
      this.erro.set('E-mail ou senha incorretos.');
      return;
    }

    this.erro.set('');
    this.sucesso.set('Você já pode aproveitar a loja.');
  }
}