
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
let linhaPata;
let colunaPata;

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

    let vetObs=[]
    let linhaObs=0
    let colunaObs=0
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
        
        g=caoLinha+","+caoColuna;
        x=casaLinha+","+casaColuna;
        
        do {
            linhaObs=Math.floor(Math.random() * ((l-1) - 0 + 1)) + 0;
            colunaObs=Math.floor(Math.random() * ((c-1) - 0 + 1)) + 0;
            celula=linhaObs+","+colunaObs;
        } while (vetObs.includes(celula) || celula == g || celula == x);
        vetObs.push(linhaObs+","+colunaObs);
        
        document.getElementById(linhaObs+","+colunaObs).appendChild(obs);
    }
}

function apagaVetor(){
    // apaga o vetor acumulado dos comandos da tela
    vetComandos=[];
    document.getElementById("comandos").innerHTML="";
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

        let auxL;
        let auxC;
        for(let i=0; i<iMax;i++){
            linhaPata=linhaAtual;
            colunaPata=colunaAtual;
            switch(dir){
                case 1:
                    auxL=linhaAtual-passo;
                    auxC=colunaAtual;
                    break;
                case 2:
                    auxL=linhaAtual+passo;
                    auxC=colunaAtual;
                    break;
                case 3:
                    auxL=linhaAtual;
                    auxC=colunaAtual+passo;
                    break;
                case 4:
                    auxL=linhaAtual;
                    auxC=colunaAtual-passo;
                    
                }
            
            let celula= document.getElementById(auxL+","+auxC);

            if(celula.querySelector('img')?.className=="obs"){
                console.log("obstaculo");
                apagaVetor();
                return;
            }
            linhaAtual=auxL;
            colunaAtual=auxC;
            document.getElementById(linhaAtual+","+colunaAtual).appendChild(cao);
            document.getElementById(linhaPata+","+colunaPata).innerHTML="<img src='img/pata.png'>";
            await esperar(1000);
            if(linhaAtual==casaLinha && colunaAtual==casaColuna){
                document.getElementById("parabens").innerHTML="Parabéns, o gato chegou na caixa!";
                return;
            }
        }
    }
    apagaVetor();
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
    switch(e){
        case 1:
            nome="seta"
            break;
        case 2:
            nome="pulo"        
    }
    
    for(let i=0;i<c;i++){
        let seta = new Image();
        seta.src = "img/" + nome + ".png";
        switch(d){
            case 2: 
                seta.style.transform = "rotate(180deg)";
                break;
            case 3:
                seta.style.transform = "rotate(90deg)";
                break;
            case 4:
                seta.style.transform = "rotate(270deg)";
        }
        cmd.appendChild(seta);
        
     
    }
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
        document.getElementById(linhaPata+","+colunaPata).innerHTML="<img src='img/pata.png'>";
        await esperar(500);

    }
    
    document.getElementById("parabens").innerHTML="Parabéns, o gato chegou na caixa!"
    
   
}





criarTabela();
posicionarImagens();
botao.addEventListener("click", vizinhanca);
 
