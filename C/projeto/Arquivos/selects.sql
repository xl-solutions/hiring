select * from tb_layout_importacao where lay_tipo = 1




--insert into tb_layout_importacao (lay_id,lay_nome, crt_id, lay_tipo) values (104,'Importacao TAQI', 528,1)

--update tb_layout_importacao set crt_id = 528 where lay_id = 104 and crt_id = 524

--insert into tb_credor_tipo (crt_nome) values ('TAQI')

--update tb_credor_tipo set crt_nome = 'WiseUp' where crt_id = 524


select * from tb_credor_tipo


SELECT cre.cre_id, cre.cre_sigla, cre.crt_id, cre.cre_cod_ass, cre.cre_ativo, cre.ass_id, cre.cob_tipo, cre.cre_logo, pej_fantasia, pes_nome, pes_cpfcnpj, crt_nome, ema.*, ass.ass_credor, cre.cre_imp_ws
 FROM tb_credor cre with(Nolock) 
 INNER JOIN tb_assessoria ass WITH(NOLOCK) ON ass.ass_id = cre.ass_id
 INNER JOIN tb_credor_tipo crt  with(nolock) on crt.crt_id  = cre.crt_id
 INNER JOIN tb_pessoa pes  with(nolock) on cre_id  = pes_id
 INNER JOIN tb_pessoa_juridica pej  with(nolock) on pej_id  = pes_id
 LEFT JOIN tb_pessoa_email ema on ema.pes_id = pes.pes_id AND ema.ema_ativo = 1
 LEFT JOIN tb_unidade und WITH(NOLOCK) ON und.und_id = cre.cre_id
WHERE cre.ass_id = 3
ORDER BY pej_fantasia



select * from vw_credor where ass_id = 3


select * from tb_credor where cre_id  = 10356329
--update tb_credor set crt_id = 528 where cre_id = 10356329


select *
from tb_credor_tipo crt
inner join tb_integracao_credor_tipo cti on cti.crt_Id = crt.crt_Id
WHERE ass_id = 3


select * from tb_integracao_credor_tipo


select * from tb_tarefa_execucao order by tae_id desc

--IdImportacao=908930&LayoutPadrao=False
--IdImportacao=908933&LayoutPadrao=False
--IdImportacao=908945&LayoutPadrao=False
--IdImportacao=908950&LayoutPadrao=False
--IdImportacao=908957&LayoutPadrao=True
--IdImportacao=908961&LayoutPadrao=True
--IdImportacao=909978&LayoutPadrao=False
--IdImportacao=909979&LayoutPadrao=False
--IdImportacao=909980&LayoutPadrao=False
--IdImportacao=909981&LayoutPadrao=False
--IdImportacao=909982&LayoutPadrao=False
--IdImportacao=909984&LayoutPadrao=False
--IdImportacao=909985&LayoutPadrao=False
--IdImportacao=909986&LayoutPadrao=False
--IdImportacao=910004&LayoutPadrao=False
--IdImportacao=910005&LayoutPadrao=False
--IdImportacao=910006&LayoutPadrao=False
--IdImportacao=910007&LayoutPadrao=False
--IdImportacao=910008&LayoutPadrao=False
--IdImportacao=910009&LayoutPadrao=False
--IdImportacao=910014&LayoutPadrao=False
--IdImportacao=910020&LayoutPadrao=False
--IdImportacao=910022&LayoutPadrao=False
--IdImportacao=910023&LayoutPadrao=False
--IdImportacao=910031&LayoutPadrao=False
--IdImportacao=910032&LayoutPadrao=False
--IdImportacao=910033&LayoutPadrao=False
--IdImportacao=910034&LayoutPadrao=False
--IdImportacao=910035&LayoutPadrao=False
--IdImportacao=910036&LayoutPadrao=False
--IdImportacao=910037&LayoutPadrao=False
--IdImportacao=910038&LayoutPadrao=False
--IdImportacao=910039&LayoutPadrao=False
--IdImportacao=910040&LayoutPadrao=False
--IdImportacao=910041&LayoutPadrao=False
--IdImportacao=910042&LayoutPadrao=False
--IdImportacao=910043&LayoutPadrao=False
--IdImportacao=910044&LayoutPadrao=False
--IdImportacao=910046&LayoutPadrao=False
--IdImportacao=910051&LayoutPadrao=False
--IdImportacao=910053&LayoutPadrao=False
--IdImportacao=910054&LayoutPadrao=False
--IdImportacao=910055&LayoutPadrao=False
--IdImportacao=910056&LayoutPadrao=False
--IdImportacao=910057&LayoutPadrao=False
--IdImportacao=910058&LayoutPadrao=False
--IdImportacao=910059&LayoutPadrao=False

