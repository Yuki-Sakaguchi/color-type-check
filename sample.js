const vm1 = new Vue({
    el: "#goinghome",
    methods: {
      movetohome: function () {
        window.location.href = "home.html"
      }
    }
  }),
  vm2 = new Vue({
    el: "#goingENhome",
    methods: {
      movetohome: function () {
        window.location.href = "home.eng.html"
      }
    }
  }),
  vm3 = new Vue({
    el: "#title-effect",
    methods: {
      bird: function () {
        fetch("./datas/contents.json").then(function (t) {
          t.ok ? t.json().then(function (t) {
            let e = `a${t.birdNames[Math.floor(Math.random()*t.birdNames.length)]}`;
            alert(`At this monent, your lucky bird is ${e}!! \n\nHave a nice moment!`)
          }) : console.log("Network request for ./datas/contents.json failed with response " + t.status + ": " + t.statusText)
        })
      }
    }
  }),
  vm4 = new Vue({
    el: "#app-tc",
    methods: {
      transform_colorcode: function () {
        const t = document.getElementById("hexcode"),
          e = document.getElementById("deccode"),
          n = document.getElementById("show"),
          o = document.field.Red.value,
          s = document.field.Green.value,
          c = document.field.Blue.value,
          r = `#${("00"+parseInt(o).toString(16)).slice(-2)}${("00"+parseInt(s).toString(16)).slice(-2)}${("00"+parseInt(c).toString(16)).slice(-2)}`,
          a = `rgb( ${o}, ${s}, ${c} )`;
        t.innerHTML = r, e.innerHTML = a, n.style.backgroundColor = r, n.style.border = r
      }
    }
  }),
  vm5 = new Vue({
    el: "#app-adjB",
    methods: {
      adjustBrightness: function () {
        fetch("../datas/contents.json").then(function (t) {
          if (t.ok) return t.json();
          console.log("Network request for ../datas/contents.json failed with response " + t.status + ": " + t.statusText)
        }).then(t => {
          d(t.colorType)
        });
        const t = document.getElementById("hexafter"),
          e = document.getElementById("judged"),
          n = document.getElementById("show1"),
          o = document.getElementById("show2");
        let s = [],
          c = [];
        const r = document.field.hexbefore.value,
          a = document.field.ratio.value;
        n.style.backgroundColor = r, n.style.border = r;
        const l = ((t, e) => {
            c = (t => 0 === t.reduce((t, e) => parseInt(t, 16) + parseInt(e, 16)) ? ["01", "01", "01"] : t)([t.slice(1, 3), t.slice(3, 5), t.slice(5, 7)]);
            const n = [];
            for (let t = 0; t < c.length; t++) {
              const o = Math.round(parseInt(c[t], 16) * e);
              o < 256 ? (s.push(o), n.push(("00" + o.toString(16)).slice(-2))) : (s.push(255), n.push("ff"))
            }
            return n
          })(r, a),
          i = `#${l[0]}${l[1]}${l[2]}`;
        t.innerHTML = i, o.style.backgroundColor = i, o.style.border = i;
        const d = t => {
          const n = c.map(t => parseInt(t, 16)),
            o = n[0],
            r = n[1],
            a = n[2],
            l = n.reduce((t, e) => Math.max(t, e)),
            d = n.reduce((t, e) => Math.min(t, e)),
            u = n.reduce((t, e) => t + e) / n.length,
            h = `${i} (R:${s[0]} G:${s[1]} B:${s[2]}) と同じ色相は < `;
          let p;
          l === d ? p = `${h}${t.GL} > です` : l === o && d === r ? p = u >= a ? `${h}${t.R} > です` : `${h}${t.M} > です` : l === o && d === a ? p = u >= r ? `${h}${t.R} > です` : `${h}${t.Y} > です` : l === r && d === o ? p = u >= a ? `${h}${t.G} > です` : `${h}${t.C} > です` : l === r && d === a ? p = u >= o ? `${h}${t.G} > です` : `${h}${t.Y} > です` : l === a && d === o ? p = u >= r ? `${h}${t.B} > です` : `${h}${t.C} > です` : l === a && d === r && (p = u >= o ? `${h}${t.B} > です` : `${h}${t.M} > です`), e.innerHTML = p
        }
      }
    }
  });
