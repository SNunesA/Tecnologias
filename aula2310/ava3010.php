<?php 
// 1 Escreva um padrão que encontre a palavra "php" no texto abaixo, de forma que encontre tanto em maiúsculas quanto em minúsculas (case-insensitive). 
$texto=  "Aprender PHP8 é ótimo, pois o php é muito usado.";
$padrao="/php/i";

if(preg_match($padrao,$texto,$resultado)){
    echo "encontrado: ".$resultado[0]."<br>";
}else{
    echo "padrão não encontrado";
}

echo "<hr>";
// 2 Crie uma regex usando classes de caracteres (\d, \w, etc.) ou conjuntos [...] para capturar uma placa de carro no formato antigo (3 letras maiúsculas, hífen opcional, 4 números).

$placa="Placa antiga: ABC-1234 ou XYZ9876.";
$padrao2="/[A-Z]{3}-?\d{4}/";

if(preg_match_all($padrao2,$placa,$resultado)){
    echo "Encontrados: " . implode("<br>", $resultado[0]);
    
}else{
    echo "padrão não encontrado";
}

echo "<hr>";
// 3 Crie um padrão para validar se um número de telefone fixo tem 8 ou 9 dígitos.
$telefone="Telefone 1: 33224455, Telefone 2: 988776655";
$padrao3="/\d{8,9}/";

if(preg_match_all($padrao3,$telefone,$resultado)){
    echo "Encontrados: " . implode("<br>", $resultado[0]);
    
}else{
    echo "padrão não encontrado";
}

echo "<hr>";
// 4 Escreva uma regex com âncoras (^ e $) para validar se a string inteira é apenas um código postal (CEP) no formato 12345-678 (5 dígitos, hífen, 3 dígitos).

$padrao4="/^\d{5}-\d{3}$/";

$cep1="83000-100";
if(preg_match($padrao4,$cep1,$resultado)){
    echo "encontrado: ".$resultado[0]."<br>";
}else{
    echo "padrão não encontrado";
}

$cep2= "O CEP é 83000-100 na rua X";
if(preg_match($padrao4,$cep2,$resultado)){
    echo "encontrado: ".$resultado[0]."<br>";
}else{
    echo "padrão não encontrado";
}
echo "<hr>";
//5Extraia todas as datas no formato DD/MM/AAAA encontradas no texto.
$data="A reunião foi em 15/03/2025 e o prazo final é 20/10/2025.";
$padrao5="/\d{2}\/\d{2}\/\d{4}/";

if(preg_match_all($padrao5,$data,$resultado)){
    echo "Encontrados: " . implode("<br>", $resultado[0]);
    
}else{
    echo "padrão não encontrado";
}

echo "<hr>";
// 6 Use preg_replace para reformatar datas no formato americano AAAA-MM-DD para o formato brasileiro DD/MM/AAAA.
$data6= "2026-10-23";
$padrao6="/^(\d{4})-(\d{2})-(\d{2})$/";
$substituicao="$3/$2/$1";
$dataBR=preg_replace($padrao6,$substituicao,$data6);
echo "data formatada: ".$dataBR;

echo "<hr>";
//7 Capture o texto que está dentro das aspas duplas, garantindo que ele pare na primeira aspa de fechamento.
$texto7="O atributo class=\"container principal\" foi definido.";
$padrao7='/"([^"]+)"/';
if(preg_match($padrao7,$texto7,$resultado)){
    echo "encontrado: ".$resultado[0]."<br>";
}else{
    echo "padrão não encontrado";
}

echo "<hr>";
// 8 Extraia o conteúdo interno da primeira tag HTML <p>, sem engolir as tags seguintes.
$texto8="<p>Primeiro parágrafo</p><p>Segundo parágrafo</p>";
$padrao8="#<p>(.*?)</p>#";

if(preg_match($padrao8,$texto8,$resultado)){
    echo "encontrado: ".$resultado[1]."<br>";
}else{
    echo "padrão não encontrado";
}


echo "<hr>";
// 9 Crie uma regex que identifique arquivos de imagem com extensões .jpg, .png ou .webp. Use um grupo sem captura (?:...) para as extensões e um grupo com captura normal para o nome do arquivo.
$texto9="A foto da viagem é foto_praia.png e o logo é logo.webp";
$padrao9="/(\w+_?\w+)(?:.jpg|.png|.webp)/";
if(preg_match_all($padrao9,$texto9,$resultado)){
    echo "Encontrados: " . implode("<br>", $resultado[1]);
}else{
    echo "padrão não encontrado";
}

echo "<hr>";
//10 Crie uma regex usando Positive Lookbehind (?<=...) para capturar apenas o valor numérico de um saldo em conta, sem incluir o texto "R$ " na captura.
$saldo="Saldo disponível: R$ 4500 no extrato.";
$padrao10="/(?<=R\\$ )\d+/";

if(preg_match($padrao10,$saldo,$resultado)){
    echo "encontrado: ".$resultado[0]."<br>";
}else{
    echo "padrão não encontrado";
}