<template>
  <div id="container" class="container-fluid">
  <h1>Editor Keyboard Shortcuts</h1>
  <h2>Navigation</h2>
  <ul>
      <li>
          <kbd>Arrow Up ↑</kbd>    – move to the cell above current active cell (if exists)
      </li>
      <li>
          <kbd>Arrow Down ↓</kbd>  – move to cell underneath current active cell (if exists)
      </li>
      <li>
          <kbd>Arrow Right →</kbd> – move to the cell on the right side of the current active cell (if exists)
      </li>
      <li>
          <kbd>Arrow Left ←</kbd>  – move to the cell on the left side of current active cell (if exists)
      </li>
      <li>
          <kbd>Tab</kbd>         – move to the cell on the right side of the current active cell (if exists)
      </li>
      <li>
          <kbd>Tab</kbd> + <kbd>Shift</kbd> – move to the cell on the left side of current active cell (if exists)
      </li>
      <li>
          <kbd>Home</kbd> – move to the first cell in a row
      </li>
      <li>
          <kbd>End</kbd> – move to the last cell in a row
      </li>
      <li>
          (<kbd>Cmd</kbd> or <kbd>Ctrl</kbd>) + <kbd>Home</kbd> – move to the first cell in a column
      </li>
      <li>
          (<kbd>Cmd</kbd> or <kbd>Ctrl</kbd>) + <kbd>End</kbd> – move to the last cell in a column
      </li>
  </ul>
  <h2>Selection</h2>
  <ul>
      <li>
          (<kbd>Cmd</kbd> or <kbd>Ctrl</kbd>) + <kbd>A</kbd> – select all
      </li>
      <li>
          <kbd>Shift</kbd> + <kbd>Arrow Up ↑</kbd> – extend selection of the cell above
      </li>
      <li>
          <kbd>Shift</kbd> + <kbd>Arrow Down ↓</kbd> – extend selection of the cell underneath
      </li>
      <li>
          <kbd>Shift</kbd> + <kbd>Arrow Right →</kbd> – extend selection of the cell on the right
      </li>
      <li>
          <kbd>Shift</kbd> + <kbd>Arrow Left ←</kbd> – extend selection of the cell on the left
      </li>
      <li>
          <kbd>Shift</kbd> + <kbd>Home</kbd> – select all cells in the row to the right including the current cell
      </li>
      <li>
          <kbd>Shift</kbd> + <kbd>End</kbd> – select all cells in the row to the left including the current cell
      </li>
      <li>
          (<kbd>Cmd</kbd> or <kbd>Ctrl</kbd>) + <kbd>Shift</kbd> + <kbd>Home</kbd> – select all cells in the column to the top including the current cell
      </li>
      <li>
          (<kbd>Cmd</kbd> or <kbd>Ctrl</kbd>) + <kbd>Shift</kbd> + <kbd>End</kbd> – select all cells in the column to the bottom including the current cell
      </li>
  </ul>
  <h2>Editing</h2>
  <ul>
      <li>
          <kbd>Enter</kbd> – insert row below (if in bottom row)
      </li>
      <li>
          <kbd>Tab</kbd> – insert column right (if in rightmost column)
      </li>
      <li>
          <kbd>F2</kbd> – open cell editor
      </li>
      <li>
          <kbd>Esc</kbd> – cancel editing and close cell editor
      </li>
      <li>
          <kbd>Backspace</kbd> – empty cell
      </li>
      <li>
          <kbd>Delete</kbd> – empty cell
      </li>
      <li>
          (<kbd>Cmd</kbd> or <kbd>Ctrl</kbd>) + <kbd>C</kbd> – copy cell's content
      </li>
      <li>
          (<kbd>Cmd</kbd> or <kbd>Ctrl</kbd>) + <kbd>X</kbd> – cut cell's content
      </li>
      <li>
          (<kbd>Cmd</kbd> or <kbd>Ctrl</kbd>) + <kbd>V</kbd> – pastle cell's content
      </li>
      <li>
          (<kbd>Cmd</kbd> or <kbd>Ctrl</kbd>) + <kbd>Enter</kbd> - fill all selected cells with edited cell's value
      </li>
      <li>
          (<kbd>Cmd</kbd> or <kbd>Ctrl</kbd>) + <kbd>Z</kbd> – undo
      </li>
      <li>
          (<kbd>Cmd</kbd> or <kbd>Ctrl</kbd>) + <kbd>Y</kbd> – redo
      </li>
  </ul>
  <h2>Context menu</h2>
  <ul>
      <li>
          <kbd>Arrow Down ↓</kbd> – move to the next option in context menu
      </li>
      <li>
          <kbd>Arrow Up ↑</kbd> – move to the previous option in context menu
      </li>
      <li>
          <kbd>Enter</kbd> – select option from context menu
      </li>
  </ul>
  </div>
</template>
<script>
window.$ = window.jQuery = require('jquery/dist/jquery.js')
const {
  shell
} = require('electron')
var ipc = require('electron').ipcRenderer
require('bootstrap/dist/js/bootstrap.min.js')
export default {
  name: 'keyboardhelp',
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
