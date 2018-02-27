declare @ass_id int = 3
declare @cre_id int = 10356329
declare @imp_id int = 910051

--DECLARE @pathbullk varchar(100)
--SET @pathbullk = dbo.F_CONF_SISTEMA(2,5)
--SET @pathbullk =  REPLACE(@pathbullk,'\\','\')

--DECLARE @s varchar(5000)
--SET @s= CONCAT(
-- ' BULK INSERT tb_imp_padrao_22 FROM ''',@pathbullk,'\',convert(varchar(100),@imp_id),'_22.csv'' WITH(FIELDTERMINATOR = '';'',ROWTERMINATOR = ''\n'', CODEPAGE = ''ACP'')')
--print(@s)
--exec(@s)


	
	INSERT INTO tb_evento_parcela(evc_id,par_id)
	SELECT acp.aco_id, acp.par_id
	FROM tb_acordo_parcela acp
	INNER JOIN tb_imp_acordo aco ON aco.evc_id = acp.aco_id
	WHERE aco.Imp_Id = @imp_id
	GROUP BY acp.aco_id, acp.par_id

	UPDATE pst
	SET pst.aco_id = acp.aco_id
	FROM tb_parcela_status pst
	INNER JOIN tb_acordo_parcela acp ON acp.par_id = pst.par_id
	INNER JOIN tb_imp_acordo aco ON aco.evc_id = acp.aco_id
	WHERE aco.Imp_Id = @imp_id

	
	INSERT INTO tb_acordo_parametro(aco_id)
	SELECT evc_id 
	FROM tb_imp_acordo
	WHERE Imp_Id = @imp_id
	GROUP BY evc_id

	INSERT INTO tb_acordo_campanha(aco_id,neg_id,aca_id_credor_calculo)
	select evc_id, neg_id, 0
	FROM tb_imp_acordo
	WHERE Imp_Id = @imp_id
	GROUP BY evc_id, neg_id

	UPDATE neg
	SET neg_atualizar = 1, est_id = 2
	FROM tb_negociacao neg
	INNER JOIN tb_imp_acordo aco ON aco.neg_id = neg.neg_id
	WHERE aco.Imp_Id = @imp_id
END
