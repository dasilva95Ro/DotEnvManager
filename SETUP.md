# Configuração do Repositório - DotEnv Manager

## Setup Inicial do GitHub

### 1. Criar Repositório
```bash
# No GitHub, criar repositório: dasilva95Ro/DotEnvManager
# Descrição: "Extensão VS Code para gerenciar arquivos .env - gera múltiplos ambientes de forma segura"
# Público/Privado conforme preferência
# Incluir README.md ✓
# Incluir .gitignore (Node) ✓
# Incluir LICENSE (MIT) ✓
```

### 2. Clonar e Configurar
```bash
git clone https://github.com/dasilva95Ro/DotEnvManager.git
cd DotEnvManager

# Copiar arquivos do projeto atual para o repositório
# Manter estrutura:
# ├── src/
# ├── .vscode/
# ├── README.md
# ├── DEVELOPMENT.md
# ├── SECURITY.md
# ├── package.json
# ├── tsconfig.json
# ├── .gitignore
# └── LICENSE
```

### 3. Primeira Configuração
```bash
# Instalar dependências
npm install

# Testar compilação
npm run compile

# Gerar pacote
vsce package --allow-missing-repository

# Commit inicial
git add .
git commit -m "Initial commit: DotEnv Manager v1.3.0

✨ Features:
- Multiple environment file generation (.env.example, .env.development, etc.)
- Interactive environment selection
- Custom environment names
- Git author and date tracking
- Smart value type conversion

🔒 Security:
- Path traversal protection
- File size validation (1MB limit)
- Filename sanitization
- Git command security
- Input validation

📚 Documentation:
- Complete technical documentation
- Security guidelines
- Developer guide

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"

git push origin main
```

## Configuração de Issues e PRs

### Templates de Issue
Criar `.github/ISSUE_TEMPLATE/`:

**bug_report.md:**
```markdown
---
name: Bug Report
about: Reporte um bug encontrado
title: '[BUG] '
labels: bug
---

## Descrição do Bug
Descrição clara do problema.

## Passos para Reproduzir
1. Abra arquivo .env
2. Execute comando X
3. Veja erro Y

## Comportamento Esperado
O que deveria acontecer.

## Screenshots/Logs
Se aplicável, adicione capturas de tela.

## Ambiente:
- OS: [Windows/Mac/Linux]
- VS Code Version: 
- Extensão Version: 

## Informações Adicionais
Qualquer contexto adicional.
```

**feature_request.md:**
```markdown
---
name: Feature Request
about: Sugira uma nova funcionalidade
title: '[FEATURE] '
labels: enhancement
---

## Resumo da Funcionalidade
Descrição clara da funcionalidade desejada.

## Motivação
Por que essa funcionalidade seria útil?

## Solução Proposta
Como você imagina que funcionaria?

## Alternativas Consideradas
Outras abordagens que você considerou?
```

### Labels Recomendadas
- `bug` - Problemas/erros
- `enhancement` - Novas funcionalidades
- `documentation` - Melhorias na documentação
- `security` - Questões de segurança
- `good first issue` - Para novos contribuidores
- `help wanted` - Precisa de ajuda da comunidade

## Release Strategy

### Versionamento Semântico
- **Major (x.0.0)**: Mudanças que quebram compatibilidade
- **Minor (x.y.0)**: Novas funcionalidades compatíveis
- **Patch (x.y.z)**: Correções de bugs

### Processo de Release
1. Atualizar versão no `package.json`
2. Atualizar `README.md` com changelog
3. Gerar novo arquivo `.vsix`
4. Criar Git tag: `git tag v1.3.0`
5. Push tag: `git push origin v1.3.0`
6. Criar GitHub Release com arquivo `.vsix`

## CI/CD (Futuro)

### GitHub Actions (`.github/workflows/`)

**build.yml:**
```yaml
name: Build and Test
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '16'
    - run: npm install
    - run: npm run compile
    - run: npm run lint
```

**release.yml:**
```yaml
name: Release
on:
  push:
    tags: ['v*']
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
    - run: npm install
    - run: vsce package
    - uses: softprops/action-gh-release@v1
      with:
        files: '*.vsix'
```

## Marketplace (Futuro)

### Preparação para VS Code Marketplace
1. Criar conta de publisher no [Visual Studio Marketplace](https://marketplace.visualstudio.com/manage)
2. Gerar Personal Access Token
3. Executar: `vsce login your-publisher-name`
4. Publicar: `vsce publish`

### Assets Necessários
- Icon (128x128 PNG)
- Banner/Header image
- Screenshots da extensão em uso
- GIF demonstrativo (opcional)

## Estrutura Final do Repositório
```
📁 DotEnvManager/
├── 📁 .github/
│   ├── 📁 ISSUE_TEMPLATE/
│   └── 📁 workflows/
├── 📁 .vscode/
├── 📁 src/
├── 📄 .eslintrc.json
├── 📄 .gitignore
├── 📄 .vscodeignore
├── 📄 DEVELOPMENT.md
├── 📄 LICENSE
├── 📄 package.json
├── 📄 README.md
├── 📄 SECURITY.md
├── 📄 SETUP.md (este arquivo)
├── 📄 tsconfig.json
└── 📄 dotenv-manager-1.3.0.vsix
```

## Checklist de Configuração

- [ ] Repositório criado no GitHub
- [ ] Código commitado e pushed
- [ ] README.md atualizado com URLs corretas
- [ ] Issues templates criados
- [ ] Labels configuradas
- [ ] Release v1.3.0 criada
- [ ] Documentação verificada
- [ ] Links testados
- [ ] VSIX testado em VS Code limpo