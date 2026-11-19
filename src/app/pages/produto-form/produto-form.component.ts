import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { CATEGORIAS, Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produto-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './produto-form.component.html',
  styleUrl: './produto-form.component.css',
})
export class ProdutoFormComponent implements OnInit {
  private fb = inject(FormBuilder);

  categorias = CATEGORIAS;
  id: number | null = null;
  salvando = false;
  erro = '';

  form = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    categoria: ['', Validators.required],
    origem: ['', Validators.required],
    teorAlcoolico: [40, [Validators.required, Validators.min(0), Validators.max(100)]],
    volumeMl: [750, [Validators.required, Validators.min(1)]],
    preco: [0, [Validators.required, Validators.min(0.01)]],
    estoque: [0, [Validators.required, Validators.min(0)]],
    descricao: [''],
  });

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  get editando(): boolean {
    return this.id !== null;
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.produtoService.buscarPorId(this.id).subscribe({
        next: (produto) => this.form.patchValue(produto),
        error: () => (this.erro = 'Produto não encontrado.'),
      });
    }
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.salvando = true;
    this.erro = '';
    const produto: Produto = this.form.getRawValue();

    const requisicao =
      this.id !== null
        ? this.produtoService.alterar(this.id, produto)
        : this.produtoService.incluir(produto);

    requisicao.subscribe({
      next: () => this.router.navigate(['/produtos']),
      error: () => {
        this.erro = 'Erro ao salvar o produto. Verifique se o json-server está rodando.';
        this.salvando = false;
      },
    });
  }

  invalido(campo: string): boolean {
    const c = this.form.get(campo);
    return !!c && c.invalid && (c.touched || c.dirty);
  }
}
