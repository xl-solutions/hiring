<?php
/*
******************************************************************
Copyright (c) 2018, Thiago Medeiros de Menezes
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

trait HTMLBuilder {

	function build_html(&$content) {
		header("Content-type: text/html");
		echo '
			<!DOCTYPE html />
			<html lang="'.LG_HTML_LANG.'">
				<head>
					<title>'.LG_APP_S.': '.LG_APP_L.'</title>
					<meta charset="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<meta name="author" content="Thiago Medeiros de Menezes" />
					<meta name="apple-mobile-web-app-capable" content="yes">
					<link rel="shortcut icon" href="'.ICO.'" />
					<link rel="apple-touch-icon" sizes="152x152" href="'.ICO.'" />
					<link rel="apple-touch-icon" sizes="120x120" href="'.ICO.'" />
					<link rel="apple-touch-icon" sizes="76x76" href="'.ICO.'" />
					<link rel="apple-touch-icon" href="'.ICO.'" />
					<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css" integrity="sha384-Zug+QiDoJOrZ5t4lssLdxGhVrurbmBWopoEl+M6BdEfwnCJZtKxi1KgxUyJq13dy" crossorigin="anonymous">
					<link rel="stylesheet" href="https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css">
					<link href="'.URL.'share/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
					<link href="'.URL.'HTML/RETRIEVE_DECORATION" rel="stylesheet" type="text/css" />
					<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
					<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
					<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/js/bootstrap.min.js" integrity="sha384-a5N7Y/aK3qNeh15eJKGWxsqtnX/wWdSZSKp+81YjTmS15nvnvxKHuzaWwXHDli+4" crossorigin="anonymous"></script>
					<script src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
					<script src="https://cdn.datatables.net/1.10.16/js/dataTables.bootstrap4.min.js"></script>
					<script type="text/javascript" src="'.URL.'HTML/RETRIEVE_BEHAVIOR"></script>
				</head>
				<body oncontextmenu="return false;">
					<div class="d-none overlay">
						<div class="app-progressbar"></div>
						<img class="app-loader" src="'.URL.'images/loader.gif" />
					</div>
					'.$content.'
				</body>
			</html>
		';
	}

	function build_button($command, $title, $icon, $disabled = 'disabled', $class = 'btn-primary') {
		return '
			<button type="button" class="btn '.$class.'" appcmd="'.$command.'" title="'.$title.'" '.$disabled.'>
				&nbsp;<i class="fa '.$icon.'"></i> <span class="d-none d-sm-inline">'.$title.'</span>&nbsp;
			</button>
		';
	}

	function build_controls( ) {
		$controls['SELECT_ALL'] = '<button type="button" class="btn btn-primary" appcmd="SELECT_ALL" title="'.LG_SELECT_ALL.'">&nbsp;<i class="fa fa-asterisk"></i>&nbsp;</button>';
		#$controls['ADD'] = $this->build_button('ADD', LG_ADD, 'fa-plus', '');
		#$controls['EDIT'] = $this->build_button('EDIT', LG_EDIT, 'fa-edit');
		$controls['REMOVE'] = $this->build_button('REMOVE', LG_REMOVE, 'fa-minus', 'disabled', 'btn-danger');
		$controls['UPLOAD'] = $this->build_button('UPLOAD', LG_UPLOAD, 'fa-upload-cloud', '');
		$controls['MATCH'] = '
			<div class="input-group">
				<input type="search" class="form-control app-input-search" placeholder="'.LG_SEARCH.'" />
				<div class="input-group-append">
					<button type="button" class="btn btn-primary" appcmd="MATCH">&nbsp;<i class="fa fa-search"></i>&nbsp;</button>
				</div>
			</div>
		';
		return $controls;
	}

	function build_default($title, $data) {
		$controls = $this->build_controls( );
		return $this->build_header($title).'
			<div class="container">
				<div class="row">
					<div class="col">
						'.$controls['SELECT_ALL'].'
						<div class="btn-group">'.$controls['ADD'].$controls['EDIT'].$controls['REMOVE'].'</div>
					</div>
				</div>
				<div class="row">
					<div class="col">
						<br />
						'.$this->build_table($data).'
					</div>
				</div>
			</div>
		';
	}

	function build_header($title) {
		return '<div style="background-color: #f2f2f2; background: -webkit-linear-gradient(left, #f2f2f2 0%, #fff 100%); background: -linear-gradient(left, #f2f2f2 0%, #fff 100%); background: -moz-linear-gradient(left, #f2f2f2 0%, #fff 100%); color: #333; font-size: 20px; font-weight: 900; margin-bottom: 30px; padding: 18px 0px;"><div class="container">'.$title.'</div></div>';
	}

	function build_menu( ) {
		$menu['UPLOAD'] = '<li class="nav-item"><a class="nav-link" href="#" appcmd="UPLOAD">'.LG_UPLOAD.'</a></li>';
		$menu['INVENTORY'] = '<li class="nav-item"><a class="nav-link" href="#" appcmd="INVENTORY">'.LG_INVENTORY.'</a></li>';
		return $menu;
	}

	function build_table($data) {
		return '
			<table class="table table-hover table-sm table-striped">
				'.$this->build_thead($data['head']).'
				'.$this->build_tbody($data['body']).'
			</table>
		';
	}

	function build_tbody($data) {
		$trs = '';
		$size = count($data);
		for($i = 0; $i < $size; ++$i) {
			$tds = "";
			$id = array_shift($data[$i]);
			foreach($data[$i] as $key => $value)
				$tds .= "<td>$value</td>";
			$trs .= "<tr class=\"app-selectable\" appid=\"$id\">$tds</tr>";
		}
		return '<tbody>'.$trs.'</tbody>';
	}

	function build_thead($data) {
		$ths = '';
		foreach($data as $key => $value)
			$ths .= "<th>{$value}</th>";
		return '<thead><tr>'.$ths.'</tr></thead>';
	}

}
?>
