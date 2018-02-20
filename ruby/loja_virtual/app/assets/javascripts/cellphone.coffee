# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

render_content = (partial) -> $("#body-content").html("<%= j render(partial: '#{partial}' %>")

$ ->
  $("a[data-partial-name]").click (e) ->
  	e.preventDefault()
  	partial_name = $(this).data("partial-name")
  	render_content(partial_name)