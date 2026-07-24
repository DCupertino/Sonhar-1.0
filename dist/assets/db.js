/**
 * Sonharte DB Service
 * Abstração para gerenciamento de dados de produtos e moderação de depoimentos.
 * Integração dinâmica com Supabase com fallback transparente para LocalStorage em ambiente local/offline.
 */

(function () {
  const MOCK_PRODUCTS = [
  {
    "id": "1",
    "titulo": "Lápis de Cor Multicolor 24 Cores",
    "preco": 21.5,
    "descricao": "Produto de excelente qualidade da marca Cor. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Lápis de Cor & Desenho",
    "imagem": "/assets/produtos/produto_1.jpg",
    "ativo": true
  },
  {
    "id": "2",
    "titulo": "Lápis de Cor Multicolor 12 Cores",
    "preco": 9.9,
    "descricao": "Produto de excelente qualidade da marca Cor. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Lápis de Cor & Desenho",
    "imagem": "/assets/produtos/produto_2.jpg",
    "ativo": true
  },
  {
    "id": "3",
    "titulo": "Lápis de Cor Leo&Leo 24 Cores",
    "preco": 12,
    "descricao": "Produto de excelente qualidade da marca Cor. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Lápis de Cor & Desenho",
    "imagem": "/assets/produtos/produto_3.jpg",
    "ativo": true
  },
  {
    "id": "4",
    "titulo": "Lápis de Cor Leo&Leo 12 Cores",
    "preco": 7.9,
    "descricao": "Produto de excelente qualidade da marca Cor. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Lápis de Cor & Desenho",
    "imagem": "/assets/produtos/produto_4.jpg",
    "ativo": true
  },
  {
    "id": "5",
    "titulo": "Lápis de Cor Big Leo&Leo 12 Cores",
    "preco": 14.9,
    "descricao": "Produto de excelente qualidade da marca Cor. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Lápis de Cor & Desenho",
    "imagem": "/assets/produtos/produto_5.jpg",
    "ativo": true
  },
  {
    "id": "6",
    "titulo": "Canetinha Cis Hidrográfica 24 Cores",
    "preco": 27.9,
    "descricao": "Produto de excelente qualidade da marca Hidrográfica. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Lápis de Cor & Desenho",
    "imagem": "/assets/produtos/produto_6.jpg",
    "ativo": true
  },
  {
    "id": "7",
    "titulo": "Canetinha Leo&Leo Hidrográfica 24 Cores",
    "preco": 16.9,
    "descricao": "Produto de excelente qualidade da marca Hidrográfica. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Lápis de Cor & Desenho",
    "imagem": "/assets/produtos/produto_7.jpg",
    "ativo": true
  },
  {
    "id": "8",
    "titulo": "Canetinha Compactor Neo-Pen 12 Cores",
    "preco": 12.9,
    "descricao": "Produto de excelente qualidade da marca Neo-Pen. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Lápis de Cor & Desenho",
    "imagem": "/assets/produtos/produto_8.jpg",
    "ativo": true
  },
  {
    "id": "9",
    "titulo": "Massinha de Modelar Pira 6 Cores",
    "preco": 3.5,
    "descricao": "Produto de excelente qualidade da marca Modelar. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Artes & Utilidades",
    "imagem": "/assets/produtos/produto_9.jpg",
    "ativo": true
  },
  {
    "id": "10",
    "titulo": "Massinha de Modelar Pira 12 Cores",
    "preco": 6,
    "descricao": "Produto de excelente qualidade da marca Modelar. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Artes & Utilidades",
    "imagem": "/assets/produtos/produto_10.jpg",
    "ativo": true
  },
  {
    "id": "11",
    "titulo": "Gizão de Cera Radex 12 Cores",
    "preco": 8.9,
    "descricao": "Produto de excelente qualidade da marca Cera. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Lápis de Cor & Desenho",
    "imagem": "/assets/produtos/produto_11.jpg",
    "ativo": true
  },
  {
    "id": "12",
    "titulo": "Bloco Auto-Adesivo Post-It 500 folhas",
    "preco": 7.9,
    "descricao": "Produto de excelente qualidade da marca Post-It. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Organização & Escritório",
    "imagem": "/assets/produtos/produto_12.jpg",
    "ativo": true
  },
  {
    "id": "13",
    "titulo": "Caneta Compactor Economic (Preta)",
    "preco": 1.5,
    "descricao": "Produto de excelente qualidade da marca Economic. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Canetas & Escrita",
    "imagem": "/assets/produtos/produto_13.jpg",
    "ativo": true
  },
  {
    "id": "14",
    "titulo": "Caneta Compactor Economic (Azul)",
    "preco": 1.5,
    "descricao": "Produto de excelente qualidade da marca Economic. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Canetas & Escrita",
    "imagem": "/assets/produtos/produto_14.jpg",
    "ativo": true
  },
  {
    "id": "15",
    "titulo": "Caneta Compactor Economic (Vermelha)",
    "preco": 1.5,
    "descricao": "Produto de excelente qualidade da marca Economic. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Canetas & Escrita",
    "imagem": "/assets/produtos/produto_15.jpg",
    "ativo": true
  },
  {
    "id": "16",
    "titulo": "Caneta Bic Cristal (Preta)",
    "preco": 1.7,
    "descricao": "Produto de excelente qualidade da marca Cristal. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Canetas & Escrita",
    "imagem": "/assets/produtos/produto_16.jpg",
    "ativo": true
  },
  {
    "id": "17",
    "titulo": "Caneta Bic Cristal (Azul)",
    "preco": 1.7,
    "descricao": "Produto de excelente qualidade da marca Cristal. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Canetas & Escrita",
    "imagem": "/assets/produtos/produto_17.jpg",
    "ativo": true
  },
  {
    "id": "18",
    "titulo": "Caneta Bic Cristal (Vermelha)",
    "preco": 1.7,
    "descricao": "Produto de excelente qualidade da marca Cristal. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Canetas & Escrita",
    "imagem": "/assets/produtos/produto_18.jpg",
    "ativo": true
  },
  {
    "id": "19",
    "titulo": "Caneta Cis Next Color (Unidade)",
    "preco": 2,
    "descricao": "Produto de excelente qualidade da marca Next. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Canetas & Escrita",
    "imagem": "/assets/produtos/produto_19.jpg",
    "ativo": true
  },
  {
    "id": "20",
    "titulo": "Caneta Marcadora Permanente (Preta)",
    "preco": 5.5,
    "descricao": "Produto de excelente qualidade da marca Permanente. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Canetas & Escrita",
    "imagem": "/assets/produtos/produto_20.jpg",
    "ativo": true
  },
  {
    "id": "21",
    "titulo": "Caneta Cis Spiro Colorida (Unidade)",
    "preco": 4.9,
    "descricao": "Produto de excelente qualidade da marca Spiro. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Canetas & Escrita",
    "imagem": "/assets/produtos/produto_21.jpg",
    "ativo": true
  },
  {
    "id": "22",
    "titulo": "Marca Texto Pastel Cis",
    "preco": 3.9,
    "descricao": "Produto de excelente qualidade da marca Pastel. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Canetas & Escrita",
    "imagem": "/assets/produtos/produto_22.jpg",
    "ativo": true
  },
  {
    "id": "23",
    "titulo": "Lapiseira Jocar Office 0.5mm",
    "preco": 6.5,
    "descricao": "Produto de excelente qualidade da marca Office. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Canetas & Escrita",
    "imagem": "/assets/produtos/produto_23.jpg",
    "ativo": true
  },
  {
    "id": "24",
    "titulo": "Lapiseira Jocar Office 0.7mm",
    "preco": 6.5,
    "descricao": "Produto de excelente qualidade da marca Office. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Canetas & Escrita",
    "imagem": "/assets/produtos/produto_24.jpg",
    "ativo": true
  },
  {
    "id": "25",
    "titulo": "Grafite Leo&Leo 0.5mm",
    "preco": 1.5,
    "descricao": "Produto de excelente qualidade da marca 0.5mm. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Canetas & Escrita",
    "imagem": "/assets/produtos/produto_25.jpg",
    "ativo": true
  },
  {
    "id": "26",
    "titulo": "Grafite Leo&Leo 0.7mm",
    "preco": 1.5,
    "descricao": "Produto de excelente qualidade da marca 0.7mm. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Canetas & Escrita",
    "imagem": "/assets/produtos/produto_26.jpg",
    "ativo": true
  },
  {
    "id": "27",
    "titulo": "Lápis Preto Maped de Escrever (HB)",
    "preco": 2.5,
    "descricao": "Produto de excelente qualidade da marca Maped. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Canetas & Escrita",
    "imagem": "/assets/produtos/produto_27.jpg",
    "ativo": true
  },
  {
    "id": "28",
    "titulo": "Lápis Preto Faber-Castell Max de Escrever",
    "preco": 1.5,
    "descricao": "Produto de excelente qualidade da marca Faber-Castell. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Canetas & Escrita",
    "imagem": "/assets/produtos/produto_28.jpg",
    "ativo": true
  },
  {
    "id": "29",
    "titulo": "Lápis Preto Leo&Leo de Escrever (HB)",
    "preco": 0.8,
    "descricao": "Produto de excelente qualidade da marca Leo&Leo. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Canetas & Escrita",
    "imagem": "/assets/produtos/produto_29.jpg",
    "ativo": true
  },
  {
    "id": "30",
    "titulo": "Elástico Mamuth (Pacote com 60)",
    "preco": 5,
    "descricao": "Produto de excelente qualidade da marca (Pacote. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Artes & Utilidades",
    "imagem": "/assets/produtos/produto_30.jpg",
    "ativo": true
  },
  {
    "id": "31",
    "titulo": "Pilha Rayovac AA (Unidade)",
    "preco": 1.8,
    "descricao": "Produto de excelente qualidade da marca AA. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Artes & Utilidades",
    "imagem": "/assets/produtos/produto_31.jpg",
    "ativo": true
  },
  {
    "id": "32",
    "titulo": "Pilha Rayovac AA (Pacote com 4)",
    "preco": 6,
    "descricao": "Produto de excelente qualidade da marca AA. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Artes & Utilidades",
    "imagem": "/assets/produtos/produto_32.jpg",
    "ativo": true
  },
  {
    "id": "33",
    "titulo": "Pilha Rayovac AAA (Unidade)",
    "preco": 1.5,
    "descricao": "Produto de excelente qualidade da marca AAA. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Artes & Utilidades",
    "imagem": "/assets/produtos/produto_33.jpg",
    "ativo": true
  },
  {
    "id": "34",
    "titulo": "Pilha Rayovac AAA (Pacote com 4)",
    "preco": 5,
    "descricao": "Produto de excelente qualidade da marca AAA. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Artes & Utilidades",
    "imagem": "/assets/produtos/produto_34.jpg",
    "ativo": true
  },
  {
    "id": "35",
    "titulo": "Borracha Mercur Colorida (Unidade)",
    "preco": 2.5,
    "descricao": "Produto de excelente qualidade da marca Colorida. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Organização & Escritório",
    "imagem": "/assets/produtos/produto_35.jpg",
    "ativo": true
  },
  {
    "id": "36",
    "titulo": "Borracha Mercur Branca Record 20",
    "preco": 1.9,
    "descricao": "Produto de excelente qualidade da marca Branca. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Organização & Escritório",
    "imagem": "/assets/produtos/produto_36.jpg",
    "ativo": true
  },
  {
    "id": "37",
    "titulo": "Borracha Mercur Branca Record 40",
    "preco": 1.5,
    "descricao": "Produto de excelente qualidade da marca Branca. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Organização & Escritório",
    "imagem": "/assets/produtos/produto_37.jpg",
    "ativo": true
  },
  {
    "id": "38",
    "titulo": "Carnê do INSS",
    "preco": 4.9,
    "descricao": "Produto de excelente qualidade da marca INSS. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Artes & Utilidades",
    "imagem": "/assets/produtos/produto_38.jpg",
    "ativo": true
  },
  {
    "id": "39",
    "titulo": "Bloco de Recibo Comercial (Sem Cópia)",
    "preco": 2.5,
    "descricao": "Produto de excelente qualidade da marca Recibo. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Artes & Utilidades",
    "imagem": "/assets/produtos/produto_39.jpg",
    "ativo": true
  },
  {
    "id": "40",
    "titulo": "Bloco de Rascunho",
    "preco": 1.5,
    "descricao": "Produto de excelente qualidade da marca Rascunho. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Cadernos & Papéis",
    "imagem": "/assets/produtos/produto_40.jpg",
    "ativo": true
  },
  {
    "id": "41",
    "titulo": "Cola Bastão Cis 19g",
    "preco": 3.9,
    "descricao": "Produto de excelente qualidade da marca Cis. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Artes & Utilidades",
    "imagem": "/assets/produtos/produto_41.jpg",
    "ativo": true
  },
  {
    "id": "42",
    "titulo": "Cola Bastão Cis 8g",
    "preco": 2.5,
    "descricao": "Produto de excelente qualidade da marca Cis. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Artes & Utilidades",
    "imagem": "/assets/produtos/produto_42.jpg",
    "ativo": true
  },
  {
    "id": "43",
    "titulo": "Bastão de Cola Quente Rendicolla Fino (Unidade)",
    "preco": 2.5,
    "descricao": "Produto de excelente qualidade da marca Cola. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Artes & Utilidades",
    "imagem": "/assets/produtos/produto_43.jpg",
    "ativo": true
  },
  {
    "id": "44",
    "titulo": "Bastão de Cola Quente Rendicolla Grosso (Unidade)",
    "preco": 3.5,
    "descricao": "Produto de excelente qualidade da marca Cola. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Artes & Utilidades",
    "imagem": "/assets/produtos/produto_44.jpg",
    "ativo": true
  },
  {
    "id": "45",
    "titulo": "Tinta Guache Escolar (Cores Sortidas)",
    "preco": 1.5,
    "descricao": "Produto de excelente qualidade da marca Escolar. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Lápis de Cor & Desenho",
    "imagem": "/assets/produtos/produto_45.jpg",
    "ativo": true
  },
  {
    "id": "46",
    "titulo": "Pincel Redondo Leo&Leo Nº 04",
    "preco": 2.9,
    "descricao": "Produto de excelente qualidade da marca Leo&Leo. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Lápis de Cor & Desenho",
    "imagem": "/assets/produtos/produto_46.jpg",
    "ativo": true
  },
  {
    "id": "47",
    "titulo": "Pincel Redondo Leo&Leo Nº 10",
    "preco": 3.2,
    "descricao": "Produto de excelente qualidade da marca Leo&Leo. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Lápis de Cor & Desenho",
    "imagem": "/assets/produtos/produto_47.jpg",
    "ativo": true
  },
  {
    "id": "48",
    "titulo": "Apontador Duplo com Depósito Oval Leo&Leo",
    "preco": 4,
    "descricao": "Produto de excelente qualidade da marca com. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Organização & Escritório",
    "imagem": "/assets/produtos/produto_48.jpg",
    "ativo": true
  },
  {
    "id": "49",
    "titulo": "Apontador Bloco Simples Leo&Leo",
    "preco": 1.9,
    "descricao": "Produto de excelente qualidade da marca Simples. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Organização & Escritório",
    "imagem": "/assets/produtos/produto_49.jpg",
    "ativo": true
  },
  {
    "id": "50",
    "titulo": "Apontador Plástico Yolo (Cores Sortidas)",
    "preco": 1,
    "descricao": "Produto de excelente qualidade da marca Yolo. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Organização & Escritório",
    "imagem": "/assets/produtos/produto_50.jpg",
    "ativo": true
  },
  {
    "id": "51",
    "titulo": "Cola Líquida New Magic 90g",
    "preco": 3.9,
    "descricao": "Produto de excelente qualidade da marca New. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Artes & Utilidades",
    "imagem": "/assets/produtos/produto_51.jpg",
    "ativo": true
  },
  {
    "id": "52",
    "titulo": "Cola Branca Escolar Make+ 40g",
    "preco": 2,
    "descricao": "Produto de excelente qualidade da marca Escolar. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Artes & Utilidades",
    "imagem": "/assets/produtos/produto_52.jpg",
    "ativo": true
  },
  {
    "id": "53",
    "titulo": "Tesoura Escolar Sem Ponta Cis",
    "preco": 6.9,
    "descricao": "Produto de excelente qualidade da marca Sem. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Organização & Escritório",
    "imagem": "/assets/produtos/produto_53.jpg",
    "ativo": true
  },
  {
    "id": "54",
    "titulo": "Etiqueta de Preço Nº4 22x12 (Unidade)",
    "preco": 0.9,
    "descricao": "Produto de excelente qualidade da marca Preço. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Organização & Escritório",
    "imagem": "/assets/produtos/produto_54.jpg",
    "ativo": true
  },
  {
    "id": "55",
    "titulo": "Fita Adesiva Aderex 12x30",
    "preco": 2.5,
    "descricao": "Produto de excelente qualidade da marca Aderex. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Organização & Escritório",
    "imagem": "/assets/produtos/produto_55.jpg",
    "ativo": true
  },
  {
    "id": "56",
    "titulo": "Fita Crepe Adesiva 18x10",
    "preco": 2.5,
    "descricao": "Produto de excelente qualidade da marca Adesiva. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Organização & Escritório",
    "imagem": "/assets/produtos/produto_56.jpg",
    "ativo": true
  },
  {
    "id": "57",
    "titulo": "Fita Transparente Eurocel 18x50",
    "preco": 4,
    "descricao": "Produto de excelente qualidade da marca Eurocel. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Organização & Escritório",
    "imagem": "/assets/produtos/produto_57.jpg",
    "ativo": true
  },
  {
    "id": "58",
    "titulo": "Fita Adesiva Afrontas 12x50",
    "preco": 3.5,
    "descricao": "Produto de excelente qualidade da marca Afrontas. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Organização & Escritório",
    "imagem": "/assets/produtos/produto_58.jpg",
    "ativo": true
  },
  {
    "id": "59",
    "titulo": "Fita Larga Transparente Fit-Pel 45x45",
    "preco": 5,
    "descricao": "Produto de excelente qualidade da marca Transparente. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Organização & Escritório",
    "imagem": "/assets/produtos/produto_59.jpg",
    "ativo": true
  },
  {
    "id": "60",
    "titulo": "Fita Dupla Face Adere 12x30",
    "preco": 7.9,
    "descricao": "Produto de excelente qualidade da marca Face. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Organização & Escritório",
    "imagem": "/assets/produtos/produto_60.jpg",
    "ativo": true
  },
  {
    "id": "61",
    "titulo": "Fita Larga Marrom Fit-Pel 45x45",
    "preco": 6,
    "descricao": "Produto de excelente qualidade da marca Marrom. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Organização & Escritório",
    "imagem": "/assets/produtos/produto_61.jpg",
    "ativo": true
  },
  {
    "id": "62",
    "titulo": "Calculadora de Mesa Dotad",
    "preco": 18.9,
    "descricao": "Produto de excelente qualidade da marca Mesa. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Organização & Escritório",
    "imagem": "/assets/produtos/produto_62.jpg",
    "ativo": true
  },
  {
    "id": "63",
    "titulo": "Régua Plástica 30cm",
    "preco": 5.9,
    "descricao": "Produto de excelente qualidade da marca 30cm. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Organização & Escritório",
    "imagem": "/assets/produtos/produto_63.jpg",
    "ativo": true
  },
  {
    "id": "64",
    "titulo": "Estilete Largo Profissional 18mm",
    "preco": 4,
    "descricao": "Produto de excelente qualidade da marca Profissional. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Organização & Escritório",
    "imagem": "/assets/produtos/produto_64.jpg",
    "ativo": true
  },
  {
    "id": "65",
    "titulo": "Estilete Estreito Office 9mm",
    "preco": 2.5,
    "descricao": "Produto de excelente qualidade da marca Office. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Organização & Escritório",
    "imagem": "/assets/produtos/produto_65.jpg",
    "ativo": true
  },
  {
    "id": "66",
    "titulo": "Lâmina para Estilete 18mm (Unidade)",
    "preco": 0.8,
    "descricao": "Produto de excelente qualidade da marca Estilete. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Organização & Escritório",
    "imagem": "/assets/produtos/produto_66.jpg",
    "ativo": true
  },
  {
    "id": "67",
    "titulo": "Lâmina para Estilete 18mm (Caixa)",
    "preco": 5.9,
    "descricao": "Produto de excelente qualidade da marca Estilete. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Organização & Escritório",
    "imagem": "/assets/produtos/produto_67.jpg",
    "ativo": true
  },
  {
    "id": "68",
    "titulo": "Lâmina para Estilete 9mm (Unidade)",
    "preco": 0.5,
    "descricao": "Produto de excelente qualidade da marca Estilete. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Organização & Escritório",
    "imagem": "/assets/produtos/produto_68.jpg",
    "ativo": true
  },
  {
    "id": "69",
    "titulo": "Lâmina para Estilete 9mm (Caixa)",
    "preco": 3.9,
    "descricao": "Produto de excelente qualidade da marca Estilete. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Organização & Escritório",
    "imagem": "/assets/produtos/produto_69.jpg",
    "ativo": true
  },
  {
    "id": "70",
    "titulo": "Clips Galvanizados Top 3/0",
    "preco": 3.5,
    "descricao": "Produto de excelente qualidade da marca Top. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Organização & Escritório",
    "imagem": "/assets/produtos/produto_70.jpg",
    "ativo": true
  },
  {
    "id": "71",
    "titulo": "Grampeador Office Bazar 26/6",
    "preco": 12.5,
    "descricao": "Produto de excelente qualidade da marca Bazar. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Organização & Escritório",
    "imagem": "/assets/produtos/produto_71.jpg",
    "ativo": true
  },
  {
    "id": "72",
    "titulo": "Caixa de Grampos Cis 26/6 com 1000 un.",
    "preco": 3.5,
    "descricao": "Produto de excelente qualidade da marca Grampos. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Organização & Escritório",
    "imagem": "/assets/produtos/produto_72.jpg",
    "ativo": true
  },
  {
    "id": "73",
    "titulo": "Caderno Espiral Capa Dura 96 Folhas",
    "preco": 12.9,
    "descricao": "Produto de excelente qualidade da marca Capa. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Cadernos & Papéis",
    "imagem": "/assets/produtos/produto_73.jpg",
    "ativo": true
  },
  {
    "id": "74",
    "titulo": "Caderno Espiral Capa Dura 200 Folhas",
    "preco": 22.9,
    "descricao": "Produto de excelente qualidade da marca Capa. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Cadernos & Papéis",
    "imagem": "/assets/produtos/produto_74.jpg",
    "ativo": true
  },
  {
    "id": "75",
    "titulo": "Caderneta Espiral 40 Folhas 70x100mm",
    "preco": 2.5,
    "descricao": "Produto de excelente qualidade da marca 40. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Cadernos & Papéis",
    "imagem": "/assets/produtos/produto_75.jpg",
    "ativo": true
  },
  {
    "id": "76",
    "titulo": "Caderneta Costurada 100x140mm",
    "preco": 4,
    "descricao": "Produto de excelente qualidade da marca 100x140mm. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Cadernos & Papéis",
    "imagem": "/assets/produtos/produto_76.jpg",
    "ativo": true
  },
  {
    "id": "77",
    "titulo": "Caderno Capa Dura 1/4 96 Folhas",
    "preco": 7,
    "descricao": "Produto de excelente qualidade da marca Dura. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Cadernos & Papéis",
    "imagem": "/assets/produtos/produto_77.jpg",
    "ativo": true
  },
  {
    "id": "78",
    "titulo": "Kit Canetas Compactor (Preta, Azul e Vermelha)",
    "preco": 3.5,
    "descricao": "Produto de excelente qualidade da marca Compactor. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Canetas & Escrita",
    "imagem": "/assets/produtos/produto_78.jpg",
    "ativo": true
  },
  {
    "id": "79",
    "titulo": "Fita Corretiva Jocar Office",
    "preco": 6,
    "descricao": "Produto de excelente qualidade da marca Jocar. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Organização & Escritório",
    "imagem": "/assets/produtos/produto_79.jpg",
    "ativo": true
  },
  {
    "id": "80",
    "titulo": "Corretivo Líquido New Magic",
    "preco": 2.9,
    "descricao": "Produto de excelente qualidade da marca New. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Organização & Escritório",
    "imagem": "/assets/produtos/produto_80.jpg",
    "ativo": true
  },
  {
    "id": "81",
    "titulo": "Caneta Corretiva Jocar Office",
    "preco": 2.9,
    "descricao": "Produto de excelente qualidade da marca Jocar. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Organização & Escritório",
    "imagem": "/assets/produtos/produto_81.jpg",
    "ativo": true
  },
  {
    "id": "82",
    "titulo": "Caderno Cartografia Capa Dura 48 Folhas",
    "preco": 10.9,
    "descricao": "Produto de excelente qualidade da marca Capa. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Cadernos & Papéis",
    "imagem": "/assets/produtos/produto_82.jpg",
    "ativo": true
  },
  {
    "id": "83",
    "titulo": "Caderno Cartografia Capa Flexível 48 Folhas",
    "preco": 7,
    "descricao": "Produto de excelente qualidade da marca Capa. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Cadernos & Papéis",
    "imagem": "/assets/produtos/produto_83.jpg",
    "ativo": true
  },
  {
    "id": "84",
    "titulo": "Caderno Capa Dura Brochura 96 Folhas",
    "preco": 13,
    "descricao": "Produto de excelente qualidade da marca Dura. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Cadernos & Papéis",
    "imagem": "/assets/produtos/produto_84.jpg",
    "ativo": true
  },
  {
    "id": "85",
    "titulo": "Caderno Brochura Capa Flexível 60 Folhas",
    "preco": 9.5,
    "descricao": "Produto de excelente qualidade da marca Capa. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Cadernos & Papéis",
    "imagem": "/assets/produtos/produto_85.jpg",
    "ativo": true
  },
  {
    "id": "86",
    "titulo": "Envelope Pardo A4",
    "preco": 0.9,
    "descricao": "Produto de excelente qualidade da marca A4. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Cadernos & Papéis",
    "imagem": "/assets/produtos/produto_86.jpg",
    "ativo": true
  },
  {
    "id": "87",
    "titulo": "Pasta Polibras Fina",
    "preco": 5,
    "descricao": "Produto de excelente qualidade da marca Fina. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Organização & Escritório",
    "imagem": "/assets/produtos/produto_87.jpg",
    "ativo": true
  },
  {
    "id": "88",
    "titulo": "Pasta Plástica Maleta 18x245x335mm",
    "preco": 7,
    "descricao": "Produto de excelente qualidade da marca Maleta. Ideal para escola, escritório ou uso pessoal.",
    "categoria": "Organização & Escritório",
    "imagem": "/assets/produtos/produto_88.jpg",
    "ativo": true
  }
];

  let client = null;

  // Tenta inicializar o cliente do Supabase
  function getSupabaseClient() {
    if (client) return client;

    const url = window.SUPABASE_URL || '';
    const key = window.SUPABASE_ANON_KEY || '';

    if (url && key && window.supabase) {
      try {
        client = window.supabase.createClient(url, key);
        console.log('SonharteDB: Conectado com sucesso ao Supabase!');
        return client;
      } catch (err) {
        console.error('SonharteDB: Falha ao iniciar cliente Supabase:', err);
      }
    }
    return null;
  }

  // OPERAÇÕES DE PRODUTOS
  async function getProducts() {
    const sb = getSupabaseClient();
    if (sb) {
      const { data, error } = await sb
        .from('produtos')
        .select('*')
        .order('titulo', { ascending: true });

      if (!error) return data;
      console.error('Erro ao ler do Supabase, utilizando fallback:', error);
    }

    // Fallback: LocalStorage
    let local = localStorage.getItem('sonharte_produtos_v2');
    if (!local) {
      localStorage.setItem('sonharte_produtos_v2', JSON.stringify(MOCK_PRODUCTS));
      return MOCK_PRODUCTS;
    }
    try {
      let parsed = JSON.parse(local);
      if (typeof parsed === 'string') {
        parsed = JSON.parse(parsed);
      }
      if (Array.isArray(parsed)) {
        return parsed;
      }
      localStorage.setItem('sonharte_produtos_v2', JSON.stringify(MOCK_PRODUCTS));
      return MOCK_PRODUCTS;
    } catch (e) {
      console.error('SonharteDB: Erro ao ler produtos, resetando...', e);
      localStorage.setItem('sonharte_produtos_v2', JSON.stringify(MOCK_PRODUCTS));
      return MOCK_PRODUCTS;
    }
  }

  async function saveProduct(product) {
    const sb = getSupabaseClient();
    if (sb) {
      if (product.id && !product.id.startsWith('temp_')) {
        // Update
        const { data, error } = await sb
          .from('produtos')
          .update(product)
          .eq('id', product.id)
          .select();
        if (!error) return data[0];
        throw new Error(error.message);
      } else {
        // Insert
        const pCopy = { ...product };
        delete pCopy.id; // deixa o Supabase gerar o UUID
        const { data, error } = await sb
          .from('produtos')
          .insert([pCopy])
          .select();
        if (!error) return data[0];
        throw new Error(error.message);
      }
    }

    // Fallback: LocalStorage
    let products = await getProducts();
    if (product.id) {
      // Update
      const index = products.findIndex(p => p.id === product.id);
      if (index !== -1) {
        products[index] = { ...products[index], ...product };
      }
    } else {
      // Insert
      product.id = 'temp_' + Date.now();
      products.push(product);
    }
    localStorage.setItem('sonharte_produtos_v2', JSON.stringify(products));
    return product;
  }

  async function deleteProduct(id) {
    const sb = getSupabaseClient();
    if (sb) {
      const { error } = await sb
        .from('produtos')
        .delete()
        .eq('id', id);
      if (!error) return true;
      throw new Error(error.message);
    }

    // Fallback: LocalStorage
    let products = await getProducts();
    products = products.filter(p => p.id !== id);
    localStorage.setItem('sonharte_produtos_v2', JSON.stringify(products));
    return true;
  }

  // MODERAÇÃO DE DEPOIMENTOS / FEEDBACKS
  async function getFeedbacks() {
    const sb = getSupabaseClient();
    if (sb) {
      const { data, error } = await sb
        .from('depoimentos')
        .select('*')
        .order('criado_em', { ascending: false });
      if (!error) return data;
      console.error('Erro ao ler feedbacks do Supabase, utilizando fallback:', error);
    }

    // Fallback: LocalStorage
    let local = localStorage.getItem('sonharte_depoimentos');
    const defaultFeedbacks = [
      { id: "1", nome: "Mariana Costa", texto: "Estou apaixonada pelo meu planner! A laminação holográfica é maravilhosa e o cheirinho que vem na embalagem é único. Nota 10!", estrelas: 5, data: "Há 2 semanas" },
      { id: "2", nome: "Juliana Silva", texto: "Comprei o kit de washi tapes e vieram super embaladas. Excelente qualidade e atendimento muito prestativo no WhatsApp.", estrelas: 5, data: "Há 3 dias" }
    ];
    if (!local) {
      localStorage.setItem('sonharte_depoimentos', JSON.stringify(defaultFeedbacks));
      return defaultFeedbacks;
    }
    try {
      let parsed = JSON.parse(local);
      if (typeof parsed === 'string') {
        parsed = JSON.parse(parsed);
      }
      if (Array.isArray(parsed)) {
        return parsed;
      }
      localStorage.setItem('sonharte_depoimentos', JSON.stringify(defaultFeedbacks));
      return defaultFeedbacks;
    } catch (e) {
      console.error('SonharteDB: Erro ao ler depoimentos, resetando...', e);
      localStorage.setItem('sonharte_depoimentos', JSON.stringify(defaultFeedbacks));
      return defaultFeedbacks;
    }
  }

  async function deleteFeedback(id) {
    const sb = getSupabaseClient();
    if (sb) {
      const { error } = await sb
        .from('depoimentos')
        .delete()
        .eq('id', id);
      if (!error) return true;
      throw new Error(error.message);
    }

    // Fallback: LocalStorage
    let feedbacks = await getFeedbacks();
    feedbacks = feedbacks.filter(f => f.id !== id);
    localStorage.setItem('sonharte_depoimentos', JSON.stringify(feedbacks));
    return true;
  }

  async function saveFeedback(feedback) {
    const sb = getSupabaseClient();
    if (sb) {
      const fCopy = { ...feedback };
      delete fCopy.id;
      // Adiciona data de criação
      fCopy.criado_em = new Date().toISOString();
      const { data, error } = await sb
        .from('depoimentos')
        .insert([fCopy])
        .select();
      if (!error) return data[0];
      throw new Error(error.message);
    }

    // Fallback: LocalStorage
    let feedbacks = await getFeedbacks();
    feedback.id = 'temp_fb_' + Date.now();
    feedback.data = new Date().toLocaleDateString('pt-BR');
    feedbacks.unshift(feedback);
    localStorage.setItem('sonharte_depoimentos', JSON.stringify(feedbacks));
    return feedback;
  }

  // AUTENTICAÇÃO DO ADMIN
  async function login(email, password) {
    const sb = getSupabaseClient();
    if (sb) {
      const { data, error } = await sb.auth.signInWithPassword({
        email: email,
        password: password
      });
      if (error) throw new Error(error.message);
      return data.user;
    }

    // Fallback: LocalStorage (Simulado)
    if (email === 'adm@sonharte.com' && password === 'sonharteMy') {
      const mockUser = { email: email, role: 'admin', id: 'mock_admin_uid' };
      sessionStorage.setItem('sonharte_admin_user', JSON.stringify(mockUser));
      return mockUser;
    } else {
      throw new Error('Credenciais offline incorretas');
    }
  }

  function logout() {
    const sb = getSupabaseClient();
    if (sb) {
      sb.auth.signOut();
    }
    sessionStorage.removeItem('sonharte_admin_user');
  }

  async function getCurrentUser() {
    const sb = getSupabaseClient();
    if (sb) {
      const { data: { user } } = await sb.auth.getUser();
      return user;
    }

    const local = sessionStorage.getItem('sonharte_admin_user');
    return local ? JSON.parse(local) : null;
  }

  // Exportar serviço global
  window.SonharteDB = {
    getProducts,
    saveProduct,
    deleteProduct,
    getFeedbacks,
    saveFeedback,
    deleteFeedback,
    login,
    logout,
    getCurrentUser
  };
})();
