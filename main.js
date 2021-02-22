// 参考
// https://www.morinagayutaka.info/tools/CJB.html

const inputColor = document.querySelector('[name="color"]');
const result = document.querySelector('.result');

const colorType = {
    "BL": "ブラック",
    "W": "ホワイト",
    "GL": "グレー系",
    "R": "レッド系",
    "M": "マゼンダ系",
    "Y": "イエロー系",
    "G": "グリーン系",
    "C": "シアン系",
    "B": "ブルー系"
}

function main () {
    let s = [];
    let c = [];

    const l = ((colorCode, ratio) => {
        c = (colorCodeList => 0 === colorCodeList.reduce((t, e) => parseInt(t, 16) + parseInt(e, 16)) ? ["01", "01", "01"] : colorCodeList)([colorCode.slice(1, 3), colorCode.slice(3, 5), colorCode.slice(5, 7)]);
        const n = [];
        for (let i = 0; i < c.length; i++) {
        const o = Math.round(parseInt(c[i], 16) * ratio);
        if (o < 256) {
            s.push(o);
            n.push(("00" + o.toString(16)).slice(-2));
        } else {
            s.push(255);
            n.push("ff");
        }
        }
        return n
    })(inputColor.value, 1);

    const i = `#${l[0]}${l[1]}${l[2]}`

    console.log(s, c, l, i)

    const d = () => {
        const t = colorType;
        const n = c.map(t => parseInt(t, 16)),
        o = n[0],
        r = n[1],
        a = n[2],
        l = n.reduce((t, e) => Math.max(t, e)),
        d = n.reduce((t, e) => Math.min(t, e)),
        u = n.reduce((t, e) => t + e) / n.length,
        h = `${i} (R:${s[0]} G:${s[1]} B:${s[2]}) と同じ色相は < `;
        let p;
        l === d ? p = `${h}${t.GL} > です` : l === o && d === r ? p = u >= a ? `${h}${t.R} > です` : `${h}${t.M} > です` : l === o && d === a ? p = u >= r ? `${h}${t.R} > です` : `${h}${t.Y} > です` : l === r && d === o ? p = u >= a ? `${h}${t.G} > です` : `${h}${t.C} > です` : l === r && d === a ? p = u >= o ? `${h}${t.G} > です` : `${h}${t.Y} > です` : l === a && d === o ? p = u >= r ? `${h}${t.B} > です` : `${h}${t.C} > です` : l === a && d === r && (p = u >= o ? `${h}${t.B} > です` : `${h}${t.M} > です`);
        console.log(p);
        result.textContent = p;
    }

    d();
}


main();