<?php
class ModelInventoryFile extends Model {

	public function upload(string &$filepath) {
		$this->begin_transaction( );
		$handle = null;
		$handle = fopen($filepath, 'r');
		$row = fgetcsv($handle);
		while(($row = fgetcsv($handle)) !== false) {
			$row = $this->parse_row($row);
			if(!$row)
				continue;
			$this->add_item($row);
		}
		fclose($handle);
		$this->commit( );
		return array('fail' => false, 'message' => LG_SUCCESS, 'url' => URL.'HTML/INVENTORY_ITEM');
	}

	private function add_item(array &$data) {
		$sql = "INSERT INTO InventoryItem (model_id, color_id, carrier_plan_type_id, quantity, price) VALUES ({$data['model_id']}, {$data['color_id']}, {$data['carrier_plan_type_id']}, {$data['quantity']}, {$data['price']})";
		$this->query($sql);
	}

	private function parse_row(array &$row) {
		$model = trim($row[1]);
		$color = trim($row[2]);		
		$carrier_plan_type = trim($row[3]);
		$output['quantity'] = trim($row[4]);
		$output['price'] = trim($row[5]);
		$output['model_id'] = $this->parse_model($model);
		$output['color_id'] = $this->parse_color($color);
		$output['carrier_plan_type_id'] = $this->parse_carrier_plan_type($carrier_plan_type);
		foreach($output as $key => $value)
			if(empty($value))
				throw new Exception(LG_FAILURE_CORRUPTED_UPLOADED_FILE);
		return $output;
	}

	private function parse_col(string $table, string $primary_key, string $column, string &$data) {
		$sql = "SELECT $primary_key, $column FROM $table";
		$rs = $this->fetch_all($sql);
		$size = count($rs);
		for($i = 0; $i < $size; ++$i)
			if(preg_match("/{$rs[$i][$column]}/i", $data))
				return $rs[$i][$primary_key];
		return false;
	}

	private function parse_carrier_plan_type(string &$carrier_plan_type) {
		return $this->parse_col('CarrierPlanType', 'carrier_plan_type_id', 'carrier_plan_type', $carrier_plan_type);
	}

	private function parse_color(string &$color) {
		return $this->parse_col('Color', 'color_id', 'color', $color);
	}

	private function parse_model(string &$model) {
		return $this->parse_col('Model', 'model_id', 'model', $model);
	}

}
?>
