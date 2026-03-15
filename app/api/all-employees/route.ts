import { NextResponse } from "next/server"

// جلب جميع الموظفين من جميع الأقسام
export async function GET() {
  try {
    // هنا يمكنك إضافة جميع الموظفين من قاعدة البيانات
    // حالياً سنستخدم بيانات ثابتة
    
    const allEmployees = [
      // مكتب م/ أحمد شوقي
      { name: "ملك رؤوف", position: "مديرة مكتب م/ أحمد شوقي", phone: "01114822498", image: "/images/malak-abdelraouf.jpeg", department: "مكتب م/ أحمد شوقي" },
      
      // الإدارة العامة
      { name: "محمد حسن", position: "المدير العام", phone: "1145511776", image: "/images/mohamed-hosny.jpeg", department: "الإدارة العامة" },
      
      // مديرين البنود
      { name: "م/ محمود عبد الغني (أفندينا)", position: "مدير قسم الجبس بورد والرخام", phone: "1278861380", image: "/images/م محمود عبد الغني (أفندينا).jpg", department: "مديرين البنود" },
      { name: "م/ محمد شوقي", position: "مدير قسم النجارة", phone: "1282593311", image: "/images/mohamed-shawky-manager.jpeg", department: "مديرين البنود" },
      { name: "م/ محمد نجيب", position: "مدير بند الكهرباء", phone: "1114726955", image: "/images/mohamed-naguib.jpeg", department: "مديرين البنود" },
      { name: "م/ أحمد عبد الباسط", position: "مدير بند السيراميك", phone: "1115706597", image: "/images/ahmed-abdelbaset.jpeg", department: "مديرين البنود" },
      { name: "م/ محمد يوسف", position: "مدير التكيفات والتوريدات", phone: "1000766726", image: "/images/محمد يوسف.jpeg", department: "مديرين البنود" },
      { name: "م/ أحمد عبد الغني", position: "مدير بند توريدات الكهرباء", phone: "1115706597", image: "/images/placeholder.jpg", department: "مديرين البنود" },
      
      // الموارد البشرية
      { name: "محمد عبد المنعم", position: "مدير الموارد البشرية", phone: "1110800543", image: "/images/محمد عبد المنعم.jpg", department: "الموارد البشرية" },
      { name: "هاجر عبد العزيز", position: "HR", phone: "1110800543", image: "/images/hagar-abdelaziz.jpeg", department: "الموارد البشرية" },
      { name: "هبه خالد", position: "HR", phone: "1222356988", image: "/images/d9-87-d8-a8-d9-87-20-d8-ae-d8-a7-d9-84-d8-af-20.jpeg", department: "الموارد البشرية" },
      { name: "عبد الرحمن فايز علي", position: "HR", phone: "1097448579", department: "الموارد البشرية" },
      
      // السوشيال ميديا
      { name: "م/ مصطفى شوقي", position: "Social Media Manager", phone: "1002776674", image: "/images/مصطفي شوقي.jpg", department: "السوشيال ميديا" },
      { name: "أحمد عبد الغني (كيتا)", position: "Deputy Manager", phone: "1110800526", image: "/images/759961a8-b0be-43a2-b865-c99b1558d588.jpeg", department: "السوشيال ميديا" },
      { name: "اشرف ذكي", position: "Producer - Photographer", phone: "1103827701", image: "/images/ashraf-zaki-new.jpeg", department: "السوشيال ميديا" },
      { name: "انس عاطف محمد", position: "Producer", phone: "1112340773", image: "/images/anas-atef-new.jpeg", department: "السوشيال ميديا" },
      { name: "محمود علاء انصاري", position: "Moderator", phone: "1120010618", image: "/images/367a7b04-cef9-4944-88b4-a8c098c99fa2.jpeg", department: "السوشيال ميديا" },
      { name: "مؤمن مصطفى", position: "Content Creator", phone: "1122587005", image: "/images/مؤمن مصطفي.jpeg", department: "السوشيال ميديا" },
    ]

    return NextResponse.json({
      success: true,
      employees: allEmployees,
      count: allEmployees.length
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "فشل في جلب الموظفين" },
      { status: 500 }
    )
  }
}
