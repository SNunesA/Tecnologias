const canvas = document.getElementById("canvas");
const pane=document.getElementById("right-pane");

canvas.width = 800;
canvas.height = 600;
const ctx = canvas.getContext("2d");
pane.appendChild(canvas);

const raio=20;
const cor="pink";
const pontos=[{x:90,y:90},
    {x:290,y:40},
    {x:366,y:187},
    {x:677,y:63},
    {x:286,y:267},
    {x:683,y:173},
    {x:74,y:285},
    {x:522,y:300},
    {x:300,y:451},
    {x:720,y:420},
];
const arestas=[
    [0,1],[1,2],[2,4],[2,7],
    [6,8],[8,7],[7,3],[7,9],[3,5],
];
function criarCidade(){
    arestas.forEach(linha =>{
        [o,d]=linha;//origem. destino
        let x1=pontos[o].x;
        let y1=pontos[o].y;
        let x2=pontos[d].x;
        let y2=pontos[d].y;
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.stroke();
        ctx.closePath();
    });
    let txt=0;
    pontos.forEach(ponto=>{
        ctx.beginPath();
        ctx.arc(ponto.x,ponto.y,raio,0,Math.PI*2);
        ctx.fillStyle=cor;
        ctx.fill();
        ctx.closePath();
        ctx.fillStyle="black";
        ctx.fillText(txt,ponto.x,ponto.y);
        txt++;
    });
}

function gerarListaVizinhos(){
    let vz=[];
    for(let i=0;i<pontos.length;i++){
        vz[i]=[];
    }
    //arestas sao as linhas que ligam o ponto origem no destino
    arestas.forEach(linha=>{
        let o=linha[0];
        let d=linha[1];
        vz[o].push(d);
        vz[d].push(o);

    });
    // console.log(vz);
    return vz;
}
function buscarMenorCaminho(origem,destino){
    let vz=gerarListaVizinhos();
    let fila=[origem];
    let visitados=[origem];
    let caminhoAnterior={};
    while(fila.length>0){
        let atual=fila.shift();//retira da fila o primeiro
        if(atual===destino){
            let caminho=[];
            let passo=destino;
            // nao tem mais passos
            while(passo!==undefined){
                caminho.unshift();//coloca na frente diferente do push que coloca no final
                passo=caminhoAnterior[passo];

            }
            return caminho;
        }
        vz[atual].forEach(vizinho=>{
            //se ele nao estiver dentro dos visitados, eu coloco ele
            if(!visitados.includes(vizinho)){
                visitados.push(vizinho);
                caminhoAnterior[vizinho]=atual;
                fila.push(vizinho);

            }
        });
    }
    return null; //caminho impossivel de ser criado
}


criarCidade();
// gerarListaVizinhos();
console.log(buscarMenorCaminho(0,6));