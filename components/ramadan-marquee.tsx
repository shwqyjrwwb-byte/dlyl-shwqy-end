"use client"

export function RamadanMarquee() {
  const message = "أحمد شوقي بيهني عائلة أحمد شوقي بحلول شهر رمضان المبارك وبيتمنّى لكم شهر مليان خير، وبركة، ولمّة ومحبة، وراحة بال. ربنا يجعله شهر طمأنينة وقرب من ربنا، ويعيده عليكم بالصحة والسعادة وكل الأيام الحلوة. رمضان كريم عليكم جميعًا 🌙"

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 py-3 sm:py-4 border-y border-primary/20">
      <div className="flex animate-marquee-rtl whitespace-nowrap">
        <span className="text-primary font-semibold text-sm sm:text-base md:text-lg px-8">
          {message}
        </span>
        <span className="text-primary font-semibold text-sm sm:text-base md:text-lg px-8">
          {message}
        </span>
        <span className="text-primary font-semibold text-sm sm:text-base md:text-lg px-8">
          {message}
        </span>
      </div>
    </div>
  )
}
