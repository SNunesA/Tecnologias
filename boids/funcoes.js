const canvas=document.getElementById('simulacao');
const ctx= canvas.getContext('2d');
const boids=[];
const NUM_BOIDS=200;


function criarBoids(){
    for(let i=0;i<NUM_BOIDS;i++){
        boids.push({
            x:Math.random()*canvas.width,
            y:Math.random()*canvas.height,
            vx:(Math.random()-0.5)*4, //velocidade
            vy:(Math.random()-0.5)*4,
        });
    }
}

function desenharBoids(boid){
    const angulo=Math.atan2(boid.vx,boid.vy);
    ctx.save();//cada desenho salva pra nao ser todos na mesma direçao
    ctx.translate(boid.x,boid.y);//translação
    ctx.rotate(angulo);//rotação
    ctx.beginPath();
    ctx.moveTo(10,0);//0 ponto inicial
    ctx.lineTo(-6,-4);
    ctx.lineTo(-6,4);
    ctx.closePath();
    ctx.fillStyle="cyan";
    ctx.fill();
    ctx.restore();
}

function atualizarBoids(){
    for(let i=0;i<boids.length;i++){
        const boid=boids[i];
        boid.x+=boid.vx;//muda a posição do boid somando com a velocidade
        boid.y+=boid.vy;
        //pro boid nao  sair do canva
        if(boid.x>canvas.width){
            boid.x=0;
        }else if(boid.x<0){
            boid.x=canvas.width;
        }
        if(boid.y>canvas.height){
            boid.y=0;
        }else if(boid.y<0){
            boid.y=canvas.height;
        }

    }
}

function renderizar(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    atualizarBoids();
    for(let i=0; i<boids.length;i++){
        desenharBoids(boids[i]);
    }
    requestAnimationFrame(renderizar);//chamada recursiva
}

criarBoids();
renderizar();