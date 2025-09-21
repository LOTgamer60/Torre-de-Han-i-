// --- Definição das variáveis de estado do jogo ---
let discos; // Número de discos a serem usados no jogo
let pino1 = [];
let pino2 = [];
let pino3 = [];
let pinos = [pino1, pino2, pino3]; // Array de pinos para fácil acesso
let movimentos = 0; // Contador de movimentos

// --- Configuração inicial do jogo ---
function iniciarJogo(numDiscos) {
  discos = numDiscos;
  movimentos = 0;
  
  // Limpa os pinos
  pino1.length = 0;
  pino2.length = 0;
  pino3.length = 0;
  
  // Preenche o primeiro pino com discos (representados por números)
  for (let i = discos; i >= 1; i--) {
    pino1.push(i);
  }
}

// --- Funções de exibição ---
function exibirPinos() {
  console.log("\n--- Estado Atual do Jogo ---");
  console.log("Movimentos: " + movimentos);
  console.log("Pino 1:", pino1.map(d => '|' + '-'.repeat(d * 2) + '|').join(' '));
  console.log("Pino 2:", pino2.map(d => '|' + '-'.repeat(d * 2) + '|').join(' '));
  console.log("Pino 3:", pino3.map(d => '|' + '-'.repeat(d * 2) + '|').join(' '));
  console.log("---------------------------\n");
}

// --- Lógica do jogo ---
function moverDisco(pinoOrigem, pinoDestino) {
  // Converte a entrada do usuário (1, 2 ou 3) para índices de array (0, 1 ou 2)
  const origem = pinos[pinoOrigem - 1];
  const destino = pinos[pinoDestino - 1];

  // Regra 1: O pino de origem não pode estar vazio
  if (origem.length === 0) {
    console.log("Erro: O pino de origem está vazio. Escolha outro pino.");
    return false;
  }

  const discoParaMover = origem[origem.length - 1]; // Pega o disco do topo

  // Regra 2: Um disco maior não pode ser colocado em cima de um menor
  if (destino.length > 0 && discoParaMover > destino[destino.length - 1]) {
    console.log("Erro: Não é possível colocar um disco maior em cima de um menor.");
    return false;
  }

  // Se as regras forem seguidas, move o disco
  destino.push(origem.pop());
  movimentos++;
  return true;
}

function verificarVitoria() {
  // A vitória é alcançada quando todos os discos estão no pino 3
  return pino3.length === discos;
}

// --- Função principal (laço do jogo) ---
function jogar() {
  // A biblioteca 'prompt-sync' é usada para capturar a entrada do usuário no terminal.
  // Você pode instalá-la com o comando: npm install prompt-sync
  const prompt = require('prompt-sync')();

  // Permite ao usuário escolher o número de discos no início
  let numDiscos = parseInt(prompt("Com quantos discos você quer jogar a Torre de Hanói? "));
  if (isNaN(numDiscos) || numDiscos < 1) {
    console.log("Número de discos inválido. O jogo será iniciado com 3 discos.");
    numDiscos = 3;
  }
  
  iniciarJogo(numDiscos);
  exibirPinos();

  // Loop principal do jogo
  while (!verificarVitoria()) {
    console.log("Escolha um movimento:");
    const origem = parseInt(prompt("Mover de qual pino? (1, 2 ou 3): "));
    const destino = parseInt(prompt("Mover para qual pino? (1, 2 ou 3): "));

    if (moverDisco(origem, destino)) {
      exibirPinos();
    }
  }

  console.log("--- Parabéns! Você venceu o jogo! ---");
  console.log("Você moveu todos os " + discos + " discos do Pino 1 para o Pino 3.");
  console.log("Número total de movimentos: " + movimentos);
}

// --- Inicia o jogo ---
jogar();