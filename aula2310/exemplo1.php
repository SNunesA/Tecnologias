
<!-- expressoes regulares, sao usados para encontrar um padrao em textos por exemplo  -->

<?php 
$texto="Eu estou aprendendo php com expressÕes regulares";
$padrao="/expressões/iu";//quero encontrar a palavra
//letra i é uma flag pra ignorar o case sensitive
//letra u muda o comportamento do motor de busca para reconhecer caracteres especiais de forma correta.

//verifica se o padrao é encontrado no texto
if(preg_match($padrao,$texto,$resultado)){
    echo "encontrado valor: ".$resultado[0]."<br>";
}else{
    echo "valor não encontrado";
}

echo "<hr>";
//Conjuntos
$texto="O código do produto é X-54-B";
// $padrao="/X-[0-9]+-B/";//tudo dentro do colchetes faz parte do conjunto que ele vai procurar
// o + significa que esse conjunto vale pra um ou mais caracteres
$padrao="/X-\d+-B/";
//o \d significa numeros
if(preg_match($padrao,$texto,$resultado)){
    echo "encontrado valor: ".$resultado[0]."<br>";
}else{
    echo "valor não encontrado";
}


echo "<hr>";

$texto="O código do produto é X-564-B";
$padrao="/X-(\d+)-B/";
//os parentes significa grave os dados no resultado

if(preg_match($padrao,$texto,$resultado)){
    echo "encontrado valor: ".$resultado[0]."<br>";
    echo "encontrado valor: ".$resultado[1]."<br>";// conteudo gravado

}else{
    echo "valor não encontrado";
}

echo "<hr>";
$url="https://www.google.com.br";
$padrao="/https?/";
//? so tem efeito na letra s, se tiver o s ou nao ele passa, o obrigatorio é o http
if(preg_match($padrao,$url,$resultado)){
    echo "encontrado valor: ".$resultado[0]."<br>";
 

}else{
    echo "valor não encontrado";
}


echo "<hr>";
//âncoras
$codigoValido="ABC123";
$padrao="/^[A-Z]{3}(\d{3})$/";
//^ significa inicio
// 3 letras maiusculas e 3 numeros
// $significa fim
if(preg_match($padrao,$codigoValido,$resultado)){
    echo "encontrado valor: ".$resultado[0]."<br>";
     echo "valor gravado: ".$resultado[1]."<br>";


}else{
    echo "codigo não encontrado";
}