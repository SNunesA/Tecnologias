/*
const corpo = document.getElementById("tabela");
const cao=new Image();
cao.src="img/gato.png";
const casa=new Image();
casa.src="img/caixa.png";

const l=10;
const c=10;
let vetComandos=[];
const esperar= (ms) => new Promise(resolve => setTimeout(resolve,ms));

let caoLinha= Math.floor(Math.random() * (l/2 - 0 + 1)) + 0;
let caoColuna = Math.floor(Math.random() * ((c-1) - 0 + 1)) + 0;
let casaLinha= Math.floor(Math.random() * ((l-1) - l/2 + 1)) + l/2;
let casaColuna = Math.floor(Math.random() * ((c-1) - 0 + 1)) + 0;
let linhaAtual=caoLinha;
let colunaAtual=caoColuna;
let passo=0;
let botao=document.getElementById("vizinho");
// pata
let linhaPata=linhaAtual;
let colunaPata=colunaAtual;

let obs=new Image();

function criarTabela(){
    const tabela = document.createElement("table");
    tabela.style.setProperty("--linhas", l);
    for(let i=0;i<l;i++){
        const linha=document.createElement("tr");
        for(let j=0;j<c;j++){
            const coluna = document.createElement("td");
            coluna.setAttribute("id",i+","+j);
            linha.appendChild(coluna);
        }
        
        tabela.appendChild(linha);
    }
    corpo.appendChild(tabela);
}
function posicionarImagens(){
    document.getElementById(caoLinha+","+caoColuna).appendChild(cao);
    document.getElementById(casaLinha+","+casaColuna).appendChild(casa);

    
    for(let i=0;i<10;i++){
        let obs=new Image();
        obs.className="obs";
        num=Math.floor(Math.random() *3)+1;
        switch(num){
            case 1:
               
                obs.src="img/cacto.png";
                break;
            case 2:
                obs.src="img/aspirador.png";
                break;
            case 3:
                obs.src="img/agua.png";
        }
        let linhaObs=Math.floor(Math.random() * (l/2 - 0 + 1)) + 0;
        let colunaObs=Math.floor(Math.random() * ((c-1) - 0 + 1)) + 0;
        document.getElementById(linhaObs+","+colunaObs).appendChild(obs);

    }
}


async function seguirCaminho(){
    for(let comando of vetComandos){
        // direçao
        let dir=comando[1];
        // maximo de passos tem que dar
        let iMax=comando[2] ;
        if(comando[0]==1){
            passo=1;
        }else{
            passo=comando[2];
            iMax=1;
        }

    
        for(let i=0; i<iMax;i++){
            linhaPata=linhaAtual;
            colunaPata=colunaAtual;
            switch(dir){
                case 1:
                    linhaAtual-=passo;
                    break;
                case 2:
                    linhaAtual+=passo;
                    break;
                case 3:
                    colunaAtual+=passo;
                    break;
                case 4:
                    colunaAtual-=passo;
                    
                }
            document.getElementById(linhaAtual+","+colunaAtual).appendChild(cao);
            document.getElementById(linhaPata+","+colunaPata).innerHTML="<img src='/img/pata.png'>";
            await esperar(1000);
        }
    }
    // apaga o vetor acumulado dos comandos da tela
    vetComandos=[] 
    
    if(linhaAtual==casaLinha && colunaAtual==casaColuna){
        document.getElementById("parabens").innerHTML="Parabéns, o gato chegou na caixa!"
    }
}
function inserirComandos(){
    const e=parseInt(document.getElementById("evento").value);
    const d=parseInt(document.getElementById("direcao").value);
    const c=parseInt(document.getElementById("casas").value);

    if (!e || !d || !c ){
        alert("Por favor, preencha todas informações");
        return;
    }
    const cmd=document.getElementById("comandos");
    vetComandos.push([e,d,c]);
    

}
// reconhecer os vizinhos do gato, calcula a distancia da caixa de todos e o que for menor ele executa
async function vizinhanca(){
    while(linhaAtual!=casaLinha || colunaAtual!=casaColuna){
        let x=colunaAtual;
        let y=linhaAtual;
        let x1=casaColuna;
        let y1=casaLinha;

        let aux = c+l; //c numero de colunas
        let vetAux = [];

        let vetVizinhos=[
            [x,y-1],
            [x+1,y-1],
            [x+1,y],
            [x+1,y+1],
            [x,y+1],
            [x-1,y+1],
            [x-1,y],
            [x-1,y-1] ];

        for(let i=0;i<vetVizinhos.length;i++){
            [x,y]=vetVizinhos[i];
            let v=document.getElementById((y+","+x));
            // esse if serve para verificar quando o gato estiver nos cantos
            if(v){
                let dist=Math.sqrt((x1-x)**2+(y1-y)**2);
                // v.innerHTML+=dist;
                if(dist<aux){
                    aux=dist;
                    vetAux=[x,y];
                }
            }
            
        }

        linhaPata=linhaAtual;
        colunaPata=colunaAtual;
        colunaAtual=vetAux[0];
        linhaAtual=vetAux[1];
        document.getElementById(linhaAtual+","+colunaAtual).appendChild(cao);
        document.getElementById(linhaPata+","+colunaPata).innerHTML="<img src='/img/pata.png'>";
        await esperar(500);

    }
    
    document.getElementById("parabens").innerHTML="Parabéns, o gato chegou na caixa!"
    
   
}
    */
