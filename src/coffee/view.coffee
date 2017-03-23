calendar = require('./calendar')
calorie = require('./calorie')

exports.makeHtml = (content) ->
  cardDiv = makeDiv(content.id, "card-event mdl-card mdl-shadow--2dp")

  titleDiv = makeDiv(null, "mdl-card__title mdl-card--expand")
  titleDiv.appendChild makeChip content.company if content.company?
  title = "#{content.name}"
  title += "#{calorie.toString(content.volume)}" if content.volume?
  titleDiv.appendChild makeH4 title
  cardDiv.appendChild titleDiv

  supportTextDiv = makeDiv(null, "mdl-card__supporting-text")
  supportTextDiv.innerText = getSupprtText content
  cardDiv.appendChild supportTextDiv

  actionDiv = makeDiv(null, "mdl-card__actions mdl-card--border")
  actionDiv.appendChild makeA(
    "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect",
    "Add to Calendar",
    calendar.makeUrl(content)
  )
  actionDiv.appendChild makeSpacer()
  actionDiv.appendChild makeI("material-icons", "event")
  cardDiv.appendChild actionDiv

  return cardDiv

makeSpacer = ->
  return makeDiv(null, "mdl-layout-spacer")

exports.makeSpacer = makeSpacer

makeDiv = (id, className) ->
  d = document.createElement 'div'
  d.id = id if id?
  d.className = className if className?
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
  a.target = "_blank"
  return a

makeI = (className, text) ->
  i = document.createElement 'i'
  i.className = className if className?
  i.innerText = text if text?
  return i

makeChip = (text) ->
  mdlChipContact = document.createElement 'span'
  mdlChipContact.className =
    "mdl-chip__contact mdl-color--teal mdl-color-text--white"
  mdlChipContact.innerText = text.substr 0, 1
  return mdlChipContact

getSupprtText = (content) ->
  return calorie.getDetails content, true, false
