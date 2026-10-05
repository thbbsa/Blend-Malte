# Blend & Malte — Marco 1

Protótipo de loja de bebidas em Angular. Mantém home, catálogo, busca, filtros, login demonstrativo, cadastro, carrinho e checkout. Os dados ficam apenas em memória; não há banco de dados nem pagamento real.

## Executar

- `npm install` para instalar as dependências.
- `npm start` e abrir http://localhost:4200.
- `npm run build` para compilar.
- `npm test -- --watch=false --ts-config tsconfig.carrinho.spec.json --include src/app/models/carrinho.spec.ts` para verificar compra e modelagem.

## Modelagem de classes

Os arquivos em `src/app/models` usam atributos explícitos, construtores com `this`, listas e métodos comuns, como os exemplos da Aula 4. Não dependem do Angular.

- `Usuario`: ID, nome, e-mail e senha privada. O método `autenticar` compara as credenciais.
- `Cliente extends Usuario`: usa `super` para inicializar os dados herdados; acrescenta CPF, telefone e um Carrinho.
- `Produto`: ID, nome, categoria, preço, estoque, imagem e descrição. O catálogo cria três objetos com `new Produto`.
- `Carrinho`: uma lista de itens, cupom e confirmação de maioridade. Métodos adicionam, removem e alteram quantidades, calculam subtotal, desconto, frete e total.

Relações: Cliente herda Usuario, Cliente possui Carrinho e os itens do Carrinho contêm os dados dos produtos selecionados.

## Como as telas compartilham os dados

`loja.ts` exporta um objeto criado com `new Carrinho()`. As telas importam o mesmo objeto; portanto, o produto adicionado na vitrine aparece no carrinho e no checkout. A classe comum `Sessao` controla o login demonstrativo e associa o Cliente ao mesmo carrinho.

Essa é uma escolha simples para o protótipo no navegador. Atualizar a página reinicia os dados. Serviços e persistência poderão ser adotados no próximo marco.

## Recursos da interface

- Componentes com HTML, CSS e TypeScript, como na Aula 5.
- Interpolação, `@if`, `@for`, eventos e `ngModel`, como na Aula 6.
- Rotas, `routerLink`, `Router` e `inject(Router)`, como na Aula 7.
- `@Input` permite que a vitrine passe um produto ao card reutilizável.
- A atualização padrão do Angular permite que as telas usem atributos comuns. Os métodos calculam os valores quando a tela é atualizada.
- A busca lê a URL atual com Router, sem assinaturas de eventos de rota.
- SSR está desativado, conforme a criação do projeto na Aula 5. A aplicação roda no navegador.

## Roteiro da apresentação

1. Mostrar a home e seus três produtos únicos.
2. Abrir Perfil e entrar com `cliente@blendmalte.com` / `123456`; mostrar o nome do cliente e sair.
3. Abrir Criar conta e mostrar validação e confirmação de senha. Explicar que o cadastro não é salvo.
4. Selecionar uma categoria e buscar um produto.
5. Adicionar o mesmo produto duas vezes e mostrar o contador de unidades.
6. Abrir o carrinho, alterar quantidades, remover um item e aplicar `ADEGA10`.
7. Explicar o frete de R$ 25 e a gratuidade a partir de R$ 300 após descontos.
8. Confirmar maioridade, abrir o checkout e preencher os dados pessoais e endereço.
9. Concluir a demonstração e mostrar o carrinho vazio.

## Para explicar o código

- Classe é a estrutura; objeto é uma instância criada com `new`.
- O construtor inicializa atributos; os métodos executam ações.
- `extends` representa herança e `super` chama o construtor da classe pai.
- Um produto repetido aumenta a quantidade do item existente.
- O contador soma unidades; o subtotal soma preço multiplicado por quantidade.
- Os eventos de clique alteram os objetos e o Angular atualiza a interface.
- Os dados do cliente no cadastro e checkout são validados e descartados.

## Limites de escopo

Login e compra são demonstrativos. Cadastro e checkout não salvam dados. Manutenção de produtos ainda usa uma lista própria em memória. API, banco, pagamento real e deploy ficam para etapas posteriores.

Os arquivos antigos `home.html`, `login.html` e `script.js` são um protótipo separado. A apresentação principal usa `npm start` e os arquivos de `src/app`.
