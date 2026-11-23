
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

  produtoForm: Produto = this.criarProdutoVazio();

  modoEdicao = false;
  mensagemFeedback = '';
  carregando = false;
  salvando = false;
  erro = '';
  lendoImagem = false;

  private readonly tamanhoMaximoImagem = 2 * 1024 * 1024;

  private detector = inject(ChangeDetectorRef);

  constructor(private produtosApi: ProdutoService) {
    this.carregar();
  }

  private criarProdutoVazio(): Produto {
    return {
      id: 0,
      nome: '',
      categoria: 'Vinhos',
      preco: 0,
      estoque: 1,
      imagem: '',
      descricao: '',
      origem: '',
      teorAlcoolico: 0,
      volumeMl: 750
    };
  }

  carregar(): void {
    this.carregando = true;
    this.erro = '';
    this.detector.markForCheck();

    this.produtosApi.listar().subscribe({
      next: produtos => {
        this.produtos = produtos;
        this.carregando = false;
        this.detector.markForCheck();
      },

      error: error => {
        this.erro = mensagemErro(
          error,
          'Não foi possível consultar produtos.'
        );

        this.carregando = false;
        this.detector.markForCheck();
      }
    });
  }

  novo(): void {
    this.produtoForm = this.criarProdutoVazio();
    this.modoEdicao = false;
    this.mensagemFeedback = '';
    this.erro = '';
    this.lendoImagem = false;
    this.detector.markForCheck();
  }

  editar(produto: Produto): void {
    this.produtoForm = {
      ...this.criarProdutoVazio(),
      ...produto
    };

    this.modoEdicao = true;
    this.mensagemFeedback = '';
    this.erro = '';

    this.detector.markForCheck();
  }

  selecionarImagem(evento: Event): void {
    const campo = evento.target as HTMLInputElement;
    const arquivo = campo.files?.[0];

    if (!arquivo) return;

    this.erro = '';

    if (!arquivo.type.startsWith('image/')) {
      this.erro = 'Selecione um arquivo de imagem válido.';
      campo.value = '';
      this.detector.markForCheck();
      return;
    }

    if (arquivo.size > this.tamanhoMaximoImagem) {
      this.erro = 'A imagem deve ter no máximo 2 MB.';
      campo.value = '';
      this.detector.markForCheck();
      return;
    }

    const leitor = new FileReader();

    this.lendoImagem = true;
    this.detector.markForCheck();

    leitor.onload = () => {
      if (typeof leitor.result === 'string') {
        this.produtoForm.imagem = leitor.result;
        this.erro = '';
      } else {
        this.erro = 'Não foi possível interpretar a imagem.';
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

    if (this.salvando) return;

    if (this.lendoImagem) {
      this.erro = 'Aguarde o carregamento da foto antes de cadastrar.';
      return;
    }

    const produto = this.produtoForm;

    if (
      !produto.nome.trim() ||
      !produto.descricao.trim() ||
      !produto.categoria ||
      !(produto.imagem ?? '').trim()
    ) {
      this.erro = 'Preencha todos os campos obrigatórios e selecione uma imagem.';
      return;
    }

    if (
      !Number.isFinite(produto.preco) ||
      produto.preco <= 0 ||
      !Number.isInteger(produto.estoque) ||
      produto.estoque < 0 ||
      !Number.isFinite(produto.teorAlcoolico) ||
      produto.teorAlcoolico < 0 ||
      !Number.isFinite(produto.volumeMl) ||
      produto.volumeMl <= 0
    ) {
      this.erro = 'Informe preço, estoque, teor alcoólico e volume válidos.';
      return;
    }

    const edicao = this.modoEdicao;

    const dadosProduto = {
      nome: produto.nome.trim(),
      categoria: produto.categoria,
      preco: produto.preco,
      estoque: produto.estoque,
      imagem: (produto.imagem ?? '').trim(),
      descricao: produto.descricao.trim(),
      origem: produto.origem?.trim() ?? '',
      teorAlcoolico: produto.teorAlcoolico ?? 0,
      volumeMl: produto.volumeMl ?? 750
    };

    this.salvando = true;
    this.erro = '';
    this.mensagemFeedback = '';

    const pedido = edicao
      ? this.produtosApi.atualizar({
        ...dadosProduto,
        id: produto.id
      })
      : this.produtosApi.criar(dadosProduto);

    pedido.subscribe({
      next: produtoSalvo => {

        this.mensagemFeedback =
          `Produto "${produtoSalvo.nome}" ${edicao ? 'atualizado' : 'cadastrado'
          } na API.`;

        this.salvando = false;
        this.produtoForm = this.criarProdutoVazio();
        this.modoEdicao = false;

        this.carregar();

        this.detector.markForCheck();
      },

      error: error => {
        this.erro = mensagemErro(
          error,
          'Não foi possível salvar o produto.'
        );

        this.salvando = false;
        this.detector.markForCheck();
      }
    });
  }

  cancelar(): void {
    this.novo();
  }

  excluir(produto: Produto): void {

    if (produto.id == null) {
      this.erro = 'Não foi possível identificar o produto.';
      return;
    }

    if (!confirm(`Deseja realmente remover "${produto.nome}"?`)) {
      return;
    }

    this.erro = '';
    this.mensagemFeedback = '';

    this.produtosApi.excluir(produto.id).subscribe({
      next: () => {
        this.produtos = this.produtos.filter(
          item => item.id !== produto.id
        );

        this.mensagemFeedback =
          `Produto "${produto.nome}" removido da API.`;

        this.detector.markForCheck();
      },

      error: error => {
        this.erro = mensagemErro(
          error,
          'Não foi possível remover o produto.'
        );

        this.detector.markForCheck();
      }
    });
  }
}
