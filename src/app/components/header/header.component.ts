import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { carrinho } from '../../models/loja';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [RouterLink],
  selector: 'app-header',
  styleUrl: './header.component.css',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private router = inject(Router);
  carrinho = carrinho;

  itensNoCarrinho(): number { return this.carrinho.totalGarrafas(); }

  buscar(evento: Event, texto: string) {
    evento.preventDefault();
    this.router.navigate(['/produtos'], { queryParams: { busca: texto.trim() || null } });
  }
}
