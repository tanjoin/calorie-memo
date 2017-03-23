getJsonData = (callback) ->
  req = new XMLHttpRequest()
  req.open "GET", "https://tanjo.in/calorie-memo/data.json", true
  req.onload = callback
  req.send()
  return

exports.getData = (callback) ->
  getJsonData ->
    data = JSON.parse this.responseText
    callback data.templates
  return