SELECT cfp.* 
FROM tb_configuracao_valor cfp
WHERE cfg_id = 15
AND cfp_id = 16
AND cre_id = 10356329
AND (ass_id IS NULL AND cre_id IS NOT NULL AND equ_id IS NULL AND ope_id IS NULL AND bcf_id IS NULL)
ORDER BY cfp_id


select * from tb_configuracao where cfg_nome like '%padrão%'

select * from tb_configuracao_parametro where cfg_id = 15

select * from tb_configuracao_valor where cfg_id = 15 and cfp_id = 13

select top 10 * from tb_pessoa

select top 100  pef_Estado_Civil from tb_pessoa_fisica where pef_Estado_Civil = 'Solteiro'

sp_helptext 'sp_importacao_padrao_txt'


select top 10 * from tb_pessoa_telefone 

select top 10* from tb_pessoa_endereco

select top 10 * from tb_pessoa_telefone order by tel_id desc


select * from tb_imp_telefone


select * from tb_importacao where imp_id = 908950


select * from tb_imp_padrao_01 where imp_id = 910036 

delete from  tb_imp_cliente where imp_id = 910036 

--delete from tb_imp_padrao_01 where imp_id = 909981
--update tb_imp_padrao_01 set TipoPessoa = 1 where imp_id = 908950

select * from tb_pessoa where pes_cpfcnpj = '9089056271'

select * from tb_pessoa where imp_id = 910041

select * from tb_pessoa where pes_id in (10357352,10357353,10357354,10357355)

select * from tb_cliente_credor where cli_id in  (10357352,10357353,10357354,10357355)

select * from tb_pessoa_fisica where pef_id in (10357352,10357353,10357354,10357355)


select * from tb_pessoa_telefone where pes_id in (10357353)




select * from tb_pessoa_endereco where pes_id in (10357354)

select * from tb_contrato where cli_id = 10357355

select * from tb_parcela where imp_id = 909982

select * from tb_pessoa_telefone where pes_id in (10356330,10356331)

 select top 10 * from tb_pessoa_endereco where pes_id in (10356330,10356331)
 

 select * from tb_imp_padrao_01 where imp_id = 909982

 --update tb_imp_padrao_03 set tipoendereco =1 where imp_id = 908950


 select * from tb_imp_critica where imp_id = 908950

 --delete from tb_imp_critica where imp_id = 908950


 select * from tb_credor_filial where imp_id = 908950

 select * from tb_produto where imp_id = 908950

 select * from tb_contrato where cli_id in (10356330,10356331)

 select * from tb_cliente_evento where cli_id = 10357392

 select aco_numero from tb_acordo where aco_id = 122211529

 select * from tb_imp_padrao_06 where imp_id = 908950

 --delete from tb_imp_padrao_06 where imp_id = 908950


 select * from vw_operador where ass_id = 3 and ope_login like 'suporte%'

 select * from tb_parcela where neg_id = 17789796

 select * from tb_contrato where con_numero = '00000000000000930191'

 select * from tb_negociacao where con_id = 13996019

 select top 10 * from tb_Pessoa_telefone order by tel_id desc


 select top 10 * from tb_pessoa order by pes_id desc

 select top 10 * from tb_pessoa_fisica order by pef_id desc

 sp_helptext 'sp_importacao_padrao_txt'





sp_helptext 'sp_importacao_padrao_txt'


select * from tb_imp_critica where imp_id = 910044

--delete from tb_imp_critica where imp_id = 910044

select * from tb_imp_padrao_10 where imp_id = 910044

--delete from tb_imp_padrao_10 where imp_id = 910044

select * from tb_contrato where con_numero  = '00000000000000930102'

select * from tb_pessoa where pes_id = 10357392

--00000000000056250809

select * from tb_imp_padrao_20 where imp_id = 910035


select * from tb_imp_padrao_21 where imp_id =  910035


select * from tb_imp_padrao_22 where imp_id = 910035


select * from tb_imp_acordo where imp_id = 910035

--update tb_imp_padrao_20 set dataentrada = '2018-02-22' where imp_id = 910034

--update tb_imp_padrao_20 set  numeroparcelas = 2 where imp_id = 910035

--update tb_imp_padrao_21 set numerodaparcela = '002' where imp_id =  910035 and linha = 5

--update tb_imp_acordo set aco_num_parc = 2 where imp_id = 910035

select * from tb_imp_padrao_03 where imp_id = 910008



