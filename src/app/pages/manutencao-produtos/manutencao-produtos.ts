import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto.service';
import { mensagemErro } from '../../services/erro-api';

@Component({
  selector: 'app-manutencao-produtos',
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './manutencao-produtos.html',
  styleUrl: './manutencao-produtos.css',
})
export class ManutencaoProdutos {
  produtos: Produto[] = [];
  produtoForm: Produto = new Produto(0, '', 'Vinhos', 0, 1, '', '');
  modoEdicao = false;
  mensagemFeedback = '';
  carregando = false;
  erro = '';
  lendoImagem = false;
  private readonly tamanhoMaximoImagem = 2 * 1024 * 1024;
  private detector = inject(ChangeDetectorRef);

  constructor(private produtosApi: ProdutoService) { this.carregar(); }

  carregar(): void {
    this.carregando = true;
    this.detector.markForCheck();
    this.produtosApi.listar().subscribe({
      next: produtos => {
        this.produtos = produtos;
        this.carregando = false;
        this.detector.markForCheck();
      },
      error: error => {
        this.erro = mensagemErro(error, 'Não foi possível consultar produtos.');
        this.carregando = false;
        this.detector.markForCheck();
      },
    });
  }

  novo(): void {
    this.produtoForm = new Produto(0, '', 'Vinhos', 0, 1, '', '');
    this.modoEdicao = false;
    this.mensagemFeedback = '';
    this.detector.markForCheck();
  }

  editar(produto: Produto): void {
    this.produtoForm = { ...produto };
    this.modoEdicao = true;
    this.mensagemFeedback = '';
    this.detector.markForCheck();
  }

  selecionarImagem(evento: Event): void {
    const campo = evento.target as HTMLInputElement;
    const arquivo = campo.files?.[0];
    if (!arquivo) return;

    if (!arquivo.type.startsWith('image/')) {
      this.erro = 'Selecione um arquivo de imagem válido.';
      campo.value = '';
      return;
    }
    if (arquivo.size > this.tamanhoMaximoImagem) {
      this.erro = 'A imagem deve ter no máximo 2 MB.';
      campo.value = '';
      return;
    }

    const leitor = new FileReader();
    this.lendoImagem = true;
    this.erro = '';
    leitor.onload = () => {
      if (typeof leitor.result === 'string') {
        this.produtoForm.imagem = leitor.result;
        this.erro = '';
      }
      this.lendoImagem = false;
      this.detector.markForCheck();
    };
    leitor.onerror = () => {
      this.erro = 'Não foi possível carregar essa imagem.';
      this.lendoImagem = false;
      this.detector.markForCheck();
    };
    leitor.readAsDataURL(arquivo);
  }

  salvar(): void {
    if (this.lendoImagem) {
      this.erro = 'Aguarde o carregamento da foto antes de cadastrar.';
      return;
    }
    if (!this.produtoForm.nome.trim() || !this.produtoForm.descricao.trim() ||
      !this.produtoForm.categoria || !this.produtoForm.imagem.trim() ||
      this.produtoForm.estoque < 0 || this.produtoForm.preco <= 0) {
      this.erro = 'Preencha os dados, escolha uma foto ou informe seu caminho e informe preço e estoque válidos.';
      return;
    }
    const edicao = this.modoEdicao;
    const pedido = edicao
      ? this.produtosApi.atualizar(this.produtoForm)
      : this.produtosApi.criar({
        nome: this.produtoForm.nome.trim(), categoria: this.produtoForm.categoria,
        preco: this.produtoForm.preco, estoque: this.produtoForm.estoque,
        imagem: this.produtoForm.imagem.trim(), descricao: this.produtoForm.descricao.trim(),
      });
    pedido.subscribe({
      next: produto => {
        this.mensagemFeedback = `Produto "${produto.nome}" ${edicao ? 'atualizado' : 'cadastrado'} na API.`;
        this.erro = '';
        this.novo();
        this.carregar();
        this.detector.markForCheck();
      },
      error: error => {
        this.erro = mensagemErro(error, 'Não foi possível salvar o produto.');
        this.detector.markForCheck();
      },
    });
  }

  cancelar(): void { this.novo(); }

  excluir(produto: Produto): void {
    if (!confirm(`Deseja realmente remover "${produto.nome}"?`)) return;
    this.produtosApi.excluir(produto.id).subscribe({
      next: () => {
        this.produtos = this.produtos.filter(item => item.id !== produto.id);
        this.mensagemFeedback = `Produto "${produto.nome}" removido da API.`;
        this.detector.markForCheck();
      },
      error: error => {
        this.erro = mensagemErro(error, 'Não foi possível remover o produto.');
        this.detector.markForCheck();
      },
    });
  }
}
