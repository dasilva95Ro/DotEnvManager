# Segurança - DotEnv Manager

## Melhorias Implementadas na v1.3.0

### 🛡️ Validações de Path
- **Path Traversal Protection**: Bloqueia tentativas de `../` e `~`
- **Absolute Path Validation**: Apenas caminhos absolutos são aceitos
- **Path Normalization**: Normaliza paths antes da validação

### 📁 Validações de Arquivo
- **Limite de Tamanho**: Máximo 1MB por arquivo
- **Validação de Encoding**: Verifica UTF-8 válido
- **Permissões de Leitura**: Trata erros de permissão graciosamente

### 🔐 Validações de Nome
- **Prefixo Obrigatório**: Deve começar com `.env`
- **Caracteres Proibidos**: Bloqueia `<>:"|?*` e caracteres de controle
- **Nomes Reservados**: Evita nomes reservados do Windows (CON, PRN, etc.)
- **Limite de Comprimento**: Máximo 255 caracteres

### ⚡ Git Security
- **Repository Validation**: Verifica se `.git` existe antes de executar comandos
- **Workspace Validation**: Valida workspace root antes de comandos Git
- **Timeout Protection**: Timeout de 5 segundos em comandos Git
- **Graceful Fallback**: Retorna "Usuário" em caso de erro

## Cenários de Teste de Segurança

### ✅ Casos Válidos
```bash
.env.production
.env.development
.env.staging
.env.test-123
.env.custom_name
```

### ❌ Casos Inválidos
```bash
../../../etc/passwd    # Path traversal
.env<script>           # Caracteres perigosos
CON.env               # Nome reservado Windows
.env.dev|rm-rf        # Caracteres de comando
```

## Validações Automáticas

### 1. Input Sanitization
- Todos os inputs são validados antes do processamento
- Rejeição imediata de inputs maliciosos

### 2. File System Protection
- Verificação de existência antes de operações
- Validação de permissões de leitura/escrita
- Proteção contra directory traversal

### 3. Command Injection Prevention
- Comandos Git executados apenas em repositórios válidos
- Timeout em todas as operações de sistema
- Sanitização de parâmetros

## Logging de Segurança

### Eventos Registrados
- Tentativas de path traversal
- Arquivos com tamanho excessivo
- Nomes de arquivo inválidos
- Erros de permissão

### Não Registrado (Privacidade)
- Conteúdo dos arquivos .env
- Paths completos de arquivos
- Informações pessoais do Git

## Recomendações de Uso

### ✅ Boas Práticas
1. Use apenas em projetos confiáveis
2. Mantenha arquivos .env pequenos (< 1MB)
3. Execute em workspaces Git válidos
4. Use nomes de arquivo padrão quando possível

### ⚠️ Cuidados
1. Não processe arquivos .env de fontes não confiáveis
2. Verifique permissões de diretório antes do uso
3. Mantenha a extensão atualizada

## Auditoria de Código

### Pontos Verificados
- ✅ Todas as entradas são validadas
- ✅ Operações de arquivo são seguras
- ✅ Comandos de sistema têm timeout
- ✅ Errors são tratados apropriadamente
- ✅ Não há vazamentos de informação

### Ferramentas Recomendadas
- ESLint para análise estática
- TypeScript para type safety
- VS Code security extensions

## Relatório de Vulnerabilidades

Se encontrar uma vulnerabilidade de segurança:

1. **NÃO** abra issue público
2. Abra um issue privado no [repositório](https://github.com/dasilva95Ro/DotEnvManager/issues)
3. Marque como "Security" e inclua detalhes da vulnerabilidade
4. Aguarde resposta em até 48h

## Changelogs de Segurança

### v1.3.0 (Atual)
- ✅ Implementadas todas as validações de segurança
- ✅ Proteção contra path traversal
- ✅ Validação de tamanho de arquivo
- ✅ Sanitização de nomes de arquivo

### v1.2.0
- ⚠️ Segurança básica apenas

### v1.1.0
- ⚠️ Sem validações de segurança