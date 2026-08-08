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
        // 
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
function vizinhanca(){
    let x=caoColuna;
    let y=caoLinha;
    let x1=casaColuna;
    let y1=casaLinha;
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
        let dist=Math.sqrt((x1-x)**2+(y1-y)**2);
        document.getElementById(y+","+x).innerHTML=dist;
    }
}

criarTabela();
posicionarImagens();
botao.addEventListener("click", vizinhanca);
    

