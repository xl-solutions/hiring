CREATE PROCEDURE sp_ImportarProdutos          
    @Fabricante nvarchar(100),    
 @Modelo nvarchar(100),    
 @Cor nvarchar(100),  
 @Quantidade int,    
 @Preco numeric,    
 @PlanoVenda nvarchar(3)    
AS       
    
  DECLARE @Existe Int    
  DECLARE @CdFabricante Int    
  DECLARE @CdModelo Int    
  DECLARE @CdEstoque Int    
  DECLARE @TotQtde Int    
BEGIN    
     
 --INSERINDO INFORMAÇÕES DO FABRICANTE    
 SELECT @Existe = COUNT(NOME)     
 FROM Fabricante     
 WHERE NOME = @Fabricante;    
    
 IF ( @Existe = 0 )     
  BEGIN    
   INSERT INTO FABRICANTE ( NOME ) VALUES ( @Fabricante );      
   Select @CdFabricante = SCOPE_IDENTITY();    
  END;    
 ELSE    
  SELECT @CdFabricante = CodFabricante FROM FABRICANTE WHERE NOME = @Fabricante;    
  SET @Existe = 0;    
      
 --INSERINDO INFORMAÇÕES DO MODELO    
 SELECT @Existe = COUNT(Descricao)     
 FROM ModeloFabricante     
 WHERE Descricao = @Modelo;    
     
 IF ( @Existe = 0 )     
  BEGIN    
   INSERT INTO ModeloFabricante ( CodFabricante, Descricao ) VALUES ( @CdFabricante, @Modelo );    
   Select @CdModelo = SCOPE_IDENTITY();    
  END;    
 ELSE    
  SELECT @CdModelo = CodModelo FROM ModeloFabricante WHERE Descricao = @Modelo;    
    
 --INSERINDO INFORMAÇÕES DO ESTOQUE    
 SELECT @Existe = COUNT(CodEstoque)     
 FROM Estoque     
 WHERE CodModelo = @CdModelo    
   and PlanoVenda = @PlanoVenda  
   and Cor = @Cor;    
     
 IF ( @Existe = 0 )     
  BEGIN    
   INSERT INTO Estoque ( CodModelo, Cor, Quantidade, Preco, PlanoVenda ) VALUES ( @CdModelo, @Cor, @Quantidade, @Preco, @PlanoVenda );       
  END;    
 ELSE      
  Update Estoque set Quantidade = Quantidade + @Quantidade, Preco = @Preco    
  where CodModelo = @CdModelo        
 and PlanoVenda = @PlanoVenda  
 and Cor = @Cor;    
     
END;