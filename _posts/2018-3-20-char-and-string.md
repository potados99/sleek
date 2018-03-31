--- 
layout: post 
title: 문자와 문자열
featured-img: words.jpg
---

## 발단
몇 시간 전에, 문자 타입 변수 char와 `"a"`를 비교하던 중 에러가 발생헀다.

```c
if (char == "a") {
	...
}
```
그래서 다음과 같이 썼더니 해결되었다.
```c
if (char == 'a') {
	...
}
```
## 원인이 무엇일까
비교하는 데이터의 타입이 다른 것이 원인이었다.


## 'a'와 "a"는 다르다
'a' 는 문자이다.  
반면 "a"는 문자열이다.  
쌍따옴표로 감싸진 문자열은 C에서는 포인터로 취급되는 리터럴 상수이고, Java에서는 String이라는 객체 타입이다.

문자열은 항상 마지막에 null 문자인 `\0`을 포함한다.  
따라서 `"a"`는 사실`"a\0"`이다.  
그러므로 다음과 같이 쓸 수 있다.
```c
"a" = 'a' + '\0'
```