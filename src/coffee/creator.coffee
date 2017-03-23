grids = [
  { prefix: "id", text: "ID", hasInput: false, radiobtns: null, isValue: false },
  { prefix: "name", text: "商品名", hasInput: true, radiobtns: null, isValue: false },
  { prefix: "company", text: "会社名", hasInput: true, radiobtns: null, isValue: false },
  { prefix: "energy", text: "カロリー", hasInput: true, radiobtns: null, isValue: true },
  { prefix: "protein", text: "たんぱく質", hasInput: true, radiobtns: null, isValue: true },
  { prefix: "fat", text: "脂質", hasInput: true, radiobtns: null, isValue: true },
  { prefix: "carbohydrate", text: "炭水化物", hasInput: true, radiobtns: null, isValue: true },
  { prefix: "na", text: "ナトリウム", hasInput: true, radiobtns: ["mg", "g"], isValue: true },
  { prefix: "salt", text: "食塩相当量", hasInput: true, radiobtns: null, isValue: true },
  { prefix: "volume", text: "内容量", hasInput: true, radiobtns: null, isValue: true },
  { prefix: "per", text: "○○あたり", hasInput: true, radiobtns: null, isValue: true },
  { prefix: "ca", text: "カルシウム", hasInput: true, radiobtns: null, isValue: true },
  { prefix: "mg", text: "マグネシウム", hasInput: true, radiobtns: null, isValue: true },
  { prefix: "k", text: "カリウム", hasInput: true, radiobtns: null, isValue: true }
]

makeJson = (data) ->
  JSON.stringify data

exports.initView = ->
  contents = document.getElementById 'contents-create'

  for grid in grids
    contents.appendChild makeGrid(
      grid.prefix, grid.text, grid.hasInput, grid.radiobtns
    )

  contents.appendChild makeCreateButtonGrid()
  return contents

showResult = ->
  result = document.getElementById 'result-create'

  obj = {}

  for grid in grids
    unless grid.hasInput
      continue
    input = document.getElementById "#{grid.prefix}-input"
    if input.value? and input.value.length > 0
      if grid.isValue
        obj[grid.prefix] = {}
        obj[grid.prefix]["value"] = parseInt input.value
      else
        obj[gird.prefix] = input.value

  result.innerText = makeJson obj

makeCreateButtonGrid = ->
  grid = makeDiv null, "mdl-grid"
  grid.appendChild makeSpacer()
  btn = makeCreateButton()
  btn.addEventListener 'click', showResult
  grid.appendChild btn
  grid.appendChild makeSpacer()
  return grid

makeCreateButton = ->
  return makeButton(
    "create-button",
    "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent",
    "作成"
  )

makeButton = (id, className, text) ->
  button = document.createElement 'button'
  button.id = id if id?
  button.className = className if className?
  button.innerText = text
  return button

makeGrid = (idPrefix, text, hasInput = true, radiobtns) ->
  grid = makeDiv null, "mdl-grid"
  grid.appendChild makeSpacer()

  cell = makeDiv null, "mdl-cell mdl-cell--4-col"
  grid.appendChild cell

  textFiled = makeDiv null, "mdl-textfield mdl-js-textfield"
  cell.appendChild textFiled

  if hasInput
    input = makeInput "#{idPrefix}-input", "mdl-textfield__input", "text"
    input.pattern = "-?[0-9]*(\.[0-9]+)?"
    textFiled.appendChild input

  label = makeLabel null, "mdl-textfield__label", "#{idPrefix}-input", text
  textFiled.appendChild label

  if radiobtns?
    radioCell = makeDiv null, "mdl-cell mdl-cell--4-col"
    grid.appendChild radioCell
  else
    grid.appendChild makeDiv null, "mdl-cell mdl-cell--4-col"

  grid.appendChild makeSpacer()

  return grid

makeDiv = (id, className) ->
  div = document.createElement 'div'
  div.id = id if id?
  div.className = className if className?
  return div

makeLabel = (id, className, htmlFor, text, value) ->
  label = document.createElement 'label'
  label.id = id if id?
  label.className = className if className?
  label.htmlFor = htmlFor if htmlFor?
  label.textContent = text if text?
  label.value = value if value?
  return label

makeInput = (id, className, type) ->
  input = document.createElement 'input'
  input.id = id if id?
  input.className = className if className?
  input.type = type if type?
  return input

makeSpacer = () ->
  return makeDiv null, "mdl-layout-spacer"