select * from tb_imp_padrao_10 where imp_id = 910008



select * from tb_imp_padrao_20 where imp_id = 910009

--update tb_imp_padrao_10 set DataEvento = '08/02/2018' where imp_id = 910008

--update tb_imp_padrao_10 set TipoEvento = 'Renegociação Finalizada' where imp_id = 910009


--delete from tb_imp_padrao_22 where imp_id = 910009


select * from tb_pessoa where imp_id = 910041

select * from tb_cliente_evento where cli_id = 10357391

select * from tb_acordo where aco_id = 122211563

select * from tb_contrato where cli_id = 10357391

select * from tb_negociacao where con_id = 13996019

select * from tb_parcela where neg_id = 17789796

select * from tb_acordo_parcelado where aco_id = 122211563


select con.*, pes.pes_cpfcnpj, par.par_valor, par.par_numero
from tb_contrato con inner join tb_negociacao neg on neg.con_id = con.con_id
inner join tb_parcela par on par.neg_id = neg.neg_id
inner join tb_pessoa pes on pes.pes_id = con.cli_id
where con.cli_id = 10357392

select * from tb_acordo_parcelado where aco_id = 122211529


select * from tb_acordo_parcela where aco_id = 122211529

select * from tb_cliente_evento where cli_id = 10357392

select * from tb_acordo where aco_id = 122211529

select top 10 * from tb_cliente_evento order by evc_id desc

select * from tb_cliente_credor where cli_id = 10357373

select * from tb_pessoa_telefone where pes_id = 10357373

select * from tb_pessoa_endereco where pes_id = 10357373

select * from tb_contrato where cli_id = 10357373

select * from tb_imp_parcela where imp_id = 910008

select * from tb_parcela where imp_id = 910020

--00000000000000029567

select * from tb_imp_parcela where imp_id = 910008


select * from tb_evento where ass_id = 3

select * from tb_imp_critica where imp_id = 910008

--delete from  tb_imp_critica where imp_id = 910009

select * from tb_imp_padrao_10 p10 inner join tb_cliente_credor cc
on cc.ccl_codigo = p10.ChaveCliente and cc.cre_id = 10356329
where p10.imp_id = 910008

--Contrato não localizado Para Chave do Cliente 00104246014 | Contrato 00000000000000029567


select top 10 * from tb_pessoa_fisica order by pef_id desc

select * from tb_imp_padrao_01 where imp_id = 910020


select * from tb_imp_critica where imp_id = 910020


SELECT DISTINCT cli.cli_id, pes_nome, pes_cpfcnpj, pes.ass_id 
FROM tb_cliente cli with(Nolock) 
INNER JOIN tb_pessoa pes with(nolock) on cli_id  = pes_id
LEFT JOIN tb_contrato con with(nolock) on con.cli_id = cli.cli_id
WHERE cli.cli_id = 10357370
ORDER BY pes_nome


SELECT *
FROM tb_pessoa_atualizacao pea
inner join tb_pessoa pes on pea.pes_id = pes.pes_id
left join tb_pessoa_telefone tel on tel.tel_id = pea.tel_id
left join tb_pessoa_email ema on ema.ema_id = pea.ema_id
left join tb_pessoa_endereco [end] on [end].end_id = pea.end_id
inner join tb_operador ope on ope.ope_id = pea.ope_id
WHERE pea.pes_id = 10357370
ORDER BY pea.pea_data desc




select par.par_inclusao, con.con_numero 
from tb_contrato con inner join tb_negociacao neg on neg.con_id = con.con_id
inner join tb_parcela par on par.neg_id = neg.neg_id
where cli_id = 10357370 AND
par_numero = '005' and par_valor ='33.34'


SELECT par.par_inclusao, con.cli_id
FROM 
tb_parcela par INNER JOIN tb_negociacao neg ON neg.neg_id = par.neg_id 
INNER JOIN tb_contrato con ON con.con_id = neg.con_id
WHERE con.con_numero = '00000000000009575404' AND par.par_numero = '005' AND par.par_valor ='33.34'

select * from tb_parcelamento_parcela


select * from tb_pessoa where pes_id = 10357370

select * from tb_estagios


SELECT par.*
 FROM tb_parcela par INNER JOIN tb_negociacao neg ON neg.neg_id = par.neg_id
 INNER JOIN tb_contrato con ON con.con_id = neg.con_id
WHERE par_numero ='010'
AND con_numero = '00000000000006802934'


select top 10 * from tb_acordo order by aco_id desc


select * from tb_acordo where imp_id = 910031


select * from tb_importacao where imp_id = 910041


