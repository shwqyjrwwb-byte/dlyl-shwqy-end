 export interface ClientFile {
  id: string
  name: string
  url: string
  uploadedAt: Date
  size: string
  type: string
}

export interface Client {
  id: string
  name: string
  code: string
  package: string
  areaId: number
  files: ClientFile[]
}

// Real clients data for القاهرة الجديدة (area 2)
export const newCairoClients: Client[] = [
  {
    id: "2-1",
    name: "حسام صلاح",
    code: "CLT-2001",
    package: "VIP",
    areaId: 2,
    files: [
      {
        id: "1",
        name: "نهائي تاسيسات حسام صلاح",
        url: "/pdfs/new-cairo/حسام-صلاح.pdf",
        uploadedAt: new Date("2024-12-17"),
        size: "2.4 MB",
        type: "تأسيسات",
      },
    ],
  },
  {
    id: "2-2",
    name: "نورهان حسانين",
    code: "CLT-2002",
    package: "Medium",
    areaId: 2,
    files: [
      {
        id: "1",
        name: "تعديل كهرباء 1 أ. نورهان حسانين",
        url: "/pdfs/new-cairo/نورهان-حسانين.pdf",
        uploadedAt: new Date("2024-12-15"),
        size: "1.8 MB",
        type: "كهرباء",
      },
    ],
  },
  {
    id: "2-3",
    name: "مؤمن حسانين",
    code: "CLT-2003",
    package: "VIP",
    areaId: 2,
    files: [
      {
        id: "1",
        name: "تأسيسات أ.مؤمن حسانين 897",
        url: "/pdfs/new-cairo/مؤمن-حسانين.pdf",
        uploadedAt: new Date("2024-12-14"),
        size: "2.1 MB",
        type: "تأسيسات",
      },
    ],
  },
  {
    id: "2-4",
    name: "احمد عبد الحكيم",
    code: "CLT-2004",
    package: "S.U.VIP",
    areaId: 2,
    files: [
      {
        id: "1",
        name: "تأسيسات (2) -- احمد عبد الحكيم --829",
        url: "/pdfs/new-cairo/احمد-عبد-الحكيم.pdf",
        uploadedAt: new Date("2024-12-13"),
        size: "3.2 MB",
        type: "تأسيسات",
      },
    ],
  },
  {
    id: "2-5",
    name: "نهله فتحي",
    code: "CLT-2005",
    package: "VIP",
    areaId: 2,
    files: [
      {
        id: "1",
        name: "تأسيسات ا- نهله فتحي",
        url: "/pdfs/new-cairo/نهله-فتحي.pdf",
        uploadedAt: new Date("2024-12-12"),
        size: "1.9 MB",
        type: "تأسيسات",
      },
    ],
  },
  {
    id: "2-6",
    name: "محمد سيد صقر",
    code: "CLT-2006",
    package: "VIP",
    areaId: 2,
    files: [
      {
        id: "1",
        name: "تاسيسات محمد سيد صقر نهائي FINAL 17-12",
        url: "/pdfs/new-cairo/محمد-سيد-صقر.pdf",
        uploadedAt: new Date("2024-12-17"),
        size: "2.7 MB",
        type: "تأسيسات",
      },
    ],
  },
  {
    id: "2-7",
    name: "كريم محمد",
    code: "CLT-2007",
    package: "VIP",
    areaId: 2,
    files: [
      {
        id: "1",
        name: "نهائي كريم محمد (1)",
        url: "/pdfs/new-cairo/كريم-محمد.pdf",
        uploadedAt: new Date("2024-12-06"),
        size: "2.3 MB",
        type: "تأسيسات",
      },
    ],
  },
  {
    id: "2-8",
    name: "عمرو محمد",
    code: "CLT-2008",
    package: "VIP",
    areaId: 2,
    files: [
      {
        id: "1",
        name: "نهائي تاسيسات عمرو محمد",
        url: "/pdfs/new-cairo/عمرو-محمد.pdf",
        uploadedAt: new Date("2024-12-10"),
        size: "2.0 MB",
        type: "تأسيسات",
      },
    ],
  },
  {
    id: "2-9",
    name: "حازم محمد مختار",
    code: "CLT-2009",
    package: "Elite",
    areaId: 2,
    files: [
      {
        id: "1",
        name: "ديكور -- حازم محمد مختار --742 (2)",
        url: "/pdfs/new-cairo/حازم-مختار-ديكور.pdf",
        uploadedAt: new Date("2024-12-08"),
        size: "3.5 MB",
        type: "ديكور",
      },
      {
        id: "2",
        name: "تأسيسات حازم مختار",
        url: "/pdfs/new-cairo/حازم-مختار-تأسيسات.pdf",
        uploadedAt: new Date("2024-12-08"),
        size: "2.8 MB",
        type: "تأسيسات",
      },
    ],
  },
  {
    id: "2-10",
    name: "ندى محمد شحاتة",
    code: "893",
    package: "VIP",
    areaId: 2,
    files: [
      {
        id: "1",
        name: "ندى محمد شحاته 893",
        url: "/pdfs/new-cairo/ندى-محمد-شحاتة.pdf",
        uploadedAt: new Date("2025-01-18"),
        size: "2.1 MB",
        type: "تأسيسات",
      },
      {
        id: "2",
        name: "ندى محمد شحاته 893 - معماري",
        url: "/pdfs/new-cairo/ندى-محمد-شحاته-893-معماري.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "1.8 MB",
        type: "معماري",
      },
    ],
  },
  {
    id: "2-11",
    name: "نيفين فرج",
    code: "859",
    package: "VIP",
    areaId: 2,
    files: [
      {
        id: "1",
        name: "نيفين فرج 859",
        url: "/pdfs/new-cairo/نيفين-فرج-859.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "1.5 MB",
        type: "معماري",
      },
    ],
  },
  {
    id: "2-12",
    name: "ابانوب",
    code: "CLT-2011",
    package: "U.VIP",
    areaId: 2,
    files: [
      {
        id: "1",
        name: "1",
        url: "/pdfs/new-cairo/ابانوب-1.pdf",
        uploadedAt: new Date("2025-01-18"),
        size: "1.2 MB",
        type: "تأسيسات",
      },
      {
        id: "2",
        name: "2",
        url: "/pdfs/new-cairo/ابانوب-2.pdf",
        uploadedAt: new Date("2025-01-18"),
        size: "1.1 MB",
        type: "تأسيسات",
      },
      {
        id: "3",
        name: "3",
        url: "/pdfs/new-cairo/ابانوب-3.pdf",
        uploadedAt: new Date("2025-01-18"),
        size: "1.3 MB",
        type: "تأسيسات",
      },
      {
        id: "4",
        name: "4",
        url: "/pdfs/new-cairo/ابانوب-4.pdf",
        uploadedAt: new Date("2025-01-18"),
        size: "1.0 MB",
        type: "تأسيسات",
      },
      {
        id: "5",
        name: "التعديلات المعمارية",
        url: "/pdfs/new-cairo/ابانوب-تعديلات-معمارية.pdf",
        uploadedAt: new Date("2025-01-18"),
        size: "2.8 MB",
        type: "معماري",
      },
      {
        id: "6",
        name: "معاينة",
        url: "/pdfs/new-cairo/ابانوب-معاينة.pdf",
        uploadedAt: new Date("2025-01-18"),
        size: "1.5 MB",
        type: "معاينة",
      },
      {
        id: "7",
        name: "تكييفات",
        url: "/pdfs/new-cairo/ابانوب-تكييفات.pdf",
        uploadedAt: new Date("2025-01-18"),
        size: "1.4 MB",
        type: "تكييفات",
      },
      {
        id: "8",
        name: "مقترحات فرش أ. ابانوب",
        url: "/pdfs/new-cairo/ابانوب-مقترحات-فرش.pdf",
        uploadedAt: new Date("2025-01-18"),
        size: "3.2 MB",
        type: "فرش",
      },
      {
        id: "9",
        name: "تعديل الفرش",
        url: "/pdfs/new-cairo/ابانوب-تعديل-الفرش.pdf",
        uploadedAt: new Date("2025-01-18"),
        size: "1.6 MB",
        type: "فرش",
      },
    ],
  },
]

