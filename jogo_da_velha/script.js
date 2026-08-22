const elementoTabuleiro=document.getElementById("tabuleiro");
const elementoStatus=document.getElementById("status");
// vetor de celulas
const celulas=document.querySelectorAll(".celula");
let tabuleiro=["","","","","","","","",""];

let jogadorHumano="X";
let jogadorIA="O";
let jogoAtivo=true;
celulas.forEach(celula => {
    celula.addEventListener("click",clicarCelula);    
});

function clicarCelula(evento){
    const celulaClicada=evento.target;
    const indice=celulaClicada.getAttribute("data-indice");
    // impede de clicar em uma celula ja ocupada
    if(!jogoAtivo || tabuleiro[indice]!=""){
        return;
    }
    fazerJogada(indice,jogadorHumano);
    if(verificarVitoria(tabuleiro,jogadorHumano)){
        elementoStatus.textContent="voce ganhou";
        jogoAtivo=false;
        return;
    }
    if(verificarEmpate(tabuleiro)){
        elementoStatus.textContent="empate";
        jogoAtivo=false;
        return;
    }
    elementoStatus.textContent="vez da ia";
    jogarIA();
}

function fazerJogada(indice,jogador){
    tabuleiro[indice]=jogador;
    
    celulas[indice].textContent=jogador;
}
// posiçoes de trinca no tabuleiro
const combinacoesVitoria=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

function verificarVitoria(tabuleiroAtual,jogador){
    // some equivale a OU , every equivale a E
    // percorre o vetor combinaçoes e se pelo menos uma for verdadeira retorna true
    return combinacoesVitoria.some(combinacao => {
    //  percore a combinação e verifica se todos sao iguais e retorna true
        return combinacao.every(indice => tabuleiroAtual[indice]===jogador);
    });
}

function jogarIA(){
    if(!jogoAtivo) return;

    const melhorJogada=encontrarMelhorJogada(tabuleiro);
    fazerJogada(melhorJogada,jogadorIA);
    if(verificarVitoria(tabuleiro,jogadorIA)){
        elementoStatus.textContent="IA venceu";
        jogoAtivo=false;
        return;

    }
    if(verificarEmpate(tabuleiro)){
        elementoStatus.textContent="empate";
        jogoAtivo=false;
        return;
    }
    elementoStatus.textContent="sua vez";

}
function encontrarMelhorJogada(tabuleiroAtual){
    let melhorPontuacao=-Infinity;
    let melhorJogada=null;
    for(let i=0;i<tabuleiroAtual.length;i++){
        // joga so se a posiçao estiver vazia
        if(tabuleiroAtual[i]===""){
            tabuleiroAtual[i]=jogadorIA;
            // minmax atribui +1 e -1 para a IA percorrer o melhor caminho
            // 0 o inicio da arvore
            let pontuacao=minmax(tabuleiroAtual,0,false);
            tabuleiroAtual[i]="";
            if(pontuacao>melhorPontuacao){
                melhorPontuacao=pontuacao;
                melhorJogada=i;
            }
        }
    }
    return melhorJogada;
}
function verificarEmpate(tabuleiroAtual){
    // se nenhuma celula esta vazia e ninguem venceu deu velha
    return tabuleiroAtual.every(celula => celula !== "");
}
function minmax(tabuleiroAtual,profundidade, maximizando){
    if(verificarVitoria(tabuleiroAtual,jogadorIA)){
        return 10-profundidade; //pontuaçao, a ia vai usar para jogar na maior sempre
    }
    if(verificarVitoria(tabuleiroAtual,jogadorHumano)){
        return profundidade-10;//vitoria do humano
    }
    if(verificarEmpate(tabuleiroAtual)) return 0;

    // simulaçao de jogadas do humano
    if(maximizando){
        let melhorPontuacao=-Infinity;
        for(let i=0; i<tabuleiroAtual.length;i++){
            if(tabuleiroAtual[i]===''){
                tabuleiroAtual[i]=jogadorIA;
                // recursividade
                let pontuacao=minmax(tabuleiroAtual,profundidade+1,false);
                tabuleiroAtual[i]='';
                melhorPontuacao=Math.max(pontuacao,melhorPontuacao);
            }
        }
        return melhorPontuacao;
    }else{ //minimizando
        let melhorPontuacao=Infinity;
        for(let i=0; i<tabuleiroAtual.length;i++){
            if(tabuleiroAtual[i]===''){
                tabuleiroAtual[i]=jogadorHumano;
                let pontuacao=minmax(tabuleiroAtual,profundidade+1,true);
                tabuleiroAtual[i]='';
                melhorPontuacao=Math.min(pontuacao,melhorPontuacao);
            }
        }
        return melhorPontuacao;
    }
}