calorie = require('./calorie')

exports.makeUrl = (content) ->
  unless content?
    return ""
  return "https://www.google.com/calendar/event?action=TEMPLATE" +
  "&text=" + getText(content) +
  "&details=" + getDetails(content) +
  "&dates=" + getUTC(new Date()) +
  "&trp=false" +
  "&sprop=" + getDataUrl(content) +
  "&sprop=" + 'name:' + encodeURIComponent('calorie-memo')

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
  return encodeURIComponent("#{content.name} [#{content.company}]")

getDetails = (content) ->
  return encodeURIComponent calorie.getDetails content

getDataUrl = (content) ->
  url = 'https://tanjoin.github.io/calorie-memo?id='
  return encodeURIComponent(url + content.id)
