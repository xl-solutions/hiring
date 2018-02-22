<?php
class HTMLInventoryItem extends HTMLPublic {

	public function retrieve_behavior( ) {
		$behavior = '
			function app_inventory_item( ) {
				app_init_table(".table");
				app_init_controls({ upload: "'.URL.'HTML/INVENTORY_FILE/UPLOAD", match: "'.URL.'HTML/INVENTORY_ITEM/MATCH", remove: "'.URL.'JSON/INVENTORY_ITEM/REMOVE" });
				$(".app-input-search").keypress(function(e) {
					if(e.which == 13)
						$("main .btn[appcmd=MATCH]").trigger("click");
				});
			}
		';
		return $behavior;
	}

	public function retrieve_decoration( ) {
		return null;
	}

	public function retrieve_default( ) {
		$items = $this->control->model->find_all( );
		echo $this->build_content($items);
	}

	public function match( ) {
		$items = $this->control->model->match($_POST['params']);
		echo $this->build_content($items);
	}

	private function build_content($items) {
		$size = count($items);
		for($i = 0; $i < $size; ++$i) {
			$items[$i]['uprice'] = parse_number_to_money($items[$i]['uprice']);
			$items[$i]['qprice'] = parse_number_to_money($items[$i]['qprice']);
		}
		$data['head'] = array(LG_MANUFACTURER, LG_MODEL, LG_COLOR, LG_PLAN, LG_QUANTITY, LG_UNIT_PRICE, LG_PRICE);
		$data['body'] = $items;
		$controls = $this->build_controls( );
		return $this->build_header(LG_INVENTORY).'
			<div class="container">
				<div class="row">
					<div class="col">
						'.$controls['SELECT_ALL'].'
						<div class="btn-group">'.$controls['UPLOAD'].$controls['REMOVE'].'</div>
					</div>
					<div class="col-3">
						'.$controls['MATCH'].'
					</div>
				</div>
				<div class="row">
					<div class="col">
						<br />
						'.$this->build_table($data).'
					</div>
				</div>
			</div>
			<script type="text/javascript">app_inventory_item( );</script>
		';
	}

}
?>