// تم إزالة العملاء الوهميين - فقط العملاء الحقيقيين

// Real clients data for التجمع الخامس (area 3)
export const fifthSettlementClients: Client[] = [
  {
    id: "3-1",
    name: "هشام عبد الحميد",
    code: "653",
    package: "U.VIP",
    areaId: 3,
    files: [
      {
        id: "1",
        name: "هشام عبد الحميد 653 - اضافات",
        url: "/pdfs/fifth-settlement/هشام-عبد-الحميد-653.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "2.3 MB",
        type: "اضافات",
      },
    ],
  },
  {
    id: "3-2",
    name: "وليد عبدالعزيز",
    code: "CLT-3002",
    package: "S.U.VIP",
    areaId: 3,
    files: [
      {
        id: "1",
        name: "وليد عبدالعزيز - مخطط 01",
        url: "/pdfs/fifth-settlement/وليد-عبدالعزيز-01.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "2.8 MB",
        type: "معماري",
      },
      {
        id: "2",
        name: "وليد عبدالعزيز - مخطط 02",
        url: "/pdfs/fifth-settlement/وليد-عبدالعزيز-02.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "2.5 MB",
        type: "معماري",
      },
      {
        id: "3",
        name: "وليد عبدالعزيز - مخطط 03",
        url: "/pdfs/fifth-settlement/وليد-عبدالعزيز-03.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "2.7 MB",
        type: "معماري",
      },
      {
        id: "4",
        name: "وليد عبدالعزيز - مخطط 04",
        url: "/pdfs/fifth-settlement/وليد-عبدالعزيز-04.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "2.6 MB",
        type: "معماري",
      },
      {
        id: "5",
        name: "وليد عبدالعزيز - مخطط 05",
        url: "/pdfs/fifth-settlement/وليد-عبدالعزيز-05.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "2.9 MB",
        type: "معماري",
      },
      {
        id: "6",
        name: "وليد عبدالعزيز - مخطط 06",
        url: "/pdfs/fifth-settlement/وليد-عبدالعزيز-06.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "2.4 MB",
        type: "معماري",
      },
      {
        id: "7",
        name: "وليد عبدالعزيز - مخطط 07",
        url: "/pdfs/fifth-settlement/وليد-عبدالعزيز-07.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "2.8 MB",
        type: "معماري",
      },
      {
        id: "8",
        name: "وليد عبدالعزيز - مخطط 08",
        url: "/pdfs/fifth-settlement/وليد-عبدالعزيز-08.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "3.0 MB",
        type: "معماري",
      },
      {
        id: "9",
        name: "وليد عبدالعزيز - مخطط 09",
        url: "/pdfs/fifth-settlement/وليد-عبدالعزيز-09.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "2.7 MB",
        type: "معماري",
      },
      {
        id: "10",
        name: "وليد عبدالعزيز - مخطط 10",
        url: "/pdfs/fifth-settlement/وليد-عبدالعزيز-10.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "3.1 MB",
        type: "معماري",
      },
      {
        id: "11",
        name: "وليد عبدالعزيز - مخطط 11",
        url: "/pdfs/fifth-settlement/وليد-عبدالعزيز-11.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "2.9 MB",
        type: "معماري",
      },
      {
        id: "12",
        name: "وليد عبدالعزيز - مخطط 12",
        url: "/pdfs/fifth-settlement/وليد-عبدالعزيز-12.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "2.6 MB",
        type: "معماري",
      },
      {
        id: "13",
        name: "وليد عبدالعزيز - مخطط 13",
        url: "/pdfs/fifth-settlement/وليد-عبدالعزيز-13.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "2.8 MB",
        type: "معماري",
      },
      {
        id: "14",
        name: "وليد عبدالعزيز - مخطط 14",
        url: "/pdfs/fifth-settlement/وليد-عبدالعزيز-14.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "3.0 MB",
        type: "معماري",
      },
      {
        id: "15",
        name: "وليد عبدالعزيز - مخطط 15",
        url: "/pdfs/fifth-settlement/وليد-عبدالعزيز-15.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "2.7 MB",
        type: "معماري",
      },
      {
        id: "16",
        name: "وليد عبدالعزيز - مخطط 16",
        url: "/pdfs/fifth-settlement/وليد-عبدالعزيز-16.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "2.5 MB",
        type: "معماري",
      },
      {
        id: "17",
        name: "وليد عبدالعزيز - مخطط 17",
        url: "/pdfs/fifth-settlement/وليد-عبدالعزيز-17.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "3.2 MB",
        type: "معماري",
      },
      {
        id: "18",
        name: "وليد عبدالعزيز - مخطط 18",
        url: "/pdfs/fifth-settlement/وليد-عبدالعزيز-18.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "2.8 MB",
        type: "معماري",
      },
      {
        id: "19",
        name: "وليد عبدالعزيز - مخطط 19",
        url: "/pdfs/fifth-settlement/وليد-عبدالعزيز-19.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "3.1 MB",
        type: "معماري",
      },
      {
        id: "20",
        name: "وليد عبدالعزيز - مخطط 20",
        url: "/pdfs/fifth-settlement/وليد-عبدالعزيز-20.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "2.9 MB",
        type: "معماري",
      },
      {
        id: "21",
        name: "وليد عبدالعزيز - مخطط 21",
        url: "/pdfs/fifth-settlement/وليد-عبدالعزيز-21.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "3.0 MB",
        type: "معماري",
      },
      {
        id: "22",
        name: "وليد عبدالعزيز - مخطط 22",
        url: "/pdfs/fifth-settlement/وليد-عبدالعزيز-22.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "2.7 MB",
        type: "معماري",
      },
    ],
  },
]

