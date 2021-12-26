(() => {
  let counter = 0
  let data = []
  const $counter =  document.querySelector('#counter')
  const $title =  document.querySelector('#title')
  const $popup =  document.querySelector('#popup')
  const $list =  document.querySelector('#list')

  function _init() {
    _initEvent()
    countUp()
    createItem()
  }

  function _initEvent() {
    $title.addEventListener('click', handleClick)
  }

  function handleClick() {
    let hasClass = $popup.classList.contains('on')

    if (hasClass) {
      $popup.classList.remove('on')
    } else {
      $popup.classList.add('on')
    }
  }

  function countUp() {
    setInterval(() => {
      counter++
      $counter.innerHTML = counter
    }, 1000)
  }

  for (let i = 0; i < 100000; i++) {
    data.push('ITEM ' + i)
  }
  
  // selectbox 항목
  for (let j = 0; j < data.length; j++) {
    changeQueue.enqueue({
      execute: function() {
        const elem = createItem(data[j])
        $list.append(elem)
      }
    })
  }

  // 반복적으로 Queue를 체크하여 30개씩 실행
  setInterval(() => {
    for (let i = 0; i < 30 && !changeQueue.isEmpty(); i++) {
      let c = changeQueue.dequeue()

      if (c) c.execute()
      // 더이상 처리할 데이터가 없다면
      if (changeQueue.isEmpty()) console.timeEnd() // 전체 실행 시간 표시
    }
  }, 0)

  function createItem(d) {
    let elem = document.createElement('li')
    elem.append(d)

    elem.addEventListener('click', () => {
      $title.innerHTML = d
      $popup.classList.remove('on')
    })

    return elem
  }

  _init()
})()