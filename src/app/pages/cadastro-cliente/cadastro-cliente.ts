import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-cliente',
  imports: [FormsModule],
  templateUrl: './cadastro-cliente.html',
  styleUrl: './cadastro-cliente.css',
})
export class CadastroCliente {
  cliente = {
    nome: '',
    cpf: '',
    usuario: '',
    email: '',
    telefone: '',
    senha: '',
    confirmarSenha: ''
  };

  cadastrar() {
    if (this.cliente.senha !== this.cliente.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    console.log('Cliente cadastrado:', this.cliente);
    alert('Cadastro realizado com sucesso!');
  }
}

