<?php

function DBconnector(){
	
	$connect = mysqli_connect("localhost", "root", "commandos", "xl_loja");
	
	if(!$connect){
		die("Unable to connect on database");
    }else{
		return $connect;
	}
	
}

?>