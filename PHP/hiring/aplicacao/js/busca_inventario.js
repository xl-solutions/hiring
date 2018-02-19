$(document).ready(function(){

 load_data();
 
 function load_data(query)
 {
  $.ajax({
   url:"php/busca_inventario.php",
   method:"POST",
   data:{query:query},
   success:function(data)
   {
    $('#result').html(data);
   }
  });
 }
/*------------------------------------------------------------------*/ 
 $('#manufacturer').click(function(){ <!--jQuery Event Methods-->
  var search = $(this).val();
  if(search != '')
  {
   load_data(search);
  }
  else
  {
   load_data();
  }
 });
/*------------------------------------------------------------------*/ 
  $('#model').click(function(){
  var search = $(this).val();
  if(search != '')
  {
   load_data(search);
  }
  else
  {
   load_data();
  }
 });
/*------------------------------------------------------------------*/ 
   $('#plan').click(function(){
  var search = $(this).val();
  if(search != '')
  {
   load_data(search);
  }
  else
  {
   load_data();
  }
 });
 
});