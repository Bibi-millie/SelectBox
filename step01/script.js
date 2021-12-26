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
  
  for (let j = 0; j < data.length; j++) {
    let elem = createItem(data[j])
    $list.append(elem)
  }

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