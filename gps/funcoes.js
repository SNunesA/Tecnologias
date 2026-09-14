const canvas = document.getElementById("canvas");
const pane=document.getElementById("right-pane");
const botao = document.getElementById("btOk");


canvas.width = 800;
canvas.height = 600;
const ctx = canvas.getContext("2d");
pane.appendChild(canvas);

const raio=20;
const cor="pink";
const pontos=[
    {nome:"Pet Shop", x:100,y:100},
    {nome:"Cemitério", x:300,y:80},
    {nome:"Creche",x:550,y:120},
    {nome:"CAIXA",x:720,y:200},
    {nome:"Atacadão",x:700,y:60},
    {nome:"Postinho",x:500,y:300},
    {nome:"Academia",x:120,y:300},
    {nome:"Câmara Municipal",x:200,y:250},
    {nome:"Delegacia",x:450,y:500},
    {nome:"Dentista",x:700,y:450},
    
];

const arestas=[
    [0,1],[1,2],[2,4],[2,7],
    [6,8],[8,7],[7,3],[7,9],[3,5],
];
function criarCidade(){
    ctx.strokeStyle="black";
    ctx.lineWidth=1;
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
    let ic=1;
    pontos.forEach(ponto=>{
        
        const t=45;
        let icone=new Image();
        // Substitua os circulos por imagens usando  ctx.drawImage
        icone.onload = () => ctx.drawImage(icone, ponto.x-20,ponto.y-20, t,t);
        icone.src=`icones/${ic}.png`;
        ic++;
        
        ctx.fillStyle="black";
        ctx.font="20px Arial";
        ctx.fillText(ponto.nome,ponto.x,ponto.y+raio+20);
 
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
                caminho.unshift(passo);//coloca na frente diferente do push que coloca no final
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

function mostrarRota(caminho){
    
    let div = document.getElementById("list-box");
    let rota=[];//esse recebe todos os atributos do vetor
    let rotaNome=[];//esse recebe so os nomes
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    
    ctx.lineWidth=5;
    ctx.strokeStyle="red";
    let i=0;
    let dist=0;//distancia
    let antX=0;//anterior
    let antY=0;
    // c é a posiçao no vetor pontos
    caminho.forEach(c=>{
        rota[c]=pontos[c];
        rotaNome.push(pontos[c].nome+"<hr>");
        console.log(rota[c]);
        if(i===0){
            // posiçao X E Y
            ctx.moveTo(rota[c].x,rota[c].y);
            i++;
        }else{
            ctx.lineTo(rota[c].x,rota[c].y);
            dist=Math.sqrt((antX-rota[c].x)**2 + (antY-rota[c].y)**2);
        }

        antX=rota[c].x;
        antY=rota[c].y;
    });
    ctx.stroke();//cria linha
    ctx.closePath();
    criarCidade();
    div.innerHTML=rotaNome+"<hr>Distancia Total: "+Math.round(dist);
}

criarCidade();

botao.addEventListener("click", ()=>{
    let origem = document.getElementById("origem").value;
    let destino = document.getElementById("destino").value;
    // pega o indice do ponto que foi passado no select
    pontos.forEach((ponto, indice)=>{
        if(origem===ponto.nome){
            origem=indice;
        }
        if(destino===ponto.nome){
            destino=indice;
        }
    });
    let c=buscarMenorCaminho(origem,destino);
    mostrarRota(c);
});

//Substitua os campos text do formulário para campos select. As opções dos campos select devem ser os nomes dos ponto e devem ser dinâmicos ou seja, devem ser pegos diretamente do array
function carregarPontos(){
    pontos.forEach(ponto=>{
        document.getElementById("origem").innerHTML+= `<option value="${ponto.nome}">${ponto.nome}</option>`
        document.getElementById("destino").innerHTML+=`<option value="${ponto.nome}">${ponto.nome}</option>`
    });
}
carregarPontos();