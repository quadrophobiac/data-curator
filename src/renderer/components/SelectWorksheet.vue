<template>
<div id="container" class="container-fluid">
  <form>
    <p><select id="worksheets" class="form-control"></select></p>
    <div class="well">
      <button id="submit" class="btn btn-default">Go</button> <button id="cancel" class="btn btn-default">Cancel</button>
    </div>
  </form>
</div>
</template>
<script>
window.$ = window.jQuery = require('jquery/dist/jquery.js')
const {
  shell
} = require('electron')
var ipc = require('electron').ipcRenderer
require('bootstrap/dist/js/bootstrap.min.js')
ipc.on('loadSheets', function(e, sheets) {
  worksheets = $('#worksheets')
  $.each(sheets, function(i, sheet) {
    worksheets.append($('<option></option>')
      .attr('value', sheet)
      .text(sheet))
  })

  $('#submit').click(function(e) {
    ipc.send('worksheetSelected', $('#worksheets').val())
    e.preventDefault()
  })

  $('#cancel').click(function() {
    ipc.send('worksheetCanceled')
  })
})
export default {
  name: 'selectworksheet',
  methods: {}
}
</script>
<style scoped>
@import '~bootstrap/dist/css/bootstrap.min.css'
</style>
<style scoped>
@import '~components-font-awesome/css/font-awesome.min.css'
</style>
<style scoped>
@import '/static/assets/css/default.css'
</style>
<style scoped>
@import '/static/assets/css/select-worksheet.css'
</style>
