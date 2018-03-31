---
layout: post
title: C언어로 집합 연산 프로그램 만들기
date: 2018-3-26 16:23:51 +0900
summary: C로 쓸만한 프로그램을 만들어 보자.
featured-img: c.jpg
---

C언어는 평소에 잘 안 쓴다. 불편하기도 하고 이것저것 신경쓸 일이 많아 로직에 집중하기 어렵기 때문이다.  
그런데 이번에 C로 무언가를 만들어야 하는 과제가 주어져 제대로 배워보기로 했다.

## 프로그램 개요

먼저, 집합을 연산하는 프로그램이다.  
따라서 집합을 만들고 연산하는 부분과 사용자에게 입력을 받고 결과를 출력하는 부분이 필요하다.

### 집합 생성
- 집합 자료형을 나타내기 위해 배열을 사용한다.
- 배열의 크기는 선언 부분에서 정하거나, 동적 할당으로 정의할 수 있다.
- 사용자에게 한 번에 하나씩 입력을 받아 정수 배열에 대입해야 한다.  

### 집합 연산
다음 연산을 구현해야 한다.
- 합집합
- 교집합
- 차집합

#### 합집합
 합집합은 두 집합의 교집합을 제외한 부분만 더하는 것이다.
더 자세하게 풀어서 쓰면 다음과 같다.
```
배열 A에 B의 원소들을 더하는데, 이때 더하고자 하는 B의 원소가 A에 이미 존재한다면 더하지 않고 건너뛴다.
```
또는
```
배열 A에 B의 원소들을 몽땅 더하고, 그 중에서 중복을 제거한다.
```

프로그래밍 실습 자료에는 두 번째 방법으로 구현되어 있는데, 필자는 첫 번째 방법으로 구현했다.

#### 교집합
 교집합은 두 집합의 공통되는 원소만 더하는 것이다.
```
새로운 배열 C를 만들어, A에도 있고 B에도 있는 원소들만 C에 더한다.
```

#### 차집합
 차집합은 두 집합의 공통되는 부분만 빼는 것이다.  
A - B는 A - (A와 B의 교집합)이다.  
이렇게 표현할 수 있다.
```
새로운 배열 C를 만들어, A에 있는 원소 중에서 (A에도 있고 B에도 있는 원소)를 제외한 원소들을 C에 더한다.
```
다시 말해, A중에서, B에는  없고 A에만 있는 원소들을 C에 더하는 것이다.

### 메뉴 표시
menu-driven 방식으로 구현해야 한다.
```
	---< 배열연산 >---
1.합집합  2.교집합  3.차집합  4.종료
```
이렇게 생긴 메뉴를 띄워 주면 된다.

### 입력 받기
메뉴를 띄워준 후, 사용자의 입력을 받아서 정수 형태로 저장해야 한다.  
while문 속 switch문을 사용해 1~3번 사이의 숫자를 입력받으면 연산한 결과와 메뉴를 출력하고,  
4번을 입력받으면 while문을 탈출, 종료하고, 그 외의 숫자를 입력받으면 에러 메시지를 띄우고 다시 입력받는다.

### 집합 출력하기
집합은 배열 형태로 저장되므로, 이를 표시하려면 적절한 반복문을 통해 각각의 원소를 하나씩 출력해야 한다.


## 프로그램 흐름
먼저 집합 A를 만든다.
그리고 한 번에 정수 하나씩 사용자에게 입력을 받아 A에 저장한다.

다시 집합 B를 만들어 같은 동작을 반복한다.

그리고 집합 A와 집합 B를 출력한다.

이제 사용자의 입력을 받는 반복문에 진입한다.

사용자가 선택으로 정수 4를 입력하기 전까지,

다음 동작을 반복한다.

- 메뉴를 띄운다.

- 사용자의 입력을 받아 저장한다.

- 저장한 숫자가 1 또는 2 또는 3이면 이에 해당하는 집합 연산을 수행하고 그 결과를 새로운 배열에 저장한다.

- 집합 A와 집합 B를 출력하고, 연산 결과가 담긴 배열을 출력한다.

- 다시 메뉴를 출력하고 입력을 받는다.

만약 사용자가 4를 입력해 while 반복문이 끝나면 프로그램이 종료된다.

## 프로그램 구현
완전히 작동하는 코드는 이곳 [GitHub](https://github.com/potados99/Set-calculation/tree/master/Set_calculation)에서 볼 수 있다.

소스 구성은 다음과 같으며,

Set_calculation/
- main.c
- locale.h
- locale.c
- routine.h
- routine.c
- calculation.h
- calculation.c
- array.h
- array.c
- menu.h
- menu.c
- util.h
- util.c
- datatype.h

각각의 소스 파일들은 이런 일을 한다.

main.c: 큰 단위로 묶인 일(routine)들을 수행한다.

locale.c/h: 출력할 스트링의 언어를 설정한다.

routine.c/h: 자잘한 단위의 입출력과 반복문을 하나로 묶어 수행한다.

calculation.c/h: 집합을 연산한다.

array.c/h: 배열을 조금 더 편하게 쓸 수 있게 해 준다.

menu.c/h: 메뉴를 표시하고 입력을 받는다.

util.c/h: 중복 제거, 정렬 알고리즘 등을 수행한다.

datatype.h: 구조체를 정의한다.