Vue.component("modal", {
  template: "#m-template"
});
const vm6 = new Vue({
    el: "#whoAmI",
    data: {
      showQRCode: !1
    }
  }),
  codeSpace = document.getElementById("codeblock"),
  script1 = () => {
    fetch("./tools/App_QRCM.copy.py").then(function (t) {
      t.ok ? t.text().then(function (t) {
        codeSpace.innerHTML = `\n${t}`
      }) : console.log("Network request for tools/App_QRCM.copy.py failed with response " + t.status + ": " + t.statusText)
    })
  },
  script2 = () => {
    fetch("./tools/App_SLW.excerpt.py").then(function (t) {
      t.ok ? t.text().then(function (t) {
        codeSpace.innerHTML = `\n${t}`
      }) : console.log("Network request for tools/App_SLW.excerpt.py failed with response " + t.status + ": " + t.statusText)
    })
  },
  script3 = () => {
    fetch("./tools/App_wa_scraper.copy.py").then(function (t) {
      t.ok ? t.text().then(function (t) {
        codeSpace.innerHTML = `\n${t}`
      }) : console.log("Network request for tools/App_wa_scraper.copy.py failed with response " + t.status + ": " + t.statusText)
    })
  },
  titleSpace = document.getElementById("abstract-title"),
  descriptionSpace = document.getElementById("abstract-description"),
  contentSpace = document.getElementById("abstract-content"),
  contentFinisher = t => {
    const e = t.split("\n");
    let n = "";
    for (let t = 0; t < e.length; t++) n += `<p class="indent">${e[t]}</p>`;
    return n
  },
  abstractGenerator = t => {
    fetch("./datas/contents.json").then(function (t) {
      if (t.ok) return t.json();
      console.log("Network request for ./datas/contents.json failed with response " + t.status + ": " + t.statusText)
    }).then(t => {
      const e = document.getElementById("abstract-select"),
        n = e.selectedIndex,
        o = e.options[n].value;
      titleSpace.innerHTML = `${t.abstract[o].title}`, descriptionSpace.innerHTML = "", contentSpace.innerHTML = contentFinisher(t.abstract[o].content)
    })
  };
let cvcontentEl = document.getElementById("CV-space");
const historyGenerator = t => {
    0 == t ? fetch("./datas/contents.json").then(function (t) {
      if (t.ok) return t.json();
      console.log("Network request ./datas/contents.json failed with response " + t.status + ": " + t.statusText)
    }).then(t => {
      const e = t.CVlist.JPN,
        n = ["研究領域", "職歴", "学歴"];
      let o = "",
        s = "",
        c = [];
      for (let t = 0; t < n.length; t++) {
        c = e[n[t]];
        for (let t = 0; t < c.length; t++) s += `<tr><td class='CV-list-item-left'>${c[t][0]}</td><td class='CV-list-item-right'>${c[t][1]}</td></tr>`;
        o += `<tr><td class='CV-head-jp'>${n[t]}</td>${s}<tr></tr></tr>`, s = ""
      }
      cvcontentEl.innerHTML = `<table id='CV-table'>${o}</table>`
    }) : 1 == t && fetch("./datas/contents.json").then(function (t) {
      if (t.ok) return t.json();
      console.log("Network request for ./datas/contents.json failed with response " + t.status + ": " + t.statusText)
    }).then(t => {
      cvcontentEl.innerHTML = `${t.history}`
    })
  },
  history1 = () => {
    historyGenerator(0)
  },
  history2 = () => {
    historyGenerator(1)
  };