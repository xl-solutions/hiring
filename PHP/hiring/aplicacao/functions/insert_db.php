<?php

function insert_db($manufacturer, $model, $color, $carrier_plan_type, $quantity, $price, $file_name){
	
	include_once("DBconnector.php");
	$connect = DBconnector();

	$insert = $connect->query("INSERT INTO xl_loja.inventario (manufacturer,
															   model,
															   color,
															   carrier_plan_type,
														       quantity,
														       price,
														       insert_date)
													   VALUES('$manufacturer',
															  '$model',
														      '$color',
														      '$carrier_plan_type',
													          '$quantity',
														      '$price',
															  CURDATE())");
																						   
	if($insert){
		$return = "Dados do arquivo $file_name, foram importados com Sucesso!<br/>";
	}else{
		$return = "Falha ao importar o arquivo $file_name.<br/>Abaixo a descrição do erro:<br/>$connect->error<br/>"; 
	}
			
return $return;

$connect->close();
	
}

?>