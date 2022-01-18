// 데이터맵, 데이터리스트, 서브미션 실행함수
scwin.onpageload = function () {
  dataMapName.set('dataKeyId', 'dataKeyIdValue');
  // 서브미션 실행함수
  com.sbm.execute('submissionName', {}, gcm.SERVICE_LIST_FCMM);
  // gcm.SERVICE_LIST_FCMM 이 부분은 서버 이름에 따라 다르다.
};

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

// --------------------------------------------------------------------
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

// --------------------------------------------------------------------
// 탭 생성 클릭이벤트
// 등록 및 탭 생성 버튼의 퍼블리싱 레이아웃이 있다면 이곳에 먼저 이벤트를 걸어준다.
scwin.idName_onclick = function (e) {
  let tabId = '';
  // tabControl : tab ID 명
  let tabInfoList = tabControl.getTabInfo();
  let tabIndex = 0;
  let openAction = 'new';

  var label = '등록'; // 이름은 프로젝트에 맞게 기입

  // 이미 탭이 열린 경우, 해당 탭으로 이동
  let i = 0;
  for (i = 1; i < tabInfoList.length; i++) {
    if (tabInfoList[i].label == label) {
      tabId = tabInfoList[i].id;
      tabIndex = i;
      openAction = ' exist';
    }

    if (Comment.util.isEmpty(tabId)) {
      tabId = 'tab' + (tabControl.getTabCount() + 1);
      tabIndex = tabControl.getTabCount();
    }

    var tabOptions = {
      label: label,
      closable: true,
      openAction: openAction,
    };

    // 등록페이지 URL 입력
    var src = ''; // url address 기입
    var contentsOptions = {
      frameMode: 'wframePreload',
      src: src,
      alwaysDraw: false,
      title: label,
      dataObject: {
        type: 'json',
        name: 'param',
        data: {
          tabIndex: tabIndex,
        },
      },
    };
    tabId = tabControl.addTab(tabId, tabOptions, contentsOptions);
    tabControl.setSelectedTabIndex(tabIndex);
  }
};

// --------------------------------------------------------------------
// 변경사항 저장 클릭 이벤트
scwin.idName = function () {
  // 필수요소 조건
  dataMapName.set('dataKeyId', 'dataKeyIdValue');

  // 변경사항 조건
  // getValue() 메서드로 레이아웃에 기입된 현재 값을 인식한다.
  dataMapName.set('dataKeyId', dataKeyIdValue.getValue());
  dataMapName.set('dataKeyId', dataKeyIdValue.getValue());

  com.sbm.execute('submissionName', {}, gcm.SERVICE_LIST_FCMM);
};

// --------------------------------------------------------------------
// 취소 버튼 / 리셋 클릭 이벤트
// 취소 버튼을 눌렀을 때, 데이터를 빈 값으로 넘겨준다 이해하면 된다.
scwin.btn_reset_onclick = function () {
  com.win.setInit(LayoutIdName);
  dataMapName.set('dataKeyId', '');
};

// --------------------------------------------------------------------
// Textarea와 같이 텍스트 값이 Null일 경우 에러 처리 알람
if (com.util.isEmpty(dataMapName.get('KeyId'))) {
  com.win.alert(com.data.getMessage('com.alt.0013', '배너명'));
  // com.alt.0013 : 프로젝트 공통알람코드
  // '배너명' : 레이아웃 label 값
}

