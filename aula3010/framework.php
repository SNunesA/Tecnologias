<?php
//upload
$arquivo=$_FILES["arquivo"]["tmp_name"];
// echo "<pre>";
// print_r($arquivo);
// echo "</pre>";
$diretorio="banco";
if(!is_dir($diretorio)){
    mkdir($diretorio);
}
move_uploaded_file($arquivo,$diretorio."/"."banco.sql");
//conteudo do arquivo
$conteudo=file_get_contents($diretorio."/banco.sql");
// echo $conteudo;
function obterNomeBanco($conteudo){
    $padrao='/--\s+(?:Database|Banco de dados):\s+`([^`]+)`/';
    preg_match($padrao,$conteudo,$resultado);
    return $resultado[1];

}
function obterTabelasEAtributos($conteudo){
    $padraoTabela='/CREATE TABLE\s+`([^`]+)`\s*\((.*?)\)\s*ENGINE/';
    preg_match_all($padraoTabela,$conteudo,$resultado);
    return $resultado;
}
$banco=obterNomeBanco($conteudo);
echo "Nome Banco:".$banco."<br>";