select * from tb_pessoa_endereco where pes_id = 10357373


select * from tb_cliente_evento where evc_id = 122211491


select * from tb_acordo_parcela where aco_id = 122211491


select * from tb_acordo_parcelado where aco_id = 122211491


select * from tb_parcela where par_id in (125048927,125048928)

select * from tb_pessoa where pes_id = 10357373


declare @chaveCPFCNPJ bit
    set @chaveCPFCNPJ =  case when  UPPER(DBO.F_CONF_CREDOR(10356329,15,1))='CPFCNPJ' then 1 else  0 end;    


SELECT c.ass_id, c.imp_id, c.nome, ISNULL(c.cpfcnpj, ''), p.pes_id
	FROM tb_imp_cliente c WITH(NOLOCK)
	LEFT JOIN tb_pessoa p WITH(NOLOCK) ON ( p.pes_nome=c.Nome OR @chaveCPFCNPJ =1)    --AND ISNULL(p.pes_cpfcnpj,'')=ISNULL(c.cpfcnpj,'') AND p.ass_id = c.ass_id AND p.ass_id = 3
	WHERE c.imp_id = 910036 
	--AND c.cli_id IS NULL
	--AND p.pes_id IS NULL
	GROUP BY  c.ass_id, c.imp_id, c.nome, c.cpfcnpj


	select pes.* from tb_imp_cliente c inner join tb_pessoa pes on pes.pes_cpfcnpj = c.cpfcnpj
	where c.imp_id = 910037

	select * from tb_pessoa where imp_id = 910036


	select * from tb_imp_critica where imp_id = 910037

	select * from tb_imp_padrao_14 where imp_id = 910037

	--delete from tb_imp_padrao_02 where imp_id = 910037

	--delete from tb_imp_padrao_14 where imp_id = 910037


	select top 10 * from tb_pessoa_referencia order by pes_id desc

	select * from tb_importacao where imp_id = 910057

	--SP_IMPORTACAO_PADRAO_TXT 3 ,10356329, 910058


	select top 10 * from tb_contrato_referencia where con_id = 13996010

	select * from tb_contrato where imp_id = 910038

	select * from tb_pessoa where imp_id = 910038

	select * from tb_pessoa where pes_id in (7558044,10357382)

	select * from tb_pessoa_telefone where prf_id in (7558044,10357382) and pes_id = 10357381


	SELECT  evc.*, aco.*, acp.*
FROM tb_acordo aco WITH(NOLOCK)
INNER JOIN tb_cliente_evento evc WITH(NOLOCK) on evc.evc_id = aco.aco_id
INNER JOIN tb_acordo_parametro acp WITH(NOLOCK) on acp.aco_id = aco.aco_id
WHERE aco.aco_numero = 213794
AND evc.ass_id = 3
AND aco_status IN (1,6)
ORDER BY aco.aco_data



select acp.acp_valor, acp.acp_vencimento
from tb_acordo aco inner join tb_acordo_parcelado acp on acp.aco_id = aco.aco_id
where aco_numero = 000000213952 and 
acp.acp_parcela = '001' and acp.acp_vencimento = '2017-12-08 00:00:00.000'



SELECT acp.acp_valor, aco.aco_numero
FROM tb_acordo aco INNER JOIN tb_acordo_parcelado acp ON acp.aco_id = aco.aco_id 
WHERE acp_parcela = '001'
AND acp_vencimento = '2017-12-08'
AND aco.aco_numero = 213952


SELECT acp.acp_valor
FROM tb_acordo aco INNER JOIN tb_acordo_parcelado acp ON acp.aco_id = aco.aco_id 
WHERE acp_parcela = '006'
AND acp_vencimento = '2017-12-10'
AND aco.aco_numero = 188298


SELECT acp.acp_valor,acp.acp_vencimento,acp.aco_id,acp.acp_parcela
FROM tb_acordo aco INNER JOIN tb_acordo_parcelado acp ON acp.aco_id = aco.aco_id 
WHERE --acp_parcela = '002'
--AND acp_vencimento = '2017-06-05'
 aco.aco_numero = 214219


select * from tb_acordo_parcelado where acp_id = 1124937


SELECT par.par_vencimento,par.par_valor, con.con_id
 FROM tb_parcela par INNER JOIN tb_negociacao neg ON neg.neg_id = par.neg_id
 INNER JOIN tb_contrato con ON con.con_id = neg.con_id
WHERE par_numero = '005'
AND par_valor = '299.93'
AND con_numero = '00000000000000930191'



select * from tb_parcela where neg_id = 17789796
