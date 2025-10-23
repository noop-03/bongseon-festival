export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 space-y-6">
      <h1 className="text-2xl font-bold">실시간 갤러리</h1>

  
      <div className="mt-8 space-y-2">
        <h2 className="text-xl font-semibold">제48회 봉선의 메아리 예고편</h2>
        <div className="aspect-video rounded-lg overflow-hidden shadow-sm">
          <iframe
            className="w-full h-full"
            src="https://www.youtube-nocookie.com/embed/eTS1hACMoMM?si=IG1NmzImfxJ4Icie"
            title="제48회 봉선의 메아리 예고편"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="pt-8 border-t border-foreground/10 text-center text-sm text-foreground/60">
        ※ 위 영상은 <span className="font-medium text-foreground">광주대동고 방송부</span>에서 촬영 및 제공하였습니다.
      </div>



    </div>
  );
}
