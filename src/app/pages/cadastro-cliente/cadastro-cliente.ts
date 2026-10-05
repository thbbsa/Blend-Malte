<<<<<<< HEAD
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { Footer } from '../../components/footer/footer';
import { Cliente } from '../../models/cliente';
import { carrinho } from '../../models/loja';

=======
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Footer } from '../../components/footer/footer'; // Confirme o caminho da pasta do seu footer
import{HeaderComponent} from '../../components/header/header.component'; 
>>>>>>> c6763a0 (página de cadastro)
@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-cadastro-cliente',
<<<<<<< HEAD
  imports: [FormsModule, RouterLink, HeaderComponent, Footer],
  templateUrl: './cadastro-cliente.html', styleUrl: './cadastro-cliente.css',
=======
  standalone: true,
  imports: [FormsModule,HeaderComponent],
  templateUrl: './cadastro-cliente.html',
  styleUrl: './cadastro-cliente.css' // <-- CERTIFIQUE-SE DE QUE ESTÁ EXATAMENTE ASSIM
>>>>>>> c6763a0 (página de cadastro)
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
<<<<<<< HEAD
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
=======
    alert('Registrado com sucesso!');
  }
}
>>>>>>> c6763a0 (página de cadastro)
