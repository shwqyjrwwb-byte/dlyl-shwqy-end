"use client"

import { useState } from "react"
import { 
  Search, Phone, MessageCircle, ChevronLeft, Users, Crown, Star, X,
  Briefcase, UserCog, Package, Wrench, Calculator, Hammer, 
  Lightbulb, Palette, FileText, Headphones, Sofa, FileSignature,
  TrendingUp, PhoneCall, Layers, Cog, Coffee, Zap, 
  Sparkles, Share2, Building2, Home, ClipboardList, Car
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { getJobDescription } from "@/lib/job-descriptions"

interface TeamMember {
  name: string
  position: string
  phone: string
  image?: string
}

interface Executive {
  id: string
  name: string
  position: string
  phone: string
  image: string
  rank: number
}

interface Department {
  id: string
  name: string
  manager: TeamMember | null
  team: TeamMember[]
}

// دالة لتحديد الأيقونة المناسبة لكل قسم
function getDepartmentIcon(departmentId: string) {
  const iconMap: Record<string, any> = {
    "chairman-office": Crown,
    "general-manager": Briefcase,
    "department-managers": UserCog,
    "hr": Users,
    "inventory": Package,
    "warehouse": Package,
    "storage": Package,
    "company-engineers": Building2,
    "inspections": FileText,
    "legal": FileSignature,
    "accounting": Calculator,
    "commerce": Hammer,
    "technical-office": Wrench,
    "customer-service": Headphones,
    "furniture": Sofa,
    "contracts": FileSignature,
    "sales": TrendingUp,
    "telesales": PhoneCall,
    "ceramics": Layers,
    "operations": Cog,
    "buffet": Coffee,
    "electricity-showroom": Zap,
    "paint-showroom": Palette,
    "marble-showroom": Sparkles,
    "it": Lightbulb,
    "social-media": Share2,
    "vehicles": Car,
  }
  
  return iconMap[departmentId] || Home
}

// دالة لتحديد صورة القسم (إذا كانت متوفرة)
function getDepartmentImage(departmentId: string) {
  const imageMap: Record<string, string> = {
    "accounting": "/images/accounting.png",
    "buffet": "/images/buffet.png",
    "ceramics": "/images/ceramics.png",
    "chairman-office": "/images/chairman-office.png",
    "commerce": "/images/commerce.png",
    "company-engineers": "/images/company-engineers.png",
    "contracts": "/images/contracts.png",
    "customer-service": "/images/customer-service.png",
    "department-managers": "/images/department-managers.png",
    "electricity-showroom": "/images/electricity-showroom.png",
    "furniture": "/images/furniture.png",
    "general-manager": "/images/general-manager.png",
    "hr": "/images/hr.png",
    "inspections": "/images/inspections.png",
    "it": "/images/it.png",
    "legal": "/images/legal.png",
    "marble-showroom": "/images/marble-showroom.png",
    "operations": "/images/operations.png",
    "paint-showroom": "/images/paint-showroom.png",
    "social-media": "/images/social-media.png",
    "technical-office": "/images/technical-office.png",
    "telesales": "/images/telesales.png",
    "warehouse": "/images/warehouse_workers_design.png",
    "storage": "/images/storage_workers_design.png",
    "vehicles": "/images/Car.png",
  }
  
  return imageMap[departmentId] || null
}

// دالة لتحديد لون الأيقونة لكل قسم
function getDepartmentColor(departmentId: string) {
  const colorMap: Record<string, string> = {
    "chairman-office": "text-yellow-500",
    "general-manager": "text-blue-600",
    "department-managers": "text-purple-600",
    "hr": "text-green-600",
    "inventory": "text-orange-600",
    "warehouse": "text-orange-500",
    "company-engineers": "text-indigo-600",
    "inspections": "text-cyan-600",
    "legal": "text-red-600",
    "accounting": "text-emerald-600",
    "commerce": "text-amber-700",
    "technical-office": "text-slate-600",
    "customer-service": "text-pink-600",
    "furniture": "text-rose-600",
    "contracts": "text-violet-600",
    "sales": "text-lime-600",
    "telesales": "text-teal-600",
    "ceramics": "text-sky-600",
    "operations": "text-gray-600",
    "buffet": "text-brown-600",
    "electricity-showroom": "text-yellow-600",
    "paint-showroom": "text-fuchsia-600",
    "marble-showroom": "text-purple-500",
    "it": "text-blue-500",
    "social-media": "text-pink-500",
    "vehicles": "text-red-500",
  }
  
  return colorMap[departmentId] || "text-primary"
}

const executivesData: Executive[] = [
  {
    id: "chairman",
    name: "م/ أحمد شوقي",
    position: "رئيس مجلس الإدارة",
    phone: "01111119528",
    image: "/images/ahmed-shawky.jpeg",
    rank: 1,
  },
  {
    id: "vice-chairman",
    name: "م/ إيمان",
    position: "نائب رئيس مجلس الإدارة",
    phone: "01111027766",
    image: "/images/eman.jpeg",
    rank: 2,
  },
]

const departmentsData: Department[] = [
  {
    id: "chairman-office",
    name: "مكتب م/ أحمد شوقي وم/ إيمان",
    manager: {
      name: "ملك رؤوف",
      position: "مديرة مكتب م/ أحمد شوقي",
      phone: "01114822498",
      image: "/images/malak-abdelraouf.jpeg",
    },
    team: [],
  },
  {
    id: "general-manager",
    name: "الإدارة العامة",
    manager: {
      name: "محمد حسن",
      position: "المدير العام",
      phone: "1145511776",
      image: "/images/mohamed-hosny.jpeg",
    },
    team: [],
  },
  {
    id: "department-managers",
    name: "مديرين البنود",
    manager: null,
    team: [
      {
        name: "م/ محمود عبد الغني (أفندينا)",
        position: "مدير قسم الجبس بورد والرخام",
        phone: "1278861380",
        image: "/images/placeholder.jpg",
      },
      {
        name: "م/ محمد شوقي",
        position: "مدير قسم النجارة",
        phone: "1282593311",
        image: "/images/mohamed-shawky-manager.jpeg",
      },
      {
        name: "م/ محمد نجيب",
        position: "مدير بند الكهرباء",
        phone: "1114726955",
        image: "/images/mohamed-naguib.jpeg",
      },
      {
        name: "م/ أحمد عبد الباسط",
        position: "مدير بند السيراميك",
        phone: "1115706597",
        image: "/images/ahmed-abdelbaset.jpeg",
      },
      {
        name: "م/ محمد يوسف",
        position: "مدير التكيفات والتوريدات",
        phone: "1000766726",
        image: "/images/محمد يوسف.jpeg",
      },
      {
        name: "م/ أحمد عبد الغني",
        position: "مدير بند توريدات الكهرباء",
        phone: "1115706597",
        image: "/images/placeholder.jpg",
      },
    ],
  },
  {
    id: "hr",
    name: "الموارد البشرية (HR)",
    manager: {
      name: "محمد عبد المنعم",
      position: "مدير الموارد البشرية",
      phone: "1110800543",
      image: "/images/محمد عبد المنعم.jpg",
    },
    team: [
      {
        name: "هاجر عبد العزيز",
        position: "HR",
        phone: "1000657652",
        image: "/images/hagar-abdelaziz.jpeg",
      },
      {
        name: "هبه خالد",
        position: "HR",
        phone: "1222356988",
        image: "/images/d9-87-d8-a8-d9-87-20-d8-ae-d8-a7-d9-84-d8-af-20.jpeg",
      },
      {
        name: "عبد الرحمن فايز علي",
        position: "HR",
        phone: "1097448579",
      },
    ],
  },
  {
    id: "social-media",
    name: "السوشيال ميديا",
    manager: {
      name: "م/ مصطفى شوقي",
      position: "Social Media Manager",
      phone: "1002776674",
      image: "/images/مصطفي شوقي.jpg",
    },
    team: [
      {
        name: "أحمد عبد الغني (كيتا)",
        position: "Deputy Manager",
        phone: "1110800526",
        image: "/images/759961a8-b0be-43a2-b865-c99b1558d588.jpeg",
      },
      {
        name: "اشرف ذكي",
        position: "Producer - Photographer",
        phone: "1103827701",
        image: "/images/ashraf-zaki-new.jpeg",
      },
      {
        name: "انس عاطف محمد",
        position: "Producer",
        phone: "1112340773",
        image: "/images/anas-atef-new.jpeg",
      },
      {
        name: "محمود علاء انصاري",
        position: "Moderator",
        phone: "1120010618",
        image: "/images/367a7b04-cef9-4944-88b4-a8c098c99fa2.jpeg",
      },
      {
        name: "عمر عبدين",
        position: "AI Developer",
        phone: "1030435987",
        image: "/images/غمر عبدين.webp",
      },
      {
        name: "مؤمن مصطفى",
        position: "Content Creator",
        phone: "1122587005",
        image: "/images/مؤمن مصطفي.jpeg",
      },
    ],
  },
  {
    id: "warehouse",
    name: "عمال المخازن",
    manager: null,
    team: [
      {
        name: "شريف فوزي",
        position: "عامل مخزن",
        phone: "01110923918",
      },
      {
        name: "رجب اشرف رجب",
        position: "عامل مخزن",
        phone: "01141678678",
      },
      {
        name: "جمال عبد التواب",
        position: "عامل مخزن",
        phone: "01129191898",
      },
      {
        name: "محمد عادل",
        position: "عامل مخزن",
        phone: "01143790448",
      },
      {
        name: "محمد سيد",
        position: "عامل مخزن",
        phone: "01274129404",
      },
      {
        name: "احمد علي",
        position: "عامل مخزن",
        phone: "01107645342",
      },
      {
        name: "محمد سامي",
        position: "عامل مخزن",
        phone: "01121711869",
      },
      {
        name: "عصام",
        position: "عامل مخزن",
        phone: "01010239983",
      },
      {
        name: "محمود حمودي",
        position: "عامل مخزن",
        phone: "01030102935",
      },
    ],
  },
  {
    id: "storage",
    name: "عمال التشوينات",
    manager: null,
    team: [
      {
        name: "رمضان جمعه",
        position: "عامل تشوينات",
        phone: "01115229595",
      },
      {
        name: "محمد رجب مخلوف",
        position: "عامل تشوينات",
        phone: "01024458265",
      },
      {
        name: "سيد جمعه",
        position: "عامل تشوينات",
        phone: "01126692929",
      },
      {
        name: "علي محمد الاسيوطي",
        position: "عامل تشوينات",
        phone: "01044560929",
      },
      {
        name: "جمال جمعه",
        position: "عامل تشوينات",
        phone: "01148194438",
      },
      {
        name: "عبد الرحمن عبد الرازق",
        position: "عامل تشوينات",
        phone: "01151172639",
      },
      {
        name: "محمود شعبان",
        position: "عامل تشوينات",
        phone: "01064874917",
      },
      {
        name: "اشرف جمال",
        position: "عامل تشوينات",
        phone: "01100088077",
      },
      {
        name: "علي رجب",
        position: "عامل تشوينات",
        phone: "01111224396",
      },
      {
        name: "عبد الرحمن احمد",
        position: "عامل تشوينات",
        phone: "01144990846",
      },
      {
        name: "بطل محمد",
        position: "عامل تشوينات",
        phone: "01147166287",
      },
      {
        name: "طه الغفير",
        position: "حارس الفيلا",
        phone: "01157604240",
      },
      {
        name: "محمد ربيع",
        position: "عامل تشوينات",
        phone: "01148011180",
      },
    ],
  },
  {
    id: "company-engineers",
    name: "مهندسين الشركة",
    manager: null,
    team: [
      // منطقة أكتوبر
      {
        name: "━━━━━━━ منطقة أكتوبر ━━━━━━━",
        position: "region-header",
        phone: "",
      },
      {
        name: "احمد حامد",
        position: "مدير منطقة أكتوبر",
        phone: "1113426815",
        image: "/images/احمد حامد.jpeg",
      },
      {
        name: "احمد رجب",
        position: "مهندس - أكتوبر",
        phone: "1118912261",
        image: "/images/احمد رجب.jpeg",
      },
      {
        name: "محمد عبيده",
        position: "مهندس - أكتوبر",
        phone: "1115690947",
        image: "/images/عبيده.jpeg",
      },
      {
        name: "احمد اشرف",
        position: "مهندس - أكتوبر",
        phone: "1113500188",
        image: "/images/احمد اشرف.jpeg",
      },
      {
        name: "محمد امين",
        position: "مهندس - أكتوبر",
        phone: "1093860050",
        image: "/images/محمد امين (اكتوبر).jpeg",
      },
      {
        name: "اسلام عادل",
        position: "مهندس - أكتوبر",
        phone: "1090044029",
      },
      {
        name: "علي",
        position: "مهندس - أكتوبر",
        phone: "1003997103",
        image: "/images/علي محمد (اكتوبر).jpeg",
      },
      
      // منطقة القاهرة الجديدة
      {
        name: "━━━━━━━ منطقة القاهرة الجديدة ━━━━━━━",
        position: "region-header",
        phone: "",
      },
      {
        name: "مصطفي كمال",
        position: "مدير منطقة القاهرة الجديدة",
        phone: "1065589130",
        image: "/images/مصطفي كمال (القاهره الجديده).jpeg",
      },
      {
        name: "مصطفي عيد",
        position: "مهندس - القاهرة الجديدة",
        phone: "1044498820",
        image: "/images/مصطفي عيد.jpeg",
      },
      {
        name: "محمد جمال",
        position: "مهندس - القاهرة الجديدة",
        phone: "1118864455",
        image: "/images/محمد جمال (المستقبل).jpeg",
      },
      {
        name: "عبدالرحمن محمد",
        position: "مهندس - القاهرة الجديدة",
        phone: "1090159043",
        image: "/images/عبدالرحمن محمد.jpeg",
      },
      
      // منطقة العاصمة الإدارية
      {
        name: "━━━━━━━ منطقة العاصمة الإدارية ━━━━━━━",
        position: "region-header",
        phone: "",
      },
      {
        name: "احمد العزبي",
        position: "مدير منطقة العاصمة الإدارية",
        phone: "1000273742",
        image: "/images/احمد العزبي.jpeg",
      },
      {
        name: "حسين فيض الله",
        position: "مهندس - العاصمة الإدارية",
        phone: "1157322922",
        image: "/images/حسين فيض.jpeg",
      },
      {
        name: "محمد اشرف",
        position: "مهندس - العاصمة الإدارية",
        phone: "1124492117",
        image: "/images/محمد اشرف.jpeg",
      },
      {
        name: "محمود محسن",
        position: "مهندس - العاصمة الإدارية",
        phone: "1022640037",
        image: "/images/محمود محسن.jpeg",
      },
      {
        name: "محمد ماهر",
        position: "مهندس - العاصمة الإدارية",
        phone: "1147629354",
        image: "/images/محمد ماهر (العاصمه).jpeg",
      },
      
      // منطقة التجمع الخامس
      {
        name: "━━━━━━━ منطقة التجمع الخامس ━━━━━━━",
        position: "region-header",
        phone: "",
      },
      {
        name: "محمد مدحت",
        position: "مدير منطقة التجمع الخامس",
        phone: "1554593094",
        image: "/images/محمد مدحت.jpeg",
      },
      {
        name: "حسام الغدور",
        position: "مهندس - التجمع الخامس",
        phone: "1224244495",
        image: "/images/حسام الغندور.jpeg",
      },
      {
        name: "كريم سامي",
        position: "مهندس - التجمع الخامس",
        phone: "1011183789",
        image: "/images/كريم سامي.jpeg",
      },
      {
        name: "محسن عبدالرازق",
        position: "مهندس - التجمع الخامس",
        phone: "1110091234",
        image: "/images/محسن عبدالرازق (التجمع).jpeg",
      },
      {
        name: "عبدالنبي مرجان",
        position: "مهندس - التجمع الخامس",
        phone: "1001334460",
        image: "/images/عبدالنبي مرجان.jpeg",
      },
      {
        name: "عماد شلبي",
        position: "مهندس - التجمع الخامس",
        phone: "1274455556",
        image: "/images/عماد شلبي.jpeg",
      },
      {
        name: "محمد غنام",
        position: "مهندس - التجمع الخامس",
        phone: "1200003089",
        image: "/images/محمد غنام.jpeg",
      },
      
      // منطقة وسط
      {
        name: "━━━━━━━ منطقة وسط ━━━━━━━",
        position: "region-header",
        phone: "",
      },
      {
        name: "احمد بسيوني",
        position: "مدير منطقة وسط",
        phone: "1126221382",
        image: "/images/احمد بسيوني.jpeg",
      },
      {
        name: "محمد محمود الجميل",
        position: "مهندس - وسط",
        phone: "1126264221",
        image: "/images/محمد الجميل.jpeg",
      },
      {
        name: "عمرو خالد",
        position: "مهندس - وسط",
        phone: "1024107025",
        image: "/images/عمرو خالد.jpeg",
      },
      {
        name: "عبدالرحمن العراقي",
        position: "مهندس - وسط",
        phone: "1148074988",
        image: "/images/عبدالرحمن العراقي.jpeg",
      },
      {
        name: "بيشوي",
        position: "مهندس - وسط",
        phone: "1147948825",
        image: "/images/بيشوي.jpeg",
      },
      
      // منطقة الأقاليم
      {
        name: "━━━━━━━ منطقة الأقاليم ━━━━━━━",
        position: "region-header",
        phone: "",
      },
      {
        name: "محمد صلاح",
        position: "مدير منطقة الأقاليم",
        phone: "1128416769",
        image: "/images/محمد صلاح.jpeg",
      },
      {
        name: "علي مختار",
        position: "مهندس - الأقاليم",
        phone: "1009602018",
        image: "/images/علي مختار الاسكندريه.jpeg",
      },
      {
        name: "احمد الشيخ (السادات)",
        position: "مهندس - الأقاليم",
        phone: "1229277915",
        image: "/images/احمد الشيخ.jpeg",
      },
      {
        name: "بيومي",
        position: "مهندس - الأقاليم",
        phone: "1007973235",
        image: "/images/بيومي.jpeg",
      },
      {
        name: "شنوده",
        position: "مهندس - الأقاليم",
        phone: "1270285129",
        image: "/images/شنوده.jpeg",
      },
      {
        name: "احمد عوض",
        position: "مهندس - الأقاليم",
        phone: "1114936377",
        image: "/images/احمد عوض.jpeg",
      },
      {
        name: "محمد عبدالعظيم",
        position: "مهندس - الأقاليم",
        phone: "1009020263",
        image: "/images/محمد عبدالعظيم.jpeg",
      },
      {
        name: "محمود ابو زيد",
        position: "مهندس - الأقاليم",
        phone: "1140479394",
        image: "/images/محمود ابو زيد.jpeg",
      },
      
      // قسم الجودة
      {
        name: "━━━━━━━ قسم الجودة ━━━━━━━",
        position: "region-header",
        phone: "",
      },
      {
        name: "محمود اسماعيل",
        position: "مدير الجودة",
        phone: "1113121549",
        image: "/images/محمود اسماعيل.jpeg",
      },
      {
        name: "شادي مظهر",
        position: "مهندس جودة",
        phone: "1156704637",
        image: "/images/شادي.jpeg",
      },
    ],
  },
  {
    id: "inspections",
    name: "المعاينات / المشتريات",
    manager: {
      name: "مؤمن يسري",
      position: "مسئول الخدمات / المشتريات",
      phone: "1155293383",
      image: "/images/d9-85-d9-88-d9-85-d9-86-20-d9-8a-d8-b3-d8-b1-d9-8a.jpeg",
    },
    team: [],
  },
  {
    id: "legal",
    name: "الشؤون القانونية",
    manager: {
      name: "المستشار عمرو عبد الله",
      position: "مدير الإدارة القانونية",
      phone: "1112088704",
      image: "/images/dr-amr.jpeg",
    },
    team: [
      {
        name: "محمود غريب",
        position: "شؤون قانونية",
        phone: "1143734095",
        image: "/images/محمود غريب.jpeg",
      },
    ],
  },
  {
    id: "accounting",
    name: "الحسابات",
    manager: {
      name: "وائل رأفت أمين",
      position: "مدير الحسابات",
      phone: "1103660739",
      image: "/images/wael-rafat-updated.jpeg",
    },
    team: [
      // الإدارة المالية
      {
        name: "راضي شحاته",
        position: "أمين خزينة - الإدارة المالية",
        phone: "1278864533",
        image: "/images/rady-shehata.jpeg",
      },
      {
        name: "مي عصام عبد العزيز",
        position: "محاسبة - الإدارة المالية",
        phone: "1223925721",
        image: "/images/مي عصام.jpeg",
      },
      {
        name: "خالد محي الدين عبد القادر",
        position: "محاسب - الإدارة المالية",
        phone: "1121296258",
        image: "/images/خالد محي.jpeg",
      },
      {
        name: "خالد عاطف عبد الغني محمد",
        position: "محاسب مخزن - الإدارة المالية",
        phone: "1287329792",
        image: "/images/خالد عاطف.jpeg",
      },
      {
        name: "هبه توفيق",
        position: "مسئولة تحويلات العهد والتشوينات - الإدارة المالية",
        phone: "1151183223",
        image: "/images/heba-tawfik.jpeg",
      },
      // حسابات عملاء
      {
        name: "كريم عاطف",
        position: "مدير قسم حسابات العملاء",
        phone: "1114922582",
        image: "/images/karim-atef.jpeg",
      },
      {
        name: "حسناء عماد",
        position: "مسئول إضافات - حسابات عملاء",
        phone: "1273544901",
        image: "/images/hasnaa-emad-new.jpeg",
      },
      {
        name: "عبد الله عصام",
        position: "مسئول إضافات - حسابات عملاء",
        phone: "1110672999",
        image: "/images/abdullah-essam.jpeg",
      },
      {
        name: "محمد سالم صلاح الدين",
        position: "مسئول إضافات - حسابات عملاء",
        phone: "1515494073",
        image: "/images/mohamed-salem-updated.jpeg",
      },
    ],
  },
  {
    id: "commerce",
    name: "النجارة",
    manager: {
      name: "محمد شوقي",
      position: "مدير قسم الخشب",
      phone: "1282593311",
      image: "/images/mohamed-shawky-manager.jpeg",
    },
    team: [
      {
        name: "أشرف صابر",
        position: "جودة نجارة",
        phone: "1222165846",
        image: "/images/ashraf-saber-new.jpeg",
      },
      {
        name: "إسراء جلال",
        position: "مسئول معرض الأثاث / سكرتيرة",
        phone: "1282594811",
        image: "/images/اسراء جلال.jpeg",
      },
      {
        name: "هبه أبو المجد",
        position: "سكرتيرة محمد شوقي",
        phone: "1103827704",
        image: "/images/heba-abo-elmagd.jpeg",
      },
      {
        name: "بسمله زكي عزت السعيد",
        position: "خدمة عملاء النجارة",
        phone: "1282101122",
        image: "/images/basmala-real.jpeg",
      },
      {
        name: "محمود هشام محمود نجاتي",
        position: "محاسب قسم النجارة",
        phone: "1278861380",
        image: "/images/mahmoud-hesham.jpeg",
      },
      {
        name: "عبد الرحمن البحري",
        position: "سواق",
        phone: "1272705524",
        image: "/images/عبد الرحمان البحري سواق.jpeg",
      },
      {
        name: "هشام مجدي كمال",
        position: "محاسب قسم النجارة",
        phone: "1152253329",
        image: "/images/هشام مجدي حسبات.jpeg",
      },
      {
        name: "أحمد حسن مصطفى حسن عبده",
        position: "مهندس نجارة",
        phone: "1149466551",
        image: "/images/d9-85-d8-a7-d8-ad-d9-85-d8-af-20-d8-ad-d8-b3-d9-86-20.jpeg",
      },
      {
        name: "هدير محمود محمد",
        position: "تصميمات النجارة",
        phone: "1159259055",
        image: "/images/d9-85-d9-87-d8-af-d9-8a-d8-b1-20-d9-85-d8-ad-d9-85-d9-88-d8-af-20.jpeg",
      },
      {
        name: "عبد المنعم يحيى عبد المنعم",
        position: "مسئول قسم النجارة",
        phone: "1009788530",
        image: "/images/abdelmoneam.jpeg",
      },
      {
        name: "حسن محمود عبد الحميد",
        position: "نجار",
        phone: "1226621041",
        image: "/images/hassan-mahmoud-new.jpeg",
      },
      {
        name: "عبد الرحمن هشام",
        position: "عامل النجارة",
        phone: "1281250312",
      },
      {
        name: "عمرو هشام محمد",
        position: "عامل مصنع النجارة",
        phone: "1127148438",
        image: "/images/عمرو هشام.jpeg",
      },
      {
        name: "محمد أبو النجا",
        position: "مهندس بقسم النجارة",
        phone: "0000000000",
        image: "/images/مهندس محمد ابو النجا.jpeg",
      },
      {
        name: "هشام فهمي",
        position: "مهندس بقسم النجارة",
        phone: "0000000000",
        image: "/images/هشام فاهمي.jpeg",
      },
      {
        name: "ياسمين",
        position: "سكرتيرة نجارة",
        phone: "01142677399",
        image: "/images/placeholder.jpg",
      },
    ],
  },
  {
    id: "technical-office",
    name: "المكتب الفني",
    manager: {
      name: "إسلام خالد",
      position: "مدير المكتب الفني",
      phone: "1156679887",
      image: "/images/placeholder.jpg",
    },
    team: [
      {
        name: "يارا يسري شعبان",
        position: "مهندسة مكتب فني",
        phone: "1103997506",
        image: "/images/d9-85-20-d9-8a-d8-a7-d8-b1-d8-a7-20-d9-8a-d8-b3-d8-b1-d9-8a.jpeg",
      },
      {
        name: "سارة أحمد محمد أحمد",
        position: "مهندس مكتب فني",
        phone: "1282101181",
        image: "/images/sara-ahmed.jpeg",
      },
      {
        name: "كيرلس زكريا غطاس عوض",
        position: "مهندس مكتب فني",
        phone: "1100411913",
        image: "/images/d9-85-20-d9-83-d8-b1-d9-88-d9-84-d8-b3.jpeg",
      },
      {
        name: "آيه نعيم أنور محمود",
        position: "مهندس مكتب فني",
        phone: "1110800548",
        image: "/images/d9-85-20-d8-a7-d9-8a-d9-87-20-d9-86-d8-b9-d9-8a-d9-85-20.jpeg",
      },
      {
        name: "فرح تامر محمد",
        position: "مهندس مكتب فني",
        phone: "1115473346",
        image: "/images/d9-85-d9-81-d8-b1-d8-ad-20-d8-aa-d8-a7-d9-85-d8-b1.jpeg",
      },
      {
        name: "عبد الله رضا محمد عبد العزيز",
        position: "مهندس مكتب فني",
        phone: "1200119496",
        image: "/images/عبد الله رضا.jpeg",
      },
      {
        name: "مريم يوسف",
        position: "مهندسة مكتب فني",
        phone: "1501593289",
        image: "/images/مريم يوسف.jpeg",
      },
      {
        name: "م/ ايناس",
        position: "مهندسة مكتب فني",
        phone: "01208097317",
        image: "/images/placeholder.jpg",
      },
      {
        name: "م/ اسماء",
        position: "مهندسة مكتب فني",
        phone: "01142960514",
        image: "/images/placeholder.jpg",
      },
    ],
  },
  {
    id: "customer-service",
    name: "خدمة العملاء",
    manager: {
      name: "بسنت عنتر",
      position: "مديرة خدمة العملاء",
      phone: "1278864603",
      image: "/images/basmala-new.jpeg",
    },
    team: [
      {
        name: "اسماء محمد عبد العليم",
        position: "خدمه عملاء العاصمة",
        phone: "1110800518",
        image: "/images/d8-a7-d8-b3-d9-85-d8-a7-d8-a1-20-d8-b9-d8-a8-d8-af-d8-a7-d9-84-d8-b9-d9-84-d9-8a-d9-85.jpeg",
      },
      {
        name: "دعاء جمال عبد المنعم",
        position: "خدمة عملاء القاهرة الجديدة",
        phone: "1115841543",
        image: "/images/doaa-gamal.jpeg",
      },
      {
        name: "يوسف مجدي محرم",
        position: "خدمة عملاء التجمع",
        phone: "1200119629",
        image: "/images/d9-8a-d9-88-d8-b3-d9-81-20-d9-85-d8-ac-d8-af-d9-8a.jpeg",
      },
      {
        name: "ايات حامد حسن علي",
        position: "خدمه عملاء",
        phone: "1273504072",
        image: "/images/d8-a7-d9-8a-d8-a7-d8-aa-20-d8-ad-d8-a7-d9-85-d8-af.jpeg",
      },
    ],
  },
  {
    id: "furniture",
    name: "الفرش والديكور",
    manager: {
      name: "م/ أحمد عبد الغني",
      position: "مدير قسم الفرش",
      phone: "1115706597",
      image: "/images/placeholder.jpg",
    },
    team: [
      {
        name: "ندى عمرو محمد",
        position: "مهندسة بقسم الفرش والديكور",
        phone: "1278864759",
        image: "/images/nada-amr.jpeg",
      },
      {
        name: "أسماء حسين",
        position: "مسؤولة بند التكيفات",
        phone: "1278865758",
        image: "/images/مهندسه اسماء حسين.jpeg",
      },
      {
        name: "سعيد سمير عبد العزيز علي",
        position: "مسؤل بند المشتريات الكهربي",
        phone: "1115086941",
        image: "/images/saeed-samir.jpeg",
      },
    ],
  },
  {
    id: "contracts",
    name: "التعاقدات",
    manager: {
      name: "حبيبه منصور",
      position: "Team Leader",
      phone: "1222367635",
      image: "/images/حبيبه منصور.jfif",
    },
    team: [
      {
        name: "هدير خالد",
        position: "مسئولة تعاقدات",
        phone: "1110800534",
        image: "/images/هدير خالد.jfif",
      },
      {
        name: "رنا وحيد",
        position: "موظفة مبيعات",
        phone: "1222630606",
        image: "/images/rana-waheed.jpeg",
      },
      {
        name: "نيفين عيد محمد",
        position: "موظفة مبيعات",
        phone: "1273545667",
        image: "/images/neveen.jpeg",
      },
      {
        name: "يوسف علاء محمد عبد الهادي",
        position: "موظف مبيعات",
        phone: "1222620606",
        image: "/images/youssef-ola.jpeg",
      },
      {
        name: "ملك خالد خليل",
        position: "موظفة مبيعات",
        phone: "1278863141",
        image: "/images/ملك خالد.jpeg",
      },
      {
        name: "عبد الرحمن عنتر",
        position: "موظف مبيعات",
        phone: "1148827729",
        image: "/images/عبد الرحمن عنتر.jfif",
      },
      {
        name: "محمد مصطفى",
        position: "موظف مبيعات",
        phone: "",
      },
    ],
  },
  {
    id: "telesales",
    name: "تلي سيلز",
    manager: null,
    team: [
      {
        name: "ندى حامد سعيد حامد",
        position: "موظفة تلي سيلز",
        phone: "1278864748",
        image:
          "/images/d9-86-d8-af-d9-8a-20-d8-ad-d8-a7-d9-85-d8-af-20-d8-aa-d9-84-d9-8a-20-d8-b3-d9-8a-d9-84-d8-b2.jpeg",
      },
      {
        name: "محمد عزب عرب محمد السيد",
        position: "تلي سيلز",
        phone: "1032654499",
        image: "/images/mohamed-azab-updated.jpeg",
      },
      {
        name: "فاطمه راضي أحمد صادق",
        position: "تلي سيلز",
        phone: "1155402956",
        image: "/images/fatma-rady.jpeg",
      },
    ],
  },
  {
    id: "ceramics",
    name: "السيراميك",
    manager: {
      name: "محمد يحيي عبدالحميد عبد الرازق",
      position: "مسؤول قسم السيراميك",
      phone: "1101946616",
      image: "/images/mohamed-yahya.jpeg",
    },
    team: [
      {
        name: "امنيه مصطفى",
        position: "منسق سيراميك",
        phone: "1110800552",
        image: "/images/omnia-mostafa-new.jpeg",
      },
      {
        name: "محمد يسري",
        position: "منسق سيراميك",
        phone: "1101605351",
        image: "/images/mohamed-yosry.jpeg",
      },
    ],
  },
  {
    id: "operations",
    name: "التشغيل",
    manager: {
      name: "محمد سعيد محمد",
      position: "مدير قسم التشغيل (وسط - أكتوبر - أقاليم)",
      phone: "1278865930",
      image: "/images/mohamed-saeed.jpeg",
    },
    team: [
      {
        name: "م/ سامح عبد الصبور",
        position: "مدير مشاريع (العاصمة - القاهرة الجديدة - التجمع)",
        phone: "1278864735",
        image: "/images/sameh-abdelsabour.jpeg",
      },
      {
        name: "اسامة حمدي أحمد ابراهيم",
        position: "مسئول مقاولين",
        phone: "1110800523",
        image: "/images/osama-hamdy-new.jpeg",
      },
      {
        name: "احمد خالد",
        position: "مسئول مقاولين (العاصمة - القاهرة الجديدة - التجمع)",
        phone: "1115612784",
        image: "/images/d8-a7-d8-ad-d9-85-d8-af-20-d8-ae-d8-a7-d9-84-d8-af.jpeg",
      },
      {
        name: "م/ ايهاب",
        position: "مدير تشغيل",
        phone: "01111291411",
        image: "/images/placeholder.jpg",
      },
    ],
  },
  {
    id: "buffet",
    name: "البوفيه",
    manager: {
      name: "حسام اشرف فرج احمد",
      position: "مسئول البوفيه",
      phone: "1097836360",
      image: "/images/d8-ad-d8-b3-d8-a7-d9-85-20-d8-a7-d8-b4-d8-b1-d9-81.jpeg",
    },
    team: [
      {
        name: "حنان عباس",
        position: "بوفيه",
        phone: "1100088455",
        image: "/images/حنان بوفيه.jpeg",
      },
    ],
  },
  {
    id: "electricity-showroom",
    name: "معرض الكهرباء",
    manager: {
      name: "محمد محمد عبد العليم",
      position: "مسئول معرض الكهرباء",
      phone: "1153767222",
      image: "/images/mohamed-abdelhalim.jpeg",
    },
    team: [],
  },
  {
    id: "paint-showroom",
    name: "معرض الدهانات",
    manager: {
      name: "محمود علي",
      position: "مسئول معرض الدهانات",
      phone: "1212093894",
    },
    team: [],
  },
  {
    id: "marble-showroom",
    name: "معرض الرخام والجبس بورد",
    manager: {
      name: "م/ محمود عبد الغني (أفندينا)",
      position: "مدير قسم الرخام والجبس بورد",
      phone: "1278861380",
      image: "/images/م محمود عبد الغني (أفندينا).jpg",
    },
    team: [],
  },
  {
    id: "it",
    name: "تكنولوجيا المعلومات (IT)",
    manager: {
      name: "م/ أحمد أبو السعود",
      position: "مدير تكنولوجيا المعلومات",
      phone: "01158444748",
      image: "/images/ahmed-abu-alsoud-it.jpeg",
    },
    team: [
      {
        name: "م/ ايهاب حمدي احمد محمد",
        position: "مهندس IT",
        phone: "0000000000",
      },
    ],
  },
  {
    id: "vehicles",
    name: "السيارات",
    manager: {
      name: "عزام",
      position: "مسؤول السيارات",
      phone: "01111108751",
      image: "/images/azzam.jpeg",
    },
    team: [
      {
        name: "سيارة العاصمة الإدارية",
        position: "سيارة رمادي - العاصمة الإدارية",
        phone: "01100412308",
        image: "/images/car-capital.jpeg",
      },
      {
        name: "سيارة القاهرة الجديدة",
        position: "سيارة خضراء - القاهرة الجديدة",
        phone: "01114922438",
        image: "/images/car-tagamoa.jpeg",
      },
      {
        name: "سيارة التجمع الخامس",
        position: "سيارة بيضاء 2024 - التجمع الخامس",
        phone: "01114922576",
        image: "/images/car-newcairo..jpeg",
      },
      {
        name: "سيارة وسط",
        position: "سيارة بيضاء 2024 - وسط",
        phone: "01114922576",
        image: "/images/car-downtow.jpeg",
      },
      {
        name: "سيارة أكتوبر",
        position: "سيارة حمراء - أكتوبر",
        phone: "01154422084",
        image: "/images/car-october.jpeg",
      },
      {
        name: "سيارة الأقاليم",
        position: "سيارة بيضاء - الأقاليم",
        phone: "01272705524",
        image: "/images/car-regions.jpeg",
      },
    ],
  },
  {
    id: "commerce",
    name: "التجارة",
    manager: null,
    team: [
      {
        name: "مينا",
        position: "قسم التجارة",
        phone: "01282985986",
        image: "/images/placeholder.jpg",
      },
    ],
  },
]

// بطاقة القيادة التنفيذية المتقلبة
function ExecutiveFlipCard() {
  const [isFlipped, setIsFlipped] = useState(false)
  
  return (
    <div 
      className="relative w-full h-[500px] perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* الوجه الأمامي - الصورة */}
        <Card className="absolute inset-0 backface-hidden overflow-hidden">
          <div className="relative w-full h-full bg-gradient-to-br from-gray-50 to-gray-100">
            <Image
              src="/images/executive-leadership.png"
              alt="القيادة التنفيذية"
              fill
              className="object-contain"
              sizes="600px"
              priority
            />
          </div>
        </Card>

        {/* الوجه الخلفي */}
        <Card className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-primary/20 to-card border-primary/40 p-8 overflow-y-auto">
          <div className="space-y-8">
            {executivesData.map((exec) => (
              <div key={exec.id} className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border-2 border-primary/30">
                <div className="flex flex-col items-center gap-6 mb-6">
                  {/* صورة القيادة - كبيرة وواضحة */}
                  <div className="relative w-48 h-48 rounded-3xl overflow-hidden bg-muted shadow-2xl ring-8 ring-amber-500/50 flex-shrink-0">
                    <Image
                      src={exec.image}
                      alt={exec.name}
                      fill
                      className="object-scale-down p-4"
                      sizes="192px"
                      priority
                    />
                  </div>
                  <div className="text-center">
                    <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-black text-base px-6 py-2 mb-3 shadow-lg">
                      {exec.rank === 1 ? "رئيس مجلس الإدارة" : "نائب رئيس مجلس الإدارة"}
                    </Badge>
                    <h3 className="text-3xl font-black text-primary mb-2">{exec.name}</h3>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-3 text-xl font-mono bg-gradient-to-r from-secondary/50 to-secondary/30 px-6 py-4 rounded-2xl mb-6 border-2 border-primary/20 shadow-lg">
                  <Phone className="w-6 h-6 text-primary" />
                  <span className="font-black tracking-wider" dir="ltr">{exec.phone}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white gap-3 py-6 text-lg font-black shadow-xl" asChild>
                    <a href={`tel:+20${exec.phone}`}>
                      <Phone className="w-5 h-5" />
                      اتصال
                    </a>
                  </Button>
                  <Button size="lg" className="bg-[#25D366] hover:bg-[#20BA5A] text-white gap-3 py-6 text-lg font-black shadow-xl" asChild>
                    <a href={`https://wa.me/20${exec.phone}`} target="_blank" rel="noreferrer">
                      <MessageCircle className="w-5 h-5" />
                      واتساب
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

function ContactCard({
  member,
  isManager = false,
  onClick,
}: { member: TeamMember; isManager?: boolean; onClick: () => void }) {
  const [imageError, setImageError] = useState(false)
  
  return (
    <div
      onClick={onClick}
      className="bg-card border-2 border-border rounded-2xl hover:border-primary/50 transition-all p-3 sm:p-4 md:p-6 cursor-pointer hover:shadow-2xl hover:shadow-primary/20 hover:scale-[1.02] sm:hover:scale-[1.03] duration-300"
    >
      <div className="flex flex-col items-center text-center gap-2 sm:gap-3 md:gap-4">
        {/* صورة الموظف - متجاوبة */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden flex-shrink-0 bg-muted shadow-2xl ring-2 sm:ring-3 md:ring-4 ring-primary/30 hover:ring-primary/50 transition-all">
          {member.image && !imageError ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-scale-down p-1 sm:p-2"
              sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, 160px"
              onError={() => setImageError(true)}
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary via-primary/80 to-primary/60 text-primary-foreground font-black text-4xl sm:text-5xl md:text-6xl shadow-inner">
              {member.name.charAt(0)}
            </div>
          )}
          {isManager && (
            <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-yellow-500 p-1 sm:p-2 rounded-full shadow-xl animate-pulse">
              <Crown className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
            </div>
          )}
        </div>
        
        {/* معلومات الموظف */}
        <div className="w-full space-y-2 sm:space-y-3">
          <div>
            <h4 className="font-black text-foreground text-base sm:text-lg md:text-xl mb-1 leading-tight break-words">{member.name}</h4>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground font-semibold leading-snug break-words">{member.position}</p>
          </div>
          
          {/* رقم الهاتف */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base font-mono bg-gradient-to-r from-secondary/40 to-secondary/20 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-xl border border-primary/20">
            <Phone className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
            <span className="font-bold tracking-wider" dir="ltr">{member.phone}</span>
          </div>
          
          {/* أزرار التواصل */}
          <div className="flex gap-1.5 sm:gap-2">
            <a
              href={`tel:+20${member.phone}`}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 sm:py-2.5 md:py-3 px-2 sm:px-3 md:px-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-1 sm:gap-2 font-bold text-xs sm:text-sm md:text-base"
              title="اتصال"
            >
              <Phone className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
              <span className="hidden xs:inline">اتصال</span>
            </a>
            <a
              href={`https://wa.me/20${member.phone}`}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 bg-[#25D366] hover:bg-[#20BA5A] text-white py-2 sm:py-2.5 md:py-3 px-2 sm:px-3 md:px-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-1 sm:gap-2 font-bold text-xs sm:text-sm md:text-base"
              title="واتساب"
            >
              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
              <span className="hidden xs:inline">واتساب</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function EmployeeModal({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  const [imageError, setImageError] = useState(false)
  
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-2 sm:p-4" onClick={onClose}>
      <div
        className="bg-card rounded-2xl sm:rounded-3xl shadow-2xl max-w-lg w-full max-h-[95vh] overflow-y-auto animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 p-6 sm:p-8 md:p-10">
          <button
            onClick={onClose}
            className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-background/90 hover:bg-background rounded-full p-2 sm:p-3 transition-all shadow-xl hover:scale-110"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6">
            {/* صورة الموظف - متجاوبة */}
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-2xl sm:rounded-3xl overflow-hidden bg-muted shadow-2xl ring-4 sm:ring-6 md:ring-8 ring-background hover:ring-primary/50 transition-all">
              {member.image && !imageError ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-scale-down p-2 sm:p-3 md:p-4"
                  sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, 224px"
                  onError={() => setImageError(true)}
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary via-primary/80 to-primary/60 text-primary-foreground font-black text-6xl sm:text-7xl md:text-8xl shadow-inner">
                  {member.name.charAt(0)}
                </div>
              )}
            </div>

            <div className="text-center space-y-2 sm:space-y-3">
              <h3 className="text-2xl sm:text-2xl md:text-3xl font-black text-foreground leading-tight break-words px-2">{member.name}</h3>
              <p className="text-base sm:text-lg text-muted-foreground font-bold px-4 sm:px-6 py-2 bg-white/50 rounded-xl break-words">{member.position}</p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5 md:space-y-6">
          {/* الوصف الوظيفي */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary/30 rounded-2xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="bg-primary/20 p-3 rounded-xl">
                <ClipboardList className="w-6 h-6 text-primary flex-shrink-0" />
              </div>
              <div className="flex-1">
                <p className="text-base font-black text-primary mb-3">الوصف الوظيفي</p>
                <p className="text-base text-muted-foreground leading-relaxed font-medium">
                  {getJobDescription(member.position)}
                </p>
              </div>
            </div>
          </div>

          {/* رقم الهاتف */}
          <div className="bg-gradient-to-r from-secondary/30 to-secondary/10 rounded-2xl p-6 text-center border-2 border-secondary shadow-lg">
            <p className="text-sm text-muted-foreground font-bold mb-3">رقم الهاتف</p>
            <div className="flex items-center justify-center gap-3">
              <Phone className="w-6 h-6 text-primary" />
              <span className="text-3xl font-black font-mono tracking-wider" dir="ltr">{member.phone}</span>
            </div>
          </div>

          {/* أزرار التواصل */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white gap-3 py-7 text-lg font-black shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              asChild
            >
              <a href={`tel:+20${member.phone}`}>
                <Phone className="w-6 h-6" />
                اتصال مباشر
              </a>
            </Button>
            <Button
              size="lg"
              className="bg-[#25D366] hover:bg-[#20BA5A] text-white gap-3 py-7 text-lg font-black shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              asChild
            >
              <a href={`https://wa.me/20${member.phone}`} target="_blank" rel="noreferrer">
                <MessageCircle className="w-6 h-6" />
                واتساب
              </a>
            </Button>
          </div>

          <Button
            variant="outline"
            className="w-full py-6 text-lg font-bold border-2"
            onClick={onClose}
          >
            إغلاق
          </Button>
        </div>
      </div>
    </div>
  )
}

export function ContactsTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  const filteredDepartments = departmentsData.filter((dept) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    if (dept.name.toLowerCase().includes(query)) return true
    if (dept.manager?.name.toLowerCase().includes(query)) return true
    if (dept.team.some((m) => m.name.toLowerCase().includes(query) || m.position.toLowerCase().includes(query)))
      return true
    return false
  })

  const filteredExecutives = executivesData.filter((exec) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return exec.name.toLowerCase().includes(query) || exec.position.toLowerCase().includes(query)
  })

  const currentDepartment = selectedDepartment ? departmentsData.find((d) => d.id === selectedDepartment) : null

  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 relative">
      {/* Header */}
      <div className="text-center mb-10 relative">
        {/* بانر رمضاني احترافي */}
        <div className="mb-8 p-8 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 rounded-3xl shadow-2xl relative overflow-hidden">
          {/* خلفية زخرفية */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 text-9xl">🌙</div>
            <div className="absolute bottom-0 right-0 text-9xl">🏮</div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-5xl animate-pulse">🌙</span>
              <h2 className="text-4xl font-bold text-white drop-shadow-2xl">
                رمضان كريم
              </h2>
              <span className="text-5xl animate-pulse">✨</span>
            </div>
            <p className="text-white text-xl font-semibold drop-shadow-lg">
              كل عام وأنتم بخير
            </p>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
          <Phone className="w-10 h-10 text-primary" />
          دليل جهات الاتصال
        </h1>
        <p className="text-muted-foreground text-lg">تواصل مع فريق العمل بسهولة</p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
          <Input
            placeholder="ابحث عن موظف، قسم، أو منصب..."
            className="pr-14 text-right bg-card border-2 border-border hover:border-primary/50 focus:border-primary transition-colors h-14 text-lg shadow-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {!selectedDepartment ? (
        <>
          {/* Executives Section */}
          {filteredExecutives.length > 0 && (
            <section className="mb-16 relative">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="h-1 w-12 bg-primary rounded"></div>
                <Star className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold text-foreground">القيادة التنفيذية</h2>
                <Star className="w-8 h-8 text-primary" />
                <div className="h-1 w-12 bg-primary rounded"></div>
              </div>
              <div className="max-w-2xl mx-auto">
                <ExecutiveFlipCard />
              </div>
            </section>
          )}

          {/* Departments Grid */}
          <section className="relative">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-1 w-12 bg-primary rounded"></div>
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">الأقسام والإدارات</h2>
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              <div className="h-1 w-12 bg-primary rounded"></div>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              {filteredDepartments.map((dept) => {
                const DeptIcon = getDepartmentIcon(dept.id)
                const iconColor = getDepartmentColor(dept.id)
                const deptImage = getDepartmentImage(dept.id)
                
                return (
                  <Card
                    key={dept.id}
                    className="group relative p-0 cursor-pointer hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/20 hover:scale-105 duration-300 overflow-hidden h-48"
                    onClick={() => setSelectedDepartment(dept.id)}
                  >
                    {/* الصورة كخلفية */}
                    {deptImage ? (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100">
                        <Image
                          src={deptImage}
                          alt={dept.name}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-card to-card/50" />
                    )}
                    
                    {/* المحتوى */}
                    <div className="relative h-full p-6 flex flex-col justify-between">
                      {/* السهم */}
                      <div className="flex items-center justify-end">
                        <ChevronLeft className={`w-6 h-6 ${deptImage ? 'text-primary bg-white/90 rounded-full p-1 shadow-lg' : 'text-primary'} group-hover:translate-x-1 transition-transform duration-300`} />
                      </div>
                      
                      {/* معلومات القسم - فقط للبطاقات بدون صور */}
                      {!deptImage && (
                        <div>
                          <h3 className="font-bold text-xl mb-3 group-hover:scale-105 transition-all duration-300 text-foreground group-hover:text-primary">
                            {dept.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="w-4 h-4" />
                            <span className="font-semibold">{dept.team.length + (dept.manager ? 1 : 0)} موظف</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                )
              })}
            </div>
          </section>
        </>
      ) : (
        /* Department Detail View */
        <div>
          <Button 
            variant="outline" 
            size="lg"
            className="mb-8 gap-2 hover:bg-primary hover:text-primary-foreground transition-colors shadow-md" 
            onClick={() => setSelectedDepartment(null)}
          >
            <ChevronLeft className="w-5 h-5 rotate-180" />
            العودة للأقسام
          </Button>

          {currentDepartment && (
            <div>
              <div className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-xl p-8 mb-8 shadow-lg border border-primary/20">
                <div className="flex items-center gap-4 mb-4">
                  {(() => {
                    const DeptIcon = getDepartmentIcon(currentDepartment.id)
                    const iconColor = getDepartmentColor(currentDepartment.id)
                    const deptImage = getDepartmentImage(currentDepartment.id)
                    return (
                      <div className={`p-4 rounded-xl bg-white/50 backdrop-blur-sm ${deptImage ? 'p-0 overflow-hidden' : ''}`}>
                        {deptImage ? (
                          <div className="relative w-20 h-20">
                            <Image
                              src={deptImage}
                              alt={currentDepartment.name}
                              fill
                              className="object-cover rounded-xl"
                              sizes="80px"
                            />
                          </div>
                        ) : (
                          <DeptIcon className={`w-10 h-10 ${iconColor}`} />
                        )}
                      </div>
                    )
                  })()}
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-2">{currentDepartment.name}</h2>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      {currentDepartment.team.length + (currentDepartment.manager ? 1 : 0)} موظف في هذا القسم
                    </p>
                  </div>
                </div>
              </div>

              {/* Manager */}
              {currentDepartment.manager && (
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-yellow-500 p-3 rounded-xl shadow-lg">
                      <Crown className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-foreground">مدير القسم</h3>
                  </div>
                  <ContactCard
                    member={currentDepartment.manager}
                    isManager
                    onClick={() => setSelectedMember(currentDepartment.manager)}
                  />
                </div>
              )}

              {/* Team Members */}
              {currentDepartment.team.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-primary p-3 rounded-xl shadow-lg">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-foreground">أعضاء الفريق</h3>
                  </div>
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                    {currentDepartment.team.map((member, idx) => {
                      // إذا كان العنصر header للمنطقة
                      if (member.position === "region-header") {
                        return (
                          <div key={idx} className="col-span-full my-10">
                            <div className="flex items-center gap-4">
                              <div className="flex-1 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-yellow-600 rounded-full"></div>
                              <h4 className="text-3xl font-black text-yellow-500 px-10 py-5 bg-gradient-to-r from-black via-gray-900 to-black rounded-2xl border-4 border-yellow-500 shadow-2xl shadow-yellow-500/50 animate-pulse">
                                {member.name.replace(/━/g, '').trim()}
                              </h4>
                              <div className="flex-1 h-1 bg-gradient-to-r from-yellow-600 via-yellow-500 to-transparent rounded-full"></div>
                            </div>
                          </div>
                        )
                      }
                      // عرض البطاقة العادية
                      return <ContactCard key={idx} member={member} onClick={() => setSelectedMember(member)} />
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Employee Modal */}
      {selectedMember && <EmployeeModal member={selectedMember} onClose={() => setSelectedMember(null)} />}
    </div>
  )
}
