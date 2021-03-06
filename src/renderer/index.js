var ipc = require('electron').ipcRenderer
var fs = require('fs')

var hotController = require('../renderer/hot.js')
var schemawizard = require('../renderer/schemawizard.js')
var rows = require('../renderer/ragged-rows.js')
var validation = require('../renderer/validate.js')
var file = require('../renderer/file-actions.js')
var loader = require('../renderer/loader.js')
var menu = require('../renderer/menu.js').menu
var remote = require('../renderer/menu.js').remote
var rowAbove = require('../renderer/menu.js').rowAbove
// var rowBelow = require('../renderer/menu.js').rowBelow
var columnLeft = require('../renderer/menu.js').columnLeft
// var columnRight = require('../renderer/menu.js').columnRight
// var removeRow = require('../renderer/menu.js').removeRow
// var removeCol = require('../renderer/menu.js').removeCol
// var freezeRow = require('../renderer/menu.js').freezeRow
// var unfreezeRow = require('../renderer/menu.js').unfreezeRow

var container = document.getElementById('editor')
global.hot = hotController.create(container)

container.ondragover = function() {
  return false
}

container.ondragleave = container.ondragend = function() {
  return false
}

container.ondrop = function(e) {
  e.preventDefault()
  var f = e.dataTransfer.files[0]
  fs.readFile(f.path, 'utf-8', function(err, data) {
    if (err) {
      console.log(err.stack)
    }
    // if we're dragging a file in, default the format to comma-separated
    var arrays = file.open(hot, data, file.formats.csv.options)
    rows.fixRaggedRows(hot, arrays)
  })
}

container.addEventListener('contextmenu', function(e) {
  e.preventDefault()
  menu.popup(remote.getCurrentWindow())
  rowAbove.enabled = true
  columnLeft.enabled = true
}, false)

// runtime renderer call & response

ipc.on('loadData', function(e, data, format) {
  var arrays = file.open(hot, data, format)
  rows.fixRaggedRows(hot, arrays)
})

ipc.on('saveData', function(e, fileName, format) {
  file.save(hot, fileName, format)
})

ipc.on('resized', function() {
  hot.render()
})

ipc.on('getCSV', function(e, format) {
  var data
  // if no format specified, default to csv
  if (typeof format === 'undefined') {
    data = $.csv.fromArrays(hot.getData())
  } else {
    data = $.csv.fromArrays(hot.getData(), format.options)
  }
  ipc.send('sendCSV', data)
})

ipc.on('validate', function() {
  var data = $.csv.fromArrays(hot.getData(), file.formats.csv)
  validation.validate(data)
})

ipc.on('schemaFromHeaders', function() {
  try {
    var assumedHeader = hot.getData()[0]
    var header = schemawizard.returnHeaderRow(assumedHeader)
    ipc.send('jsonHeaders', schemawizard.createSchema(header))
    schemawizard.createSchema(header)
  } catch (err) {
    console.log('attempting to get the first row has failed')
    console.log(err)
  }
})

ipc.on('ragged_rows', function() {
  var csv = hot.getData()
  rows.fixRaggedRows(hot, csv)
})

ipc.on('fetchData', function() {
  console.log('receiving')
  var csv = $.csv.fromArrays(hot.getData(), file.formats.csv)
  console.log(csv)
  ipc.send('dataSent', csv)
})

ipc.on('validationStarted', function() {
  loader.showLoader('Loading validation results...')
})

ipc.on('validationResults', function(e, results) {
  validation.displayResults(results)
})

ipc.on('editUndo', function() {
  if (hot.isUndoAvailable) {
    hot.undo()
  }
})

ipc.on('editRedo', function() {
  if (hot.isRedoAvailable) {
    hot.redo()
  }
})

ipc.on('editCopy', function() {
  hot.copyPaste.setCopyableText()
})

ipc.on('editCut', function() {
  hot.copyPaste.setCopyableText()
  hot.copyPaste.triggerCut()
})

ipc.on('editPaste', function() {
  hot.copyPaste.triggerPaste()
})

ipc.on('editSelectAll', function() {
  hot.selectCell(0, 0, (hot.countRows() - 1), (hot.countCols() - 1))
})

ipc.on('insertRowAbove', function() {
  hotController.insertRowAbove(false)
})

ipc.on('insertRowBelow', function() {
  hotController.insertRowBelow(false)
})

ipc.on('insertColumnLeft', function() {
  hotController.insertColumnLeft(false)
})

ipc.on('insertColumnRight', function() {
  hotController.insertColumnRight(false)
})

ipc.on('removeRows', function() {
  hotController.removeRows()
})

ipc.on('removeColumns', function() {
  hotController.removeColumns()
})

ipc.on('freeze', function() {
  hotController.freeze()
})
ipc.on('unfreeze', function() {
  hotController.unfreeze()
})
