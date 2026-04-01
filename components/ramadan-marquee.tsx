"use client"

const TEXT = "مجموعة شوقي جروب هي شركة مصرية رائدة في المقاولات والتصميم الداخلي، متخصصة في التشطيبات الفاخرة للمشاريع السكنية والإدارية. تأسست الشركة عام 2016 على يد المهندس أحمد شوقي، ونجحت منذ ذلك الحين في تنفيذ مئات المشاريع المتميزة عبر خبرة واحترافية فريق من المهندسين والمصممين المؤهلين."

export function RamadanMarquee() {
  const items = [TEXT, "⬥", TEXT, "⬥", TEXT, "⬥"]

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-r from-black via-[#0d0d14] to-black py-3">
      {/* fade edges */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee-rtl whitespace-nowrap gap-0">
        {items.map((item, i) => (
          <span key={i} className={`px-6 text-sm font-semibold ${item === "⬥" ? "text-amber-500 text-lg" : "text-amber-300/80"}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
