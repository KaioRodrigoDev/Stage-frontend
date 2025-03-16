# Documentação do Frontend

## Visão Geral

Este é o frontend do projeto, desenvolvido em **Next.js**. O sistema utiliza autenticação via **token Bearer**, armazenado no **localStorage** após o login. Uma vez autenticado, o usuário é redirecionado automaticamente para o **dashboard** e tem acesso ao restante da aplicação.

O design do projeto pode ser visualizado no seguinte link do **Figma**:
[Link do Figma](https://www.figma.com/design/sG8PcWvDF3przrgtV063m8/Stage-Consult?m=auto&t=Aj4FgRNg53pTe907-1)

A aplicação está disponível online em:

[Endereço do Projeto](https://stage-frontend-iota.vercel.app)

email: exampleemail@gmail.com
password: secret

---

## Instalação e Execução

### Requisitos

- **Node.js** (versão 18 ou superior recomendada)
- **Gerenciador de pacotes** (npm ou yarn)

### Clonando o Repositório

```bash
git clone https://github.com/KaioRodrigoDev/Stage-frontend.git
cd Stage-frontend
```

### Instalando Dependências

```bash
npm install  # ou yarn install
```

### Rodando o Projeto em Desenvolvimento

```bash
npm run dev  # ou yarn dev
```

A aplicação será iniciada em: `http://localhost:3000`

### Build para Produção

```bash
npm run build  # ou yarn build
npm run start  # ou yarn start
```

---

## Autenticação

O sistema de login utiliza **JWT (JSON Web Token)** para autenticação.

1. O usuário insere suas credenciais na tela de login.
2. Se autenticado com sucesso, um **token Bearer** é gerado e salvo no **localStorage**.
3. O token é incluído automaticamente em todas as requisições para rotas protegidas.
4. Se o token for inválido ou expirar, o usuário é redirecionado para a tela de login.

---

## Estrutura de Pastas

```bash
/seu-projeto
│── public/              # Arquivos estáticos (imagens, ícones, etc.)
│── src/
│   ├── components/      # Componentes reutilizáveis
│   ├── app/           # Páginas do Next.js
│   ├── services/        # Configuração de API e requisições
│   ├── context/         # Context API
│   └── types/           # Typagens
│── .env.local           # Variáveis de ambiente
│── package.json         # Dependências e scripts
│── next.config.js       # Configuração do Next.js
```
