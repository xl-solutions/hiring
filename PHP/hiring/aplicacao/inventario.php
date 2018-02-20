<?php

	include_once("functions/DBconnector.php");
	$connect = DBconnector();

	$query_manufacturer = "select * from xl_loja.ultimo_inventario group by manufacturer;";
	$select_manufacturer = $connect->query($query_manufacturer);

	$query_model = "select * from xl_loja.ultimo_inventario group by model;";
	$select_model = $connect->query($query_model);

	$query_plan = "select * from xl_loja.ultimo_inventario group by carrier_plan_type;";
	$select_plan = $connect->query($query_plan);

?>
	<html> 
		<head>
			<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" /> 
			<script src="js/jquery.min.js"></script>
			<title>Inventario</title>
		</head>	
		
		<body>
			<table align='center' style="margin: 2% auto; border: 1px solid; width:70%">
				<tr>
					<td>
						<label>Fabricante</label><br/>
						<select id="manufacturer" style="width:90%">
							<option value="">Selecionar...</option>
							<?php while($dados_manufacturer = $select_manufacturer->fetch_array()){?>
							<option value="<?php echo $dados_manufacturer[1];?>"><?php echo $dados_manufacturer[1];?></option>
							<?php }?>
						</select>
					</td><td>
						<label>Modelo</label><br/>
						<select id="model" style="width:90%">
							<option value="">Selecionar...</option>
							<?php while($dados_model = $select_model->fetch_array()){?>
							<option value="<?php echo $dados_model[2];?>"><?php echo $dados_model[2];?></option>
							<?php }?>
						</select>
					</td><td>
						<label>Plano</label><br/>
						<select id="plan" style="width:90%">
							<option value="">Selecionar...</option>
							<?php while($dados_plan = $select_plan->fetch_array()){?>
							<option value="<?php echo $dados_plan[4];?>"><?php echo $dados_plan[4];?></option>
							<?php }?>
						</select>
					</td>
  
				</tr><tr>
					<td colspan="3">
						<div id="result"></div>
					</td>
				</tr>
			</table>

			<input type="button" value="Voltar" onClick="window.location.href='index';"/>

		<script language="javascript" type="text/javascript" src="js/busca_inventario.js"></script>
   
		</body>
		
	</html>

