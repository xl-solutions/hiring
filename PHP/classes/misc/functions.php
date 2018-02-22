<?php
function extract_data_by_key($data, $keys) {
	$rows = array( );
	$size = count($data);
	for($i = 0; $i < $size; ++$i) {
		$cols = array( );
		foreach($data[$i] as $key => $value)
			if(in_array($key, $keys))
				$cols[$key] = $value;
		$rows[ ] = $cols;
	}
	return $rows;
}

function parse_bytes_to_human_readable($bytes) {
	$units = array("bytes", "KB", "MB", "GB", "TB");
	if($bytes == 0)
		return '0 bytes';
	$i = (int) log($bytes)/log(1024);
	return round($bytes/pow(1024, $i), 2).' '.$units[$i];
}

function parse_human_readable_to_bytes($size) {
	$unit = preg_replace('/[^bkmgtpezy]/i', '', $size);
	$size = preg_replace('/[^0-9\.]/', '', $size);
	if($unit)
		return round($size * pow(1024, stripos('bkmgtpezy', $unit[0])));
	else return round($size);
}

function parse_money_to_number($money, $symbol = 'R$', $decimals_sep = ',', $thousands_sep = ' ') {
	return (float) str_replace(array($symbol, $thousands_sep, $decimals_sep), array('', '', '.'), $money);
}

function parse_number_to_money($number, $symbol = 'R$', $decimals_sep = ',', $thousands_sep = ' ') {
	return "$symbol ".number_format($number, 2, $decimals_sep, $thousands_sep);
}

function retrieve_children_functions($parent, $function) {
	$content = '';
	foreach(get_declared_classes( ) as $class)
		if(is_subclass_of($class, $parent))
			$content .= $class::$function( );
	return $content;
}

?>
