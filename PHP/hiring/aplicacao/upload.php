<html> 
	<head> 

		<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" /> 
		<link rel="stylesheet" href="css/style.css" />
		<title>UPLOAD - XL Solutions</title> 
	</head> 

	<body> 

		<table>

			<form action="insert.php" method="post" enctype="multipart/form-data">
			<tr>
				<td><input type="file" name="arquivo_input"/></td>
				<td><input type="submit" name="enviar" value="Upload"/></td>
				<td><input type="button" value="Voltar" onClick="window.location.href='index.php';"/></td>
			</tr>
			</form>

		</table>

	</body>
<html>