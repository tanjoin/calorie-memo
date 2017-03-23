exports.convertToSalt = (sodium) ->
  return sodium * 2.54 / 1000

exports.convertToSodium = (salt) ->
  return salt / 2.54 * 1000

exports.getDetails = (content) ->
  details = "#{toString(content.energy)}\n" if content.energy?
  details += "たんぱく質 #{toString(content.protein)}\n" if content.protein?
  details += "脂質 #{toString(content.fat)}\n" if content.fat?
  details += "炭水化物 #{toString(content.carbohydrate)}\n" if content.carbohydrate?
  details += "Na #{toString(content.na)}\n" if content.na?
  details += "食塩相当量 #{toString(content.salt)}\n" if content.salt?
  details += "Ca #{toString(content.ca)}\n" if content.ca?
  details += "Mg #{toString(content.mg)}\n" if content.mg?
  details += "K #{toString(content.k)}\n" if content.k?
  details += "#{toString(content.per)}あたり\n" if content.per?
  return details

toString = (item) ->
  if typeof item.value is 'number'
    return "#{item.value}#{item.unit}"
  else if typeof item.value is 'object' and item.value.max? and item.value.min?
    return "#{item.value.min}〜#{item.value.max}#{item.unit}"
  return ""