// nao usar o codigo do prof abaixo
const corpo = document.getElementById("tabela");
const cao=new Image();
cao.src="img/gato.png";
const casa=new Image();
casa.src="img/caixa.png";

const l=10;
const c=10;
let vetComandos=[];
const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));
let caoLinha= Math.floor(Math.random() * (l/2 - 0 + 1)) + 0;
let caoColuna = Math.floor(Math.random() * ((c-1) - 0 + 1)) + 0;
let casaLinha= Math.floor(Math.random() * ((l-1) - l/2 + 1)) + l/2;
let casaColuna = Math.floor(Math.random() * ((c-1) - 0 + 1)) + 0;
let posCao;
let posCasa;
let passo=0;
let botao=document.getElementById("legal");
function criarTabela(){
   const tabela = document.createElement("table");
    tabela.style.setProperty("--linhas", l);
   for(let i=0;i<l;i++){
       const linha=document.createElement("tr");
       for(let j=0;j<c;j++){
           const coluna = document.createElement("td");
           coluna.setAttribute("id",i+","+j);
           linha.appendChild(coluna);
       }
       tabela.appendChild(linha);
   }
   corpo.appendChild(tabela);
}
function posicionarImagens(){
     posCao=document.getElementById(caoLinha+","+caoColuna);
     posCasa=document.getElementById(casaLinha+","+casaColuna);
     posCao.appendChild(cao);
     posCasa.appendChild(casa);
    for(let i=0;i<20;i++){
        const buraco=new Image();
        buraco.src="img/cacto.png";
        buraco.className="buraco";
        do{
            buracoLinha= Math.floor(Math.random() * (l-1 - 0 + 1) + 0);
            buracoColuna = Math.floor(Math.random() * (c-1 - 0 + 1) + 0);
            posBuraco=document.getElementById(buracoLinha+","+buracoColuna);
        }while((posCasa === posBuraco) || (posCao===posBuraco));
        posBuraco.appendChild(buraco);
    }
    }
    /*
botao.addEventListener("click", seguirCaminhoVizinha);
function vizinhanca(){
    let [x,y]=posCao.id.split(",").map(Number);
    let [x1,y1]=posCasa.id.split(",").map(Number);
   let vetVizinhos=[
        [x,y-1],
        [x+1,y-1],
        [x+1,y],
        [x+1,y+1],
        [x,y+1],
        [x-1,y+1],
        [x-1,y],
        [x-1,y-1]
        ];
  let menor=c+l;
  let menorElemento="";
    let v="";
   for(let i=0;i<vetVizinhos.length;i++){
       [x,y]=vetVizinhos[i];
       v=document.getElementById(x+","+y);
       if(v && v.querySelector('img')?.className!=='buraco') {
           let dist = Math.sqrt((x1 - x) ** 2 + (y1 - y) ** 2);
           if(dist < menor){
               menor=dist;
               menorElemento=document.getElementById(x+","+y);
           }

       }

   }
    menorElemento.style.background = "cyan";
   return menorElemento;

}
async function seguirCaminhoVizinha(){
    let casa=document.getElementById(casaLinha+","+casaColuna);
    let menor;
    do {
        menor = vizinhanca();
        menor.appendChild(cao);
        posCao=menor;
        await esperar(1000);
    }while(menor!==casa);
    document.getElementById("comandos").innerHTML="<h1> Chegou ao destino</h1>";
}
async function seguirCaminho(){
    let novaLinha=0;
    let novaColuna=0;

    for(let comando of vetComandos){
        let dir = comando[1];
        let iMax= comando[2];
        if(comando[0]==1)
            passo=1;
        else{
            passo=comando[2];
            iMax=1;
        }
       for(let i=0;i<iMax;i++) {
           switch (dir) {
               case 1:
                   novaLinha = linhaAtual - passo;
                   novaColuna = colunaAtual;
                   break
               case 2:
                   novaLinha = linhaAtual + passo;
                   novaColuna = colunaAtual;
                   break;
               case 3:
                   novaLinha = linhaAtual;
                   novaColuna = colunaAtual + passo;
                   break;
               case 4:
                   novaLinha = linhaAtual;
                   novaColuna = colunaAtual - passo;
                   break;
           }
           document.getElementById(novaLinha + "," + novaColuna).appendChild(cao);
           linhaAtual = novaLinha;
           colunaAtual = novaColuna;
           await esperar(1000);
       }
    }
    if(linhaAtual==casaLinha && colunaAtual==casaColuna){
        document.getElementById("comandos").innerHTML="<h1> Chegou ao destino</h1>";
    }
    else{
        document.getElementById("comandos").innerHTML="<h1> Não chegou ao destino</h1>";
    }
}
function inserirComandos(){
  const e=parseInt(document.getElementById("evento").value);
  const d=parseInt(document.getElementById("direcao").value);
  const c=parseInt(document.getElementById("casas").value);

    if (!e || !d || !c ){
        alert("Por favor, preencha todas informações");
        return;
    }
  const cmd=document.getElementById("comandos");
      vetComandos.push([e,d,c]);
}
      */
    //  nao usar o codigo do prof acima
