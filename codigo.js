const tamanho = 15;

const estadoDoJogo = {
    cobra: [
        {x: 7, y: 7},
        {x: 6, y: 7},
        {x: 5, y: 7}
    ],
    comida: {x: 10, y: 10},
    direcao: "direita",
    proximaDirecao: "direita",
    pontos: 0,
    melhorPontuacao: localStorage.getItem("melhorPontuacaoSnake") || 0,
    jogoAcabou: false,
    velocidade: 200,
    jogoPausado: false
};

function tocarSomGameOver() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(120, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
        oscillator.connect(gainNode).connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.3);
    } catch (e) {}
}

function criarTabuleiro() {
    const tabuleiro = document.getElementById("gameBoard");
    tabuleiro.style.gridTemplateColumns = `repeat(${tamanho}, 1fr)`;
    tabuleiro.style.gridTemplateRows = `repeat(${tamanho}, 1fr)`;

    const celulasAntigas = tabuleiro.querySelectorAll('.cell');
    celulasAntigas.forEach(c => c.remove());

    for (let i = 0; i < tamanho * tamanho; i++) {
        const celula = document.createElement("div");
        celula.classList.add("cell");
        tabuleiro.appendChild(celula);
    }
}

function configurarControles() {
    document.addEventListener("keydown", tecla => {
        if (tecla.key === "ArrowUp" && estadoDoJogo.direcao !== "baixo") estadoDoJogo.proximaDirecao = "cima";
        if (tecla.key === "ArrowDown" && estadoDoJogo.direcao !== "cima") estadoDoJogo.proximaDirecao = "baixo";
        if (tecla.key === "ArrowLeft" && estadoDoJogo.direcao !== "direita") estadoDoJogo.proximaDirecao = "esquerda";
        if (tecla.key === "ArrowRight" && estadoDoJogo.direcao !== "esquerda") estadoDoJogo.proximaDirecao = "direita";
        if (tecla.key === " ") togglePause();
    });

    document.getElementById("restartBtn").onclick = reiniciarJogo;
}

function carregarMelhorPontuacao() {
    document.getElementById("bestScore").textContent = estadoDoJogo.melhorPontuacao;
}

function iniciarJogo() {
    criarTabuleiro();
    configurarControles();
    carregarMelhorPontuacao();
    gerarNovaComida();
    loopDoJogo();
}

function loopDoJogo() {
    if (!estadoDoJogo.jogoAcabou && !estadoDoJogo.jogoPausado) {
        atualizar();
        desenhar();
        setTimeout(loopDoJogo, estadoDoJogo.velocidade);
    }
}

function atualizar() {
    estadoDoJogo.direcao = estadoDoJogo.proximaDirecao;

    const cabeca = {...estadoDoJogo.cobra[0]};

    if (estadoDoJogo.direcao === "cima") cabeca.y--;
    if (estadoDoJogo.direcao === "baixo") cabeca.y++;
    if (estadoDoJogo.direcao === "esquerda") cabeca.x--;
    if (estadoDoJogo.direcao === "direita") cabeca.x++;

    if (cabeca.x < 0 || cabeca.x >= tamanho || cabeca.y < 0 || cabeca.y >= tamanho) return finalizarJogo();

    for (let i = 1; i < estadoDoJogo.cobra.length; i++) {
        let parte = estadoDoJogo.cobra[i];
        if (parte.x === cabeca.x && parte.y === cabeca.y) return finalizarJogo();
    }

    estadoDoJogo.cobra.unshift(cabeca);

    if (cabeca.x === estadoDoJogo.comida.x && cabeca.y === estadoDoJogo.comida.y) {
        estadoDoJogo.pontos++;
        document.getElementById("score").textContent = estadoDoJogo.pontos;
        gerarNovaComida();

        if (estadoDoJogo.pontos % 5 === 0 && estadoDoJogo.velocidade > 50) {
            estadoDoJogo.velocidade -= 20;
        }

    } else {
        estadoDoJogo.cobra.pop();
    }
}

function gerarNovaComida() {
    let novaComida;

    while (true) {
        novaComida = {
            x: Math.floor(Math.random() * tamanho),
            y: Math.floor(Math.random() * tamanho)
        };

        if (!estadoDoJogo.cobra.some(p => p.x === novaComida.x && p.y === novaComida.y)) break;
    }

    estadoDoJogo.comida = novaComida;
}

function desenhar() {
    const celulas = document.querySelectorAll("#gameBoard .cell");

    celulas.forEach(c => c.className = "cell");

    estadoDoJogo.cobra.forEach(parte => {
        const index = parte.y * tamanho + parte.x;
        if (celulas[index]) celulas[index].classList.add("snake");
    });

    const comidaIndex = estadoDoJogo.comida.y * tamanho + estadoDoJogo.comida.x;
    if (celulas[comidaIndex]) celulas[comidaIndex].classList.add("food");
}

function togglePause() {
    if (!estadoDoJogo.jogoAcabou) {
        estadoDoJogo.jogoPausado = !estadoDoJogo.jogoPausado;

        if (estadoDoJogo.jogoPausado) {
            document.getElementById("status").textContent = "PAUSADO. Pressione Espaço para continuar.";
        } else {
            document.getElementById("status").textContent = "Jogo em andamento...";
            loopDoJogo();
        }
    }
}

function finalizarJogo() {
    estadoDoJogo.jogoAcabou = true;
    tocarSomGameOver();
    document.getElementById("gameOverMessage").style.display = "block"; 
    document.getElementById("status").textContent = "JOGO ENCERRADO!"; 

    if (estadoDoJogo.pontos > estadoDoJogo.melhorPontuacao) {
        localStorage.setItem("melhorPontuacaoSnake", estadoDoJogo.pontos);
        estadoDoJogo.melhorPontuacao = estadoDoJogo.pontos;
        carregarMelhorPontuacao();
    }
}

function reiniciarJogo() {
    estadoDoJogo.cobra = [
        {x: 7, y: 7},
        {x: 6, y: 7},
        {x: 5, y: 7}
    ];
    estadoDoJogo.direcao = "direita";
    estadoDoJogo.proximaDirecao = "direita";
    estadoDoJogo.pontos = 0;
    estadoDoJogo.jogoAcabou = false;
    estadoDoJogo.jogoPausado = false;
    estadoDoJogo.velocidade = 200;

    document.getElementById("gameOverMessage").style.display = "none";
    document.getElementById("score").textContent = 0;
    document.getElementById("status").textContent = "Jogo em andamento...";

    estadoDoJogo.melhorPontuacao = localStorage.getItem("melhorPontuacaoSnake") || 0;
    carregarMelhorPontuacao();

    gerarNovaComida();
    loopDoJogo();
}

document.getElementById("btnIniciar").onclick = () => {
    document.getElementById("menuInicial").style.display = "none";
    document.getElementById("jogoContainer").style.display = "block";
    iniciarJogo();
};
