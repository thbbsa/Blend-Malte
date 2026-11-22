import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { Footer } from '../../components/footer/footer';
import { ClienteService } from '../../services/cliente.service';
import { mensagemErro } from '../../services/erro-api';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
  selector: 'app-cadastro-cliente',
  imports: [FormsModule, RouterLink, HeaderComponent, Footer],
  templateUrl: './cadastro-cliente.html',
  styleUrl: './cadastro-cliente.css',
})
export class CadastroCliente {
  mensagem = '';
  erro = '';
  carregando = false;
  cliente = { nome: '', cpf: '', usuario: '', email: '', telefone: '', senha: '', confirmarSenha: '' };
  private detector = inject(ChangeDetectorRef);
  constructor(private clientesApi: ClienteService) {}
  cadastrar(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      this.erro = 'Preencha todos os campos corretamente.';
      return;
    }
    if (this.cliente.senha !== this.cliente.confirmarSenha) {
      this.erro = 'As senhas não coincidem.';
      return;
    }
    this.carregando = true;
    this.mensagem = '';
    this.erro = '';
    this.clientesApi.cadastrar({
      nome: this.cliente.nome.trim(),
      cpf: this.cliente.cpf.trim(),
      usuario: this.cliente.usuario.trim(),
      email: this.cliente.email.trim().toLowerCase(),
      telefone: this.cliente.telefone.trim(),
      senha: this.cliente.senha,
    }).subscribe({
      next: cliente => {
        form.resetForm();
        this.carregando = false;
        this.mensagem = `Cadastro de ${cliente.nome} salvo na API. Agora você pode entrar.`;
        this.detector.markForCheck();
      },
      error: error => {
        this.carregando = false;
        this.erro = mensagemErro(error, 'Não foi possível salvar o cadastro.');
        this.detector.markForCheck();
      },
    });
  }
}
