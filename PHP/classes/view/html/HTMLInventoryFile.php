<?php
class HTMLInventoryFile extends HTMLPublic {

	public function retrieve_behavior( ) {
		return '
			function app_inventory_file_upload( ) {
				var files = null;
				var MAX_BYTES = '.$_SESSION['SystemUploadMax'].';
				var total_bytes = 0;

				$("form input[type=text]").click(function( ) { $("form input[type=file]").trigger("click"); });

				$("form input[type=file]").change(function( ) {
					files = $(this).get(0).files;
					total_bytes = files[0].size
					$("form input[type=text]").val(files[0].name);
					$("form #total-bytes").text(app_parse_bytes_to_human_readable(total_bytes));
				});

				$("form").submit(function(event) {
					if(total_bytes > 0 && total_bytes < MAX_BYTES && files[0].type == "text/csv") {
						event.preventDefault( );
						var f = $(this);
						var data = new FormData(f[0]);
						app_ajax(f.attr("action"), f.attr("method"), data, undefined, {cache: false, contentType: false, processData: false});
					}
					else {
						alert("'.sprintf(LG_FAILURE_INVALID_UPLOADED_FILE, parse_bytes_to_human_readable($_SESSION['SystemUploadMax'])).'");
						return false;
					}
				});
			}
		';
	}

	public function retrieve_decoration( ) {
		return '';
	}

	public function retrieve_default( ) {
		/**
		** TODO
		*/
	}

	public function upload( ) {
		echo $this->build_header(LG_UPLOAD_INVENTORY).'
			<form method="post" action="'.URL.'JSON/INVENTORY_FILE/UPLOAD" class="container" enctype="multipart/form-data">
				<div class="form-row">
					<div class="form-group col-md-12">
						<label>'.LG_FILE.'</label>
						<div class="input-group">
							<input type="text" class="form-control" readonly />
							<div class="input-group-append">
								<span class="input-group-text">
									<span id="total-bytes">'.parse_bytes_to_human_readable(0).'</span> / <span id="max-total">'.parse_bytes_to_human_readable($_SESSION['SystemUploadMax']).'</span>
								</span>
							</div>
						</div>
						<input type="file" class="d-none" name="params" accept="text/csv" required />
					</div>
				</div>
				<div class="form-row">
					<div class="form-group col-md-2">
						<button type="submit" class="form-control btn btn-primary">'.LG_CONFIRM.'</button>
					</div>
					<div class="form-group col-md-2">
						<button type="reset" class="form-control btn btn-secondary">'.LG_CLEAN.'</button>
					</div>				
				</div>
			</form>
			<script type="text/javascript">app_inventory_file_upload( );</script>
		';
	}

}
?>
