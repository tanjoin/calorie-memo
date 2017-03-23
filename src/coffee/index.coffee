data = require './data'
view = require './view'

window.onload = ->
  resultDiv = document.getElementById 'result'

  data.getData (data) ->
    resultDiv.appendChild view.makeSpacer()
    for d in data
      resultDiv.appendChild view.makeHtml d
    resultDiv.appendChild view.makeSpacer()
    return
  return
