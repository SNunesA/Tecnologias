-- Criação da tabela
CREATE TABLE hospedagem_dados (
    id INT PRIMARY KEY,
    tipo_viagem VARCHAR(50),
    tem_criancas VARCHAR(10),
    investimento VARCHAR(50),
    transporte VARCHAR(50),
    melhor_hospedagem VARCHAR(100)
);

-- Inserção dos dados
INSERT INTO hospedagem_dados (id, tipo_viagem, tem_criancas, investimento, transporte, melhor_hospedagem) VALUES
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