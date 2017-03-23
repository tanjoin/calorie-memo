calorie = require('./calorie')

exports.makeUrl = (content) ->
  unless content?
    return ""

  date = getUTC(new Date())

  return "https://www.google.com/calendar/event?action=TEMPLATE" +
    "&text=#{getText(content)}" +
    "&details=#{getDetails(content)}" +
    "&dates=#{date}/#{date}"

getUTC = (date) ->
  return date.getUTCFullYear() +
    zerofill(date.getUTCMonth()+1) +
    zerofill(date.getUTCDate()) +
    'T' +
    zerofill(date.getUTCHours()) +
    zerofill(date.getUTCMinutes()) +
    zerofill(date.getUTCSeconds()) +
    'Z'

zerofill = (num) ->
  return ('0' + num).slice(-2)

getText = (content) ->
  return encodeURIComponent(
    "#{content.name} #{calorie.toString(content.energy)}"
  )

getDetails = (content) ->
  return encodeURIComponent calorie.getDetails content, false

getDataUrl = (content) ->
  url = 'https://tanjoin.github.io/calorie-memo?id='
  return encodeURIComponent(url + content.id)
