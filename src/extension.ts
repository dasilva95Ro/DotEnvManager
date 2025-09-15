import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as child_process from 'child_process';

// Constantes de segurança
const MAX_FILE_SIZE = 1024 * 1024; // 1MB
const GIT_TIMEOUT = 5000;

const ENV_TYPES = [
    { label: '.env.example', description: 'Arquivo template padrão' },
    { label: '.env.development', description: 'Ambiente de desenvolvimento' },
    { label: '.env.staging', description: 'Ambiente de homologação/teste' },
    { label: '.env.production', description: 'Ambiente de produção' },
    { label: '.env.test', description: 'Ambiente de testes automatizados' },
    { label: '.env.local', description: 'Configurações locais (não commitado)' },
    { label: '.env.docker', description: 'Para containers Docker' },
    { label: '.env.preview', description: 'Para deploys de preview' },
    { label: 'Personalizado...', description: 'Digite um nome personalizado' }
];

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('dotenv-manager.generateExample', async (uri: vscode.Uri) => {
        try {
            let envFilePath: string;

            if (uri && uri.fsPath) {
                envFilePath = uri.fsPath;
            } else {
                const activeEditor = vscode.window.activeTextEditor;
                if (!activeEditor) {
                    vscode.window.showErrorMessage('Nenhum arquivo .env selecionado ou aberto.');
                    return;
                }
                envFilePath = activeEditor.document.fileName;
            }

            if (!envFilePath.endsWith('.env')) {
                vscode.window.showErrorMessage('Por favor, selecione um arquivo .env válido.');
                return;
            }

            // Validação de segurança do path
            if (!isSecurePath(envFilePath)) {
                vscode.window.showErrorMessage('Caminho de arquivo não seguro.');
                return;
            }

            await showEnvTypeSelector(envFilePath);
        } catch (error) {
            vscode.window.showErrorMessage(`Erro ao gerar arquivo .env: ${error}`);
        }
    });

    context.subscriptions.push(disposable);
}

async function showEnvTypeSelector(envFilePath: string): Promise<void> {
    const selectedType = await vscode.window.showQuickPick(ENV_TYPES, {
        placeHolder: 'Selecione o tipo de arquivo .env para gerar',
        matchOnDescription: true
    });

    if (!selectedType) {
        return;
    }

    let fileName: string;

    if (selectedType.label === 'Personalizado...') {
        const customName = await vscode.window.showInputBox({
            prompt: 'Digite o nome do arquivo (ex: .env.custom, .env.dev-joao)',
            placeHolder: '.env.custom',
            validateInput: (value: string) => {
                if (!value) {
                    return 'Nome não pode estar vazio';
                }
                if (!value.startsWith('.env')) {
                    return 'Nome deve começar com .env';
                }
                if (value === '.env') {
                    return 'Use um sufixo (ex: .env.custom)';
                }
                return null;
            }
        });

        if (!customName) {
            return;
        }
        fileName = customName;
    } else {
        fileName = selectedType.label;
    }

    await generateEnvFile(envFilePath, fileName);
}

async function getGitAuthor(workspaceRoot: string): Promise<string> {
    try {
        // Verificar se é um repositório Git válido
        if (!fs.existsSync(path.join(workspaceRoot, '.git'))) {
            return 'Usuário';
        }

        // Validar o workspace root
        if (!isSecurePath(workspaceRoot)) {
            return 'Usuário';
        }

        const result = child_process.execSync('git config user.name', { 
            cwd: workspaceRoot, 
            encoding: 'utf8',
            timeout: GIT_TIMEOUT 
        });
        return result.trim();
    } catch (error) {
        return 'Usuário';
    }
}

function getCurrentDate(): string {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
}

async function generateEnvFile(envFilePath: string, targetFileName: string): Promise<void> {
    try {
        if (!fs.existsSync(envFilePath)) {
            vscode.window.showErrorMessage('Arquivo .env não encontrado.');
            return;
        }

        // Validação de tamanho do arquivo
        const stats = fs.statSync(envFilePath);
        if (stats.size > MAX_FILE_SIZE) {
            vscode.window.showErrorMessage(`Arquivo muito grande. Máximo permitido: ${MAX_FILE_SIZE / 1024}KB`);
            return;
        }

        // Validação de nome do arquivo alvo
        if (!isValidEnvFileName(targetFileName)) {
            vscode.window.showErrorMessage('Nome de arquivo não válido.');
            return;
        }

        const envContent = readFileWithValidation(envFilePath);
        
        // Obter informações do workspace e Git
        const envDir = path.dirname(envFilePath);
        const workspaceRoot = vscode.workspace.getWorkspaceFolder(vscode.Uri.file(envFilePath))?.uri.fsPath || envDir;
        const gitAuthor = await getGitAuthor(workspaceRoot);
        const currentDate = getCurrentDate();
        
        const processedContent = parseEnvToExample(envContent, targetFileName, gitAuthor, currentDate);
        
        const targetFilePath = path.join(envDir, targetFileName);

        if (fs.existsSync(targetFilePath)) {
            const overwrite = await vscode.window.showWarningMessage(
                `O arquivo ${targetFileName} já existe. Deseja sobrescrever?`,
                'Sim',
                'Não'
            );
            
            if (overwrite !== 'Sim') {
                return;
            }
        }

        fs.writeFileSync(targetFilePath, processedContent);
        
        vscode.window.showInformationMessage(`Arquivo ${targetFileName} gerado com sucesso!`);
        
        const openFile = await vscode.window.showInformationMessage(
            `Deseja abrir o arquivo ${targetFileName}?`,
            'Sim',
            'Não'
        );
        
        if (openFile === 'Sim') {
            const document = await vscode.workspace.openTextDocument(targetFilePath);
            await vscode.window.showTextDocument(document);
        }
    } catch (error) {
        throw new Error(`Falha ao processar arquivo: ${error}`);
    }
}

