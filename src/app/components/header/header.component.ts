import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { carrinho } from '../../models/loja';
import { SessaoService } from '../../services/sessao.service';

@Component({ changeDetection: ChangeDetectionStrategy.Default, imports: [RouterLink], selector: 'app-header', styleUrl: './header.component.css', templateUrl: './header.component.html' })
export class HeaderComponent {
  constructor(private router: Router, public sessao: SessaoService) {}
  carrinho = carrinho;
  itensNoCarrinho(): number { return this.carrinho.totalGarrafas(); }
  buscar(evento: Event, texto: string): void { evento.preventDefault(); this.router.navigate(['/produtos'], { queryParams: { busca: texto.trim() || null } }); }
  sair(): void { this.sessao.sair(); this.router.navigate(['/']); }
}
