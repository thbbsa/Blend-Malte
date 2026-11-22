import { HttpErrorResponse } from '@angular/common/http';

export function mensagemErro(erro: unknown, padrao: string): string {
  if (erro instanceof HttpErrorResponse) {
    if (erro.status === 0) return 'Não foi possível conectar à API. Inicie o JSON Server com npm run api.';
    if (erro.status === 409) return 'Este cadastro já existe.';
    return erro.error?.message || padrao;
  }
  return erro instanceof Error ? erro.message : padrao;
}
