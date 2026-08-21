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
    elementoStatus.textContent="vez a ia";
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