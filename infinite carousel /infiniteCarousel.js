// DOM 요소 취득
const $adItemContainer = document.querySelector('.ad-item-container');
const $adItems = document.querySelectorAll('.ad-item');
const $adItem = document.querySelector('.ad-item');
const $firstItem = document.querySelector('.box1');
const $lastItem = document.querySelector('.box5');
const $prev = document.querySelector('.prev');
const $next = document.querySelector('.next');

// 기본 위치 값 
let offset = 0;
// 아이템 요소 한개의 width값 취득
const itemWidth = $adItem.offsetWidth;

// 첫번째요소, 마지막요소 복사
const firstItemClone = $firstItem.cloneNode(true);
const lastItemClone = $lastItem.cloneNode(true);
// 첫번째 요소를 부모노드의 마지막 자식으로 추가 (2번째 인수가 null일 경우엔 마지막 자식으로 추가)
$adItemContainer.insertBefore(firstItemClone, null);
// 마지막 요소를 부모노드의 첫번째 자식으로 추가
$adItemContainer.insertBefore(lastItemClone, $adItemContainer.firstChild);

// 아이템 컨테이너를 움직여 주는 함수
const moveItemContainer = () => {
  $adItemContainer.style.transform = `translate3D(${offset}px, 0, 0)`;
  $adItemContainer.style.transition = '0.5s ease-out';
};

// 클론된 노드 위치를 감안한 초기 컨테이너 위치
const firstPosition = () => {
  offset -= itemWidth;
  $adItemContainer.style.transform = `translate3D(${offset}px, 0, 0)`;
  $adItemContainer.style.transition = 'none';
};

// prev 버튼 클릭 시 
const movePrev = () => {
  offset += itemWidth;
  if (offset === 0) {
    setTimeout(() => {
      offset -= itemWidth * $adItems.length;
      $adItemContainer.style.transform = `translate3D(${offset}px, 0, 0)`;
      $adItemContainer.style.transition = 'none';
    }, 500);
  }
  moveItemContainer();
}

// next 버튼 클릭 시 
const moveNext = () => {
  offset -= itemWidth;
  if (offset === -3000) {
    setTimeout(() => {
      offset += itemWidth * $adItems.length;
      $adItemContainer.style.transform = `translate3D(${offset}px, 0, 0)`;
      $adItemContainer.style.transition = 'none';
    }, 500);
  }
  moveItemContainer();
}

// 클릭 이벤트 등록 및 쓰로틀 적용
$prev.addEventListener('click', _.throttle(movePrev, 600));
$next.addEventListener('click', _.throttle(moveNext, 600));

// 클론된 노드 위치를 감안한 초기 컨테이너 위치
window.onload = () => {
  firstPosition();
};