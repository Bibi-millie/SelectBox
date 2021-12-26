# 100,000개의 아이템도 거뜬한 SelectBox

### **setInterval**을 이용해서 커다란 일을 여러 개의 작은 단위로 분배한 경우 문제 점
1. 각 프레임마다 여유시간은 일정하지가 않다.
2. 따라서 모든 프레임에서 처리할 데이터의 양을 정해주는 것(예를들어 30과 같은 같은 고정 숫자를 사용한다는 것) 자체가 말이 안된다고 한다.
3. 또한 CPU 성능에 따라서도 분명히 차이가 있을거다.
-> 따라서 남은 시간이 얼마 없는 프레임에서는 적은 양을 처리하고, 남은 시간이 많이 남아있는 프레임에서는 많은 양을 처리할 수 있어야 효율적인 코드라 볼 수 있다.

### setInterval()과 setTimeout()의 동작 원리
두번째 인자로 넣어주는 delay가 정확하지 않다네???

### requestIdleCallback()
브라우저가 할 일이 없을 때 실행되는 함수로, 매 프레임마다 브라우저가 판단해서 시간이 충분하다 싶으면 함수를 호출한다.