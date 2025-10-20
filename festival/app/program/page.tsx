export const dynamic = "force-static";

export default function ProgramPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-10">
      <h1 className="text-2xl font-bold">프로그램</h1>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">PROGRAM 1 (08:30~12:30)</h2>
        <div className="space-y-2 text-sm leading-6">
          <p>
            1) E-Sports(Electronic Sports): 비디오 게임을 통해 이루어지는 스포츠 (9:00~12:30)
          </p>
          <p>
            LOL 해설자: 2학년 4반 박진우, 2학년 7반 백진우 / FIFA 해설자: 1학년 1반 유주안, 1학년 2반 조원준 / Valorant 해설자: 미정
          </p>
          <p>장소: 본교 시청각실</p>
          <p>2) 전시회: 교사 캐리커쳐 전시 (정용호, 최은성 선생님) — 본교 중앙 홀</p>
          <p>3) 반별 부스 운영: 1학년 2·7·8반, 2학년 1·2·3·6·8반, 학생회 팝콘 부스 — 운동장</p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">PROGRAM 2 (본 행사)</h2>
        <div className="space-y-2 text-sm leading-6">
          <p>1부 사회자: 학생회장 나상혁</p>
          <ol className="list-decimal list-inside">
            <li>개식 선언</li>
            <li>국민의례</li>
            <li>내빈소개 및 학교장 개회사 및 격려사</li>
            <li>이사장 치사</li>
            <li>총동창회장 축사</li>
            <li>축제선언</li>
          </ol>
          <p>2부 사회자: 2학년 박태성, 1학년 윤현준</p>
          <ol className="list-decimal list-inside">
            <li>태권도 초정공연</li>
            <li>글자 애니메이션 영상</li>
            <li>악기 연주</li>
            <li>교사 축하 공연</li>
            <li>학교 행사 영상</li>
            <li>댄스 팀 선발 (상품: 야자 면제권)</li>
            <li>대동고 댄스(1학년 2팀, 2학년 2팀)</li>
          </ol>
          <p className="text-foreground/70">행운권 추첨 — 최은성 선생님</p>
          <p>3부 사회자: 2학년 박한결, 1학년 정백진</p>
          <ol className="list-decimal list-inside">
            <li>축제 축하 영상</li>
            <li>합창 (2학년 4반 박진우 외 22명)</li>
            <li>미스 대동</li>
            <li>스승과 제자</li>
            <li>선생님 언박싱(Ask! 선생님)</li>
            <li>여고 초청 공연</li>
            <li>대동고 밴드부</li>
          </ol>
        </div>
      </section>
    </div>
  );
}
