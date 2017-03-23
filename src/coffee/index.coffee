data = require './data'
view = require './view'
creator = require './creator'

calorieData = []

window.onload = ->
  resultDiv = document.getElementById 'result'
  if resultDiv?
    data.getData (data) ->
      calorieData = data
      resultDiv.appendChild view.makeSpacer()
      for d in calorieData
        resultDiv.appendChild view.makeHtml d
      resultDiv.appendChild view.makeSpacer()
      return

  input = document.getElementById 'search-input'
  input.addEventListener 'change', didSearchInputTextChanged if input?

  create = document.getElementById 'contents-create'
  creator.initView() if create?

  new Clipboard '.clipboard'

  return

didSearchInputTextChanged = ->
  resultDiv = document.getElementById 'result'
  input = document.getElementById 'search-input'
  unless resultDiv? and input?
    return
  while resultDiv.firstChild
    resultDiv.removeChild resultDiv.firstChild

  list = calorieData
  if input.value.length > 0
    list = calorieData.filter (element, index, array) ->
      return element.name.indexOf(input.value) isnt -1 or
        element.company.indexOf(input.value) isnt -1

  resultDiv.appendChild view.makeSpacer()

  for d in list
    resultDiv.appendChild view.makeHtml d
  resultDiv.appendChild view.makeSpacer()
