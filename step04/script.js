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

  requestIdleCallback(processChanges)
})

function processChanges(deadline) {
  while (deadline.timeRemaining() > 0 && !changeQueue.isEmpty()) {
    var c = changeQueue.dequeue()

    if (c) 
      requestAnimationFrame(c.execute)
  }

  if (!changeQueue.isEmpty())
    requestIdleCallback(processChanges)
  else
    console.timeEnd('selectbox')
}

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