<?php
abstract class AbstractControl {

	public $model = null;
	public $view = null;

	protected $command = null;
	protected $executor = null;

	abstract protected function execute_public( );

	protected function __construct( ) {
		$_SESSION['ExceptionMessage'] = null;
		$_SESSION['ExceptionData'] = null;
		$_SESSION['ExceptionURL'] = URL;
		$_SESSION['ExceptionSignOut'] = false;
		$_SESSION['SystemUploadMax'] = parse_human_readable_to_bytes(ini_get('upload_max_filesize'));
	}

	public function execute($command = '') {
		try {
			$this->assign_language( );
			$this->assign_command($command);
			$this->assign_executor( );
			$this->format_input($_GET['params']);
			$this->format_input($_POST['params']);
			$this->execute_public( );
		}
		catch(Exception $e) { $this->execute_exception($e); }
	}

	private function execute_exception(&$exception) {
		$this->model->rollback( );
		$_SESSION['ExceptionMessage'] .= (!empty($_SESSION['ExceptionMessage']) && !empty($exception))? "\n".$exception->getMessage( ) : $exception->getMessage( );
		$this->view['JSON']->json(array('fail' => true, 'message' => $_SESSION['ExceptionMessage'], 'data' => $_SESSION['ExceptionData'], 'url' => $_SESSION['ExceptionURL']));
		error_log($_SESSION['ExceptionMessage']);
		if($_SESSION['ExceptionSignOut']) {
			session_unset( );
			session_destroy( );
			exit( );				
		}
	}

	protected function assign_command(&$command) {
		if(empty($command)) {
			$split = explode('?', $_SERVER['REQUEST_URI']);
			$this->command = array_slice(explode('/', reset($split)), 3);
		}
		else $this->command = explode('/', $command);
	}

	protected function assign_language( ) {
		$language = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
		switch($language) {
			case 'pt':
			default: require_once('languages/portuguese.php'); break;
		}
	}

	private function format_input(&$input) {
		if(isset($input)) {
			if(is_array($input))
				$input = json_decode(str_replace('""', "null", json_encode($input)), true);
			else $input = empty($input)? null : $input;
		}
	}

	protected function assign_executor( ) {
		switch(array_shift($this->command)) {
			case 'JSON': $this->executor = &$this->view['JSON']; break;
			default: $this->executor = &$this->view['HTML']; break;
		}
	}

	protected function initialize_mv($class) {
		$model = "Model$class";
		$json = "JSON$class";
		$html = "HTML$class";
		$this->model = new $model($this);
		$this->view['JSON'] = new $json($this);
		$this->view['HTML'] = new $html($this);
	}

}
?>
