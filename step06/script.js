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

    // DOM 관련 코드를 requestAnimationFrame()에 넘기기
    // 프레임 시작 시로 DOM 관련 코드를 옮겨 놓으면, 여유있게 DOM 트리를 갱신한 후, requestIdleCallback()이 나머지 시간에 작업을 수행할 수 있다.
    if (c) requestAnimationFrame(c.execute)
  }

  if (!changeQueue.isEmpty())
    requestIdleCallback(processChanges)
  else
    console.timeEnd('selectbox')
}

function createItem(d) {
  // 현재 한 프레임에서 30개의 <li>태그를 추가한다고 치면 적어도 30번의 접근은 필요하게 된다. 
  // DocumentFragment를 사용하면 좋은 성능을 기대할 수 있다.
  let elem = document.createElement('li')
  elem.textContent = d
  elem.classList.add('item')

  elem.addEventListener('click', () => {

    $title.innerHTML = d
    $popup.classList.remove('on')
  })

  return elem
}

// ---------------------------------------------------------------------
// 1. setInterval()
// 	약 13432.758056640625ms
// 2. requestIdleCallback()
// 	약 7475.60986328125 ms
// 	약 5780.4609375 ms
// 	약 6144.51416015625 ms
// 	약 5816.5732421875 ms
// 3. requestAnimationFrame()
// 	약 7011.322998046875 ms
// 	약 6955.36181640625 ms
// 	약 7753.384033203125 ms

// 왜 requestAnimationFrame()을 추가하니 더 느려짐?ㅠㅠ
// ---------------------------------------------------------------------