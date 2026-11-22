# Blend & Malte — Projeto Integrador II

Loja de bebidas em Angular com API de demonstração em JSON Server. Nesta etapa, o catálogo, os cadastros, o login, o CRUD administrativo e as vendas consultam ou gravam dados na API.

## Rodar a aplicação local

Abra dois terminais na pasta do projeto:

1. Instale dependências: `npm install`.
2. Terminal da API: `npm run api`. JSON Server usa `db/db.json` e inicia em `http://127.0.0.1:3000`.
3. Terminal da loja: `npm start`. Abra `http://localhost:4200`.

Os dados de demonstração iniciais estão em `db/db.json`. O JSON Server grava as mudanças nesse arquivo; use `git restore db/db.json` para restaurar os dados iniciais depois dos testes.

## Contas de demonstração

- Cliente: `cliente@blendmalte.com` / `123456`.
- Administrador: `admin@blendmalte.com` / `admin123`.

Cadastre clientes pela tela de cadastro. O login consulta `/clientes` na API. O menu Manutenção aparece para o administrador; a rota também verifica o papel no navegador.

## O que cada API faz

- `ProdutoService`: consulta, cria, atualiza e remove produtos em `/produtos`. Home e catálogo carregam o conteúdo da API. Na manutenção, é possível selecionar uma foto de até 2 MB, ver a prévia e salvar a imagem com o produto.
- `ClienteService`: grava cadastro em `/clientes` e consulta as credenciais para o login.
- `VendaService`: grava em `/vendas` um retrato dos itens, dados de entrega, totais e data da compra.
- `SessaoService`: mantém o usuário autenticado enquanto a aplicação está aberta.

Os serviços ficam em `src/app/services`. A API é JSON Server e o arquivo de dados é `db/db.json`.

## Rotas e acesso administrativo

O Angular usa rotas com hash, por exemplo `/#/produtos`, para que os links funcionem no GitHub Pages sem configuração de servidor para rotas. A tela de manutenção exige uma sessão com papel `admin`.

## GitHub Pages

O workflow está em `.github/workflows/deploy-pages.yml` e constrói o site no caminho `/Blend-Malte/`. Antes de publicar, configure nas variáveis do repositório GitHub `Settings > Secrets and variables > Actions > Variables` uma variável `API_URL` com a URL HTTPS pública da API. Depois, habilite `Settings > Pages > Build and deployment > Source: GitHub Actions`. O workflow publica em push para `main` ou por execução manual.

O JSON Server local não pode ser acessado por quem visita o GitHub Pages. A publicação da loja só terá catálogo e gravações funcionais depois que uma API pública estiver hospedada e aceitar requisições do domínio do Pages. Esta API de demonstração não implementa autenticação segura: as senhas de exemplo ficam legíveis no JSON e o controle de administrador no Angular pode ser contornado. Não use dados reais nem exponha esse JSON Server à internet.

## Tecnologias

Angular, TypeScript, HTML, CSS, Angular Router, HttpClient, serviços Angular e JSON Server. O fluxo usa formulários, validação, chamadas HTTP e CRUD. Os componentes são separados da comunicação com a API.

## Escopo acadêmico e limitações

A API JSON Server é um mock local, sem banco de dados de produção, autorização no servidor, hash de senha ou transações. Cadastro e vendas são persistidos no arquivo JSON local. O projeto não processa pagamentos. Para produção, é necessário um backend seguro com autenticação e autorização reais, além de uma hospedagem da API com CORS configurado para o domínio do Pages.
