import { performRequest } from "@/__mocks__/dato";
import { GET_POST_BY_ID } from "@/app/api/dato/getPostById";

describe("getPostById", () => {
  it("getPostById의 postId에 198173441를 넣으면 이력서 마크다운을 반환한다.", async () => {
    const response = await getPostById({ postId: "198173441" });

    expect(response.data.article.markdown).toEqual(cvMarkdown);
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
  "\n# 프론트엔드 개발자 류준열\n\n![profile](https://www.datocms-assets.com/107137/1696416101-portfolio_profile.png?w=600&h=300)\n\n## Contact\n\n이름 : 류준열\n\n연락처 : 010-2726-9663\n\nE-mail : ryu9663@naver.com\n\nGithub : [https://github.com/ryu9663](https://github.com/ryu9663)\n\nBlog : [https://wnsdufdl.tistory.com/](https://wnsdufdl.tistory.com/)\n\n---\n\n## Cover letter\n\n안녕하세요. 프론트엔드 개발자 류준열입니다.\n\n교육회사인 코드스테이츠에서 부트캠프 지원자들을 관리하는 지원선발 시스템을 구축하였습니다. 유저 트래킹 환경을 세팅하여 마케팅팀의 전략수립에 도움을 주였고, 마케팅팀과 가설 검증을 반복하며 이탈률 감소를 위해 지원절차를 상시 유지보수 하였습니다. 웹표준에 근거한 마크업 작업으로 랜딩페이지의 검색엔진 노출량을 증가시킨 경험이 있습니다.\n\n현실의 문제를 해결할 수 있고, 더 나은 해결책을 제시할 수 있는 개발자가 되고자 합니다.\n\n감사합니다.\n\n---\n\n## Career\n\n### 코드스테이츠\n\n소프트웨어 엔지니어링, PM, 마케팅, 블록체인, AI, DevOps 부트캠프를 운영하는 교육회사\n\n재직기간 : 2022.01 ~ 2023.08\n\n***[코드스테이츠 랜딩페이지](https://www.codestates.com/)***\n\n*2022.01 ~ 2023.08*\n\n`next` `typescript` `zustand` `styled-component`\n\n- 각 부트캠프 기수별 상시 업데이트\n- 초기 브라우저 렌더링 속도 향상을 위한 성능 최적화\n- 유저 트래킹 환경 구축\n- 재사용성과 확장성을 높이기 위한 공통 컴포넌트 구현\n- notion API 연동한 CMS 유지보수\n    - 개발 생산성을 저하시키는 429 에러 해결\n        - 배경) 노션으로부터 데이터를 조회 할 때 마다 429 에러가 매우 빈번하게 발생하여 개발 생산성 저하\n        - 토큰 버킷 알고리즘 적용하여 정해진 시간내에 최대 요청수에 도달하면 다음 요청을 딜레이 하도록 함\n\n***지원선발 시스템***\n\n*2022.04 ~ 2023.08*\n\n`react`, `typescript`, `zustand`, `scss` , `react-query` \n\n- Admin\n    - 타입폼에서 자체시스템으로 전환함에 따른 신규 어드민 구축\n    - 재사용성과 확장성을 높이기 위한 공통 컴포넌트 구현\n    - 타입폼을 대체하는 form 생성 기능\n- User Side\n    - 기존 레거시 리팩토링\n    - 타입폼으로 구성되어 있던 지원플랫폼을 자체 시스템으로 전환\n    - graphQL을 rest로 전환\n    - 유저 트래킹 환경 구축\n    - 이탈률 감소를 위한 상시 유지보수\n    - 추천인 코드를 통해 추천인과 피추천인을 연결해주는 서비스 구축";
