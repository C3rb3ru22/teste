//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2 ;

//velocidade da bolinha
let velocidadeXBolinha = 7;
let velocidadeYBolinha = 8;
let raqueteComprimento = 10;
let raqueteAltura = 110;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceErro = 0;

const VELOCIDADE = 10;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}


function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete, false);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente, true);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  // xBolinha += velocidadeXBolinha;
  // yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio> width ||
     xBolinha - raio< 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio> height ||
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y){
  rect(x, y, raqueteComprimento, 
      raqueteAltura, 50);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= VELOCIDADE;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += VELOCIDADE;
  }
}

// function verificaColisaoRaquete(){
//   if (xBolinha - raio < xRaquete + raqueteComprimento && 
//       yBolinha - raio < yRaquete + raqueteAltura && 
//       yBolinha + raio > yRaquete){
//     velocidadeXBolinha *= -1;
//   }
// }

function verificaColisaoRaquete(x, y, ladoDireito) {
  const precisaChecar = ladoDireito && velocidadeXBolinha > 0 || (!ladoDireito && velocidadeXBolinha < 0);
  
  if (!precisaChecar) return;
  
  colidiu = collideRectCircle(x, y,raqueteComprimento,raqueteAltura,xBolinha,yBolinha,raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceErro
  calculaChanceErro()
}

function calculaChanceErro() {
  if (pontosDoOponente >= meusPontos) {
    chanceErro += 1
    if (chanceErro >= 39){
    chanceErro = 40
    }
  } else {
    chanceErro -= 1
    if (chanceErro <= 35){
    chanceErro = 35
    }
  }
}

function incluiPlacar(){
  fill(225, 140, 0)
  rect(135, 157, 30, 50, 20);
  rect(435, 157, 30, 50, 20);
  textSize(50);
  textAlign(CENTER)
  fill(255);
  text(meusPontos, 150, 200);
  text(pontosDoOponente, 450, 200)
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
  }
}



