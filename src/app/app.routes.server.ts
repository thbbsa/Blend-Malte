import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'produtos/:categoria', renderMode: RenderMode.Server },
  { path: 'carrinho', renderMode: RenderMode.Client },
  { path: 'checkout', renderMode: RenderMode.Client },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
