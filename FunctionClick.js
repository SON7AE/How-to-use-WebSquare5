// 등록방식 변경 - 체크박스 선택시 UI 제어
// onchange 함수를 활용하여 내부에서 getValue() 값을 체크해
// display: none; 과 같이 스타일을 제어할 수 있다.
scwin.idName_onchange = function () {
  var selectedCurrentAttr = idName.getValue();
  console.log(selectedCurrentAttr);

  if (selectedCurrentAttr == 'IMG') {
    videoContainer.setDisabled(true);
  } else {
    videoContainer.setDisabled(false);
  }
};

// 버튼클릭 - 페이지 이동
scwin.idName_onclick = function () {
  scwin.$w.parent().scwin.selectTab(0);
};
// 위 함수처럼 $w.parent()를 사용하기 위해선
// 부모 컴포넌트(?)에 아래 함수가 있어야 한다.
scwin.selectTab = function (tabIndex) {
  // tabControl : tab ID 명
  tabControl.setSelectedTabIndex(tabIndex);
};
