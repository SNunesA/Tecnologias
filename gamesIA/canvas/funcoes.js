const corpo=document.body;
const canvas=document.createElement('canvas');//tela
const ctx =canvas.getContext('2d');//pintor
canvas.width=window.innerWidth;//altura e largura do body
canvas.height=window.innerHeight;
corpo.appendChild(canvas);
direcao=1;
const teclas={};
let destinoX=canvas.width/2;
let destinoY=canvas.height/2;

window.addEventListener("keydown", (e)=>{//apertei
    teclas[e.key]=true;

});
window.addEventListener("keyup",(e)=>{//soltei a tecla
    teclas[e.key]=false;
});

canvas.addEventListener('click', function(e){
    const retanguloCanvas=canvas.getBoundingClientRect();
    //client x é o mouse
    destinoX=e.clientX-retanguloCanvas.left; 
    destinoY=e.clientY-retanguloCanvas.top;
    
});

circulo={
    x:0, //metade da tela
    y:canvas.height/2,
    r:50,//raio
    cor:"purple"
}
function desenhaCirculo(){
    ctx.beginPath();
    //arco, 0 é o grau, pi*2 é a circunferencia
    ctx.arc(circulo.x,circulo.y,circulo.r,0,Math.PI*2);
    
    ctx.fillStyle=circulo.cor;
    ctx.fill();//comando que desenha
    ctx.closePath();
}


retangulo={
    x:canvas.width,
    y:canvas.height/2,
    l:200,
    a:100,
    cor:"cyan"
}
function desenhaRetangulo(){
    ctx.beginPath();
    ctx.rect(retangulo.x,retangulo.y,retangulo.l,retangulo.a);
    ctx.fillStyle=retangulo.cor;
    ctx.fill();
    ctx.closePath();
}

// funciona como se fosse desenhar formas na estrelas
function desenhaPoligono(){
    ctx.beginPath();
    ctx.moveTo(200,150);//primeiro ponto
    ctx.lineTo(200,450);//demais pontos
    ctx.lineTo(400,450);
    ctx.strokeStyle="black"; //cor da linha
    ctx.stroke();
    ctx.fillStyle="pink";//cor de preenchimento, preenche mesmo a forma nao estando fechada
    ctx.fill();
    ctx.closePath();
}

function calcularDistancia(){
    let x1=circulo.x;
    let y1=circulo.y;
    let x2=retangulo.x;
    let y2=retangulo.y;
    return Math.sqrt((x1-x2)**2+(y1-y2)**2);
}

// animaçao das formas
function loop(){
    let dist=calcularDistancia();//distancia
    console.log(dist);
    ctx.fillText("distancia "+dist,10,canvas.width/2);
    ctx.clearRect(0,0,canvas.width,canvas.height);//apaga o circulo anterior

    // vai usar o raio do circulo porque senao ele so vai notar o obstaculo quando um estiver dentro do outro 
    if(dist<=50) direcao=-1;
    // if(circulo.x<=0) direcao=1;
    // circulo.x+=4*direcao;
    // circulo.x+=1;//pixels
    if(circulo.x>destinoX) circulo.x-=4*direcao;
    if(circulo.x<destinoX) circulo.x+=4*direcao;
    if(circulo.y>destinoY) circulo.y-=4*direcao;
    if(circulo.y<destinoY) circulo.y+=4*direcao;
    desenhaCirculo();
    
    if(retangulo.x>=canvas.width-retangulo.l) direcao=1;
    retangulo.x-=4*direcao;
    
    desenhaRetangulo();
    
    // desenhaPoligono();

    // faz o circulo andar com as setas
    if(teclas["ArrowUp"]) circulo.y-=10;
    if(teclas["ArrowDown"]) circulo.y+=10;
    if(teclas["ArrowLeft"]) circulo.x-=10;
    if(teclas["ArrowRight"]) circulo.x+=10;
    requestAnimationFrame(loop);//ciclo de clock da maquina define a velocidade
    
}
loop();