// Real clients data for وسط - مدينة نصر (area 4)
export const downtownClients: Client[] = [
  {
    id: "4-1",
    name: "حسن محمد حسن محمد",
    code: "737",
    package: "Medium",
    areaId: 4,
    files: [
      {
        id: "1",
        name: "حسن محمد 737 - اضافات",
        url: "/pdfs/downtown/حسن-محمد-737.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "2.8 MB",
        type: "اضافات",
      },
    ],
  },
  {
    id: "4-2",
    name: "وليد عقيله",
    code: "827",
    package: "VIP",
    areaId: 4,
    files: [
      {
        id: "1",
        name: "تقسيط سيراميك وليد عقيله",
        url: "/pdfs/downtown/وليد-عقيله-سيراميك.pdf",
        uploadedAt: new Date("2025-01-28"),
        size: "2.5 MB",
        type: "سيراميك",
      },
      {
        id: "2",
        name: "تأسيسات وليد عقيلة - مرحلة اولى",
        url: "/pdfs/downtown/وليد-عقيله-تأسيسات.pdf",
        uploadedAt: new Date("2025-01-28"),
        size: "3.1 MB",
        type: "تأسيسات",
      },
      {
        id: "3",
        name: "نهائي جبس وليد عقيله",
        url: "/pdfs/downtown/وليد-عقيله-جبس.pdf",
        uploadedAt: new Date("2025-01-28"),
        size: "2.8 MB",
        type: "جبس",
      },
    ],
  },
  {
    id: "4-3",
    name: "شادي أحمد",
    code: "CLT-4003",
    package: "VIP",
    areaId: 4,
    files: [
      {
        id: "1",
        name: "تقسيط سيراميك شادي أحمد",
        url: "/pdfs/downtown/شادي-أحمد-سيراميك.pdf",
        uploadedAt: new Date("2025-01-28"),
        size: "2.2 MB",
        type: "سيراميك",
      },
    ],
  },
  {
    id: "4-4",
    name: "محمد صلاح",
    code: "CLT-4004",
    package: "VIP",
    areaId: 4,
    files: [
      {
        id: "1",
        name: "نهائي ديكورات محمد صلاح",
        url: "/pdfs/downtown/محمد-صلاح-ديكورات.pdf",
        uploadedAt: new Date("2025-01-28"),
        size: "3.5 MB",
        type: "ديكورات",
      },
    ],
  },
  {
    id: "4-5",
    name: "محمد سمير عبد النبي",
    code: "791",
    package: "VIP",
    areaId: 4,
    files: [
      {
        id: "1",
        name: "تأسيسات محمد سمير عبد النبي 791",
        url: "/pdfs/downtown/محمد-سمير-تأسيسات.pdf",
        uploadedAt: new Date("2025-01-28"),
        size: "4.2 MB",
        type: "تأسيسات",
      },
      {
        id: "2",
        name: "مرحلة ثالثة محمد سمير 791",
        url: "/pdfs/downtown/محمد-سمير-مرحلة-ثالثة.pdf",
        uploadedAt: new Date("2025-01-28"),
        size: "1.8 MB",
        type: "مرحلة ثالثة",
      },
    ],
  },
  {
    id: "4-6",
    name: "محمد فهمي",
    code: "886",
    package: "VIP",
    areaId: 4,
    files: [
      {
        id: "1",
        name: "جبسمبورد محمد فهمي 886",
        url: "/pdfs/downtown/محمد-فهمي-جبسمبورد.pdf",
        uploadedAt: new Date("2025-01-28"),
        size: "2.8 MB",
        type: "جبسمبورد",
      },
      {
        id: "2",
        name: "تأسيسات محمد فهمي 886",
        url: "/pdfs/downtown/محمد-فهمي-تأسيسات.pdf",
        uploadedAt: new Date("2025-01-28"),
        size: "3.2 MB",
        type: "تأسيسات",
      },
    ],
  },
  {
    id: "4-7",
    name: "رأفت صبري",
    code: "875",
    package: "VIP",
    areaId: 4,
    files: [
      {
        id: "1",
        name: "حصر سيراميك رأفت صبري 875",
        url: "/pdfs/downtown/رأفت-صبري-سيراميك.pdf",
        uploadedAt: new Date("2025-01-28"),
        size: "2.5 MB",
        type: "سيراميك",
      },
      {
        id: "2",
        name: "تأسيسات رافت صبري 875",
        url: "/pdfs/downtown/رأفت-صبري-تأسيسات.pdf",
        uploadedAt: new Date("2025-01-28"),
        size: "3.0 MB",
        type: "تأسيسات",
      },
    ],
  },
  {
    id: "4-8",
    name: "مصطفي سيد",
    code: "844",
    package: "VIP",
    areaId: 4,
    files: [
      {
        id: "1",
        name: "حصر سيراميك مصطفي سيد 844",
        url: "/pdfs/downtown/مصطفي-سيد-سيراميك.pdf",
        uploadedAt: new Date("2025-01-28"),
        size: "2.4 MB",
        type: "سيراميك",
      },
      {
        id: "2",
        name: "ديكورات مصطفي سيد 844",
        url: "/pdfs/downtown/مصطفي-سيد-ديكورات.pdf",
        uploadedAt: new Date("2025-01-28"),
        size: "3.5 MB",
        type: "ديكورات",
      },
      {
        id: "3",
        name: "تأسيسات مصطفي سيد 844",
        url: "/pdfs/downtown/مصطفي-سيد-تأسيسات.pdf",
        uploadedAt: new Date("2025-01-28"),
        size: "3.1 MB",
        type: "تأسيسات",
      },
      {
        id: "4",
        name: "جبسمبورد مصطفي سيد 844",
        url: "/pdfs/downtown/مصطفي-سيد-جبسمبورد.pdf",
        uploadedAt: new Date("2025-01-28"),
        size: "2.9 MB",
        type: "جبسمبورد",
      },
    ],
  },
]

