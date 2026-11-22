import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessaoService } from './services/sessao.service';

export const adminGuard: CanActivateFn = () => {
  const sessao = inject(SessaoService);
  const router = inject(Router);
  return sessao.cliente?.papel === 'admin' ? true : router.createUrlTree(['/login']);
};

