import { extractHeadings } from "./extractHeadings";

const MARKDOWN = `
## 바탕화면 구현을 위해 Draggable 컴포넌트 만들기

바탕화면에서 아이콘을 드래그 할 수 있도록 Draggable 컴포넌트를 만들었다.
![바탕화면드래그](https://www.datocms-assets.com/107137/1699543450-homedragabble.gif)

그리고 이 Draggable 컴포넌트를 재사용하여 폴더내에서도 똑같은 기능을 구현하였다.

### Draggable 컴포넌트 내부
### Icon을 드래그 하기 시작 할 때 : onDragStart
### Icon을 Draggable 컴포넌트 상에서 드래그 할 때 : onDragover
### Icon을 Drop 할 때 : onDrop
### Draggable 컴포넌트 예시
`;

describe("extractHeadings", () => {
  it("마크다운에서 h3 태그만 배열로 추출한다.", () => {
    const headings = extractHeadings(MARKDOWN);
    expect(headings).toEqual([
      "draggable-컴포넌트-내부",
      "icon을-드래그-하기-시작-할-때--ondragstart",
      "icon을-draggable-컴포넌트-상에서-드래그-할-때--ondragover",
      "icon을-drop-할-때--ondrop",
      "draggable-컴포넌트-예시",
    ]);
  });
});
