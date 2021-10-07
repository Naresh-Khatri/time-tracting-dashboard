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
  console.log('setting ' + timeframe)
  data.forEach(elem => {
    let title = elem.title.replace(' ', '-').toLowerCase()
    let curr = elem.timeframes[String(timeframe).replace(' ', '-').toLowerCase()].current
    let prev = elem.timeframes[String(timeframe).replace(' ', '-').toLowerCase()].previous
    createAppendCard(title, prev, curr)
  });
}
function createAppendCard(name, prevDur, currDur) {

  let card = document.createElement('div')
  card.classList.add(name)
  card.classList.add('card')
  card.innerHTML = `<img class="top-right-img"
          src="./images/icon-${String(name).toLowerCase()}.svg" />
    <div class="card-bottom"">
      <div class='card-padding'>
        <div class="row justify-between">
          <div class="activity-name">${name}</div>
            <div class="options">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
          </div>
        <div class="durations">
        <div class="current-duration">${currDur}hrs</div>
        <div class='last-duration'>Last Week - ${prevDur}hrs</div>
        </div>
      </div>
    </div>`
  container.appendChild(card)
}