<?php
class ModelInventoryItem extends Model {

	public function find_all($modifier = null) {
		$sql = "
			SELECT ii.inventory_item_id, ma.manufacturer, mo.model, c.color, cpt.carrier_plan_type, ii.quantity, ii.price AS uprice, (ii.quantity*ii.price) AS qprice
			FROM InventoryItem AS ii 
			INNER JOIN CarrierPlanType AS cpt ON cpt.carrier_plan_type_id = ii.carrier_plan_type_id
			INNER JOIN Color AS c ON c.color_id = ii.color_id
			INNER JOIN Model AS mo ON mo.model_id = ii.model_id
			INNER JOIN Manufacturer AS ma ON ma.manufacturer_id = mo.manufacturer_id
			$modifier
			ORDER BY qprice
		";
		$rs = $this->fetch_all($sql);
		return $rs;
	}

	public function find_by_id(int &$id) {
		$rs = $this->find_all("WHERE ii.inventory_item_id = $id");
		return $rs[0];
	}

	public function match(string &$term) {
		return $this->find_all("WHERE ma.manufacturer LIKE '%$term%' OR mo.model LIKE '%$term%' OR cpt.carrier_plan_type LIKE '%$term%'");
	}

	public function remove(&$ids) {
		$ids = "'".implode("','", $ids)."'";
		$this->begin_transaction( );
		$this->query("DELETE FROM InventoryItem WHERE inventory_item_id IN ($ids)");
		$this->commit( );
		return array('fail' => false, 'message' => LG_SUCCESS, 'url' => URL."HTML/INVENTORY_ITEM");
	}

}
?>
