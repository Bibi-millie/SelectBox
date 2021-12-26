const changeQueue = (() => {
  let list = []

  return {
    enqueue: function(c) { // 데이터 넣기
      list.push(c)
    },

    dequeue: function() { // 데이터 빼기
      return list.shift()
    },

    isEmpty: function() {
      return list.length === 0
    }
  }
})()