function parseEnvToExample(content: string, targetFileName: string, gitAuthor: string, currentDate: string): string {
    const lines = content.split('\n');
    const exampleLines: string[] = [];

    // Adicionar cabeçalho com informações do arquivo
    const envType = getEnvTypeDescription(targetFileName);
    exampleLines.push(`# ${targetFileName}`);
    exampleLines.push(`# ${envType}`);
    exampleLines.push(`# Gerado automaticamente a partir do arquivo .env`);
    exampleLines.push(`# Autor: ${gitAuthor}`);
    exampleLines.push(`# Data: ${currentDate}`);
    exampleLines.push('');

    for (const line of lines) {
        const trimmedLine = line.trim();
        
        if (trimmedLine === '' || trimmedLine.startsWith('#')) {
            exampleLines.push(line);
        } else if (trimmedLine.includes('=')) {
            const [key, ...valueParts] = trimmedLine.split('=');
            const cleanKey = key.trim();
            
            if (cleanKey) {
                const originalValue = valueParts.join('=').trim();
                let exampleValue = '';
                
                if (originalValue.startsWith('"') && originalValue.endsWith('"')) {
                    exampleValue = '""';
                } else if (originalValue.startsWith("'") && originalValue.endsWith("'")) {
                    exampleValue = "''";
                } else if (originalValue.toLowerCase() === 'true' || originalValue.toLowerCase() === 'false') {
                    exampleValue = 'true';
                } else if (!isNaN(Number(originalValue)) && originalValue !== '') {
                    exampleValue = '0';
                } else if (originalValue.includes('://')) {
                    exampleValue = 'https://example.com';
                } else if (originalValue.includes('@')) {
                    exampleValue = 'user@example.com';
                } else if (originalValue.includes('.')) {
                    exampleValue = 'example.com';
                } else {
                    exampleValue = '';
                }
                
                exampleLines.push(`${cleanKey}=${exampleValue}`);
            }
        } else {
            exampleLines.push(line);
        }
    }

    return exampleLines.join('\n');
}

function getEnvTypeDescription(fileName: string): string {
    const descriptions: { [key: string]: string } = {
        '.env.example': 'Arquivo template padrão',
        '.env.development': 'Configurações para ambiente de desenvolvimento',
        '.env.staging': 'Configurações para ambiente de homologação/teste',
        '.env.production': 'Configurações para ambiente de produção',
        '.env.test': 'Configurações para testes automatizados',
        '.env.local': 'Configurações locais (não commitado)',
        '.env.docker': 'Configurações para containers Docker',
        '.env.preview': 'Configurações para deploys de preview'
    };

    return descriptions[fileName] || 'Configurações personalizadas';
}

// Funções de segurança
function isSecurePath(filePath: string): boolean {
    try {
        const normalizedPath = path.normalize(filePath);
        const resolvedPath = path.resolve(normalizedPath);
        
        // Verificar se não contém path traversal
        if (normalizedPath.includes('..') || normalizedPath.includes('~')) {
            return false;
        }
        
        // Verificar se é um caminho absoluto válido
        if (!path.isAbsolute(resolvedPath)) {
            return false;
        }
        
        return true;
    } catch (error) {
        return false;
    }
}

function isValidEnvFileName(fileName: string): boolean {
    // Verificar se começa com .env
    if (!fileName.startsWith('.env')) {
        return false;
    }
    
    // Verificar caracteres perigosos
    const dangerousChars = /[<>:"|?*\x00-\x1f]/;
    if (dangerousChars.test(fileName)) {
        return false;
    }
    
    // Verificar nomes reservados do Windows
    const reservedNames = ['CON', 'PRN', 'AUX', 'NUL', 'COM1', 'COM2', 'COM3', 'COM4', 'COM5', 'COM6', 'COM7', 'COM8', 'COM9', 'LPT1', 'LPT2', 'LPT3', 'LPT4', 'LPT5', 'LPT6', 'LPT7', 'LPT8', 'LPT9'];
    const baseFileName = path.basename(fileName, path.extname(fileName)).toUpperCase();
    if (reservedNames.includes(baseFileName)) {
        return false;
    }
    
    // Verificar comprimento
    if (fileName.length > 255) {
        return false;
    }
    
    return true;
}

function readFileWithValidation(filePath: string): string {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            throw new Error('Arquivo não encontrado');
        } else if (error.code === 'EACCES') {
            throw new Error('Sem permissão para ler o arquivo');
        } else if (error.code === 'EISDIR') {
            throw new Error('O caminho especificado é um diretório');
        } else {
            throw new Error('Erro ao ler arquivo: codificação inválida ou arquivo corrompido');
        }
    }
}

export function deactivate() {}