// Real clients data for الشيخ زايد (area 1)
export const sheikhZayedClients: Client[] = []

// Real clients data for أكتوبر (area 5)
export const octoberClients: Client[] = [
  {
    id: "5-1",
    name: "عمرو فاروق",
    code: "878",
    package: "VIP",
    areaId: 5,
    files: [
      {
        id: "1",
        name: "عمرو فاروق - مخطط 01",
        url: "/pdfs/october/عمرو-فاروق-01.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "2.5 MB",
        type: "معماري",
      },
      {
        id: "2",
        name: "عمرو فاروق - مخطط 02",
        url: "/pdfs/october/عمرو-فاروق-02.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "2.3 MB",
        type: "معماري",
      },
      {
        id: "3",
        name: "عمرو فاروق - مخطط 03",
        url: "/pdfs/october/عمرو-فاروق-03.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "2.6 MB",
        type: "معماري",
      },
      {
        id: "4",
        name: "عمرو فاروق - مخطط 04",
        url: "/pdfs/october/عمرو-فاروق-04.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "2.4 MB",
        type: "معماري",
      },
      {
        id: "5",
        name: "عمرو فاروق - مخطط 05",
        url: "/pdfs/october/عمرو-فاروق-05.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "2.7 MB",
        type: "معماري",
      },
      {
        id: "6",
        name: "عمرو فاروق - مخطط 06",
        url: "/pdfs/october/عمرو-فاروق-06.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "2.8 MB",
        type: "معماري",
      },
      {
        id: "7",
        name: "عمرو فاروق - مخطط 07",
        url: "/pdfs/october/عمرو-فاروق-07.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "2.5 MB",
        type: "معماري",
      },
      {
        id: "8",
        name: "عمرو فاروق - مخطط 08",
        url: "/pdfs/october/عمرو-فاروق-08.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "2.9 MB",
        type: "معماري",
      },
      {
        id: "9",
        name: "عمرو فاروق - مخطط 09",
        url: "/pdfs/october/عمرو-فاروق-09.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "2.6 MB",
        type: "معماري",
      },
      {
        id: "10",
        name: "عمرو فاروق - مخطط 10",
        url: "/pdfs/october/عمرو-فاروق-10.pdf",
        uploadedAt: new Date("2025-01-27"),
        size: "3.0 MB",
        type: "معماري",
      },
    ],
  },
]

// فقط العملاء الحقيقيين
export const allNewCairoClients = newCairoClients

// Function to get client by ID
export const getClientById = (id: string): Client | undefined => {
  const allClients = [
    ...sheikhZayedClients,
    ...allNewCairoClients,
    ...fifthSettlementClients,
    ...downtownClients,
    ...octoberClients,
  ]
  return allClients.find((client) => client.id === id)
}

// Function to get clients by area - فقط العملاء الحقيقيين
export const getClientsByArea = (areaId: number): Client[] => {
  if (areaId === 1) {
    return sheikhZayedClients
  }
  if (areaId === 2) {
    return allNewCairoClients
  }
  if (areaId === 3) {
    return fifthSettlementClients
  }
  if (areaId === 4) {
    return downtownClients
  }
  if (areaId === 5) {
    return octoberClients
  }
  // For area 6 (الأقاليم) - no clients yet
  return []
}
