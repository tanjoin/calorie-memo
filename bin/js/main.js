(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var calorie, getDataUrl, getDetails, getText, getUTC, zerofill;

calorie = require('./calorie');

exports.makeUrl = function(content) {
  var date;
  if (content == null) {
    return "";
  }
  date = getUTC(new Date());
  return "https://www.google.com/calendar/event?action=TEMPLATE" + ("&text=" + (getText(content))) + ("&details=" + (getDetails(content))) + ("&dates=" + date + "/" + date);
};

getUTC = function(date) {
  return date.getUTCFullYear() + zerofill(date.getUTCMonth() + 1) + zerofill(date.getUTCDate()) + 'T' + zerofill(date.getUTCHours()) + zerofill(date.getUTCMinutes()) + zerofill(date.getUTCSeconds()) + 'Z';
};

zerofill = function(num) {
  return ('0' + num).slice(-2);
};

getText = function(content) {
  return encodeURIComponent(content.name + " " + (calorie.toString(content.energy)));
};

getDetails = function(content) {
  return encodeURIComponent(calorie.getDetails(content, false));
};

getDataUrl = function(content) {
  var url;
  url = 'https://tanjoin.github.io/calorie-memo?id=';
  return encodeURIComponent(url + content.id);
};


},{"./calorie":2}],2:[function(require,module,exports){
var toString;

exports.convertToSalt = function(sodium) {
  return sodium * 2.54 / 1000;
};

exports.convertToSodium = function(salt) {
  return salt / 2.54 * 1000;
};

exports.calcCarbohydrate = function(saccharide, dietary_fiber) {
  return saccharide + dietary_fiber;
};

exports.getDetails = function(content, isShowEnergy, isShowVolume) {
  var details;
  if (isShowEnergy == null) {
    isShowEnergy = true;
  }
  if (isShowVolume == null) {
    isShowVolume = true;
  }
  details = "";
  if (content.id != null) {
    details += "ID " + content.id + "\nhttps://tanjo.in/calorie-memo/?id=" + content.id + "\n";
  }
  if ((content.energy != null) && isShowEnergy) {
    details += (toString(content.energy)) + "\n";
  }
  if (content.protein != null) {
    details += "たんぱく質 " + (toString(content.protein)) + "\n";
  }
  if (content.fat != null) {
    details += "脂質 " + (toString(content.fat)) + "\n";
  }
  if (content.carbohydrate != null) {
    details += "炭水化物 " + (toString(content.carbohydrate)) + "\n";
  }
  if (content.saccharide != null) {
    details += "糖質 " + (toString(content.saccharide)) + "\n";
  }
  if (content.dietary_fiber != null) {
    details += "食物繊維 " + (toString(content.dietary_fiber)) + "\n";
  }
  if (content.na != null) {
    details += "Na " + (toString(content.na)) + "\n";
  }
  if (content.salt != null) {
    details += "食塩相当量 " + (toString(content.salt)) + "\n";
  }
  if (content.ca != null) {
    details += "Ca " + (toString(content.ca)) + "\n";
  }
  if (content.mg != null) {
    details += "Mg " + (toString(content.mg)) + "\n";
  }
  if (content.k != null) {
    details += "K " + (toString(content.k)) + "\n";
  }
  if (content.p != null) {
    details += "P " + (toString(content.p)) + "\n";
  }
  if (content.hardness != null) {
    details += "硬度 " + (toString(content.hardness)) + "\n";
  }
  if (content.ph != null) {
    details += "ph " + (toString(content.ph)) + "\n";
  }
  if ((content.volume != null) && isShowVolume) {
    details += "内容量 " + (toString(content.volume)) + "\n";
  }
  if (content.per != null) {
    details += (toString(content.per)) + "あたり\n";
  }
  return details;
};

toString = function(item) {
  var text;
  if (typeof item.value === 'number') {
    text = "" + item.value;
    if (item.about != null) {
      text = "約" + text;
    }
    if (item.unit != null) {
      text += "" + item.unit;
    }
    if (item.under != null) {
      text += "未満";
    }
    if (item.remark != null) {
      text += " (" + item.remark + ")";
    }
    return;
  } else if (typeof item.value === 'object' && (item.value.max != null) && (item.value.min != null)) {
    text = item.value.min + "〜" + item.value.max;
    if (item.about != null) {
      text = "約" + text;
    }
    if (item.unit != null) {
      text += "" + item.unit;
    }
    if (item.under != null) {
      text += "未満";
    }
    if (item.remark != null) {
      text += " (" + item.remark + ")";
    }
    return text;
  }
  return "";
};

exports.toString = toString;


},{}],3:[function(require,module,exports){
var grids, makeButton, makeCreateButton, makeCreateButtonGrid, makeDiv, makeGrid, makeInput, makeJson, makeLabel, makeSpacer, showResult;

grids = [
  {
    prefix: "id",
    text: "ID",
    hasInput: false,
    radiobtns: null,
    isValue: false
  }, {
    prefix: "name",
    text: "商品名",
    hasInput: true,
    radiobtns: null,
    isValue: false
  }, {
    prefix: "company",
    text: "会社名",
    hasInput: true,
    radiobtns: null,
    isValue: false
  }, {
    prefix: "energy",
    text: "カロリー",
    hasInput: true,
    radiobtns: null,
    isValue: true
  }, {
    prefix: "protein",
    text: "たんぱく質",
    hasInput: true,
    radiobtns: null,
    isValue: true
  }, {
    prefix: "fat",
    text: "脂質",
    hasInput: true,
    radiobtns: null,
    isValue: true
  }, {
    prefix: "carbohydrate",
    text: "炭水化物",
    hasInput: true,
    radiobtns: null,
    isValue: true
  }, {
    prefix: "na",
    text: "ナトリウム",
    hasInput: true,
    radiobtns: ["mg", "g"],
    isValue: true
  }, {
    prefix: "salt",
    text: "食塩相当量",
    hasInput: true,
    radiobtns: null,
    isValue: true
  }, {
    prefix: "volume",
    text: "内容量",
    hasInput: true,
    radiobtns: null,
    isValue: true
  }, {
    prefix: "per",
    text: "○○あたり",
    hasInput: true,
    radiobtns: null,
    isValue: true
  }, {
    prefix: "ca",
    text: "カルシウム",
    hasInput: true,
    radiobtns: null,
    isValue: true
  }, {
    prefix: "mg",
    text: "マグネシウム",
    hasInput: true,
    radiobtns: null,
    isValue: true
  }, {
    prefix: "k",
    text: "カリウム",
    hasInput: true,
    radiobtns: null,
    isValue: true
  }
];

makeJson = function(data) {
  return JSON.stringify(data);
};

exports.initView = function() {
  var contents, grid, i, len;
  contents = document.getElementById('contents-create');
  for (i = 0, len = grids.length; i < len; i++) {
    grid = grids[i];
    contents.appendChild(makeGrid(grid.prefix, grid.text, grid.hasInput, grid.radiobtns));
  }
  contents.appendChild(makeCreateButtonGrid());
  return contents;
};

showResult = function() {
  var grid, i, input, len, obj, result;
  result = document.getElementById('result-create');
  obj = {};
  for (i = 0, len = grids.length; i < len; i++) {
    grid = grids[i];
    if (!grid.hasInput) {
      continue;
    }
    input = document.getElementById(grid.prefix + "-input");
    if ((input.value != null) && input.value.length > 0) {
      if (grid.isValue) {
        obj[grid.prefix] = {};
        obj[grid.prefix]["value"] = parseInt(input.value);
      } else {
        obj[gird.prefix] = input.value;
      }
    }
  }
  return result.innerText = makeJson(obj);
};

makeCreateButtonGrid = function() {
  var btn, grid;
  grid = makeDiv(null, "mdl-grid");
  grid.appendChild(makeSpacer());
  btn = makeCreateButton();
  btn.addEventListener('click', showResult);
  grid.appendChild(btn);
  grid.appendChild(makeSpacer());
  return grid;
};

makeCreateButton = function() {
  return makeButton("create-button", "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent", "作成");
};

makeButton = function(id, className, text) {
  var button;
  button = document.createElement('button');
  if (id != null) {
    button.id = id;
  }
  if (className != null) {
    button.className = className;
  }
  button.innerText = text;
  return button;
};

makeGrid = function(idPrefix, text, hasInput, radiobtns) {
  var cell, grid, input, label, radioCell, textFiled;
  if (hasInput == null) {
    hasInput = true;
  }
  grid = makeDiv(null, "mdl-grid");
  grid.appendChild(makeSpacer());
  cell = makeDiv(null, "mdl-cell mdl-cell--4-col");
  grid.appendChild(cell);
  textFiled = makeDiv(null, "mdl-textfield mdl-js-textfield");
  cell.appendChild(textFiled);
  if (hasInput) {
    input = makeInput(idPrefix + "-input", "mdl-textfield__input", "text");
    input.pattern = "-?[0-9]*(\.[0-9]+)?";
    textFiled.appendChild(input);
  }
  label = makeLabel(null, "mdl-textfield__label", idPrefix + "-input", text);
  textFiled.appendChild(label);
  if (radiobtns != null) {
    radioCell = makeDiv(null, "mdl-cell mdl-cell--4-col");
    grid.appendChild(radioCell);
  } else {
    grid.appendChild(makeDiv(null, "mdl-cell mdl-cell--4-col"));
  }
  grid.appendChild(makeSpacer());
  return grid;
};

makeDiv = function(id, className) {
  var div;
  div = document.createElement('div');
  if (id != null) {
    div.id = id;
  }
  if (className != null) {
    div.className = className;
  }
  return div;
};

makeLabel = function(id, className, htmlFor, text, value) {
  var label;
  label = document.createElement('label');
  if (id != null) {
    label.id = id;
  }
  if (className != null) {
    label.className = className;
  }
  if (htmlFor != null) {
    label.htmlFor = htmlFor;
  }
  if (text != null) {
    label.textContent = text;
  }
  if (value != null) {
    label.value = value;
  }
  return label;
};

makeInput = function(id, className, type) {
  var input;
  input = document.createElement('input');
  if (id != null) {
    input.id = id;
  }
  if (className != null) {
    input.className = className;
  }
  if (type != null) {
    input.type = type;
  }
  return input;
};

makeSpacer = function() {
  return makeDiv(null, "mdl-layout-spacer");
};


},{}],4:[function(require,module,exports){
var getJsonData;

getJsonData = function(callback) {
  var req;
  req = new XMLHttpRequest();
  req.open("GET", "https://tanjo.in/calorie-memo/data.json", true);
  req.onload = callback;
  req.send();
};

exports.getData = function(callback) {
  getJsonData(function() {
    var data;
    data = JSON.parse(this.responseText);
    return callback(data.templates);
  });
};


},{}],5:[function(require,module,exports){
var calorieData, creator, data, didSearchInputTextChanged, view;

data = require('./data');

view = require('./view');

creator = require('./creator');

calorieData = [];

window.onload = function() {
  var create, input, resultDiv;
  resultDiv = document.getElementById('result');
  if (resultDiv != null) {
    data.getData(function(data) {
      var d, i, len;
      calorieData = data;
      for (i = 0, len = calorieData.length; i < len; i++) {
        d = calorieData[i];
        resultDiv.appendChild(view.makeHtml(d));
      }
    });
  }
  input = document.getElementById('search-input');
  if (input != null) {
    input.addEventListener('change', didSearchInputTextChanged);
  }
  create = document.getElementById('contents-create');
  if (create != null) {
    creator.initView();
  }
  new Clipboard('.clipboard');
};

didSearchInputTextChanged = function() {
  var d, i, input, len, list, resultDiv;
  resultDiv = document.getElementById('result');
  input = document.getElementById('search-input');
  if (!((resultDiv != null) && (input != null))) {
    return;
  }
  while (resultDiv.firstChild) {
    resultDiv.removeChild(resultDiv.firstChild);
  }
  list = calorieData;
  if (input.value.length > 0) {
    list = calorieData.filter(function(element, index, array) {
      return element.name.indexOf(input.value) !== -1 || element.company.indexOf(input.value) !== -1;
    });
  }
  for (i = 0, len = list.length; i < len; i++) {
    d = list[i];
    resultDiv.appendChild(view.makeHtml(d));
  }
};


},{"./creator":3,"./data":4,"./view":6}],6:[function(require,module,exports){
var calendar, calorie, getSupprtText, makeA, makeChip, makeDiv, makeH4, makeI, makeSpacer;

calendar = require('./calendar');

calorie = require('./calorie');

exports.makeHtml = function(content) {
  var actionDiv, cardDiv, supportTextDiv, title, titleDiv;
  cardDiv = makeDiv(content.id, "card-event mdl-card mdl-shadow--2dp");
  titleDiv = makeDiv(null, "mdl-card__title mdl-card--expand");
  if (content.company != null) {
    titleDiv.appendChild(makeChip(content.company));
  }
  title = "" + content.name;
  if (content.volume != null) {
    title += "" + (calorie.toString(content.volume));
  }
  titleDiv.appendChild(makeH4(title));
  cardDiv.appendChild(titleDiv);
  supportTextDiv = makeDiv(null, "mdl-card__supporting-text");
  supportTextDiv.innerText = getSupprtText(content);
  cardDiv.appendChild(supportTextDiv);
  actionDiv = makeDiv(null, "mdl-card__actions mdl-card--border");
  actionDiv.appendChild(makeA("mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect", "Add to Calendar", calendar.makeUrl(content)));
  actionDiv.appendChild(makeSpacer());
  actionDiv.appendChild(makeI("material-icons", "event"));
  cardDiv.appendChild(actionDiv);
  return cardDiv;
};

makeSpacer = function() {
  return makeDiv(null, "mdl-layout-spacer");
};

exports.makeSpacer = makeSpacer;

makeDiv = function(id, className) {
  var d;
  d = document.createElement('div');
  if (id != null) {
    d.id = id;
  }
  if (className != null) {
    d.className = className;
  }
  return d;
};

makeH4 = function(text) {
  var h4;
  h4 = document.createElement('h4');
  if (text != null) {
    h4.innerText = text;
  }
  return h4;
};

makeA = function(className, text, href) {
  var a;
  a = document.createElement('a');
  if (className != null) {
    a.className = className;
  }
  if (text != null) {
    a.innerText = text;
  }
  if (href != null) {
    a.href = href;
  }
  a.target = "_blank";
  return a;
};

makeI = function(className, text) {
  var i;
  i = document.createElement('i');
  if (className != null) {
    i.className = className;
  }
  if (text != null) {
    i.innerText = text;
  }
  return i;
};

makeChip = function(text) {
  var mdlChipContact;
  mdlChipContact = document.createElement('span');
  mdlChipContact.className = "mdl-chip__contact mdl-color--teal mdl-color-text--white";
  mdlChipContact.innerText = text.substr(0, 1);
  return mdlChipContact;
};

getSupprtText = function(content) {
  return calorie.getDetails(content, true, false);
};


},{"./calendar":1,"./calorie":2}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsInNyYy9jb2ZmZWUvY2FsZW5kYXIuY29mZmVlIiwic3JjL2NvZmZlZS9jYWxvcmllLmNvZmZlZSIsInNyYy9jb2ZmZWUvY3JlYXRvci5jb2ZmZWUiLCJzcmMvY29mZmVlL2RhdGEuY29mZmVlIiwic3JjL2NvZmZlZS9pbmRleC5jb2ZmZWUiLCJzcmMvY29mZmVlL3ZpZXcuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQTs7QUFBQSxPQUFBLEdBQVUsT0FBQSxDQUFRLFdBQVI7O0FBRVYsT0FBTyxDQUFDLE9BQVIsR0FBa0IsU0FBQyxPQUFEO0FBQ2hCLE1BQUE7RUFBQSxJQUFPLGVBQVA7QUFDRSxXQUFPLEdBRFQ7O0VBR0EsSUFBQSxHQUFPLE1BQUEsQ0FBTyxJQUFJLElBQUosQ0FBQSxDQUFQO0FBRVAsU0FBTyx1REFBQSxHQUNMLENBQUEsUUFBQSxHQUFRLENBQUMsT0FBQSxDQUFRLE9BQVIsQ0FBRCxDQUFSLENBREssR0FFTCxDQUFBLFdBQUEsR0FBVyxDQUFDLFVBQUEsQ0FBVyxPQUFYLENBQUQsQ0FBWCxDQUZLLEdBR0wsQ0FBQSxTQUFBLEdBQVUsSUFBVixHQUFlLEdBQWYsR0FBa0IsSUFBbEI7QUFUYzs7QUFXbEIsTUFBQSxHQUFTLFNBQUMsSUFBRDtBQUNQLFNBQU8sSUFBSSxDQUFDLGNBQUwsQ0FBQSxDQUFBLEdBQ0wsUUFBQSxDQUFTLElBQUksQ0FBQyxXQUFMLENBQUEsQ0FBQSxHQUFtQixDQUE1QixDQURLLEdBRUwsUUFBQSxDQUFTLElBQUksQ0FBQyxVQUFMLENBQUEsQ0FBVCxDQUZLLEdBR0wsR0FISyxHQUlMLFFBQUEsQ0FBUyxJQUFJLENBQUMsV0FBTCxDQUFBLENBQVQsQ0FKSyxHQUtMLFFBQUEsQ0FBUyxJQUFJLENBQUMsYUFBTCxDQUFB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QXZCO0VBQ2pCLGNBQWMsQ0FBQyxTQUFmLEdBQ0U7RUFDRixjQUFjLENBQUMsU0FBZixHQUEyQixJQUFJLENBQUMsTUFBTCxDQUFZLENBQVosRUFBZSxDQUFmO0FBQzNCLFNBQU87QUFMRTs7QUFPWCxhQUFBLEdBQWdCLFNBQUMsT0FBRDtBQUNkLFNBQU8sT0FBTyxDQUFDLFVBQVIsQ0FBbUIsT0FBbkIsRUFBNEIsSUFBNUIsRUFBa0MsS0FBbEM7QUFETyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjYWxvcmllID0gcmVxdWlyZSgnLi9jYWxvcmllJylcblxuZXhwb3J0cy5tYWtlVXJsID0gKGNvbnRlbnQpIC0+XG4gIHVubGVzcyBjb250ZW50P1xuICAgIHJldHVybiBcIlwiXG5cbiAgZGF0ZSA9IGdldFVUQyhuZXcgRGF0ZSgpKVxuXG4gIHJldHVybiBcImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vY2FsZW5kYXIvZXZlbnQ/YWN0aW9uPVRFTVBMQVRFXCIgK1xuICAgIFwiJnRleHQ9I3tnZXRUZXh0KGNvbnRlbnQpfVwiICtcbiAgICBcIiZkZXRhaWxzPSN7Z2V0RGV0YWlscyhjb250ZW50KX1cIiArXG4gICAgXCImZGF0ZXM9I3tkYXRlfS8je2RhdGV9XCJcblxuZ2V0VVRDID0gKGRhdGUpIC0+XG4gIHJldHVybiBkYXRlLmdldFVUQ0Z1bGxZZWFyKCkgK1xuICAgIHplcm9maWxsKGRhdGUuZ2V0VVRDTW9udGgoKSsxKSArXG4gICAgemVyb2ZpbGwoZGF0ZS5nZXRVVENEYXRlKCkpICtcbiAgICAnVCcgK1xuICAgIHplcm9maWxsKGRhdGUuZ2V0VVRDSG91cnMoKSkgK1xuICAgIHplcm9maWxsKGRhdGUuZ2V0VVRDTWludXRlcygpKSArXG4gICAgemVyb2ZpbGwoZGF0ZS5nZXRVVENTZWNvbmRzKCkpICtcbiAgICAnWidcblxuemVyb2ZpbGwgPSAobnVtKSAtPlxuICByZXR1cm4gKCcwJyArIG51bSkuc2xpY2UoLTIpXG5cbmdldFRleHQgPSAoY29udGVudCkgLT5cbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChcbiAgICBcIiN7Y29udGVudC5uYW1lfSAje2NhbG9yaWUudG9TdHJpbmcoY29udGVudC5lbmVyZ3kpfVwiXG4gIClcblxuZ2V0RGV0YWlscyA9IChjb250ZW50KSAtPlxuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50IGNhbG9yaWUuZ2V0RGV0YWlscyBjb250ZW50LCBmYWxzZVxuXG5nZXREYXRhVXJsID0gKGNvbnRlbnQpIC0+XG4gIHVybCA9ICdodHRwczovL3RhbmpvaW4uZ2l0aHViLmlvL2NhbG9yaWUtbWVtbz9pZD0nXG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodXJsICsgY29udGVudC5pZClcbiIsImV4cG9ydHMuY29udmVydFRvU2FsdCA9IChzb2RpdW0pIC0+XG4gIHJldHVybiBzb2RpdW0gKiAyLjU0IC8gMTAwMFxuXG5leHBvcnRzLmNvbnZlcnRUb1NvZGl1bSA9IChzYWx0KSAtPlxuICByZXR1cm4gc2FsdCAvIDIuNTQgKiAxMDAwXG5cbmV4cG9ydHMuY2FsY0NhcmJvaHlkcmF0ZSA9IChzYWNjaGFyaWRlLCBkaWV0YXJ5X2ZpYmVyKSAtPlxuICByZXR1cm4gc2FjY2hhcmlkZSArIGRpZXRhcnlfZmliZXJcblxuZXhwb3J0cy5nZXREZXRhaWxzID0gKGNvbnRlbnQsIGlzU2hvd0VuZXJneSA9IHRydWUsIGlzU2hvd1ZvbHVtZSA9IHRydWUpIC0+XG4gIGRldGFpbHMgPSBcIlwiXG4gIGRldGFpbHMgKz0gXCJJRCAje2NvbnRlbnQuaWR9XFxuaHR0cHM6Ly90YW5qby5pbi9jYWxvcmllLW1lbW8vP2lkPSN7Y29udGVudC5pZH1cXG5cIiBpZiBjb250ZW50LmlkP1xuICBkZXRhaWxzICs9IFwiI3t0b1N0cmluZyhjb250ZW50LmVuZXJneSl9XFxuXCIgaWYgY29udGVudC5lbmVyZ3k/IGFuZCBpc1Nob3dFbmVyZ3lcbiAgZGV0YWlscyArPSBcIuOBn+OCk+OBseOBj+izqiAje3RvU3RyaW5nKGNvbnRlbnQucHJvdGVpbil9XFxuXCIgaWYgY29udGVudC5wcm90ZWluP1xuICBkZXRhaWxzICs9IFwi6ISC6LOqICN7dG9TdHJpbmcoY29udGVudC5mYXQpfVxcblwiIGlmIGNvbnRlbnQuZmF0P1xuICBkZXRhaWxzICs9IFwi54Kt5rC05YyW54mpICN7dG9TdHJpbmcoY29udGVudC5jYXJib2h5ZHJhdGUpfVxcblwiIGlmIGNvbnRlbnQuY2FyYm9oeWRyYXRlP1xuICBkZXRhaWxzICs9IFwi57OW6LOqICN7dG9TdHJpbmcoY29udGVudC5zYWNjaGFyaWRlKX1cXG5cIiBpZiBjb250ZW50LnNhY2NoYXJpZGU/XG4gIGRldGFpbHMgKz0gXCLpo5/niannuYrntq0gI3t0b1N0cmluZyhjb250ZW50LmRpZXRhcnlfZmliZXIpfVxcblwiIGlmIGNvbnRlbnQuZGlldGFyeV9maWJlcj9cbiAgZGV0YWlscyArPSBcIk5hICN7dG9TdHJpbmcoY29udGVudC5uYSl9XFxuXCIgaWYgY29udGVudC5uYT9cbiAgZGV0YWlscyArPSBcIumjn+WhqeebuOW9k+mHjyAje3RvU3RyaW5nKGNvbnRlbnQuc2FsdCl9XFxuXCIgaWYgY29udGVudC5zYWx0P1xuICBkZXRhaWxzICs9IFwiQ2EgI3t0b1N0cmluZyhjb250ZW50LmNhKX1cXG5cIiBpZiBjb250ZW50LmNhP1xuICBkZXRhaWxzICs9IFwiTWcgI3t0b1N0cmluZyhjb250ZW50Lm1nKX1cXG5cIiBpZiBjb250ZW50Lm1nP1xuICBkZXRhaWxzICs9IFwiSyAje3RvU3RyaW5nKGNvbnRlbnQuayl9XFxuXCIgaWYgY29udGVudC5rP1xuICBkZXRhaWxzICs9IFwiUCAje3RvU3RyaW5nKGNvbnRlbnQucCl9XFxuXCIgaWYgY29udGVudC5wP1xuICBkZXRhaWxzICs9IFwi56Gs5bqmICN7dG9TdHJpbmcoY29udGVudC5oYXJkbmVzcyl9XFxuXCIgaWYgY29udGVudC5oYXJkbmVzcz9cbiAgZGV0YWlscyArPSBcInBoICN7dG9TdHJpbmcoY29udGVudC5waCl9XFxuXCIgaWYgY29udGVudC5waD9cbiAgZGV0YWlscyArPSBcIuWGheWuuemHjyAje3RvU3RyaW5nKGNvbnRlbnQudm9sdW1lKX1cXG5cIiBpZiBjb250ZW50LnZvbHVtZT8gYW5kIGlzU2hvd1ZvbHVtZVxuICBkZXRhaWxzICs9IFwiI3t0b1N0cmluZyhjb250ZW50LnBlcil944GC44Gf44KKXFxuXCIgaWYgY29udGVudC5wZXI/XG4gIHJldHVybiBkZXRhaWxzXG5cbnRvU3RyaW5nID0gKGl0ZW0pIC0+XG4gIGlmIHR5cGVvZiBpdGVtLnZhbHVlIGlzICdudW1iZXInXG4gICAgdGV4dCA9IFwiI3tpdGVtLnZhbHVlfVwiXG4gICAgdGV4dCA9IFwi57SEXCIgKyB0ZXh0IGlmIGl0ZW0uYWJvdXQ/XG4gICAgdGV4dCArPSBcIiN7aXRlbS51bml0fVwiIGlmIGl0ZW0udW5pdD9cbiAgICB0ZXh0ICs9IFwi5pyq5rqAXCIgaWYgaXRlbS51bmRlcj9cbiAgICB0ZXh0ICs9IFwiICgje2l0ZW0ucmVtYXJrfSlcIiBpZiBpdGVtLnJlbWFyaz9cbiAgICByZXR1cm5cbiAgZWxzZSBpZiB0eXBlb2YgaXRlbS52YWx1ZSBpcyAnb2JqZWN0JyBhbmQgaXRlbS52YWx1ZS5tYXg/IGFuZCBpdGVtLnZhbHVlLm1pbj9cbiAgICB0ZXh0ID0gXCIje2l0ZW0udmFsdWUubWlufeOAnCN7aXRlbS52YWx1ZS5tYXh9XCJcbiAgICB0ZXh0ID0gXCLntIRcIiArIHRleHQgaWYgaXRlbS5hYm91dD9cbiAgICB0ZXh0ICs9IFwiI3tpdGVtLnVuaXR9XCIgaWYgaXRlbS51bml0P1xuICAgIHRleHQgKz0gXCLmnKrmuoBcIiBpZiBpdGVtLnVuZGVyP1xuICAgIHRleHQgKz0gXCIgKCN7aXRlbS5yZW1hcmt9KVwiIGlmIGl0ZW0ucmVtYXJrP1xuICAgIHJldHVybiB0ZXh0XG4gIHJldHVybiBcIlwiXG5cbmV4cG9ydHMudG9TdHJpbmcgPSB0b1N0cmluZ1xuIiwiZ3JpZHMgPSBbXG4gIHsgcHJlZml4OiBcImlkXCIsIHRleHQ6IFwiSURcIiwgaGFzSW5wdXQ6IGZhbHNlLCByYWRpb2J0bnM6IG51bGwsIGlzVmFsdWU6IGZhbHNlIH0sXG4gIHsgcHJlZml4OiBcIm5hbWVcIiwgdGV4dDogXCLllYblk4HlkI1cIiwgaGFzSW5wdXQ6IHRydWUsIHJhZGlvYnRuczogbnVsbCwgaXNWYWx1ZTogZmFsc2UgfSxcbiAgeyBwcmVmaXg6IFwiY29tcGFueVwiLCB0ZXh0OiBcIuS8muekvuWQjVwiLCBoYXNJbnB1dDogdHJ1ZSwgcmFkaW9idG5zOiBudWxsLCBpc1ZhbHVlOiBmYWxzZSB9LFxuICB7IHByZWZpeDogXCJlbmVyZ3lcIiwgdGV4dDogXCLjgqvjg63jg6rjg7xcIiwgaGFzSW5wdXQ6IHRydWUsIHJhZGlvYnRuczogbnVsbCwgaXNWYWx1ZTogdHJ1ZSB9LFxuICB7IHByZWZpeDogXCJwcm90ZWluXCIsIHRleHQ6IFwi44Gf44KT44Gx44GP6LOqXCIsIGhhc0lucHV0OiB0cnVlLCByYWRpb2J0bnM6IG51bGwsIGlzVmFsdWU6IHRydWUgfSxcbiAgeyBwcmVmaXg6IFwiZmF0XCIsIHRleHQ6IFwi6ISC6LOqXCIsIGhhc0lucHV0OiB0cnVlLCByYWRpb2J0bnM6IG51bGwsIGlzVmFsdWU6IHRydWUgfSxcbiAgeyBwcmVmaXg6IFwiY2FyYm9oeWRyYXRlXCIsIHRleHQ6IFwi54Kt5rC05YyW54mpXCIsIGhhc0lucHV0OiB0cnVlLCByYWRpb2J0bnM6IG51bGwsIGlzVmFsdWU6IHRydWUgfSxcbiAgeyBwcmVmaXg6IFwibmFcIiwgdGV4dDogXCLjg4rjg4jjg6rjgqbjg6BcIiwgaGFzSW5wdXQ6IHRydWUsIHJhZGlvYnRuczogW1wibWdcIiwgXCJnXCJdLCBpc1ZhbHVlOiB0cnVlIH0sXG4gIHsgcHJlZml4OiBcInNhbHRcIiwgdGV4dDogXCLpo5/loannm7jlvZPph49cIiwgaGFzSW5wdXQ6IHRydWUsIHJhZGlvYnRuczogbnVsbCwgaXNWYWx1ZTogdHJ1ZSB9LFxuICB7IHByZWZpeDogXCJ2b2x1bWVcIiwgdGV4dDogXCLlhoXlrrnph49cIiwgaGFzSW5wdXQ6IHRydWUsIHJhZGlvYnRuczogbnVsbCwgaXNWYWx1ZTogdHJ1ZSB9LFxuICB7IHByZWZpeDogXCJwZXJcIiwgdGV4dDogXCLil4vil4vjgYLjgZ/jgopcIiwgaGFzSW5wdXQ6IHRydWUsIHJhZGlvYnRuczogbnVsbCwgaXNWYWx1ZTogdHJ1ZSB9LFxuICB7IHByZWZpeDogXCJjYVwiLCB0ZXh0OiBcIuOCq+ODq+OCt+OCpuODoFwiLCBoYXNJbnB1dDogdHJ1ZSwgcmFkaW9idG5zOiBudWxsLCBpc1ZhbHVlOiB0cnVlIH0sXG4gIHsgcHJlZml4OiBcIm1nXCIsIHRleHQ6IFwi44Oe44Kw44ON44K344Km44OgXCIsIGhhc0lucHV0OiB0cnVlLCByYWRpb2J0bnM6IG51bGwsIGlzVmFsdWU6IHRydWUgfSxcbiAgeyBwcmVmaXg6IFwia1wiLCB0ZXh0OiBcIuOCq+ODquOCpuODoFwiLCBoYXNJbnB1dDogdHJ1ZSwgcmFkaW9idG5zOiBudWxsLCBpc1ZhbHVlOiB0cnVlIH1cbl1cblxubWFrZUpzb24gPSAoZGF0YSkgLT5cbiAgSlNPTi5zdHJpbmdpZnkgZGF0YVxuXG5leHBvcnRzLmluaXRWaWV3ID0gLT5cbiAgY29udGVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCAnY29udGVudHMtY3JlYXRlJ1xuXG4gIGZvciBncmlkIGluIGdyaWRzXG4gICAgY29udGVudHMuYXBwZW5kQ2hpbGQgbWFrZUdyaWQoXG4gICAgICBncmlkLnByZWZpeCwgZ3JpZC50ZXh0LCBncmlkLmhhc0lucHV0LCBncmlkLnJhZGlvYnRuc1xuICAgIClcblxuICBjb250ZW50cy5hcHBlbmRDaGlsZCBtYWtlQ3JlYXRlQnV0dG9uR3JpZCgpXG4gIHJldHVybiBjb250ZW50c1xuXG5zaG93UmVzdWx0ID0gLT5cbiAgcmVzdWx0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgJ3Jlc3VsdC1jcmVhdGUnXG5cbiAgb2JqID0ge31cblxuICBmb3IgZ3JpZCBpbiBncmlkc1xuICAgIHVubGVzcyBncmlkLmhhc0lucHV0XG4gICAgICBjb250aW51ZVxuICAgIGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCIje2dyaWQucHJlZml4fS1pbnB1dFwiXG4gICAgaWYgaW5wdXQudmFsdWU/IGFuZCBpbnB1dC52YWx1ZS5sZW5ndGggPiAwXG4gICAgICBpZiBncmlkLmlzVmFsdWVcbiAgICAgICAgb2JqW2dyaWQucHJlZml4XSA9IHt9XG4gICAgICAgIG9ialtncmlkLnByZWZpeF1bXCJ2YWx1ZVwiXSA9IHBhcnNlSW50IGlucHV0LnZhbHVlXG4gICAgICBlbHNlXG4gICAgICAgIG9ialtnaXJkLnByZWZpeF0gPSBpbnB1dC52YWx1ZVxuXG4gIHJlc3VsdC5pbm5lclRleHQgPSBtYWtlSnNvbiBvYmpcblxubWFrZUNyZWF0ZUJ1dHRvbkdyaWQgPSAtPlxuICBncmlkID0gbWFrZURpdiBudWxsLCBcIm1kbC1ncmlkXCJcbiAgZ3JpZC5hcHBlbmRDaGlsZCBtYWtlU3BhY2VyKClcbiAgYnRuID0gbWFrZUNyZWF0ZUJ1dHRvbigpXG4gIGJ0bi5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIHNob3dSZXN1bHRcbiAgZ3JpZC5hcHBlbmRDaGlsZCBidG5cbiAgZ3JpZC5hcHBlbmRDaGlsZCBtYWtlU3BhY2VyKClcbiAgcmV0dXJuIGdyaWRcblxubWFrZUNyZWF0ZUJ1dHRvbiA9IC0+XG4gIHJldHVybiBtYWtlQnV0dG9uKFxuICAgIFwiY3JlYXRlLWJ1dHRvblwiLFxuICAgIFwibWRsLWJ1dHRvbiBtZGwtanMtYnV0dG9uIG1kbC1idXR0b24tLXJhaXNlZCBtZGwtanMtcmlwcGxlLWVmZmVjdCBtZGwtYnV0dG9uLS1hY2NlbnRcIixcbiAgICBcIuS9nOaIkFwiXG4gIClcblxubWFrZUJ1dHRvbiA9IChpZCwgY2xhc3NOYW1lLCB0ZXh0KSAtPlxuICBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdidXR0b24nXG4gIGJ1dHRvbi5pZCA9IGlkIGlmIGlkP1xuICBidXR0b24uY2xhc3NOYW1lID0gY2xhc3NOYW1lIGlmIGNsYXNzTmFtZT9cbiAgYnV0dG9uLmlubmVyVGV4dCA9IHRleHRcbiAgcmV0dXJuIGJ1dHRvblxuXG5tYWtlR3JpZCA9IChpZFByZWZpeCwgdGV4dCwgaGFzSW5wdXQgPSB0cnVlLCByYWRpb2J0bnMpIC0+XG4gIGdyaWQgPSBtYWtlRGl2IG51bGwsIFwibWRsLWdyaWRcIlxuICBncmlkLmFwcGVuZENoaWxkIG1ha2VTcGFjZXIoKVxuXG4gIGNlbGwgPSBtYWtlRGl2IG51bGwsIFwibWRsLWNlbGwgbWRsLWNlbGwtLTQtY29sXCJcbiAgZ3JpZC5hcHBlbmRDaGlsZCBjZWxsXG5cbiAgdGV4dEZpbGVkID0gbWFrZURpdiBudWxsLCBcIm1kbC10ZXh0ZmllbGQgbWRsLWpzLXRleHRmaWVsZFwiXG4gIGNlbGwuYXBwZW5kQ2hpbGQgdGV4dEZpbGVkXG5cbiAgaWYgaGFzSW5wdXRcbiAgICBpbnB1dCA9IG1ha2VJbnB1dCBcIiN7aWRQcmVmaXh9LWlucHV0XCIsIFwibWRsLXRleHRmaWVsZF9faW5wdXRcIiwgXCJ0ZXh0XCJcbiAgICBpbnB1dC5wYXR0ZXJuID0gXCItP1swLTldKihcXC5bMC05XSspP1wiXG4gICAgdGV4dEZpbGVkLmFwcGVuZENoaWxkIGlucHV0XG5cbiAgbGFiZWwgPSBtYWtlTGFiZWwgbnVsbCwgXCJtZGwtdGV4dGZpZWxkX19sYWJlbFwiLCBcIiN7aWRQcmVmaXh9LWlucHV0XCIsIHRleHRcbiAgdGV4dEZpbGVkLmFwcGVuZENoaWxkIGxhYmVsXG5cbiAgaWYgcmFkaW9idG5zP1xuICAgIHJhZGlvQ2VsbCA9IG1ha2VEaXYgbnVsbCwgXCJtZGwtY2VsbCBtZGwtY2VsbC0tNC1jb2xcIlxuICAgIGdyaWQuYXBwZW5kQ2hpbGQgcmFkaW9DZWxsXG4gIGVsc2VcbiAgICBncmlkLmFwcGVuZENoaWxkIG1ha2VEaXYgbnVsbCwgXCJtZGwtY2VsbCBtZGwtY2VsbC0tNC1jb2xcIlxuXG4gIGdyaWQuYXBwZW5kQ2hpbGQgbWFrZVNwYWNlcigpXG5cbiAgcmV0dXJuIGdyaWRcblxubWFrZURpdiA9IChpZCwgY2xhc3NOYW1lKSAtPlxuICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdkaXYnXG4gIGRpdi5pZCA9IGlkIGlmIGlkP1xuICBkaXYuY2xhc3NOYW1lID0gY2xhc3NOYW1lIGlmIGNsYXNzTmFtZT9cbiAgcmV0dXJuIGRpdlxuXG5tYWtlTGFiZWwgPSAoaWQsIGNsYXNzTmFtZSwgaHRtbEZvciwgdGV4dCwgdmFsdWUpIC0+XG4gIGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnbGFiZWwnXG4gIGxhYmVsLmlkID0gaWQgaWYgaWQ/XG4gIGxhYmVsLmNsYXNzTmFtZSA9IGNsYXNzTmFtZSBpZiBjbGFzc05hbWU/XG4gIGxhYmVsLmh0bWxGb3IgPSBodG1sRm9yIGlmIGh0bWxGb3I/XG4gIGxhYmVsLnRleHRDb250ZW50ID0gdGV4dCBpZiB0ZXh0P1xuICBsYWJlbC52YWx1ZSA9IHZhbHVlIGlmIHZhbHVlP1xuICByZXR1cm4gbGFiZWxcblxubWFrZUlucHV0ID0gKGlkLCBjbGFzc05hbWUsIHR5cGUpIC0+XG4gIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnaW5wdXQnXG4gIGlucHV0LmlkID0gaWQgaWYgaWQ/XG4gIGlucHV0LmNsYXNzTmFtZSA9IGNsYXNzTmFtZSBpZiBjbGFzc05hbWU/XG4gIGlucHV0LnR5cGUgPSB0eXBlIGlmIHR5cGU/XG4gIHJldHVybiBpbnB1dFxuXG5tYWtlU3BhY2VyID0gKCkgLT5cbiAgcmV0dXJuIG1ha2VEaXYgbnVsbCwgXCJtZGwtbGF5b3V0LXNwYWNlclwiXG4iLCJnZXRKc29uRGF0YSA9IChjYWxsYmFjaykgLT5cbiAgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcbiAgcmVxLm9wZW4gXCJHRVRcIiwgXCJodHRwczovL3RhbmpvLmluL2NhbG9yaWUtbWVtby9kYXRhLmpzb25cIiwgdHJ1ZVxuICByZXEub25sb2FkID0gY2FsbGJhY2tcbiAgcmVxLnNlbmQoKVxuICByZXR1cm5cblxuZXhwb3J0cy5nZXREYXRhID0gKGNhbGxiYWNrKSAtPlxuICBnZXRKc29uRGF0YSAtPlxuICAgIGRhdGEgPSBKU09OLnBhcnNlIHRoaXMucmVzcG9uc2VUZXh0XG4gICAgY2FsbGJhY2sgZGF0YS50ZW1wbGF0ZXNcbiAgcmV0dXJuXG4iLCJkYXRhID0gcmVxdWlyZSAnLi9kYXRhJ1xudmlldyA9IHJlcXVpcmUgJy4vdmlldydcbmNyZWF0b3IgPSByZXF1aXJlICcuL2NyZWF0b3InXG5cbmNhbG9yaWVEYXRhID0gW11cblxud2luZG93Lm9ubG9hZCA9IC0+XG4gIHJlc3VsdERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkICdyZXN1bHQnXG4gIGlmIHJlc3VsdERpdj9cbiAgICBkYXRhLmdldERhdGEgKGRhdGEpIC0+XG4gICAgICBjYWxvcmllRGF0YSA9IGRhdGFcbiAgICAgIGZvciBkIGluIGNhbG9yaWVEYXRhXG4gICAgICAgIHJlc3VsdERpdi5hcHBlbmRDaGlsZCB2aWV3Lm1ha2VIdG1sIGRcbiAgICAgIHJldHVyblxuXG4gIGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgJ3NlYXJjaC1pbnB1dCdcbiAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lciAnY2hhbmdlJywgZGlkU2VhcmNoSW5wdXRUZXh0Q2hhbmdlZCBpZiBpbnB1dD9cblxuICBjcmVhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCAnY29udGVudHMtY3JlYXRlJ1xuICBjcmVhdG9yLmluaXRWaWV3KCkgaWYgY3JlYXRlP1xuXG4gIG5ldyBDbGlwYm9hcmQgJy5jbGlwYm9hcmQnXG5cbiAgcmV0dXJuXG5cbmRpZFNlYXJjaElucHV0VGV4dENoYW5nZWQgPSAtPlxuICByZXN1bHREaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCAncmVzdWx0J1xuICBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkICdzZWFyY2gtaW5wdXQnXG4gIHVubGVzcyByZXN1bHREaXY/IGFuZCBpbnB1dD9cbiAgICByZXR1cm5cbiAgd2hpbGUgcmVzdWx0RGl2LmZpcnN0Q2hpbGRcbiAgICByZXN1bHREaXYucmVtb3ZlQ2hpbGQgcmVzdWx0RGl2LmZpcnN0Q2hpbGRcblxuICBsaXN0ID0gY2Fsb3JpZURhdGFcbiAgaWYgaW5wdXQudmFsdWUubGVuZ3RoID4gMFxuICAgIGxpc3QgPSBjYWxvcmllRGF0YS5maWx0ZXIgKGVsZW1lbnQsIGluZGV4LCBhcnJheSkgLT5cbiAgICAgIHJldHVybiBlbGVtZW50Lm5hbWUuaW5kZXhPZihpbnB1dC52YWx1ZSkgaXNudCAtMSBvclxuICAgICAgICBlbGVtZW50LmNvbXBhbnkuaW5kZXhPZihpbnB1dC52YWx1ZSkgaXNudCAtMVxuICBmb3IgZCBpbiBsaXN0XG4gICAgcmVzdWx0RGl2LmFwcGVuZENoaWxkIHZpZXcubWFrZUh0bWwgZFxuICByZXR1cm5cbiIsImNhbGVuZGFyID0gcmVxdWlyZSgnLi9jYWxlbmRhcicpXG5jYWxvcmllID0gcmVxdWlyZSgnLi9jYWxvcmllJylcblxuZXhwb3J0cy5tYWtlSHRtbCA9IChjb250ZW50KSAtPlxuICBjYXJkRGl2ID0gbWFrZURpdihjb250ZW50LmlkLCBcImNhcmQtZXZlbnQgbWRsLWNhcmQgbWRsLXNoYWRvdy0tMmRwXCIpXG5cbiAgdGl0bGVEaXYgPSBtYWtlRGl2KG51bGwsIFwibWRsLWNhcmRfX3RpdGxlIG1kbC1jYXJkLS1leHBhbmRcIilcbiAgdGl0bGVEaXYuYXBwZW5kQ2hpbGQgbWFrZUNoaXAgY29udGVudC5jb21wYW55IGlmIGNvbnRlbnQuY29tcGFueT9cbiAgdGl0bGUgPSBcIiN7Y29udGVudC5uYW1lfVwiXG4gIHRpdGxlICs9IFwiI3tjYWxvcmllLnRvU3RyaW5nKGNvbnRlbnQudm9sdW1lKX1cIiBpZiBjb250ZW50LnZvbHVtZT9cbiAgdGl0bGVEaXYuYXBwZW5kQ2hpbGQgbWFrZUg0IHRpdGxlXG4gIGNhcmREaXYuYXBwZW5kQ2hpbGQgdGl0bGVEaXZcblxuICBzdXBwb3J0VGV4dERpdiA9IG1ha2VEaXYobnVsbCwgXCJtZGwtY2FyZF9fc3VwcG9ydGluZy10ZXh0XCIpXG4gIHN1cHBvcnRUZXh0RGl2LmlubmVyVGV4dCA9IGdldFN1cHBydFRleHQgY29udGVudFxuICBjYXJkRGl2LmFwcGVuZENoaWxkIHN1cHBvcnRUZXh0RGl2XG5cbiAgYWN0aW9uRGl2ID0gbWFrZURpdihudWxsLCBcIm1kbC1jYXJkX19hY3Rpb25zIG1kbC1jYXJkLS1ib3JkZXJcIilcbiAgYWN0aW9uRGl2LmFwcGVuZENoaWxkIG1ha2VBKFxuICAgIFwibWRsLWJ1dHRvbiBtZGwtYnV0dG9uLS1jb2xvcmVkIG1kbC1qcy1idXR0b24gbWRsLWpzLXJpcHBsZS1lZmZlY3RcIixcbiAgICBcIkFkZCB0byBDYWxlbmRhclwiLFxuICAgIGNhbGVuZGFyLm1ha2VVcmwoY29udGVudClcbiAgKVxuICBhY3Rpb25EaXYuYXBwZW5kQ2hpbGQgbWFrZVNwYWNlcigpXG4gIGFjdGlvbkRpdi5hcHBlbmRDaGlsZCBtYWtlSShcIm1hdGVyaWFsLWljb25zXCIsIFwiZXZlbnRcIilcbiAgY2FyZERpdi5hcHBlbmRDaGlsZCBhY3Rpb25EaXZcblxuICByZXR1cm4gY2FyZERpdlxuXG5tYWtlU3BhY2VyID0gLT5cbiAgcmV0dXJuIG1ha2VEaXYobnVsbCwgXCJtZGwtbGF5b3V0LXNwYWNlclwiKVxuXG5leHBvcnRzLm1ha2VTcGFjZXIgPSBtYWtlU3BhY2VyXG5cbm1ha2VEaXYgPSAoaWQsIGNsYXNzTmFtZSkgLT5cbiAgZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ2RpdidcbiAgZC5pZCA9IGlkIGlmIGlkP1xuICBkLmNsYXNzTmFtZSA9IGNsYXNzTmFtZSBpZiBjbGFzc05hbWU/XG4gIHJldHVybiBkXG5cbm1ha2VINCA9ICh0ZXh0KSAtPlxuICBoNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ2g0J1xuICBoNC5pbm5lclRleHQgPSB0ZXh0IGlmIHRleHQ/XG4gIHJldHVybiBoNFxuXG5tYWtlQSA9IChjbGFzc05hbWUsIHRleHQsIGhyZWYpIC0+XG4gIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdhJ1xuICBhLmNsYXNzTmFtZSA9IGNsYXNzTmFtZSBpZiBjbGFzc05hbWU/XG4gIGEuaW5uZXJUZXh0ID0gdGV4dCBpZiB0ZXh0P1xuICBhLmhyZWYgPSBocmVmIGlmIGhyZWY/XG4gIGEudGFyZ2V0ID0gXCJfYmxhbmtcIlxuICByZXR1cm4gYVxuXG5tYWtlSSA9IChjbGFzc05hbWUsIHRleHQpIC0+XG4gIGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdpJ1xuICBpLmNsYXNzTmFtZSA9IGNsYXNzTmFtZSBpZiBjbGFzc05hbWU/XG4gIGkuaW5uZXJUZXh0ID0gdGV4dCBpZiB0ZXh0P1xuICByZXR1cm4gaVxuXG5tYWtlQ2hpcCA9ICh0ZXh0KSAtPlxuICBtZGxDaGlwQ29udGFjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ3NwYW4nXG4gIG1kbENoaXBDb250YWN0LmNsYXNzTmFtZSA9XG4gICAgXCJtZGwtY2hpcF9fY29udGFjdCBtZGwtY29sb3ItLXRlYWwgbWRsLWNvbG9yLXRleHQtLXdoaXRlXCJcbiAgbWRsQ2hpcENvbnRhY3QuaW5uZXJUZXh0ID0gdGV4dC5zdWJzdHIgMCwgMVxuICByZXR1cm4gbWRsQ2hpcENvbnRhY3RcblxuZ2V0U3VwcHJ0VGV4dCA9IChjb250ZW50KSAtPlxuICByZXR1cm4gY2Fsb3JpZS5nZXREZXRhaWxzIGNvbnRlbnQsIHRydWUsIGZhbHNlXG4iXX0=
