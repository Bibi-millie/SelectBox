let counter = 0
const $counter =  document.getElementById('counter')
const $title =  document.getElementById('title')
const $popup =  document.getElementById('popup')
const $list =  document.getElementById('list')

window.addEventListener('load', () => {
  setInterval(() => {
    counter++
    $counter.innerHTML = counter
  }, 1000)

  let data = []

  for (let i = 0; i < 100000; i++) {
    data.push('ITEM ' + i)
  }

  $title.addEventListener('click', () => {
    let hasClass = $popup.classList.contains('on')

    if (hasClass) {
      $popup.classList.remove('on')
    } else {
      $popup.classList.add('on')
    }
  })

  // 타이머를 시작할 부분
  console.time('selectbox')

  // selectbox 항목
  for (let j = 0; j < data.length; j++) {
    changeQueue.enqueue({
      execute: function() {
        const elem = createItem(data[j])
        $list.appendChild(elem)
      }
    })
  }

  // 반복적으로 큐를 체크하여 30개씩 실행
  setInterval(function() {
    for (var i = 0; i < 30 && !changeQueue.isEmpty(); i++) {
      var c = changeQueue.dequeue()

      if (c) c.execute()
      if (changeQueue.isEmpty()) console.timeEnd('selectbox')
    }
  }, 0)
})

function createItem(d) {
  let elem = document.createElement('li')
  elem.textContent = d
  elem.classList.add('item')

  elem.addEventListener('click', () => {

    $title.innerHTML = d
    $popup.classList.remove('on')
  })

  return elem
}