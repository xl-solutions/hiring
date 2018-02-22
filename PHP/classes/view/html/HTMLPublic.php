<?php
class HTMLPublic extends HTML {

	public function retrieve_behavior( ) {
		header("Content-type: text/javascript");
		$behavior = '

			$(document).on("keypress", "form *:not(textarea):not([type=submit])", function(e) { var key = e.keyCode || e.which; return key != 13; });

			function app_parse_bytes_to_human_readable(bytes) {
				var sizes = ["bytes", "KB", "MB", "GB", "TB"];
				if(bytes == 0) return "0 byte";
				var i = parseInt(Math.floor(Math.log(bytes)/Math.log(1024)));
				return Math.round(bytes/Math.pow(1024, i), 2) + " " + sizes[i];
			}

			function app_lock_screen(show_progressbar) {
				$(".overlay").removeClass("d-none");
				$(".overlay .app-progressbar").css("width", "0");
				if(show_progressbar === true)
					$(".overlay .app-progressbar").removeClass("d-none");
				else $(".overlay .app-progressbar").addClass("d-none");
			}

			function app_unlock_screen( ) {
				$(".overlay").addClass("d-none");
				$(".overlay .app-progressbar").css("width", "0");
			}

			function app_ajax(url, type, data, f_success, settings) {
				app_lock_screen( );
				if(typeof f_success === "undefined") {
					f_success = function(result) {
						alert(result.message);
						app_unlock_screen( );
						if(!result.fail)
							$("main").load(result.url);
					};
				}
				var f_error = function(result) {
					alert("'.LG_FAILURE_UNEXPECTED_ERROR.'\n" + result);
					app_unlock_screen( );
				};
				if(typeof settings === "undefined")
					settings = { };
				Object.assign(settings, { url: url, type: type, dataType: "json", data: data, success: f_success, error: f_error });
				$.ajax(settings);
			}

			function app_toggle_controls( ) {
				switch($(".app-selected").length) {
					case 0: $("main .btn").prop("disabled", false); $("main .btn[appcmd=EDIT], main .btn[appcmd=REMOVE]").prop("disabled", true); break;
					case 1: $("main .btn").prop("disabled", false); break;
					default: $("main .btn").prop("disabled", false); $("main .btn[appcmd=EDIT]").prop("disabled", true); break;
				}
			}

			function app_init_table( ) {
				$(".table").DataTable({
					"bLengthChange": false,
					"paging": false,
					"searching": false,
		         "language": { "url": "https://cdn.datatables.net/plug-ins/1.10.16/i18n/Portuguese-Brasil.json" }
				});

				$(".table .app-selectable").on("click", function(event) {
					if(!event.ctrlKey)
						$(".app-selected").removeClass("app-selected");
					if(!$(this).hasClass("app-selected"))
						$(this).addClass("app-selected");
					else $(this).removeClass("app-selected");
					app_toggle_controls( );
				});

				app_toggle_controls( );
			}

			function app_init_controls(args) {
				$("main .btn").click(function( ) {
					switch($(this).attr("appcmd")) {
						case "SELECT_ALL":
							$("main .app-selectable").addClass("app-selected");
							$(this).attr("appcmd", "UNSELECT_ALL");
							$(this).attr("title", "'.LG_UNSELECT_ALL.'");
							app_toggle_controls( );
							break;
						case "UNSELECT_ALL":
							$("main .app-selectable").removeClass("app-selected");
							$(this).attr("appcmd", "SELECT_ALL");
							$(this).attr("title", "'.LG_SELECT_ALL.'");
							app_toggle_controls( );
							break;
						case "MATCH":
							$("main").load(args.match, { params: $("main .app-input-search").val( ) });
							break;
						case "REMOVE":
							if(!confirm("'.LG_ALERT_CONTINUE_OPERATION.'"))
								return false;
							var data = [ ];
							$("main .app-selected").each(function( ) { data.push($(this).attr("appid")); });
							app_ajax(args.remove, "post", { params: data });
							break;
						case "UPLOAD":
							$("main").load(args.upload);
							break;
					}
				});
			}

			function app_public( ) {
				$(".align-items-center").height($(window).height( ) - $(".navbar").height( ) - 152);

				$("main .btn").css("padding", "20px");

				$(".navbar-nav a, main .btn").click(function( ) {
					if($(this).attr("appcmd") != undefined) {
						$("main").html("");
						$("main").off( );
					}
					switch($(this).attr("appcmd")) {
						case "INVENTORY": $("main").load("'.URL.'HTML/INVENTORY_ITEM"); break;
						case "UPLOAD": $("main").load("'.URL.'HTML/INVENTORY_FILE/UPLOAD"); break;
					}
					$(".navbar-nav .active").removeClass("active");
					$(this).parent( ).addClass("active");
				});
			}
		';
		$behavior .= retrieve_children_functions('HTMLPublic', 'retrieve_behavior');
		echo $behavior;
	}

	public function retrieve_decoration( ) {
		header("Content-type: text/css");
		$decoration = '
			.app-selectable * {
				cursor: pointer;
			}

			.app-selected * {
				background-color: #007bff !important;
				color: #fff !important;
			}

			.dataTables_wrapper {
				padding: 0 !important;
			}

			.overlay {
				background-color: rgba(255, 255, 255, 0.85);
				height: 100%;
				left: 0;
				position: fixed;
				top: 0;
				width: 100%;
				z-index: 10;
			}

			.overlay > .app-loader {
				display: block;
				margin: auto;
				opacity: 0.25;
				width: 50%;
			}

			.overlay > .app-progressbar {
				background-color: #00a2da;
				border-radius: 0 50px 50px 0;
				height: 2.5px;
				left: 0;
				position: absolute;
				top: 0;
				width: 0%;
				-webkit-box-shadow: 0px 0px 10px 2.5px rgba(0, 162, 218, 0.75);
				-moz-box-shadow: 0px 0px 10px 2.5px rgba(0, 162, 218, 0.75);
				box-shadow: 0px 0px 10px 2.5px rgba(0, 162, 218, 0.75);
			}
		';
		$decoration .= retrieve_children_functions('HTMLPublic', 'retrieve_decoration');
		echo $decoration;
	}

	public function retrieve_default( ) {
		$content = '
			<nav class="navbar navbar-dark bg-dark navbar-expand-lg">
				<div class="container">
					<a class="navbar-brand" href="'.URL.'">
						<span class="font-weight-bold">'.LG_APP_S.'</span>
					</a>
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
					<div class="collapse navbar-collapse" id="navbarNavDropdown">
						<ul class="navbar-nav mr-auto nav-fill">'.$this->build_user_menu( ).'</ul>
					</div>
				</div>
			</nav>
			<main>
				'.$this->build_header(LG_APP_L).'
				<div class="container">
					<div class="row align-items-center">
						<div class="col">
							<button class="btn btn-primary form-control" appcmd="UPLOAD"><i class="fa fa-3x fa-upload"></i><h4>'.LG_UPLOAD.'</h4></button>
						</div>
						<div class="col">
							<button class="btn btn-primary form-control" appcmd="INVENTORY"><i class="fa fa-3x fa-archive"></i><h4>'.LG_INVENTORY.'</h4></button>
						</div>
					</div>
				</div>
			</main>
			<div class="d-none" id="app-iframeset"></div>
			<script type="text/javascript">app_public( );</script>
		';
		$this->build_html($content);
	}

	public function build_user_menu( ) {
		$menu = HTMLBuilder::build_menu( );
		return implode('', $menu);
	}

}
?>
