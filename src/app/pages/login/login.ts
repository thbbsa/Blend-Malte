import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { Footer } from '../../components/footer/footer';
import { sessao } from '../../models/loja';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [FormsModule, RouterLink, HeaderComponent, Footer],
  selector: 'app-login', styleUrl: './login.css', templateUrl: './login.html',
})
export class Login {
  sessao = sessao;
  erro = '';
  email = '';
  senha = '';

  entrar(form: NgForm): void {
    if (form.invalid || !this.sessao.entrar(this.email, this.senha)) {
      this.erro = 'Confira o e-mail e a senha da conta de demonstração.';
      return;
    }
    this.erro = '';
    this.senha = '';
  }
}
