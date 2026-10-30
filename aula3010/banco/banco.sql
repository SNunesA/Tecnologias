-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Tempo de geração: 30/10/2026 às 19:20
-- Versão do servidor: 10.6.22-MariaDB-0ubuntu0.22.04.1
-- Versão do PHP: 8.1.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `arvore`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `hospedagem_dados`
--

CREATE TABLE `hospedagem_dados` (
  `id` int(11) NOT NULL,
  `tipo_viagem` varchar(50) DEFAULT NULL,
  `tem_criancas` varchar(10) DEFAULT NULL,
  `investimento` varchar(50) DEFAULT NULL,
  `transporte` varchar(50) DEFAULT NULL,
  `melhor_hospedagem` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `hospedagem_dados`
--

INSERT INTO `hospedagem_dados` (`id`, `tipo_viagem`, `tem_criancas`, `investimento`, `transporte`, `melhor_hospedagem`) VALUES
(1, 'Lazer', 'Sim', 'Alto', 'Carro Próprio', 'Resort All-Inclusive'),
(2, 'Lazer', 'Sim', 'Alto', 'Aviao/Transfer', 'Resort All-Inclusive'),
(3, 'Lazer', 'Sim', 'Medio', 'Carro Próprio', 'Hotel Fazenda'),
(4, 'Lazer', 'Sim', 'Baixo', 'Carro Próprio', 'Pousada Familiar'),
(5, 'Lazer', 'Nao', 'Alto', 'Aviao/Transfer', 'Hotel Boutique'),
(6, 'Lazer', 'Nao', 'Medio', 'Carro Próprio', 'Pousada Familiar'),
(7, 'Lazer', 'Nao', 'Baixo', 'Publico/App', 'Hostel / Airbnb'),
(8, 'Negocios', 'Nao', 'Alto', 'Aviao/Transfer', 'Hotel Executive / Centro'),
(9, 'Negocios', 'Nao', 'Medio', 'Publico/App', 'Hotel Executive / Centro'),
(10, 'Negocios', 'Nao', 'Baixo', 'Publico/App', 'Hostel / Airbnb'),
(11, 'Negocios', 'Sim', 'Alto', 'Aviao/Transfer', 'Hotel Executive / Centro'),
(12, 'Evento', 'Nao', 'Alto', 'Aviao/Transfer', 'Hotel Boutique'),
(13, 'Evento', 'Nao', 'Medio', 'Publico/App', 'Hotel Executive / Centro'),
(14, 'Evento', 'Sim', 'Medio', 'Carro Próprio', 'Hotel Fazenda'),
(15, 'Evento', 'Sim', 'Alto', 'Carro Próprio', 'Resort All-Inclusive'),
(16, 'Lazer', 'Nao', 'Medio', 'Publico/App', 'Hostel / Airbnb');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `hospedagem_dados`
--
ALTER TABLE `hospedagem_dados`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
