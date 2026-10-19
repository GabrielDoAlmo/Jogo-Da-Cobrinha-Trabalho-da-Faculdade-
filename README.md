# 🐍 Jogo da Cobrinha (Snake Game)

> Um clássico jogo da cobrinha desenvolvido em HTML5, CSS3 e JavaScript puro, criado como projeto académico. O jogo conta com um design moderno em grelha, placar de pontuação máxima salvo localmente, aumento progressivo de dificuldade e efeitos sonoros sintéticos.

---

## 🎮 Funcionalidades

- **Interface & Grelha Dinâmica:** Tabuleiro construído dinamicamente via CSS Grid.
- **Sistema de Pontuação (Local Storage):** Guarda a melhor pontuação do utilizador diretamente no navegador.
- **Dificuldade Progressiva:** A velocidade da cobra aumenta a cada 5 pontos acumulados.
- **Sistema de Pausa:** Permite pausar e retomar o jogo a qualquer momento utilizando a barra de espaço.
- **Efeitos Sonoros Sintéticos:** Emite um aviso sonoro de *Game Over* utilizando a API nativa `AudioContext`, sem necessidade de ficheiros de áudio externos.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** (Estrutura e marcação)
- **CSS3** (Estilização, layout em Grid e efeitos visuais)
- **JavaScript (ES6)** (Lógica do jogo, manipulação de DOM, eventos de teclado e persistência local)

---

## 📚 Arquitetura e Estudo Passo a Passo

Para demonstrar o processo de desenvolvimento e a arquitetura de software por trás do jogo, este repositório inclui a pasta `Estudo_Passo_a_Passo`. Nela, a engenharia do projeto foi dividida em 5 módulos menores que documentam a evolução da lógica base em Vanilla JavaScript:

1. **Manipulação de Arrays (Exercício 1):** Lógica matemática de movimento, crescimento virtual e sistema de colisão da cobra.
2. **Grid e Posicionamento (Exercício 2):** Compreensão de matrizes bidimensionais, limites espaciais do tabuleiro e renderização lógica.
3. **Controles e Teclado (Exercício 3):** Captura de eventos assíncronos (`keydown`) e algoritmos de prevenção contra bugs de movimentação oposta (ex: a cobra não pode ir para baixo se estiver a subir).
4. **Pontuação (Exercício 4):** Persistência de dados e recordes utilizando a API `localStorage` do navegador.
5. **Lógica Principal (Exercício 5):** Criação do *Game Loop* estruturado através do método `setTimeout`, unindo todas as mecânicas modulares.

---

## 🚀 Como Executar o Projeto

1. Faça o download ou clone este repositório para o seu computador.
2. Certifique-se de que os quatro ficheiros principais (`index.html`, `estilo.css`, `codigo.js` e `README.md`) estão na mesma pasta.
3. Faça duplo clique em **`index.html`** para abrir o jogo diretamente em qualquer navegador web moderno (Chrome, Firefox, Edge, etc.).
4. *Para analisar os módulos de desenvolvimento isolados, basta abrir os ficheiros `.html` dentro da pasta `Estudo_Passo_a_Passo`.*

---

<div align="center">
  <h3>🚀 Quer testar o jogo agora mesmo?</h3>
  
  <a href="https://gabrieldoalmo.github.io/Jogo-Da-Cobrinha-Trabalho-da-Faculdade-/" target="_blank">
    <img src="https://img.shields.io/badge/🎮%20JOGAR%20AGORA%20NO%20NAVEGADOR-0a84ff?style=for-the-badge&logoColor=white" alt="Jogar Agora" />
  </a>
</div>
