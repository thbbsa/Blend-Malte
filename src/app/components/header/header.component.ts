import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-header',
  styleUrl: './header.component.css',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private router = inject(Router);
  itensNoCarrinho = 3;

  buscar(evento: Event, texto: string) {
    evento.preventDefault();
    this.router.navigate(['/produtos'], { queryParams: { busca: texto.trim() || null } });
  }
}

