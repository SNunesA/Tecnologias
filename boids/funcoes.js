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
    const angulo=Math.atan2(boid.vy,boid.vx);
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

const RAIO_SEPARACAO=25;//distancia minima de um boid pro outro
const FORCA_SEPARACAO=0.05;

function aplicarSeparacao(boidAtual){
    let repulsaoX=0; //força para o boid empurrar outros
    let repulsaoY=0;
    for(let i=0;i<boids.length;i++){
        const outro=boids[i];
        //nao pode verificar ele com ele mesmo
        if(outro !== boidAtual){
            const dx=boidAtual.x-outro.x;//distancia
            const dy=boidAtual.y-outro.y;
            const distancia=Math.sqrt(dx*dx+dy*dy);
            if(distancia<RAIO_SEPARACAO && distancia>0){
                repulsaoX+=(dx/distancia);
                repulsaoY+=(dy/distancia);

            }

        }
    }
    boidAtual.vx+=repulsaoX*FORCA_SEPARACAO;
    boidAtual.vy+=repulsaoY*FORCA_SEPARACAO;

}
const RAIO_ALINHAMENTO=50;
const FORCA_ALINHAMENTO=0.05;
function aplicarAlinhamento(boidAtual){
    let somaVx=0;//padroniza a velocidade do grupo
    let somaVy=0;
    let totalVizinhos=0;
    for(let i=0; i<boids.length;i++){
        const outro=boids[i];
        if(outro !== boidAtual){
            const dx=boidAtual.x-outro.x;//distancia
            const dy=boidAtual.y-outro.y;
            const distancia=Math.sqrt(dx*dx+dy*dy);
            if(distancia<RAIO_ALINHAMENTO){
                //esta dentro do circulo de amizade
                somaVx+=outro.vx;
                somaVy+=outro.vy;
                totalVizinhos++;
            }
        }
    }
    if(totalVizinhos>0){
        const mediaVx=somaVx/totalVizinhos;
        const mediaVy=somaVy/totalVizinhos;
        boidAtual.vx+=(mediaVx-boidAtual.vx)*FORCA_ALINHAMENTO;
        boidAtual.vy+=(mediaVy-boidAtual.vy)*FORCA_ALINHAMENTO;

    }
}



function atualizarBoids(){
    for(let i=0;i<boids.length;i++){
        const boid=boids[i];

        aplicarSeparacao(boid);
        aplicarAlinhamento(boid);
        const velocidadeMax=4;
        const velocidadeAtual=Math.sqrt(boid.vx**2+ boid.vy**2);
        if(velocidadeAtual>velocidadeMax){
            boid.vx=(boid.vx/velocidadeAtual)*velocidadeMax;
            boid.vy=(boid.vy/velocidadeAtual)*velocidadeMax;
        }

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