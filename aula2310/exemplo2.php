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
