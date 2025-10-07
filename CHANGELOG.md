# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.4.0] - 2025-09-15

### 🚀 Adicionado
- Suporte para usar **qualquer arquivo .env.*** como origem
- Agora é possível criar `.env.production` a partir de `.env.example`
- Criação de `.env.test` a partir de `.env.development`
- Qualquer combinação de arquivos `.env.*` é permitida

### ✨ Melhorado
- Menu de contexto agora aparece em todos os arquivos `.env.*`
- Seletor de ambiente filtra automaticamente o arquivo de origem
- Placeholder dinâmico mostra qual arquivo está sendo usado como base
- Validação atualizada para aceitar qualquer arquivo `.env.*`

### 🔧 Alterado
- Pattern do menu de contexto: `/^\\.env$/` → `/^\\.env/`
- Validação de arquivo: `endsWith('.env')` → `startsWith('.env')`
- Lógica de seleção agora exclui o arquivo de origem das opções

### 📚 Documentação
- Arquivo `.claude/` excluído dos pacotes VSIX

## [1.3.0] - 2025-09-15

### 🚀 Lançamento Inicial no Marketplace

#### ✨ Funcionalidades
- Geração de múltiplos ambientes `.env.*`
- Conversão inteligente de valores:
  - URLs → `https://example.com`
  - Emails → `user@example.com`
  - Booleanos → `true`/`false`
  - Números → `0`
  - Strings → `""`
- 8 tipos de ambiente pré-definidos + personalizado
- Preservação de comentários
- Informações de autor (Git) e data

#### 🔒 Segurança
- Proteção contra path traversal
- Validação de tamanho de arquivo (1MB)
- Sanitização de nomes de arquivo
- Timeouts em comandos Git (5s)
- Validação de encoding UTF-8

#### 📦 Ambientes Suportados
- `.env.example` - Template padrão
- `.env.development` - Desenvolvimento
- `.env.staging` - Homologação
- `.env.production` - Produção
- `.env.test` - Testes automatizados
- `.env.local` - Configurações locais
- `.env.docker` - Containers Docker
- `.env.preview` - Deploys de preview
- **Personalizado** - Nomes customizados

#### 🎯 Menu de Contexto
- Clique direito no Explorer
- Clique direito no Editor
- Disponível apenas para arquivos `.env`

---

## Links

- [Marketplace](https://marketplace.visualstudio.com/items?itemName=DotEnvManager.dotenv-manager)
- [Repositório GitHub](https://github.com/dasilva95Ro/DotEnvManager)
- [Issues](https://github.com/dasilva95Ro/DotEnvManager/issues)
