CREATE TABLE Fabricante (
    CodFabricante int IDENTITY(1,1) PRIMARY KEY,
    Nome nvarchar(255) NOT NULL    
);

CREATE TABLE ModeloFabricante (
    CodModelo int IDENTITY(1,1) PRIMARY KEY,
	CodFabricante int NOT NULL,
    Descricao nvarchar(255) NOT NULL,
	CONSTRAINT FK_CodFabricanteMod FOREIGN KEY (CodFabricante)
    REFERENCES Fabricante(CodFabricante)
);

CREATE TABLE Estoque (
    CodEstoque int IDENTITY(1,1) PRIMARY KEY,
	CodProduto int NOT NULL, 
	Cor		   nvarchar(20) not null,
    Quantidade  int NOT NULL,
	Preco numeric NOT NULL,
	PlanoVenda nvarchar(3) NOT NULL
	CONSTRAINT FK_CodEstoqueProd FOREIGN KEY (CodProduto)
    REFERENCES Produtos(CodProduto)
);