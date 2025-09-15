# DotEnv Manager

[![GitHub](https://img.shields.io/badge/GitHub-dasilva95Ro%2FDotEnvManager-blue?logo=github)](https://github.com/dasilva95Ro/DotEnvManager)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![VS Code Extension](https://img.shields.io/badge/VS%20Code-Extension-orange?logo=visual-studio-code)](https://marketplace.visualstudio.com)

Uma extensão robusta e segura para VS Code que facilita o gerenciamento de arquivos `.env` para diferentes ambientes.

## Funcionalidades

- **Gerar arquivos .env para múltiplos ambientes**: A partir de um arquivo `.env`, gera automaticamente arquivos para diferentes ambientes (.env.example, .env.development, .env.production, etc.)
- **Seleção interativa de ambiente**: Interface intuitiva para escolher o tipo de arquivo desejado
- **Nomes personalizados**: Opção para criar arquivos com nomes personalizados
- **Informações de autoria**: Inclui automaticamente o autor (nome do Git) e data de geração nos comentários
- **Rastreabilidade**: Cada arquivo gerado contém informações sobre quando e por quem foi criado

## Como usar

1. Clique com o botão direito em um arquivo `.env` no explorador de arquivos
2. Selecione "Gerar arquivo .env para ambiente específico" no menu de contexto
3. Escolha o tipo de ambiente desejado no menu de seleção:
   - `.env.example` - Arquivo template padrão
   - `.env.development` - Ambiente de desenvolvimento
   - `.env.staging` - Ambiente de homologação/teste
   - `.env.production` - Ambiente de produção
   - `.env.test` - Testes automatizados
   - `.env.local` - Configurações locais
   - `.env.docker` - Para containers Docker
   - `.env.preview` - Para deploys de preview
   - **Personalizado** - Digite um nome customizado

Ou:

1. Abra um arquivo `.env` no editor
2. Use `Ctrl+Shift+P` (ou `Cmd+Shift+P` no Mac) para abrir a paleta de comandos
3. Digite "Gerar arquivo .env para ambiente específico" e execute o comando

## Funcionalidades da conversão

A extensão inteligentemente converte os valores baseado no tipo:

- Strings entre aspas → `""` ou `''`
- Valores booleanos → `true`
- Números → `0`
- E-mails → `user@example.com`
- URLs → `https://example.com`
- Domínios → `example.com`
- Outros valores → string vazia
- Comentários e linhas vazias são preservados

## Exemplo

**Arquivo .env original:**
```
# Configurações da aplicação
APP_NAME="Minha App"
APP_PORT=3000
APP_DEBUG=true
DATABASE_URL=postgres://user:pass@localhost:5432/mydb
ADMIN_EMAIL=admin@mycompany.com

# Configurações de API
API_KEY=abc123def456
API_ENDPOINT=https://api.example.com/v1
```

**Arquivo .env.production gerado:**
```
# .env.production
# Configurações para ambiente de produção
# Gerado automaticamente a partir do arquivo .env
# Autor: Rodrigo Da Silva Santos
# Data: 15/09/2025

# Configurações da aplicação
APP_NAME=""
APP_PORT=0
APP_DEBUG=true
DATABASE_URL=https://example.com
ADMIN_EMAIL=user@example.com

# Configurações de API
API_KEY=
API_ENDPOINT=https://example.com
```

## Instalação

### Via arquivo VSIX (Recomendado)
1. Baixe o arquivo `dotenv-manager-1.3.0.vsix` do [repositório](https://github.com/dasilva95Ro/DotEnvManager)
2. No VS Code: `Ctrl+Shift+P` → "Extensions: Install from VSIX"
3. Selecione o arquivo baixado
4. Reinicie o VS Code se necessário

### Para desenvolvimento
1. Clone o repositório: `git clone https://github.com/dasilva95Ro/DotEnvManager.git`
2. Execute `npm install` para instalar dependências
3. Abra o projeto no VS Code
4. Pressione `F5` para executar em modo de desenvolvimento

## Documentação Adicional

- 📖 [Documentação Técnica](DEVELOPMENT.md) - Guia para desenvolvedores
- 🔒 [Segurança](SECURITY.md) - Informações sobre validações e boas práticas

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Problemas e Sugestões

- 🐛 [Reportar Bug](https://github.com/dasilva95Ro/DotEnvManager/issues)
- 💡 [Sugerir Funcionalidade](https://github.com/dasilva95Ro/DotEnvManager/issues)

## Versões

### v1.3.0 (Atual)
- ✅ Melhorias de segurança completas
- ✅ Documentação técnica abrangente
- ✅ Validações robustas de entrada
- ✅ Proteção contra path traversal

### v1.2.0
- ✅ Informações de autoria e data
- ✅ Múltiplos ambientes suportados

### v1.1.0
- ✅ Seleção interativa de ambientes
- ✅ Nomes personalizados

## Autor

**Rodrigo Santos** - [GitHub](https://github.com/dasilva95Ro)

## Sobre o Desenvolvimento

🤖 **Esta extensão foi desenvolvida 100% com auxílio de IA Claude Code**

Esta extensão representa um exemplo prático de como a inteligência artificial pode acelerar o desenvolvimento de software, desde a concepção inicial até a implementação final com validações de segurança enterprise-level.

### Tecnologias e Ferramentas Utilizadas:
- **Claude Code**: IA para desenvolvimento completo
- **TypeScript**: Linguagem principal
- **VS Code API**: Framework de extensões
- **Node.js**: Runtime e APIs do sistema
- **ESLint**: Análise estática de código

### Processo de Desenvolvimento:
1. 🎯 **Concepção**: Definição de requisitos e funcionalidades
2. 🏗️ **Arquitetura**: Estruturação do código e padrões
3. 💻 **Implementação**: Desenvolvimento das funcionalidades principais
4. 🔒 **Segurança**: Implementação de validações robustas
5. 📚 **Documentação**: Criação de documentação técnica completa
6. 🧪 **Testes**: Validação e casos de teste
7. 📦 **Distribuição**: Empacotamento para produção

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.
