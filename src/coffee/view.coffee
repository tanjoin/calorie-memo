calendar = require('./calendar')
calorie = require('./calorie')

exports.makeHtml = (content) ->
  cardDiv = makeDiv(content.id, "card-event mdl-card mdl-shadow--2dp")

  titleDiv = makeDiv(null, "mdl-card__title mdl-card--expand")
  titleDiv.appendChild makeH4 content.name
  cardDiv.appendChild titleDiv

  supportTextDiv = makeDiv(null, "mdl-card__supporting-text")
  supportTextDiv.innerHtml = getSupprtText content
  cardDiv.appendChild supportTextDiv

  actionDiv = div("mdl-card__actions mdl-card--border")
  actionDiv.appendChild makeA(
    "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect",
    "Add to Calendar",
    calendar.makeUrl(content)
  )
  spacer = makeDiv(null, "mdl-layout-spacer")
  actionDiv.appendChild spacer
  actionDiv.appendChild makeI("material-icons", "event")
  cardDiv.appendChild actionDiv
  return

exports.makeSpacer = makeSpacer

makeSpacer = ->
  return makeDiv(null, "mdl-layout-spacer")

makeDiv = (id, className) ->
  d = document.createElement 'div'
  d.id = id if id?
  d.className = className if id?
  return d

makeH4 = (text) ->
  h4 = document.createElement 'h4'
  h4.innerText = text if text?
  return h4

makeA = (className, text, href) ->
  a = document.createElement 'a'
  a.className = className if className?
  a.innerText = text if text?
  a.href = href if href?
  return a

makeI = (className, text) ->
  i = document.createElement 'i'
  i.className = className if className?
  i.innerText = text if text?
  return i

getSupprtText = (content) ->
  return calorie.getDetails content
