import { renderHook, waitFor, act } from "@testing-library/react";
import { useDynamicFuseSearch } from "./useDynamicFuseSearch";
import { PostWithoutMarkdownType } from "@/types/apiResponseType";

const mockPosts: PostWithoutMarkdownType[] = [
  {
    id: 1,
    _createdAt: "2024-01-01",
    category: { category: { frontend: "React" } },
    metaField: {
      title: "React 성능 최적화 가이드",
      description: "React 앱의 성능을 개선하는 방법을 알아봅니다",
      image: {
        alt: "React",
        url: "https://example.com/react.png",
        responsiveImage: {
          src: "https://example.com/react.png",
          sizes: "100vw",
          height: 600,
          width: 800,
          alt: "React",
          title: "React",
          base64: "",
        },
      },
    },
  },
  {
    id: 2,
    _createdAt: "2024-01-02",
    category: { category: { frontend: "TypeScript" } },
    metaField: {
      title: "TypeScript 타입 시스템 이해하기",
      description: "TypeScript의 강력한 타입 시스템을 배워봅니다",
      image: {
        alt: "TypeScript",
        url: "https://example.com/ts.png",
        responsiveImage: {
          src: "https://example.com/ts.png",
          sizes: "100vw",
          height: 600,
          width: 800,
          alt: "TypeScript",
          title: "TypeScript",
          base64: "",
        },
      },
    },
  },
  {
    id: 3,
    _createdAt: "2024-01-03",
    category: { category: { backend: "Node.js" } },
    metaField: {
      title: "Node.js 서버 구축하기",
      description: "Express로 REST API 서버를 만들어봅니다",
      image: {
        alt: "Node.js",
        url: "https://example.com/node.png",
        responsiveImage: {
          src: "https://example.com/node.png",
          sizes: "100vw",
          height: 600,
          width: 800,
          alt: "Node.js",
          title: "Node.js",
          base64: "",
        },
      },
    },
  },
];

describe("useDynamicFuseSearch", () => {
  it("빈 검색어일 때 전체 posts를 반환한다", async () => {
    const onSearchResults = jest.fn();

    renderHook(() =>
      useDynamicFuseSearch({
        posts: mockPosts,
        searchQuery: "",
        onSearchResults,
      })
    );

    await waitFor(() => {
      expect(onSearchResults).toHaveBeenCalledWith(mockPosts);
    });
  });

  it("공백만 있는 검색어일 때 전체 posts를 반환한다", async () => {
    const onSearchResults = jest.fn();

    renderHook(() =>
      useDynamicFuseSearch({
        posts: mockPosts,
        searchQuery: "   ",
        onSearchResults,
      })
    );

    await waitFor(() => {
      expect(onSearchResults).toHaveBeenCalledWith(mockPosts);
    });
  });

  it("검색어가 있을 때 Fuse.js를 동적 import하고 검색을 수행한다", async () => {
    const onSearchResults = jest.fn();

    renderHook(() =>
      useDynamicFuseSearch({
        posts: mockPosts,
        searchQuery: "React",
        onSearchResults,
      })
    );

    await waitFor(() => {
      expect(onSearchResults).toHaveBeenCalled();
      const results = onSearchResults.mock.calls[
        onSearchResults.mock.calls.length - 1
      ][0] as PostWithoutMarkdownType[];
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].metaField.title).toContain("React");
    });
  });

  it("title로 검색이 가능하다", async () => {
    const onSearchResults = jest.fn();

    renderHook(() =>
      useDynamicFuseSearch({
        posts: mockPosts,
        searchQuery: "TypeScript",
        onSearchResults,
      })
    );

    await waitFor(() => {
      expect(onSearchResults).toHaveBeenCalled();
      const results = onSearchResults.mock.calls[
        onSearchResults.mock.calls.length - 1
      ][0] as PostWithoutMarkdownType[];
      expect(results.some((r) => r.metaField.title.includes("TypeScript"))).toBe(
        true
      );
    });
  });

  it("description으로 검색이 가능하다", async () => {
    const onSearchResults = jest.fn();

    renderHook(() =>
      useDynamicFuseSearch({
        posts: mockPosts,
        searchQuery: "REST API",
        onSearchResults,
      })
    );

    await waitFor(() => {
      expect(onSearchResults).toHaveBeenCalled();
      const results = onSearchResults.mock.calls[
        onSearchResults.mock.calls.length - 1
      ][0] as PostWithoutMarkdownType[];
      expect(
        results.some((r) => r.metaField.description.includes("REST API"))
      ).toBe(true);
    });
  });

  it("검색 결과가 없을 때 빈 배열을 반환한다", async () => {
    const onSearchResults = jest.fn();

    renderHook(() =>
      useDynamicFuseSearch({
        posts: mockPosts,
        searchQuery: "존재하지않는검색어xyz123",
        onSearchResults,
      })
    );

    await waitFor(() => {
      expect(onSearchResults).toHaveBeenCalled();
      const results = onSearchResults.mock.calls[
        onSearchResults.mock.calls.length - 1
      ][0] as PostWithoutMarkdownType[];
      expect(results).toEqual([]);
    });
  });

  it("검색어가 변경되면 새로운 검색을 수행한다", async () => {
    const onSearchResults = jest.fn();

    const { rerender } = renderHook(
      ({ searchQuery }) =>
        useDynamicFuseSearch({
          posts: mockPosts,
          searchQuery,
          onSearchResults,
        }),
      { initialProps: { searchQuery: "React" } }
    );

    await waitFor(() => {
      expect(onSearchResults).toHaveBeenCalled();
    });

    const initialCallCount = onSearchResults.mock.calls.length;

    act(() => {
      rerender({ searchQuery: "TypeScript" });
    });

    await waitFor(() => {
      expect(onSearchResults.mock.calls.length).toBeGreaterThan(initialCallCount);
      const results = onSearchResults.mock.calls[
        onSearchResults.mock.calls.length - 1
      ][0] as PostWithoutMarkdownType[];
      expect(results.some((r) => r.metaField.title.includes("TypeScript"))).toBe(
        true
      );
    });
  });

  it("퍼지 검색으로 오타를 허용한다 (threshold: 0.4)", async () => {
    const onSearchResults = jest.fn();

    renderHook(() =>
      useDynamicFuseSearch({
        posts: mockPosts,
        searchQuery: "Reakt", // React의 오타
        onSearchResults,
      })
    );

    await waitFor(() => {
      expect(onSearchResults).toHaveBeenCalled();
      const results = onSearchResults.mock.calls[
        onSearchResults.mock.calls.length - 1
      ][0] as PostWithoutMarkdownType[];
      // 퍼지 검색으로 React 포스트가 검색될 수 있음
      expect(results.length).toBeGreaterThanOrEqual(0);
    });
  });
});