// --------------------------------------------------------------------
// 파일업로드 함수
scwin.btn_fileUpload_onclick = function (e) {
  var url = '/path 경로지정';
  var data = {
    type: 'insert',
    policy: 'public-img',
    subPath: '/fcmm/prod/',
    callbackFn: 'scwin.popupCallBack',
  };
  var options = {
    id: 'insertPopup',
    popupName: '파일등록',
    modal: true,
    width: 700,
    height: 250,
    type: 'wframePopup',
  };

  com.win.openPopup(url, options, data);
};
// 파일업로드 콜백함수
scwin.popupCallBack = function (retObj) {
  if (retObj.status == 'S') {
    com.win.toast(com.data.getMessage('com.inf.0008'));
    dlt_addImage.removeAll(); // 삭제
    dlt_addImage.insertRow(); // 로우

    // 여러개의 리스트가 돌아갈 땐 for문을 돌린다. 그리고 0 대신에 i를 할당해준다.
    dlt_addImage.setCellData(0, 'dataListId', 'dataListValue');
    dlt_addImage.setCellData(0, 'dataListId', 'dataListValue');
    dlt_addImage.setCellData(0, 'dataListId', 'dataListValue');
    dlt_addImage.setCellData(0, 'dataListId', 'dataListValue');
    dlt_addImage.setCellData(0, 'dataListId', 'dataListValue');
  } else {
    com.win.alert(com.data.getMessage('com.alt.0004', retObj.fileOrginName));
  }

  // 그리고나서 최종 파일을 등록할 때, 실행시키는 함수에서
  // 데이터맵 부분에 아래와 같이 세팅해준다.
  // dataMapName.set('데이터맵 내 파일데이터리스트 받는 변수이름', '데이터 값');
  // 상세페이지에서 기존의 데이터를 불러올 땐, 아래와 같이 작성한다.
  // var ImageValue = dataMapName.get('해당 데이터 변수');
};
// 상세페이지에서 파일업로드 삭제
scwin.btn_delImg_onclick = function (e) {
  com.win.confirm('첨부된 이미지를 제거하시겠습니까?', function (result) {
    if (result.clickValue) {
      // 첨부된 이미지 제거
      dlt_addImage.removeAll();
      atclImgeNm.setValue('');
      atclImgeAltrTxtCntn.setValue('');
    }
  });
};
// --------------------------------------------------------------------
// 상세페이지 이동
// 목록페이지 셀 선택 이벤트
// 1. 그리드뷰에 먼저 inputType을 link로 바꿔준다.
// 2. 그리드뷰에 먼저 id값을 할당해준다.
scwin.grd_basic_onclick = function (row, col) {
  if (row == null) return;
  // 선택한 셀이 링크일 경우
  if (grd_bnr.getColumnType(col) == 'link') {
    dataMapName.setJSON(dataListName.getRowJSON(row));

    var data = { baseShwdInfo: dataListName.getRowJSON(row) };
    scwin.addTab(dataMapName.get('KeyValue'), '상세페이지 url', data);
  }
};

// --------------------------------------------------------------------
// 하단 페이지 생성
scwin.onpageload = function () {
  scwin.srchProdCntsList(1); // 생성자 함수 이름 - 이름은 랜덤
};

scwin.srchProdCntsList = function (pageNo) {
  if (com.util.isEpty(pageNo)) {
    pageNo = 1;
  }
  // dma_pageInfo는 프로젝트 공통 데이터맵
  dma_pageInfo.set('rowSize', Number(slb_pagePerCount.getValue()));
  dma_pageInfo.set('pageNo', pageNo);

  dataMapName.set('게시물유형코드', '값'); // 필수요소
  dataMapName.set('pageNo', '값'); // 필수요소
  dataMapName.set('rowSize', '값'); // 필수요소

  com.sbm.execute(sbm_retrieve, {}, gcm.SERVICE_LIST_FCMM); // submission 실행함수
};

scwin.sbm_retrieve_submitdone = function (e) {
  pglFlag = true;
  if ('1' == dma_pageInfo.get('pageNo')) {
    pglFlag = false;
  }
  pageLayoutId.setCount(dma_pageInfo.get('totalPage'), true);
  pageLayoutId.setSelectedIndex(dma_pageInfo.get('pageNo'));
  noticeCountId.setValue(dma_pageInfo.get('totalCount'));

  com.win.toast(com.data.getMessage('com.inf.0009', '조회'));
};

