import { RamadanMarquee } from "./ramadan-marquee"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-transparent">
      {/* Hero Video */}
      <div className="w-full relative">
        <video
          src="/images/بنار.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/60" />
      </div>

      {/* Content */}
      <div className="relative bg-gradient-to-b from-background/90 to-background backdrop-blur-sm py-10 px-4">
        {/* animated bg blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">Shawky Group — Est. 2014</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground leading-tight">
            مرحباً بكم في{" "}
            <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 bg-clip-text text-transparent">
              أكبر عائلة في مصر
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-primary/90 font-bold text-base sm:text-lg">
            هنا النجاح مش صدفة... النجاح نظام، والتزام، وروح شغل واحدة.
          </p>

          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            المنصة دي اتعملت مخصوص علشانكم — كل اللي محتاجه في مكان واحد:
            من القواعد العامة، للمواصفات الفنية، للجودة، لحد خطط التنفيذ المرحلية.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            {[
              { value: "900+", label: "عميل" },
              { value: "10+", label: "سنوات خبرة" },
              { value: "6",   label: "مناطق" },
              { value: "150+", label: "موظف" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center bg-white/5 border border-white/10 rounded-xl px-5 py-3 min-w-[80px]">
                <span className="text-2xl font-black text-amber-400">{s.value}</span>
                <span className="text-gray-500 text-xs font-semibold">{s.label}</span>
              </div>
            ))}
          </div>

          <p className="text-primary text-lg font-black">يلا نشتغل... ونكبر سوا 🚀</p>

          {/* Marquee */}
          <div className="pt-2">
            <RamadanMarquee />
          </div>
        </div>
      </div>
    </section>
  )
}
