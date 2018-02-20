<?php

include_once("functions/insert_db.php");

if(($_FILES["arquivo_input"]["name"] != null) AND ($_FILES["arquivo_input"]["size"] > 0 )){ 							//Se o arquivo for selecionado, e não estiver vazio (tamanho > 0).

	$file_name = $_FILES["arquivo_input"]["name"]; 																		//Nome original do arquivo na máquina cliente
	$ext = explode(".", $file_name);			   
	$extension = end($ext);																								//Obtém a extensão do arquivo

	if($extension != "csv"){																							//Se a extensão for diferente de .csv, retorna um erro em ALERT()
			echo"<script language='javascript' type='text/javascript'>alert('A extensão do arquivo deve ser .csv');window.location.href='upload.php'</script>"; 
	}else{
			$tmp_file = $_FILES["arquivo_input"]["tmp_name"]; 															//Nome temporário do arquivo no qual o mesmo foi salvo no servidor
			$arquivo_csv = fopen($tmp_file, 'r');																		//Abre o arquivo em modo de leitura (read)
			$row = TRUE;																					    		//Primeira linha? TRUE
		
				while (($data = fgetcsv($arquivo_csv, 1000, ",")) !== FALSE){											//Obtém linha do ponteiro do arquivo e analisa os campos CSV, se diferente de falso
		
						if($row == FALSE){                      												 		//Se primeira linha = TRUE, senao FALSE.
													
							$insert = insert_db($data[0],$data[1],$data[2],$data[3],$data[4],$data[5], $file_name);		//chama a funcao insert_db para inserir os dados no banco
													 
						}																						
					$row = FALSE;																			    		//Após o primeiro ciclo do while. Primeira linha? FALSE
				 }

			echo $insert;
			
			?><input type="button" value="Voltar" onClick="window.location.href='upload.php';"/><?php
			
			fclose($arquivo_csv);
		}

}else{
		echo"<script language='javascript' type='text/javascript'>alert('Arquivo não selecionado ou vazio!');window.location.href='upload.php'</script>"; 
}
?>