// --------------------------------------------------------------------
// 우선노출 여부 이벤트
// 우선노출 올리기
scwin.btn_priorEposUp_onClick = function () {
  // btn_priorEposUp : 버튼 이름
  // checkYn : checkBox ID
  var arrChk = dataListName.getMatchedIndex('checkYn', '1');
  var changeUseNum = 5 - grd_priorList.getTotalRow();

  if (changeUseNum >= arrChk.length) {
    ecUtil.copyCheckedDataList(dataListName1, dataListName2, 'checkYn');

    if (dataListName2.getRowCount() == 0) {
      ecUtil.alert('올리기 대상을 선택하세요.');
      return;
    }

    // 노출여부가 N인 게시물은 설정할 수 없습니다.
    // dataList에 'eposYn' 항목을 추가해줘야한다.
    for (var i = 0; i < dataListName2.getRowCount(); i++) {
      var eposYn = dataListName2.etCellData(i, 'eposYn');
      if (eposYn == 'N') {
        ecUtil.alery('노출 여부가 N인 게시물은 설정할 수 없습니다.');
        return;
      }
    }
    com.sbm.execute(sbm_priorY, {}, gcm.SERVICE_LIST_FCMM);
  } else {
    ecUtil.alery('중요 리스트는 5개까지 가능합니다.');
  }
};

scwin.sbm_priorY_submitdone = function (e) {
  ecUtil.alert('성공적으로 처리되었습니다.');
  scwin.listReload();
};

// 우선노출 내리기
scwin.btn_priorEposDown_onclick = function (e) {
  ecUtil.copyCheckedDataList(dataListName1, dataListName2, 'checkYn');

  if (dataListName2.getRowCount() == 0) {
    ecUtil.alery('선택된 항목이 없습니다.');
    return;
  }
  com.sbm.execute(sbm_priorN, {}, gcm.SERVICE_LIST_FCMM);
};

scwin.sbm_priorN_submitdone = function (e) {
  ecUtil.alert('성공적으로 처리되었습니다.');
  // scwin.listReload();
};

// --------------------------------------------------------------------
// 선택공개 여부 이벤트
// 선택 비공개
scwin.btn_eposY_onclick = function (e) {
  var checkColArr = dlt_list.getMatchedIndex('checkYn', '1');
  if (checkColArr.length == 0) {
    com.win.alert('수정할 대상을 선택해주세요.');
    return false;
  }
  dma_eposYn.set('eposYn', 'Y');
  com.win.confirm('공개로 수정하시겠습니까?', scwin.update_submit);
};

// 선택 비공개
scwin.btn_eposN_onclick = function (e) {
  var checkColArr = dlt_list.getMatchedIndex('checkYn', '1');
  if (checkColArr.length == 0) {
    com.win.alert('수정할 대상을 선택해주세요.');
    return false;
  }
  dma_eposYn.set('eposYn', 'N');
  com.win.confirm('공개로 수정하시겠습니까?', scwin.update_submit);
};

// 노출여부 변경 서브미션 실행
scwin.update_submit = function (result) {
  if (result.clickValue) {
    var uptJson = dlt_list.getMatchedJSON('checkYn', '1', true);
    dlt_no.setJSON(uptJson); // dlt_no 데이터리스트에는 게시물 번호 항목이 포함되어 있다.

    if (dma_eposYn.get('eposYN' == 'Y')) {
      com.sbm.excute(sbm_eposY, {}, gcm.SERVICE_LIST_FCMM);
    } else {
      com.sbm.excute(sbm_eposN, {}, gcm.SERVICE_LIST_FCMM);
    }
  }
};

