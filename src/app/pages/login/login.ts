import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { Footer } from '../../components/footer/footer';
import { ClienteService } from '../../services/cliente.service';
import { SessaoService } from '../../services/sessao.service';
import { mensagemErro } from '../../services/erro-api';

@Component({ changeDetection: ChangeDetectionStrategy.Default, imports: [FormsModule, RouterLink, HeaderComponent, Footer], selector: 'app-login', styleUrl: './login.css', templateUrl: './login.html' })
export class Login {
  erro = '';
  email = '';
  senha = '';
  carregando = false;
  constructor(private clientesApi: ClienteService, public sessao: SessaoService, private router: Router) {}
  entrar(form: NgForm): void {
    if (form.invalid) { this.erro = 'Informe e-mail e senha.'; return; }
    this.carregando = true;
    this.erro = '';
    this.clientesApi.autenticar(this.email, this.senha).subscribe({
      next: cliente => { this.sessao.entrar(cliente); this.carregando = false; this.router.navigate([cliente.papel === 'admin' ? '/manutencao-produtos' : '/']); },
      error: error => { this.erro = mensagemErro(error, 'E-mail ou senha incorretos.'); this.carregando = false; },
    });
  }
}
