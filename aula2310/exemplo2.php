<?php
$texto="Produtos #PROD101, #PROD102, #PROD103";
$padrao="/#PROD(\d+)/";

preg_match_all($padrao,$texto,$array);//encontra todos
echo "Array completo do preg_match:<br>";
echo "<pre>";
print_r($array[0]);
echo "</pre>";

echo "<hr>";
//substituiçao
$data="2026-10-23";
$padrao="/^(\d{4})-(\d{2})-(\d{2})$/";
$substituicao="$3/$2/$1";
$dataBR=preg_replace($padrao,$substituicao,$data);
echo "data formatada: ".$dataBR;

echo "<hr>";
//negaçao
$texto="o 'mickael' cheira flores e o 'bruno' planta nozes";
$padraocomponto="/'(.+)'/"; // da primeira aspa ate a ultima
preg_match($padraocomponto,$texto,$array);
echo "nome com ponto: ".$array[1];

echo "<hr>";
$padraocomnegacao="/'([^']+)'/";

preg_match($padraocomnegacao,$texto,$array);
echo "nome com negação: ".$array[1];

echo "<hr>";
//guloso vs preguiçoso
$texto="<p>primeiro</p> e <p>segundo</p>";
$padraoguloso="/<p>(.*)<\/p>/";//pega tudo que tiver entre as tags p
preg_match($padraoguloso,$texto,$resguloso);
echo "guloso:".$resguloso[1];

$padraoreguicoso="#<p>(.*?)</p>#";//pega so o primeiro que ele acha entre a tag p
preg_match($padraoreguicoso,$texto,$respreguicoso);

echo "<br> preguiçoso:".$respreguicoso[1];


echo "<hr>";
//seleçao alternativa
$texto="o valor total foi de R$150,00";
$padrao='/(?:R\$|\$)\s*(\d+,\d{2})/';
//o primeiro parenteses nao vai gravar, ele vai procura R$ ou $ e depois do $ pode ou nao ter espaço (significado do \s )
//no segundo parenteses quero que grave o numero e depois da virgula so dois
if(preg_match($padrao,$texto,$array)){
    echo "valor do produto ".$array[1]."<br>";
}

echo "<hr>";
$texto="Comprei 5kg de arroz e 3 litros de leite";
$padrao='/\d+(?=kg)/';//pega todos os numeros precedidos por kg
if(preg_match($padrao,$texto,$res)){
    echo "Valor capturado ".$res[0]."<br>";
}
$texto="user=admin&pass=123&status=ativo";
$padrao='/(?<=pass=)\w+/';
// \w pega qualquer tipo de caractere depois da palavra pass
if(preg_match($padrao,$texto,$senha)){
    echo "valor capturado ".$senha[0]."<br>";
}