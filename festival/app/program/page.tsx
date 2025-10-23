export const dynamic = "force-static";

export default function ProgramPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 sm:px-8 py-12 space-y-12">
      {/* 메인 제목 */}
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          대동고 축제 프로그램
        </h1>
        <p className="text-sm text-muted-foreground">
          2025학년도 봉선의 메아리 축제 일정
        </p>
      </header>

      {/* PROGRAM 1 */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">
          PROGRAM 1 (08:30 ~ 12:30)
        </h2>

        <div className="space-y-5 text-[15px] leading-relaxed text-muted-foreground">
          <div>
            <h3 className="font-semibold text-base text-foreground">E-Sports</h3>
            <p className="mt-1">비디오 게임을 통해 이루어지는 스포츠</p>
            <p>종목 — 리그오브 레전드, 피파, 발로란트</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>LOL 해설자: 2학년 4반 박진우, 2학년 7반 백진우</li>
              <li>FIFA 해설자: 1학년 1반 유주안, 1학년 2반 조원준</li>
              <li>Valorant 해설자: 1학년 3반 김현성, 1학년 3반 임건욱</li>
            </ul>
            <p className="mt-2 text-sm text-foreground">장소: 본교 시청각실</p>
          </div>

          <div>
            <h3 className="font-semibold text-base text-foreground">전시회</h3>
            <p>교사 캐리커쳐 전시 (정용호, 최은성 선생님) — 본교 중앙 홀</p>
          </div>

          <div>
            <h3 className="font-semibold text-base text-foreground">반별 부스 운영</h3>
            <p>
              1학년 2·7·8반, 2학년 1·2·3·6·8반, 학생회 팝콘 부스 — 운동장
            </p>
          </div>
        </div>
      </section>

      {/* PROGRAM 2 */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">
          PROGRAM 2 (본 행사)
        </h2>

        <div className="space-y-8 text-[15px] leading-relaxed text-muted-foreground">
          {/* 1부 */}
          <div>
            <h3 className="font-semibold text-base text-foreground mb-1">
              1부 사회: 학생회장 나상혁
            </h3>
            <ol className="list-decimal list-inside space-y-1">
              <li>개식 선언</li>
              <li>국민의례</li>
              <li>내빈소개 및 학교장 개회사 및 격려사</li>
              <li>이사장 치사</li>
              <li>총동창회장 축사</li>
              <li>축제선언</li>
            </ol>
          </div>

          {/* 2부 */}
          <div>
            <h3 className="font-semibold text-base text-foreground mb-1">
              2부 사회: 2학년 박태성 | 1학년 윤현준
            </h3>
            <ol className="list-decimal list-inside space-y-1">
              <li>태권도 초정공연</li>
              <li>글자 애니메이션 영상</li>
              <li>악기 연주 (기타: 2학년 ...)</li>
              <li>교사 축하 공연 (손지훈, 정지영, 정회헌 선생님)</li>
              <li>학교 행사 영상 (방송부)</li>
              <li>댄스 팀 선발 (상품: 야자 면제권)</li>
              <li>대동고 댄스(1학년 2팀, 2학년 2팀)</li>
            </ol>
            <p className="text-sm mt-2 text-foreground/70">
              행운권 추첨 — 최은성 선생님
            </p>
          </div>

          {/* 3부 */}
          <div>
            <h3 className="font-semibold text-base text-foreground mb-1">
              3부 사회: 2학년 박한결 | 1학년 정백진
            </h3>
            <ol className="list-decimal list-inside space-y-1">
              <li>축제 축하 영상 (광주시장, 서구청장, 졸업생 등)</li>
              <li>합창 (2학년 4반 박진우 외 22명)</li>
              <li>미스 대동 (여장 남자들의 이야기)</li>
              <li>스승과 제자 (김선춘 선생님, 2학년 하준원)</li>
              <li>선생님 언박싱 (Ask! 선생님) — 사회: 윤민주 선생님</li>
              <li>여고 초청 공연</li>
              <li>
                대동고 밴드부 <br />
                <span className="text-xs">
                  기타: 이한석, 김영우, 전승빈 | 베이스: 윤산희 | 건반: 김태윤, 정현준 | 
                  드럼: 서준하 | 보컬: 김준수, 안효근, 하준원, 전유섭
                </span>
              </li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
