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

class AbstractModel {

	public $control = null;
	public $pdo = array( );

	public function __construct(&$control) {
		$this->control = $control;
		foreach($this->pdo as $connection)
			$connection->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
	}

	public function begin_transaction($connection) {
		$this->pdo[$connection]->beginTransaction( );
	}

	public function commit( ) {
		foreach($this->pdo as $pdo) {
			if($pdo->inTransaction( ))
				$pdo->commit( );
		}
	}

	public function fetch_all($sql, $params = NULL, $connection) {
		$stmts = $this->pdo[$connection]->prepare($sql);
		$stmts->execute($params);
		return $stmts->fetchAll(\PDO::FETCH_ASSOC);
	}

	public function get_last_inserted_id($connection) {
		return $this->pdo[$connection]->lastInsertId( );
	}

	public function rollback( ) {
		foreach($this->pdo as $pdo) {
			if($pdo->inTransaction( ))
				$pdo->rollback( );
		}
	}

	public function query($sql, $params = NULL, $connection) {
		if(isset($_SESSION['UserID']))
			$this->pdo[$connection]->query("SET @user_id = {$_SESSION['UserID']}");
		$this->pdo[$connection]->query("SET NAMES 'utf8'");
		$stmts = $this->pdo[$connection]->prepare($sql);
		$stmts->execute($params);
	}

}

?>
