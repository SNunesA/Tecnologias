<?php
$caminhoArquivo = 'pessoas.txt';
if (!file_exists($caminhoArquivo)) {
    die("Erro: O arquivo '{$caminhoArquivo}' não foi encontrado.");
}
$conteudoTxt = file_get_contents($caminhoArquivo);


// -----------------------------------------------------------------
// Escreva o padrão de Regex abaixo
// -----------------------------------------------------------------
$padrao = '/Nome:\s*([A-Za-z\s]+)\s*-\s*idade:\s*(\d+)/';

if (preg_match_all($padrao, $conteudoTxt, $matches, PREG_SET_ORDER)) {
    foreach ($matches as $pessoa) {
        // Exiba no formato: Nome - XX anos
        echo ($pessoa[1])."- ".$pessoa[2]." anos<br>";
    }
} else {
    echo "Nenhum registro no formato correto foi encontrado.";
}
