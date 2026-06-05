# Login_Cadastro

Interface de autenticação e cadastro construída com Vite, TypeScript, HTML e CSS, com foco em experiência de usuário, validação em tempo real e refinamento visual. Este projeto também foi pensado como um material educacional para praticar fluxos de interface e aplicar critérios de qualidade inspirados nas skills `impeccable` e `frontend-design`.

## Objetivo educacional

O projeto serve como um laboratório prático para estudar:

- composição de telas de login e cadastro em uma única experiência;
- estados de interface, feedback visual e microinterações;
- validação de formulário no cliente;
- acessibilidade básica em formulários;
- organização de CSS com variáveis, camadas visuais e responsividade;
- construção de uma interface mais polida e intencional, em vez de um layout genérico.

## O que este projeto demonstra

- alternância entre login e cadastro sem recarregar a página;
- foco automático no campo principal ao trocar de visão;
- exibição e ocultação de senha;
- validação de e-mail, senha e confirmação de senha;
- checklist visual de força da senha;
- feedback com toast para sucesso e erro;
- simulação de carregamento durante o envio;
- opção de “Lembrar de mim” com persistência local do e-mail;
- layout com painel visual e área de formulário separadas.

## Stack

- Vite
- TypeScript
- HTML5
- CSS3

## Como executar

1. Instale as dependências:

```bash
npm install
```

2. Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

3. Gere a versão de produção:

```bash
npm run build
```

4. Pré-visualize a build:

```bash
npm run preview
```

## Estrutura do projeto

- `index.html`: marcação principal da interface.
- `src/main.ts`: lógica de interação, validação e toasts.
- `src/style.css`: toda a apresentação visual e responsividade.
- `PRODUCT.md`: especificação do produto e diretrizes de design.

## Como estudar o projeto com as skills

### `impeccable`

Use esta skill para analisar o refinamento da interface.

Pontos de estudo:

- hierarquia visual do card de autenticação;
- contraste, espaçamento e legibilidade;
- consistência entre estados normais, de erro e de sucesso;
- comportamento do layout em desktop e mobile;
- qualidade dos microdetalhes, como foco, transições e feedback imediato.

Exercícios sugeridos:

- revisar a distribuição de espaço entre título, campos e ações;
- melhorar mensagens de erro para deixá-las mais claras;
- testar a interface com teclado apenas;
- avaliar se os estados ativos e desativados estão visíveis o suficiente.

### `frontend-design`

Use esta skill para estudar composição, estética e intenção visual.

Pontos de estudo:

- uso de fundo escuro com contraste controlado;
- painel visual lateral com identidade própria;
- integração entre tipografia, ícones e botões;
- composição de uma experiência que parece produto real, não apenas formulário funcional;
- construção de uma linguagem visual consistente com o tema de autenticação.

Exercícios sugeridos:

- testar outra direção visual sem quebrar a clareza do fluxo;
- variar a paleta mantendo acessibilidade;
- criar uma versão com outra personalidade de marca;
- adaptar o layout para um contexto mais institucional ou acadêmico.

## Licença de uso acadêmico

Este repositório pode ser usado como material de estudo, demonstração e prática de front-end. Se for reutilizado em trabalhos ou apresentações, a documentação ajuda a explicar as decisões de interface e o valor educacional do projeto.
