exports.convertToSalt = (sodium) ->
  return sodium * 2.54 / 1000

exports.convertToSodium = (salt) ->
  return salt / 2.54 * 1000

exports.calcCarbohydrate = (saccharide, dietary_fiber) ->
  return saccharide + dietary_fiber

exports.getDetails = (content, isShowEnergy = true, isShowVolume = true) ->
  details = ""
  details += "ID #{content.id}\nhttps://tanjoin.github.io/calorie-memo/?id=#{content.id}\n" if content.id?
  details += "#{toString(content.energy)}\n" if content.energy? and isShowEnergy
  details += "たんぱく質 #{toString(content.protein)}\n" if content.protein?
  details += "脂質 #{toString(content.fat)}\n" if content.fat?
  details += "炭水化物 #{toString(content.carbohydrate)}\n" if content.carbohydrate?
  details += "糖質 #{toString(content.saccharide)}\n" if content.saccharide?
  details += "食物繊維 #{toString(content.dietary_fiber)}\n" if content.dietary_fiber?
  details += "Na #{toString(content.na)}\n" if content.na?
  details += "食塩相当量 #{toString(content.salt)}\n" if content.salt?
  details += "Ca #{toString(content.ca)}\n" if content.ca?
  details += "Mg #{toString(content.mg)}\n" if content.mg?
  details += "K #{toString(content.k)}\n" if content.k?
  details += "P #{toString(content.p)}\n" if content.p?
  details += "硬度 #{toString(content.hardness)}\n" if content.hardness?
  details += "ph #{toString(content.ph)}\n" if content.ph?
  details += "内容量 #{toString(content.volume)}\n" if content.volume? and isShowVolume
  details += "#{toString(content.per)}あたり\n" if content.per?
  return details

toString = (item) ->
  if typeof item.value is 'number'
    text = "#{item.value}"
    text = "約" + text if item.about?
    text += "#{item.unit}" if item.unit?
    text += "未満" if item.under?
    text += " (#{item.remark})" if item.remark?
    return text
  else if typeof item.value is 'object' and item.value.max? and item.value.min?
    text = "#{item.value.min}〜#{item.value.max}"
    text = "約" + text if item.about?
    text += "#{item.unit}" if item.unit?
    text += "未満" if item.under?
    text += " (#{item.remark})" if item.remark?
    return text
  return ""

exports.toString = toString
