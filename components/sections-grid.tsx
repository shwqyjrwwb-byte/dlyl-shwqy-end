import { SectionCard } from "./section-card"

const sections = [
  {
    id: "contacts",
    title: "أرقام التواصل بالأقسام",
    description: "دليل التواصل مع جميع الأقسام والمسؤولين",
    image: "/images/icons/icon-contacts.png",
    href: "/contacts",
  },
  {
    id: "packages",
    title: "الباقات",
    description: "تفاصيل جميع باقات التشطيب المتاحة",
    image: "/images/icons/icon-packages.png",
    href: "/packages",
  },
  {
    id: "videos",
    title: "فيديوهاتنا",
    description: "شاهد أعمالنا ومشاريعنا المميزة",
    image: "/images/فيديوهتنا.png",
    href: "https://shawkygroup.com/",
    isExternal: true,
  },
  {
    id: "finishing-items",
    title: "شرح بنود التشطيب",
    description: "دليل شامل لجميع بنود التشطيب والمواصفات",
    image: "/images/شرح بنود التشطيب.png",
    href: "/finishing-explanation",
  },
  {
    id: "specs",
    title: "المواصفات الفنية للأعمال",
    description: "السيراميك • السباكة • الكهرباء • النجارة • الجبس • الرخام",
    image: "/images/technical_specs_final_arabic_fix.png",
    href: "/specifications",
  },
  {
    id: "phases",
    title: "ترتيب مراحل التنفيذ",
    description: "الجدول الزمني لمراحل التنفيذ",
    image: "/images/icons/icon-phases.png",
    href: "/phases",
  },
  {
    id: "penalties",
    title: "لائحة الاشتراطات",
    description: "الاشتراطات والمتطلبات الإدارية",
    image: "/images/icons/icon-penalties.png",
    href: "/penalties",
  },
  {
    id: "quality",
    title: "مواعيد استلام الجودة",
    description: "جدول الاستلام والإجراءات",
    image: "/images/icons/icon-quality.png",
    href: "/quality",
  },
  {
    id: "payment",
    title: "شروط صرف المستخلص",
    description: "شروط وخطوات صرف المستحقات",
    image: "/images/icons/icon-payment.png",
    href: "/payment",
  },
  {
    id: "vehicles",
    title: "خط سير السيارات",
    description: "مناطق التحرك والقواعد",
    image: "/images/icons/icon-specifications.png",
    href: "/vehicles",
  },
  {
    id: "contractors",
    title: "المقاولون والمناطق",
    description: "قوائم المقاولين والمناطق",
    image: "/images/icons/icon-contractors.png",
    href: "/contractors",
  },
  {
    id: "technical-office",
    title: "المكتب الفني",
    description: "بيانات ومعلومات المكتب الفني",
    image: "/images/icons/icon-specifications (3).png",
    href: "/technical-office",
  },
  {
    id: "work-permit",
    title: "تصريح أعمال",
    description: "طلب تصريح دخول ومباشرة أعمال تشطيبات",
    image: "/images/تصريح اعمال.png",
    href: "/work-permit",
  },
  {
    id: "custody-request",
    title: "طلب صرف عهدة",
    description: "نموذج طلب صرف عهدة احترافي",
    image: "/images/صرف العهد.png",
    href: "/admin/custody-request",
  },
]

export function SectionsGrid() {
  return (
    <section className="py-8 sm:py-12 md:py-16 px-3 sm:px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-gold text-center mb-6 sm:mb-8 md:mb-12">اختر القسم للوصول السريع</h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {sections.map((section) => (
            <SectionCard key={section.id} section={section} />
          ))}
        </div>
      </div>
    </section>
  )
}
