<?php

	include_once("../functions/DBconnector.php");
	$connect = DBconnector();

	$output = '';

	if (isset($_POST["query"])){
	
		$search = $_POST["query"];
	
		$query = "SELECT * FROM xl_loja.ultimo_inventario
				  WHERE manufacturer LIKE '%".$search."%'
			      OR model LIKE '%".$search."%'
			      OR carrier_plan_type LIKE '%".$search."%';
			      ";
	
	}else{
		$query = "SELECT * FROM xl_loja.ultimo_inventario;";
	}

	$result = $connect->query($query);

	$query_date = "SELECT DATE_FORMAT(insert_date, '%d/%m/%Y') AS data_insert from xl_loja.ultimo_inventario;";
	$result_date = $connect->query($query_date);
	$date_insert = $result_date->fetch_array();

	if($result->num_rows > 0){
		$output .= '
			<table align="center" style="margin: 2% auto; border: 0px solid; width:100%">
				<tr>
					<th colspan="6" style="text-align:right">Data último inventário: '.$date_insert[0].'</th>
				</tr><tr>
					<th>Fabricante</th>
					<th>Modelo</th>
					<th>Cor</th>
					<th>Tipo Plano</th>
					<th>Quantidade</th>
					<th>Preço</th>
				</tr>
		';
	while($dado = $result->fetch_array()){
		$output .= '
			<tr>
				<td>'.$dado[1].'</td>
				<td>'.$dado[2].'</td>
				<td>'.$dado[3].'</td>
				<td>'.$dado[4].'</td>
				<td>'.$dado[5].'</td>
				<td>'.$dado[6].'</td>
			</tr>
		';
			}
		
	echo $output;
	
	}else{
		echo "Nenhum Dado Encontrado";
	}

$connect->close();

?>