setInterval(setClock, 1)

const chfr = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]
const jours = ["الأحد", "الإثنين", "الثلثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const mois = ["جانفي", "فيفري", "مارس", "أفريل", "مايو", "جوان", "جويلية", "أوت", "سبتمبر", "أوكتبر", "نوفمبر", "ديسمبر"]

const dtArab = document.querySelector('.datar')
const dtFr = document.querySelector('.datfr')

const hourHand = document.querySelector('[data-hour-hand]')
const hurHand = document.querySelector('[data-hur-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')

const jj = document.querySelector('[data-jour]')
const jjr = document.querySelector('[data-jra]')
const mm = document.querySelector('[data-mois]')

const youm = document.querySelector('.youm')
const jour = document.querySelector('.jour')
const dday = document.querySelector('.dday')
// const an = document.querySelector('.annee')

// youm.innerHTML = (jours[new Date().getDay()])
// jour.innerHTML = (jours[new Date().getDay() + 7])
// dday.innerHTML = (jours[new Date().getDay() + 14])
// mm.innerHTML = mois[new Date().getMonth()]
// jj.innerHTML = new Date().toString().split(' ')[2]
const imgVerre = document.querySelector('.verre')
const docLink = document.querySelector("head > link")
let fond = true
let sens = -1
imgVerre.addEventListener('click', () => {
    switch (fond) {
        case true:
            docLink.href = 'public/styleNuit.css'
            fond = !fond
            break;
        default:
            docLink.href = 'public/styleJour.css'
            fond = !fond
            break;
    }
    for (let i = 1; i < 24; i++) {
        chr = document.querySelector('.number' + i)
        ang = sens * i * 15 + 'deg'
        chr.style.setProperty('--rotation', ang)
    }
    sens *= -1
    dateur(new Date())
})
dateur(new Date())
function setClock() {

    const currentDate = new Date()

    if ((currentDate.getHours() == 0) && (currentDate.getSeconds() == 0)) { Location.reload() }

    if (currentDate.getHours() > 12) {
        hurHand.style.setProperty('border', "3px solid #d66719")
    } else {
        hurHand.style.setProperty('border', "0px")
    }
    // if ((currentDate.getMinutes() + currentDate.getHours()) <= 61) { dateur(currentDate) }
    currentDate.getHours() == 0 ? (currentDate.getMinutes() == 0 ? dateur(currentDate) : undefined) : undefined
    const secondsRatio = currentDate.getSeconds()
    const secRatio = (Date.now() / 10000) * 60;
    // const minutesRatio = currentDate.getMinutes() + secondsRatio / 60
    const minutesRatio = currentDate.getMinutes()
    const hr = currentDate.getHours()
    // const hoursRatio = ((secondsRatio / 120 + currentDate.getMinutes()) / 24) + ((hr >= 12) ? (hr - 12) * 2.5 : (hr + 12) * 2.5)
    const hoursRatio = ((currentDate.getMinutes()) / 24) + ((hr >= 12) ? (hr - 12) * 2.5 : (hr + 12) * 2.5)

    const jjRatio = currentDate.toString().split(' ')[2] * 1
    const mmRatio = (new Date().getMonth() + 1) * 2.5

    setRotation(secondHand, sens * secRatio)
    setRotation(minuteHand, sens * minutesRatio)
    setRotation(hourHand, sens * hoursRatio)
    setRotation(hurHand, sens * (hoursRatio + 90))
    setRotation(jjr, sens * jjRatio)
    setRotation(mm, sens * (mmRatio - 90))
    setRotation(jj, sens * (mmRatio - 90))
}

function setRotation(element, rotationRatio) {
    element.style.setProperty('--rotation', rotationRatio)
}

function dateur(ddate) {
    const event = ddate;
    const options = {
        // weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }

    // console.log(event.toLocaleDateString('ar-EG', options));
    // Expected output (varies according to local timezone): الخميس، ٢٠ ديسمبر، ٢٠١٢


    youm.innerHTML = (jours[ddate.getDay()])
    jour.innerHTML = (jours[ddate.getDay() + 7])
    dday.innerHTML = (jours[ddate.getDay() + 14])
    // an.innerHTML = (2025 - 125 + ddate.getYear()) % 2000
    mm.innerHTML = mois[ddate.getMonth()]
    jj.innerHTML = ddate.toString().split(' ')[2]

    jjr.innerHTML = (ddate.toString()[8] == 0) ?
        chfr[ddate.toString()[9]]
        : chfr[ddate.toString()[8]] + chfr[ddate.toString()[9]]

    dtArab.innerHTML = event.toLocaleDateString('ar-EG', options)
    dtFr.innerHTML = event.toLocaleDateString('fr-EG', options)
}