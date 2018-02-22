<?php
define('ICO', '/thmsoft/hiring/PHP/images/hiring.ico');
define('ICO_NOBG', '/thmsoft/hiring/PHP/images/hiring.ico');
define('URL', '/thmsoft/hiring/PHP/');

require_once('classes/misc/functions.php');
require_once('classes/control/AbstractControl.php');
require_once('classes/model/AbstractModel.php');
require_once('classes/model/Model.php');
require_once('classes/model/ModelPublic.php');
require_once('classes/model/ModelInventoryFile.php');
require_once('classes/model/ModelInventoryItem.php');
require_once('classes/view/View.php');
require_once('classes/view/json/JSON.php');
require_once('classes/view/json/JSONPublic.php');
require_once('classes/view/json/JSONInventoryFile.php');
require_once('classes/view/json/JSONInventoryItem.php');
require_once('classes/view/html/HTMLBuilder.php');
require_once('classes/view/html/HTML.php');
require_once('classes/view/html/HTMLPublic.php');
require_once('classes/view/html/HTMLInventoryFile.php');
require_once('classes/view/html/HTMLInventoryItem.php');

class Control extends AbstractControl {

	public function __construct( ) {
		session_start( );
		parent::__construct( );
	}

	protected function execute_public( ) {
		$this->initialize_mv('Public');
		switch(array_shift($this->command)) {
			case 'INVENTORY_FILE': $this->execute_inventory_file( ); break;
			case 'INVENTORY_ITEM': $this->execute_inventory_item( ); break;
			case 'RETRIEVE_BEHAVIOR': $this->executor->retrieve_behavior( ); break;
			case 'RETRIEVE_DECORATION': $this->executor->retrieve_decoration( ); break;
			default: $this->executor->retrieve_default( ); break;
		}
	}

	private function execute_inventory_item( ) {
		$this->initialize_mv('InventoryItem');
		switch(array_shift($this->command)) {
			case 'EDIT': $this->executor->edit( ); break;
			case 'MATCH': $this->executor->match( ); break;
			case 'REMOVE': $this->executor->remove( ); break;
			default: $this->executor->retrieve_default( ); break;
		}
	}

	private function execute_inventory_file( ) {
		$this->initialize_mv('InventoryFile');
		switch(array_shift($this->command)) {
			case 'UPLOAD': $this->executor->upload( ); break;
		}
	}

}
?>
