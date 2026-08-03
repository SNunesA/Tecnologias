const corpo = document.getElementById("tabela");
const cao=new Image();
cao.src="img/cao.png";
const casa=new Image();
casa.src="img/casinha.png";
const l=10;
const c=10;
let vetComandos=[];
let caoLinha= Math.floor(Math.random() * (l/2 - 0 + 1)) + 0;
let caoColuna = Math.floor(Math.random() * ((c-1) - 0 + 1)) + 0;
let casaLinha= Math.floor(Math.random() * ((l-1) - l/2 + 1)) + l/2;
let casaColuna = Math.floor(Math.random() * ((c-1) - 0 + 1)) + 0;

// pegar a posiçao do cachorro pra alterar em caminhar
let linhaAtual=caoLinha;
let colunaAtual=caoColuna;

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
function inserirComandos(){
  const e=document.getElementById("evento").value;
  const d=document.getElementById("direcao").value;
  const c=document.getElementById("casas").value;
    if (!e || !d || !c){
        alert("Por favor, preencha todas informações");
        return;
    }
  const cmd=document.getElementById("comandos");
  for(let i=0;i<c;i++){
      cmd.innerHTML+=d+",";
      vetComandos.push(d);
  }

}
const esperar= (ms) => new Promise(resolve => setTimeout(resolve,ms));

async function seguirCaminho(){
    
    for(let i=0; i<vetComandos.length; i++){
        let x=parseInt(vetComandos[i])
        switch(x){
            case 1:
                linhaAtual-=1;
                break;
            case 2:
                linhaAtual+=1;
                break;
            case 3:
                colunaAtual+=1;
                break;
            case 4:
                colunaAtual-=1;
                
            }
        document.getElementById(linhaAtual+","+colunaAtual).appendChild(cao);
        await esperar(500);
    }
    // apaga o vetor acumulado dos comandos da tela
    vetComandos=[] 
    document.getElementById("comandos").innerHTML=" "
    if(linhaAtual==casaLinha && colunaAtual==casaColuna){
        document.getElementById("parabens").innerHTML="Parabéns, o cachorro chegou na casinha!"
    }
}
// fazer uma verificação se ele chegou na casinha e dar parabens
criarTabela();
posicionarImagens();