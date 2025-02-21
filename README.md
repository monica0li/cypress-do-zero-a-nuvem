# Testes automatizados - Cypress, do Zero à Nuvem

Esse projeto se trata de testes automatizados escritos para o meu primeiro curso de Cypress - "Cypress, do Zero à Nuvem" - o qual testo um formulário para uma Central de Atendimento ao Cliente.

## Pré-requisitos
### SIstemas 
- [git](https://git-scm.com/) (2.42.1 no momento da redação deste artigo)
- [Node.js](https://nodejs.org/en/) (v20.13.1 no momento da redação deste artigo)
- npm (10.8.1 no momento da redação deste artigo)
- [Visual Studio Code](https://code.visualstudio.com/) (v1.90.2 no momento da redação deste artigo) ou alguma outra IDE de sua preferência

>Obs.: Recomendo usar as mesmas versões ou versões mais recentes de suporte de longo prazo (LTS) dos sistemas listados acima.

>Obs. 2: Ao instalar o Node.js, o npm é instalado junto. 🎉

>Obs. 3: Para verificar as versões do git, Node.js e npm instaladas em seu computador, execute o comando git --version && node --version && npm --version em seu terminal de linha de comando.

### Conhecimentos
Para que você tire o melhor proveito do curso, é necessário que você possua ao menos conhecimentos básicos de:

- JavaScript
- Seletores CSS
- Linha de comando e git

## Primeiros passos
### Instalação e Inicialização

1. Na raiz do projeto, execute o comando `npm install cypress@13.12.0 --save-dev` (`ou npm i cypress@13.12.0 -D` para a versão curta).
2. Execute o comando `npx cypress open` para abrir o Cypress pela primeira vez e deixe-o guiá-lo na criação de uma suite de testes de ponta a ponta (E2E).
3. Por fim, com a Cypress App aberta, crie um arquivo chamado CAC-TAT.cy.js e feche a Cypress App. 

## Como rodar os testes?
São utilizados os seguintes comandos:

`cy:open` -> abre a cypress app

`test` -> roda os testes em modo headless

`cy:open:mobile` -> abre a cypress app simulando uma viewport mobile

`test:mobile` -> roda os testes em modo headless simulando uma viewport mobile
