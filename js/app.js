// Inimigos que o jogador deve evitar
var Enemy = function(x, y, speed) {
    //imagem sprite que representa graficamente o inimigo
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    // O y é na verdade a linha de tijolos que enemy está localizado [1, 2 ou 3]
    // o valor passado é recalculado para posicionar corretamente
    this.y = (y*83) - 20;
    this.speed = speed;
};

// Atualiza a posição do inimigo
// Parâmetro: dt, um delta de tempo entre ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
    if (this.x >= 505) {
      this.x = -101;
    }
};

// Trata as colisões com o player
Enemy.prototype.collision = function(){
  if(((this.x + 101 - 30 > player.x && this.x + 101 -30 < player.x + 101
        || this.x >= player.x && this.x < player.x + 101 -30))
          && this.y === player.y){

    wait(300); //efeito de uma pausa rápida antes de reiniciar
    player.reset(); //volta o jogador a sua posição inicial
    score.loseCount(); //atualiza o núm. de derrotas
  }
}

// Desenha o inimigo na tela
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Classe do jogador
var Player = function(){
  this.sprite = 'images/char-pink-girl.png';
  this.x = 202;
  this.y = 395;
  // Qual a direção o jogador irá mover?
  // (cima, baixo, direita, esquerda)
  this.direction = '';
};

// Atualiza a posição (x, y) do jogador considerando a opção
// de direção que ele escolheu, não permite que ele
// extropole o espaço do tabuleiro do jogo
Player.prototype.update = function() {

  const desloc_x = 101;
  const desloc_y = 83;
  switch (this.direction) {
    case 'cima':
      if(this.y - desloc_y < -20)
        return;
      this.y -= desloc_y;
      break;
    case 'baixo':
      if(this.y + desloc_y > 395)
        return;
      this.y += desloc_y;
      break;
    case 'direita':
      if(this.x + desloc_x > 404)
        return;
      this.x += desloc_x;
      break;
    case 'esquerda':
      if(this.x - desloc_x < 0)
        return;
      this.x -= desloc_x;
      break;
    default:
      return;
  }
  this.direction = '';
};

// Desenha o jogador na tela
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Leva o jogador para sua posição de ínicio
Player.prototype.reset = function() {
  this.x = 202;
  this.y = 395;
};

// Confere se o jogador já ganhou
Player.prototype.victory = function(){
  if(this.y === -20){
    wait(300);
    player.reset();
    score.winCount(); // Atualiza o núm. de vitórias
  }
}

// Trata a solicitação de movimento
Player.prototype.handleInput = function(keys) {
  if (keys === 'up') {
    this.direction = 'cima';
  } else if (keys === 'down') {
    this.direction = 'baixo';
  } else if (keys === 'left') {
    this.direction = 'esquerda';
  } else if (keys === 'right') {
    this.direction = 'direita';
  }
};

// Classe que gerencia o placar do jogo win x lose
var Score = function() {
  this.win = 0; // núm. de vezes que ganhou
  this.lose = 0; //núm. de vezes que perdeu
};

Score.prototype.winCount = function(){
  this.win += 1;
};

Score.prototype.loseCount = function(){
  this.lose += 1;
};

Score.prototype.update = function(){
  document.getElementById('win').innerHTML = this.win;
  document.getElementById('lose').innerHTML = this.lose;
}

let player = new Player();

let allEnemies = [
    new Enemy(200, 2, 270),
    new Enemy(2, 3, 150),
    new Enemy(100, 1, 220),
    new Enemy(390, 3, 305),
    new Enemy(250, 1, 105)
];

let score = new Score();

// Isto reconhece cliques em teclas e envia as chaves para o
// jogador. Método handleInput().
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

//Realiza uma pausa de alguns milisegundos
function wait(ms){
   var inicio = new Date().getTime();
   var fim = inicio;
   while(fim < inicio + ms) {
     fim = new Date().getTime();
  }
}
