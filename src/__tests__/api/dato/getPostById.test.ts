import { performRequest } from "@/__mocks__/dato";
import { GET_POST_BY_ID } from "@/app/api/dato/getPostById";

describe("getPostById", () => {
  it("getPostById의 postId에 198173441를 넣으면 이력서 마크다운을 반환한다.", async () => {
    const response = await getPostById({ postId: "198173441" });

    expect(response.data.aritlcle.markdown).toEqual(cvMarkdown);
  });
});

const getPostById = async ({ postId }: { postId: string }) => {
  try {
    const { data } = await performRequest({
      query: GET_POST_BY_ID,
      variables: {
        ItemId: postId,
      },
    });

    return data;
  } catch (err) {
    console.error(err);
  }
};
const cvMarkdown =
  "<h1>프론트엔드 개발자 류준열</h1>\n" +
  "\n" +
  '<p><img src="https://www.datocms-assets.com/107137/1696416101-portfolio_profile.png?w=600&h=300" alt="profile"></p>\n' +
  "\n" +
  '<pre><code class="language-javascript">const a = &#39;hihi&#39;\n' +
  "console.log(a)\n" +
  "\n" +
  "function func(){\n" +
  "    console.log(a);\n" +
  "}\n" +
  "</code></pre>\n" +
  "\n" +
  "<h2>Contact</h2>\n" +
  "\n" +
  "<p>이름 : 류준열</p>\n" +
  "\n" +
  "<p>연락처 : 010-2726-9663</p>\n" +
  "\n" +
  '<p>E-mail : <a href="mailto:ryu9663@naver.com">ryu9663@naver.com</a></p>\n' +
  "\n" +
  '<p>Github : <a href="https://github.com/ryu9663">https://github.com/ryu9663</a></p>\n' +
  "\n" +
  '<p>Blog : <a href="https://wnsdufdl.tistory.com/">https://wnsdufdl.tistory.com/</a></p>\n' +
  "\n" +
  "<hr>\n" +
  "\n" +
  "<h2>Cover letter</h2>\n" +
  "\n" +
  "<p>안녕하세요. 프론트엔드 개발자 류준열입니다.</p>\n" +
  "\n" +
  "<p>교육회사인 코드스테이츠에서 부트캠프 지원자들을 관리하는 지원선발 시스템을 구축하였습니다. 유저 트래킹 환경을 세팅하여 마케팅팀의 전략수립에 도움을 주였고, 마케팅팀과 가설 검증을 반복하며 이탈률 감소를 위해 지원절차를 상시 유지보수 하였습니다. 웹표준에 근거한 마크업 작업으로 랜딩페이지의 검색엔진 노출량을 증가시킨 경험이 있습니다.</p>\n" +
  "\n" +
  "<p>현실의 문제를 해결할 수 있고, 더 나은 해결책을 제시할 수 있는 개발자가 되고자 합니다.</p>\n" +
  "\n" +
  "<p>감사합니다.</p>\n" +
  "\n" +
  "<hr>\n" +
  "\n" +
  "<h2>Career</h2>\n" +
  "\n" +
  "<h3>코드스테이츠</h3>\n" +
  "\n" +
  "<p>소프트웨어 엔지니어링, PM, 마케팅, 블록체인, AI, DevOps 부트캠프를 운영하는 교육회사</p>\n" +
  "\n" +
  "<p>재직기간 : 2022.01 ~ 2023.08</p>\n" +
  "\n" +
  '<p><strong><em><a href="https://www.codestates.com/">코드스테이츠 랜딩페이지</a></em></strong></p>\n' +
  "\n" +
  "<p><em>2022.01 ~ 2023.08</em></p>\n" +
  "\n" +
  "<p><code>next</code> <code>typescript</code> <code>zustand</code> <code>styled-component</code></p>\n" +
  "\n" +
  "<ul>\n" +
  "<li>각 부트캠프 기수별 상시 업데이트</li>\n" +
  "<li>초기 브라우저 렌더링 속도 향상을 위한 성능 최적화</li>\n" +
  "<li>유저 트래킹 환경 구축</li>\n" +
  "<li>재사용성과 확장성을 높이기 위한 공통 컴포넌트 구현</li>\n" +
  "<li>notion API 연동한 CMS 유지보수\n" +
  "\n" +
  "<ul>\n" +
  "<li>개발 생산성을 저하시키는 429 에러 해결\n" +
  "\n" +
  "<ul>\n" +
  "<li>배경) 노션으로부터 데이터를 조회 할 때 마다 429 에러가 매우 빈번하게 발생하여 개발 생산성 저하</li>\n" +
  "<li>토큰 버킷 알고리즘 적용하여 정해진 시간내에 최대 요청수에 도달하면 다음 요청을 딜레이 하도록 함</li>\n" +
  "</ul></li>\n" +
  "</ul></li>\n" +
  "</ul>\n" +
  "\n" +
  "<p><strong><em>지원선발 시스템</em></strong></p>\n" +
  "\n" +
  "<p><em>2022.04 ~ 2023.08</em></p>\n" +
  "\n" +
  "<p><code>react</code>, <code>typescript</code>, <code>zustand</code>, <code>scss</code> , <code>react-query</code> </p>\n" +
  "\n" +
  "<ul>\n" +
  "<li>Admin\n" +
  "\n" +
  "<ul>\n" +
  "<li>타입폼에서 자체시스템으로 전환함에 따른 신규 어드민 구축</li>\n" +
  "<li>재사용성과 확장성을 높이기 위한 공통 컴포넌트 구현</li>\n" +
  "<li>타입폼을 대체하는 form 생성 기능</li>\n" +
  "</ul></li>\n" +
  "<li>User Side\n" +
  "\n" +
  "<ul>\n" +
  "<li>기존 레거시 리팩토링</li>\n" +
  "<li>타입폼으로 구성되어 있던 지원플랫폼을 자체 시스템으로 전환</li>\n" +
  "<li>graphQL을 rest로 전환</li>\n" +
  "<li>유저 트래킹 환경 구축</li>\n" +
  "<li>이탈률 감소를 위한 상시 유지보수</li>\n" +
  "<li>추천인 코드를 통해 추천인과 피추천인을 연결해주는 서비스 구축</li>\n" +
  "</ul></li>\n" +
  "</ul>\n";
