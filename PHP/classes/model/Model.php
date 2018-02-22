<?php
/*
******************************************************************
Copyright (c) 2014, Thiago Medeiros de Menezes
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are not permitted without specific prior written
permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.
******************************************************************
*/

class Model extends AbstractModel {

	public function __construct(&$control) {
		parent::__construct($control);
		$this->connect( );
	}

	public function begin_transaction($connection = "HIRING") {
		parent::begin_transaction($connection);
	}

	public function connect( ) {
		$this->pdo['HIRING'] = new PDO('mysql:host=localhost;dbname=HIRING', 'hiring', '@t1r310P@uN0G@t0', [PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true, PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"]);
		$this->pdo["HIRING"]->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}

	public function fetch_all($sql, $params = null, $connection = 'HIRING') {
		return parent::fetch_all($sql, $params, $connection);
	}

	public function get_last_inserted_id($connection = 'HIRING') {
		return parent::get_last_inserted_id($connection);
	}

	public function query($sql, $params = null, $connection = 'HIRING') {
		parent::query($sql, $params, $connection);
	}

}

?>