// 노출 여부 변경 완료
scwin.sbn_eposY_submitdone = function (e) {
  com.win.alert('수정되었습니다.');
  scwin.search();
};
scwin.sbn_eposN_submitdone = function (e) {
  com.win.alert('수정되었습니다.');
  scwin.search(); // 검색 및 조회 함수
};
// --------------------------------------------------------------------
// 그리드뷰에서 셀 선택시 다운로드 기능
scwin.grd_basic_oncellclick = function (row, col) {
  if (row == null) return;
  dma_data.setJSON(dlf_list.getRowJSON(row));

  if (grd_list.getColumnType(col) == 'button') {
    dlt_addFiles.removeAll();
    var addFile = dlt_list.getCellData(row, 'atclApndFiles');
    dlt_addFiles.setJSON(addFile);

    location.href = dlt_addFiles.getCellData(0, 'apndFilePathAddr'); // 실제 다운로드 링크
  }
};
// --------------------------------------------------------------------
// 삭제 기능
scwin.btn_delete_onclick = function (e) {
  var checkColArr = dlt_list.getMatchedIndex('checkYN', '1');
  if (checkColArr.length == 0) {
    com.win.alert(com.data.getMessage('com.inf.0004'));

    return;
  }
  com.win.confirm(com.data.getMessage('com.cfm.0003'), scwin.delete_submit);
};
// 삭제완료
scwin.sbm_delete_submitdone = function (e) {
  com.win.toast(com.data.getMessage('com.inf.0011', e.responseText));
  btn_search.trigger('onclick');
};
// 삭제 서브미션 실행
scwin.delete_submit = function (result) {
  if (result.clickValue) {
    var delJson = dlt_list.getMathcedJSON('checkYn', '1', true);
    dlt_no.setJSON(delJson); // dlt_no에는 게시물 번호 항목이 포함
    com.sbm.execute(sbm_delete, {}, gcm.SERVICE_LIST_FCMM); // sbm_delete 안에는 dlt_no을 참조하고, url은 삭제url, methods는 delete
  }
};
// --------------------------------------------------------------------
// PDF 파일 업로드 기능
scwin.btn_uploadPdf_onclick = function (e) {
  ecUtil.loadFilePopup('scwin.pdfFilePopupCallBack', 'uhdc/fcmm/pr', 'public-file');
};

scwin.pdfFilePopupCallBack = function (rtnObj) {
  ecUtil.debugObj('파일등록 :: ', rtnObj);

  if (rtnObj.status != 'S') {
    com.win.alert(com.data.getMessage(['com.alt.0004', retObj.fileOrginName]));
    return;
  }

  dma_filePdf.set('fileNm', rtnObj.fileOrginName);
  dma_filePdf.set('chngFileNm', rtnObj.fileName);
  dma_filePdf.set('fileStrgPath', rtnObj.filePath);
  dma_filePdf.set('fileNm', rtnObj.fileSiz);
  dma_filePdf.set('fileNm', rtnObj.apndFileExtsNm);

  // 첨부파일 타입 체크
  scwin.fileTypeChk(dma_filePdf, 'pdf');
};
// 파일 타입 체크
scwin.fileTypeChk = function (dataMap, type) {
  var fileKnd = dataMap.get('fileKnd');
  if (fileKnd != type) {
    if (type == 'pptx') ecUtil.alert('파워포인트 파일을 등록해주세요.');
    if (type == 'docx') ecUtil.alert('워드(word) 파일을 등록해주세요.');
    if (type == 'hwp') ecUtil.alert('한글(hwp) 파일을 등록해주세요.');
    if (type == 'pdf') ecUtil.alert('PDF 파일을 등록해주세요.');
  }
};
// --------------------------------------------------------------------
// 페이지 리스트 onviewchange & 페이지 카운트 onviewchange
// 최초 검색 조회 함수 가명 : search()
scwin.search = function (pageNo) {
  if (com.util.isEmpty(pageNo)) {
    pageNo = 1;
  }
  dma_pageInfo.set('rowSize', Number(slb_pagePerCount.getValue()));
  dma_pageInfo.set('pageNo', pageNo);

  dma_searchParam.set('rowSize', Number(slb_pagePerCount.getValue())); // 게시물 가로 개수
  dma_searchParam.set('pageNo', pageNo); // 페이지 번호
  dma_searchParam.set('urcCmpyItduAtclKdCd', '02'); // 게시물유형코드

  com.sbm.execute('submissionName', {}, gcm.SERVICE_LIST_FCMM);
};
// page list onviewchange
scwin.pgl_pageList_onviewchange = function (e) {
  scwin.search(e.newSelectedIndex);
};
// document count onviewchange
scwin.slb_pagePerCount_onviewchange = function (e) {
  scwin.search(1);
};
// --------------------------------------------------------------------
// 수정 - 상세페이지에서의 modify (update)