criarTabela();
posicionarImagens();

// mesma funçao do vizinhança mas otimizado
function calcularHeuristica(x1,y1,x2,y2){
    // calcula uma linha reta entre dois pontos em um plano cartesiano, o H da formula
    return Math.sqrt((x2-x1)**2+(y2-y1)**2);
}
function eValido(x,y){
    // se estiver fora da tabela ou nao existir
    if(x<0 || x>=l || y<0 || y>=c) return false;
    let celula= document.getElementById(x+","+y);
    if(!celula) return false;
    // return celula.querySelector('img')?.className!=="obs";
    return celula.querySelector('img')?.className!=="buraco";
}
// ponteiro fake, lista encadeada
function criaNo(x,y,g,h,pai=null){
    return{
        x:x,
        y:y,
        g:g,
        h:h,
        f:g+h,
        pai:pai
    }
}
async function encontraCaminhoEstrela(){
    let[inicioX,inicioY]=posCao.id.split(",").map(Number);
    let[fimX,fimY]=posCasa.id.split(",").map(Number);
    let listaAberta=[];
    let listaFechada=[];
    let hInicial=calcularHeuristica(inicioX,inicioY,fimX,fimY);
    let noInicial=criaNo(inicioX,inicioY,0,hInicial,null);
    listaAberta.push(noInicial);
    while(listaAberta.length>0){
        // ordena parecido com o buble sort
        listaAberta.sort((a,b)=>a.f-b.f);
        // shift tira o primeiro elemento da pilha
        let noAtual=listaAberta.shift();
        // if pra verificar se ja chegou na casinha
        if(noAtual.x===fimX && noAtual.y===fimY){
            console.log("Chegou ao destino");
            let caminhoFinal= reconstruirCaminho(noAtual);
            await animarCao(caminhoFinal);
            return;
        }
        listaFechada.push(noAtual);
        let direcoes=[
            [0,-1],
            [1,-1],
            [1,0],
            [1,1],
            [0,1],
            [-1,1],
            [-1,0],
            [-1,-1]
        ]
        for(let [dx,dy] of direcoes){
            let vizinhoX=noAtual.x+dx;
            let vizinhoY=noAtual.y+dy;
            if(!eValido(vizinhoX,vizinhoY))continue;
            let jaFechado=listaFechada.some(n=>n.x===vizinhoX && n.y===vizinhoY);
            if(jaFechado)continue;
            let custoPasso=Math.sqrt(dx*dx+dy*dy);
            let gVizinho=noAtual.g+custoPasso;
            let hVizinho=calcularHeuristica(vizinhoX,vizinhoY,fimX,fimY);
            // noaberta recebe o elemento html inteiro
            let noAberta=listaAberta.find((n)=>n.x===vizinhoX && n.y===vizinhoY);
            if(!noAberta){
                let novoNo=criaNo(vizinhoX,vizinhoY,gVizinho,hVizinho,noAtual);
                listaAberta.push(novoNo);
                // verificando se for menor ele salva
            }else if(gVizinho<noAberta.g){
                noAberta.g=gVizinho;
                noAberta.f=gVizinho+noAberta.h;
                noAberta.pai=noAtual;

            }
        }
    }
    console.log("nao encontrou casa");
}
// faz o gato percorrer o caminho que o drone traçou
async function animarCao(caminho) {
    for(let no of caminho){
        let celula=document.getElementById(no.x+","+no.y);
        celula.appendChild(cao);
        await esperar(500);
    }
    console.log("chegou na caixa");
}
function reconstruirCaminho(noFinal){
    let caminho=[];
    let atual=noFinal;
    while(atual != null){
        caminho.push(atual);
        atual=atual.pai;

    }
    return caminho.reverse();
}
/*
criarTabela();
posicionarImagens();
botao.addEventListener("click", vizinhanca);
  */  

