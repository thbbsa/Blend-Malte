import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';

export interface ProdutoItem {
  id: number;
  nome: string;
  qtd: number;
  preco: number;
}

@Component({
  selector: 'app-manutencao-produtos',
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './manutencao-produtos.html',
  styleUrl: './manutencao-produtos.css',
})
export class ManutencaoProdutos {
  // Lista inicial de produtos
  produtos: ProdutoItem[] = [
    { id: 1, nome: 'Vinho Tinto Reservado', qtd: 20, preco: 49.90 },
    { id: 2, nome: 'Cerveja Black Princess', qtd: 50, preco: 6.99 },
    { id: 3, nome: 'Whisky Black Label', qtd: 10, preco: 169.90 },
    { id: 4, nome: 'Gin Tanqueray London Dry', qtd: 15, preco: 119.90 },
  ];

  // Formulário do produto
  produtoForm: ProdutoItem = {
    id: 0,
    nome: '',
    qtd: 1,
    preco: 0,
  };

  // Controle de estado
  modoEdicao = false;
  mensagemFeedback = '';

  // Iniciar cadastro de novo produto
  novo(): void {
    this.produtoForm = {
      id: 0,
      nome: '',
      qtd: 1,
      preco: 0,
    };
    this.modoEdicao = false;
    this.mensagemFeedback = '';
  }

  // Carregar produto para edição
  editar(produto: ProdutoItem): void {
    this.produtoForm = { ...produto };
    this.modoEdicao = true;
    this.mensagemFeedback = '';
  }

  // Salvar (Criar ou Atualizar)
  salvar(): void {
    if (!this.produtoForm.nome.trim()) {
      alert('Por favor, informe o nome do produto.');
      return;
    }

    if (this.produtoForm.qtd < 0) {
      alert('A quantidade não pode ser negativa.');
      return;
    }

    if (this.produtoForm.preco <= 0) {
      alert('Informe um preço válido maior que zero.');
      return;
    }

    if (this.modoEdicao) {
      // Atualizar existente
      const index = this.produtos.findIndex((p) => p.id === this.produtoForm.id);
      if (index !== -1) {
        this.produtos[index] = { ...this.produtoForm };
        this.exibirFeedback(`Produto "${this.produtoForm.nome}" atualizado com sucesso!`);
      }
    } else {
      // Inserir novo com ID incremental
      const novoId = this.produtos.length > 0 ? Math.max(...this.produtos.map((p) => p.id)) + 1 : 1;
      const novoItem: ProdutoItem = {
        ...this.produtoForm,
        id: novoId,
      };
      this.produtos.push(novoItem);
      this.exibirFeedback(`Produto "${novoItem.nome}" cadastrado com sucesso!`);
    }

    const feedback = this.mensagemFeedback;
    this.novo();
    this.mensagemFeedback = feedback;
  }

  // Cancelar edição
  cancelar(): void {
    this.novo();
  }

  // Excluir produto
  excluir(produto: ProdutoItem): void {
    const confirmar = confirm(`Deseja realmente remover o produto "${produto.nome}"?`);
    if (!confirmar) return;

    this.produtos = this.produtos.filter((p) => p.id !== produto.id);

    // Se o item excluído estava sendo editado, reseta o form
    if (this.produtoForm.id === produto.id) {
      this.novo();
    }

    this.exibirFeedback(`Produto "${produto.nome}" removido com sucesso.`);
  }

  private exibirFeedback(msg: string): void {
    this.mensagemFeedback = msg;
    setTimeout(() => {
      if (this.mensagemFeedback === msg) {
        this.mensagemFeedback = '';
      }
    }, 3500);
  }
}
