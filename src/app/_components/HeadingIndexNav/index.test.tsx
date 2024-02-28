import { HeadingIndexNav } from "@/app/_components/HeadingIndexNav";
import { render, screen } from "@testing-library/react";

const MARKDOWN = "# Heading 1\n## Heading 2\n### Heading 3\n### Heading3-2";

describe("HeadingIndexNav", () => {
  it("렌더링", () => {
    render(<HeadingIndexNav markdown="" />);
  });

  it("heading tag중 h3만 heading index 컴포넌트에 나타난다.", () => {
    render(<HeadingIndexNav markdown={MARKDOWN} />);

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(2);
    expect(listItems[0]).toHaveTextContent("Heading 3");
    expect(listItems[1]).toHaveTextContent("Heading3-2");
  });

  it("a tag의 id는 parsing되어 소문자, 공백은 '-'로 변경의 과정을 거친다.", () => {
    render(<HeadingIndexNav markdown={MARKDOWN} />);
    const links = screen.getAllByRole("link");

    expect(links[0]).toHaveAttribute("href", "#heading-3");
    expect(links[1]).toHaveAttribute("href", "#heading3-2");
  });

  it("heading tag가 없으면 heading index 컴포넌트가 나타나지 않는다.", () => {
    render(<HeadingIndexNav markdown="" />);
    const listItems = screen.queryAllByRole("listitem");
    expect(listItems).toHaveLength(0);
  });
});
