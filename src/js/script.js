// reactivity data
let oData;
// Monitoring data value
let _yyyy, _mm, _dd, _hh, _mi, _ss;
// Monitoring data
const data = {};
// DOM
const $yyyy = document.querySelector('.yyyy');
const $mm = document.querySelector('.mm');
const $dd = document.querySelector('.dd');
const $hh = document.querySelector('.hh');
const $mi = document.querySelector('.mi');
const $ss = document.querySelector('.ss');
const $full = document.querySelector('.full');

function reactivity(el, data, prop, val) {
  return Object.defineProperty(data, prop, {
    get: function () {
      return val;
    },
    set: function (newValue) {
      val = newValue;
      animate(el, prop, val);
    }
  });
}

function format(date) {
  let yyyy = date.getFullYear();
  let mm = String(date.getMonth() + 1);
  let dd = String(date.getDate());
  let hh = String(date.getHours());
  let mi = String(date.getMinutes());
  let ss = String(date.getSeconds());

  if (mm.length == 1) mm = '0' + mm;
  if (dd.length == 1) dd = '0' + dd;
  if (hh.length == 1) hh = '0' + hh;
  if (mi.length == 1) mi = '0' + mi;
  if (ss.length == 1) ss = '0' + ss;

  return {
    time: `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`,
    yyyy,
    mm,
    dd,
    hh,
    mi,
    ss
  };
}

function render(date) {
  let {
    time,
    yyyy,
    mm,
    dd,
    hh,
    mi,
    ss
  } = format(date);

  if (oData.yyyy != yyyy) oData.yyyy = yyyy;
  if (oData.mm != mm) oData.mm = mm;
  if (oData.dd != dd) oData.dd = dd;
  if (oData.hh != hh) oData.hh = hh;
  if (oData.mi != mi) oData.mi = mi;
  if (oData.ss != ss) oData.ss = ss;

  $full.innerHTML = time;
}

function animate(el, prop, val) {
  let original = `num ${prop}`;

  el.dataset['pre'] = el.dataset['val'] || val;
  el.dataset['val'] = val;

  if (val % 2 == 0) {
    el.className = `${original} ready1 ready2_`;
    setTimeout(() => {
      el.className = `${original} ready-go1 ready-go2_`;
      setTimeout(() => {
        el.innerHTML = val;
        el.className = `${original} over ready-go2_`;
        setTimeout(() => {
          el.className = `${original} reset1 reset2_`;
        }, 167);
      }, 167);
    }, 167);
  } else {
    el.className = `${original} ready2 ready1_`;
    setTimeout(() => {
      el.className = `${original} ready-go2 ready-go1_`;
      setTimeout(() => {
        el.innerHTML = val;
        el.className = `${original} over ready-go1_`;
        setTimeout(() => {
          el.className = `${original} reset2 reset1_`;
        }, 167);
      }, 167);
    }, 167);
  }
}

// define property and make reactivity data
oData = reactivity($yyyy, data, 'yyyy', _yyyy);
oData = reactivity($mm, data, 'mm', _mm);
oData = reactivity($dd, data, 'dd', _dd);
oData = reactivity($hh, data, 'hh', _hh);
oData = reactivity($mi, data, 'mi', _mi);
oData = reactivity($ss, data, 'ss', _ss);

// below is business logic
render(new Date);

setInterval(function () {
  render(new Date);
}, 1000);
