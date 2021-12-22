# Barcode Editor

- [yoga-layout](https://yogalayout.com/)
- [label 스펙](https://www.notion.so/bgpworks/Label-8074847c68454a89bd82932d92e8540b)
- [jsBarcode](https://github.com/lindell/JsBarcode)
- [qrcode](https://github.com/soldair/node-qrcode)
- yoga-layout-prebuilt

## Memo

- 원래는 pt or percent로 생성되는 라벨이지만, 화면에서 편의를 위해서 px로 나타내고, %를 명시한경우 percent로 나타내도록 구현함

## Drag

- drag and drop: http://tcpschool.com/html/html5_api_dragAndDrop
- https://www.npmjs.com/package/react-draggable

<!--
1. useContext로 바꾸기. 상태 prop드릴링 그만.
2. text, barcode 입력되도록 하기.
3. 더블클릭으로 drag모드 키고, 드래그 모드시 guide를 띄우기(margin guide) + 방향화살표 같은것 가능한지
 -->