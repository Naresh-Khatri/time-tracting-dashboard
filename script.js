'use strict'

let data = []
fetch('./data.json')
  .then(res => res.json())
  .then(res => data = res)
  .then(() => { setTimeframe('daily') })

const container = document.querySelector('.container')

const dailyBtn = document.querySelector('.daily-btn')
const weeklyBtn = document.querySelector('.weekly-btn')
const monthlyBtn = document.querySelector('.monthly-btn')

dailyBtn.addEventListener('click', () => { setTimeframe('daily') })
weeklyBtn.addEventListener('click', () => { setTimeframe('weekly') })
monthlyBtn.addEventListener('click', () => { setTimeframe('monthly') })

function setTimeframe(timeframe) {

  // remove previous cards before creating new
  removeCards()

  data.forEach(elem => {
    //some titles in data.json have " " so replace them with "-" to make its icon address
    let title = elem.title.replace(' ', '-').toLowerCase()
    let curr = elem.timeframes[String(timeframe).replace(' ', '-').toLowerCase()].current
    let prev = elem.timeframes[String(timeframe).replace(' ', '-').toLowerCase()].previous

    setTimeframeState(timeframe)

    //creates a card with info in data.json then appends it to the container
    createAppendCard(title, prev, curr, timeframe)
  });
}
function createAppendCard(name, prevDur, currDur, timeframe) {

  // daily => day
  // weekly => week
  // monthly => month
  let timeFrameName = timeframe == 'daily' ? 'day' : timeframe == 'weekly' ? 'week' : 'month'

  let card = document.createElement('div')
  card.classList.add(name)
  card.classList.add('card')

  card.innerHTML = `<img class="top-right-img"
          src="./images/icon-${String(name).toLowerCase()}.svg" />
    <div class="card-bottom">
      <div class='card-padding'>
        <div class="row justify-between">
          <div class="activity-name">${String(name).replace('-', ' ').normalize()}</div>
            <div class="options">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
          </div>
        <div class="durations">
        <div class="current-duration">${currDur}hrs</div>
        <div class='last-duration'>Last ${timeFrameName} - ${prevDur}hrs</div>
        </div>
      </div>
    </div>`
  container.appendChild(card)
}

function setTimeframeState(timeframe){
  document.querySelector(`.daily-btn`).classList.remove('active')
  document.querySelector(`.weekly-btn`).classList.remove('active')
  document.querySelector(`.monthly-btn`).classList.remove('active')
  document.querySelector(`.${timeframe}-btn`).classList.add('active')
}
function removeCards() {
  for (let i = container.childElementCount, j = 0; i > data.length; i--, j++) {
    container.removeChild(container.childNodes[i])
  }
}
