// استخراج جميع الموظفين من الأقسام (بدون رئيس مجلس الإدارة ونائبه)
export function getAllDepartmentEmployees() {
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

  // إضافة باقي الموظفين
  const moreEmployees = addMoreEmployees()
  const engineers = addEngineers()
  const otherDepts = addOtherDepartments()
  const moreDepts = addMoreDepartments()
  
  return [...allEmployees, ...moreEmployees, ...engineers, ...otherDepts, ...moreDepts, ...newEmployees].filter(emp => emp.phone && emp.phone !== "0000000000" && emp.phone !== "")
}

// موظفون جدد
function newEmployees() {
  return [
    { name: "م/ ايهاب",  position: "مدير تشغيل",       phone: "01111291411", image: "/images/placeholder.jpg", department: "التشغيل" },
    { name: "مينا",       position: "قسم التجارة",       phone: "01282985986", image: "/images/placeholder.jpg", department: "التجارة" },
    { name: "م/ ايناس",  position: "مهندسة مكتب فني",   phone: "01208097317", image: "/images/placeholder.jpg", department: "المكتب الفني" },
    { name: "ياسمين",    position: "سكرتيرة نجارة",     phone: "01142677399", image: "/images/placeholder.jpg", department: "النجارة" },
    { name: "م/ اسماء",  position: "مهندسة مكتب فني",   phone: "01142960514", image: "/images/placeholder.jpg", department: "المكتب الفني" },
  ]
}

// إضافة مهندسين الشركة
export function addMoreEmployees() {
  return [
    // مهندسين الشركة - منطقة أكتوبر
    { name: "احمد حامد", position: "مدير منطقة أكتوبر", phone: "1113426815", image: "/images/احمد حامد.jpeg", department: "مهندسين - أكتوبر" },
    { name: "احمد رجب", position: "مهندس - أكتوبر", phone: "1118912261", image: "/images/احمد رجب.jpeg", department: "مهندسين - أكتوبر" },
    { name: "محمد عبيده", position: "مهندس - أكتوبر", phone: "1115690947", image: "/images/عبيده.jpeg", department: "مهندسين - أكتوبر" },
    { name: "احمد اشرف", position: "مهندس - أكتوبر", phone: "1113500188", image: "/images/احمد اشرف.jpeg", department: "مهندسين - أكتوبر" },
    { name: "محمد امين", position: "مهندس - أكتوبر", phone: "1093860050", image: "/images/محمد امين (اكتوبر).jpeg", department: "مهندسين - أكتوبر" },
    { name: "اسلام عادل", position: "مهندس - أكتوبر", phone: "1090044029", department: "مهندسين - أكتوبر" },
    { name: "علي", position: "مهندس - أكتوبر", phone: "1003997103", image: "/images/علي محمد (اكتوبر).jpeg", department: "مهندسين - أكتوبر" },
  ]
}

// مهندسين القاهرة الجديدة والعاصمة والتجمع
export function addEngineers() {
  return [
    // القاهرة الجديدة
    { name: "مصطفي كمال", position: "مدير منطقة القاهرة الجديدة", phone: "1065589130", image: "/images/مصطفي كمال (القاهره الجديده).jpeg", department: "مهندسين - القاهرة الجديدة" },
    { name: "مصطفي عيد", position: "مهندس - القاهرة الجديدة", phone: "1044498820", image: "/images/مصطفي عيد.jpeg", department: "مهندسين - القاهرة الجديدة" },
    { name: "محمد جمال", position: "مهندس - القاهرة الجديدة", phone: "1118864455", image: "/images/محمد جمال (المستقبل).jpeg", department: "مهندسين - القاهرة الجديدة" },
    { name: "عبدالرحمن محمد", position: "مهندس - القاهرة الجديدة", phone: "1090159043", image: "/images/عبدالرحمن محمد.jpeg", department: "مهندسين - القاهرة الجديدة" },
    
    // العاصمة الإدارية
    { name: "احمد العزبي", position: "مدير منطقة العاصمة الإدارية", phone: "1000273742", image: "/images/احمد العزبي.jpeg", department: "مهندسين - العاصمة" },
    { name: "حسين فيض الله", position: "مهندس - العاصمة الإدارية", phone: "1157322922", image: "/images/حسين فيض.jpeg", department: "مهندسين - العاصمة" },
    { name: "محمد اشرف", position: "مهندس - العاصمة الإدارية", phone: "1124492117", image: "/images/محمد اشرف.jpeg", department: "مهندسين - العاصمة" },
    { name: "محمود محسن", position: "مهندس - العاصمة الإدارية", phone: "1022640037", image: "/images/محمود محسن.jpeg", department: "مهندسين - العاصمة" },
    { name: "محمد ماهر", position: "مهندس - العاصمة الإدارية", phone: "1147629354", image: "/images/محمد ماهر (العاصمه).jpeg", department: "مهندسين - العاصمة" },
    
    // التجمع الخامس
    { name: "محمد مدحت", position: "مدير منطقة التجمع الخامس", phone: "1554593094", image: "/images/محمد مدحت.jpeg", department: "مهندسين - التجمع" },
    { name: "حسام الغدور", position: "مهندس - التجمع الخامس", phone: "1224244495", image: "/images/حسام الغندور.jpeg", department: "مهندسين - التجمع" },
    { name: "كريم سامي", position: "مهندس - التجمع الخامس", phone: "1011183789", image: "/images/كريم سامي.jpeg", department: "مهندسين - التجمع" },
    { name: "محسن عبدالرازق", position: "مهندس - التجمع الخامس", phone: "1110091234", image: "/images/محسن عبدالرازق (التجمع).jpeg", department: "مهندسين - التجمع" },
    { name: "عبدالنبي مرجان", position: "مهندس - التجمع الخامس", phone: "1001334460", image: "/images/عبدالنبي مرجان.jpeg", department: "مهندسين - التجمع" },
    { name: "عماد شلبي", position: "مهندس - التجمع الخامس", phone: "1274455556", image: "/images/عماد شلبي.jpeg", department: "مهندسين - التجمع" },
    { name: "محمد غنام", position: "مهندس - التجمع الخامس", phone: "1200003089", image: "/images/محمد غنام.jpeg", department: "مهندسين - التجمع" },
    
    // وسط
    { name: "احمد بسيوني", position: "مدير منطقة وسط", phone: "1126221382", image: "/images/احمد بسيوني.jpeg", department: "مهندسين - وسط" },
    { name: "محمد محمود الجميل", position: "مهندس - وسط", phone: "1126264221", image: "/images/محمد الجميل.jpeg", department: "مهندسين - وسط" },
    { name: "عمرو خالد", position: "مهندس - وسط", phone: "1024107025", image: "/images/عمرو خالد.jpeg", department: "مهندسين - وسط" },
    { name: "عبدالرحمن العراقي", position: "مهندس - وسط", phone: "1148074988", image: "/images/عبدالرحمن العراقي.jpeg", department: "مهندسين - وسط" },
    { name: "بيشوي", position: "مهندس - وسط", phone: "1147948825", image: "/images/بيشوي.jpeg", department: "مهندسين - وسط" },
    
    // الأقاليم
    { name: "محمد صلاح", position: "مدير منطقة الأقاليم", phone: "1128416769", image: "/images/محمد صلاح.jpeg", department: "مهندسين - الأقاليم" },
    { name: "علي مختار", position: "مهندس - الأقاليم", phone: "1009602018", image: "/images/علي مختار الاسكندريه.jpeg", department: "مهندسين - الأقاليم" },
    { name: "احمد الشيخ (السادات)", position: "مهندس - الأقاليم", phone: "1229277915", image: "/images/احمد الشيخ.jpeg", department: "مهندسين - الأقاليم" },
    { name: "بيومي", position: "مهندس - الأقاليم", phone: "1007973235", image: "/images/بيومي.jpeg", department: "مهندسين - الأقاليم" },
    { name: "شنوده", position: "مهندس - الأقاليم", phone: "1270285129", image: "/images/شنوده.jpeg", department: "مهندسين - الأقاليم" },
    { name: "احمد عوض", position: "مهندس - الأقاليم", phone: "1114936377", image: "/images/احمد عوض.jpeg", department: "مهندسين - الأقاليم" },
    { name: "محمد عبدالعظيم", position: "مهندس - الأقاليم", phone: "1009020263", image: "/images/محمد عبدالعظيم.jpeg", department: "مهندسين - الأقاليم" },
    { name: "محمود ابو زيد", position: "مهندس - الأقاليم", phone: "1140479394", image: "/images/محمود ابو زيد.jpeg", department: "مهندسين - الأقاليم" },
    
    // الجودة
    { name: "محمود اسماعيل", position: "مدير الجودة", phone: "1113121549", image: "/images/محمود اسماعيل.jpeg", department: "الجودة" },
    { name: "شادي مظهر", position: "مهندس جودة", phone: "1156704637", image: "/images/شادي.jpeg", department: "الجودة" },
  ]
}

// باقي الأقسام
export function addOtherDepartments() {
  return [
    // المعاينات
    { name: "مؤمن يسري", position: "مسئول الخدمات / المشتريات", phone: "1155293383", image: "/images/d9-85-d9-88-d9-85-d9-86-20-d9-8a-d8-b3-d8-b1-d9-8a.jpeg", department: "المعاينات" },
    
    // الشؤون القانونية
    { name: "المستشار عمرو عبد الله", position: "مدير الإدارة القانونية", phone: "1112088704", image: "/images/dr-amr.jpeg", department: "الشؤون القانونية" },
    { name: "محمود غريب", position: "شؤون قانونية", phone: "1143734095", image: "/images/محمود غريب.jpeg", department: "الشؤون القانونية" },
    
    // الحسابات
    { name: "وائل رأفت أمين", position: "مدير الحسابات", phone: "1103660739", image: "/images/wael-rafat-updated.jpeg", department: "الحسابات" },
    { name: "راضي شحاته", position: "أمين خزينة", phone: "1278864533", image: "/images/rady-shehata.jpeg", department: "الحسابات" },
    { name: "مي عصام عبد العزيز", position: "محاسبة", phone: "1223925721", image: "/images/مي عصام.jpeg", department: "الحسابات" },
    { name: "خالد محي الدين عبد القادر", position: "محاسب", phone: "1121296258", image: "/images/خالد محي.jpeg", department: "الحسابات" },
    { name: "خالد عاطف عبد الغني محمد", position: "محاسب مخزن", phone: "1287329792", image: "/images/خالد عاطف.jpeg", department: "الحسابات" },
    { name: "هبه توفيق", position: "مسئولة تحويلات", phone: "1151183223", image: "/images/heba-tawfik.jpeg", department: "الحسابات" },
    { name: "كريم عاطف", position: "مدير قسم حسابات العملاء", phone: "1114922582", image: "/images/karim-atef.jpeg", department: "الحسابات" },
    { name: "حسناء عماد", position: "مسئول إضافات", phone: "1273544901", image: "/images/hasnaa-emad-new.jpeg", department: "الحسابات" },
    { name: "عبد الله عصام", position: "مسئول إضافات", phone: "1110672999", image: "/images/abdullah-essam.jpeg", department: "الحسابات" },
    { name: "محمد سالم صلاح الدين", position: "مسئول إضافات", phone: "1515494073", image: "/images/mohamed-salem-updated.jpeg", department: "الحسابات" },
  ]
}

// النجارة والمكتب الفني وخدمة العملاء
export function addMoreDepartments() {
  return [
    // النجارة
    { name: "أشرف صابر", position: "جودة نجارة", phone: "1222165846", image: "/images/ashraf-saber-new.jpeg", department: "النجارة" },
    { name: "إسراء جلال", position: "مسئول معرض الأثاث", phone: "1282594811", image: "/images/اسراء جلال.jpeg", department: "النجارة" },
    { name: "هبه أبو المجد", position: "سكرتيرة", phone: "1103827704", image: "/images/heba-abo-elmagd.jpeg", department: "النجارة" },
    { name: "بسمله زكي عزت السعيد", position: "خدمة عملاء النجارة", phone: "1282101122", image: "/images/basmala-real.jpeg", department: "النجارة" },
    { name: "محمود هشام محمود نجاتي", position: "محاسب قسم النجارة", phone: "1278861380", image: "/images/mahmoud-hesham.jpeg", department: "النجارة" },
    { name: "عبد الرحمن البحري", position: "سواق", phone: "1272705524", image: "/images/عبد الرحمان البحري سواق.jpeg", department: "النجارة" },
    { name: "هشام مجدي كمال", position: "محاسب قسم النجارة", phone: "1152253329", image: "/images/هشام مجدي حسبات.jpeg", department: "النجارة" },
    { name: "أحمد حسن مصطفى حسن عبده", position: "مهندس نجارة", phone: "1149466551", image: "/images/d9-85-d8-a7-d8-ad-d9-85-d8-af-20-d8-ad-d8-b3-d9-86-20.jpeg", department: "النجارة" },
    { name: "هدير محمود محمد", position: "تصميمات النجارة", phone: "1159259055", image: "/images/d9-85-d9-87-d8-af-d9-8a-d8-b1-20-d9-85-d8-ad-d9-85-d9-88-d8-af-20.jpeg", department: "النجارة" },
    { name: "عبد المنعم يحيى عبد المنعم", position: "مسئول قسم النجارة", phone: "1009788530", image: "/images/abdelmoneam.jpeg", department: "النجارة" },
    { name: "حسن محمود عبد الحميد", position: "نجار", phone: "1226621041", image: "/images/hassan-mahmoud-new.jpeg", department: "النجارة" },
    { name: "عبد الرحمن هشام", position: "عامل النجارة", phone: "1281250312", department: "النجارة" },
    { name: "عمرو هشام محمد", position: "عامل مصنع النجارة", phone: "1127148438", image: "/images/عمرو هشام.jpeg", department: "النجارة" },
    
    // المكتب الفني
    { name: "إسلام خالد", position: "مدير المكتب الفني", phone: "1156679887", image: "/images/مهندس اسلام خالد.jpg", department: "المكتب الفني" },
    { name: "يارا يسري شعبان", position: "مهندسة مكتب فني", phone: "1103997506", image: "/images/d9-85-20-d9-8a-d8-a7-d8-b1-d8-a7-20-d9-8a-d8-b3-d8-b1-d9-8a.jpeg", department: "المكتب الفني" },
    { name: "سارة أحمد محمد أحمد", position: "مهندس مكتب فني", phone: "1282101181", image: "/images/sara-ahmed.jpeg", department: "المكتب الفني" },
    { name: "كيرلس زكريا غطاس عوض", position: "مهندس مكتب فني", phone: "1100411913", image: "/images/d9-85-20-d9-83-d8-b1-d9-88-d9-84-d8-b3.jpeg", department: "المكتب الفني" },
    { name: "آيه نعيم أنور محمود", position: "مهندس مكتب فني", phone: "1110800548", image: "/images/d9-85-20-d8-a7-d9-8a-d9-87-20-d9-86-d8-b9-d9-8a-d9-85-20.jpeg", department: "المكتب الفني" },
    { name: "فرح تامر محمد", position: "مهندس مكتب فني", phone: "1115473346", image: "/images/d9-85-d9-81-d8-b1-d8-ad-20-d8-aa-d8-a7-d9-85-d8-b1.jpeg", department: "المكتب الفني" },
    { name: "عبد الله رضا محمد عبد العزيز", position: "مهندس مكتب فني", phone: "1200119496", image: "/images/عبد الله رضا.jpeg", department: "المكتب الفني" },
    { name: "مريم يوسف", position: "مهندسة مكتب فني", phone: "1501593289", image: "/images/مريم يوسف.jpeg", department: "المكتب الفني" },
    
    // خدمة العملاء
    { name: "بسنت عنتر", position: "مديرة خدمة العملاء", phone: "1278864603", image: "/images/basmala-new.jpeg", department: "خدمة العملاء" },
    { name: "اسماء محمد عبد العليم", position: "خدمه عملاء العاصمة", phone: "1110800518", image: "/images/d8-a7-d8-b3-d9-85-d8-a7-d8-a1-20-d8-b9-d8-a8-d8-af-d8-a7-d9-84-d8-b9-d9-84-d9-8a-d9-85.jpeg", department: "خدمة العملاء" },
    { name: "دعاء جمال عبد المنعم", position: "خدمة عملاء القاهرة الجديدة", phone: "1115841543", image: "/images/doaa-gamal.jpeg", department: "خدمة العملاء" },
    { name: "يوسف مجدي محرم", position: "خدمة عملاء التجمع", phone: "1200119629", image: "/images/d9-8a-d9-88-d8-b3-d9-81-20-d9-85-d8-ac-d8-af-d9-8a.jpeg", department: "خدمة العملاء" },
    { name: "ايات حامد حسن علي", position: "خدمه عملاء", phone: "1273504072", image: "/images/d8-a7-d9-8a-d8-a7-d8-aa-20-d8-ad-d8-a7-d9-85-d8-af.jpeg", department: "خدمة العملاء" },
    
    // الفرش والديكور
    { name: "م/ أحمد عبد الغني", position: "مدير قسم الفرش", phone: "1115706597", image: "/images/placeholder.jpg", department: "الفرش والديكور" },
    { name: "ندى عمرو محمد", position: "مهندسة بقسم الفرش والديكور", phone: "1278864759", image: "/images/nada-amr.jpeg", department: "الفرش والديكور" },
    { name: "حسام خالد محمود", position: "مهندس 3d", phone: "1126883633", image: "/images/hossam-technical.jpeg", department: "الفرش والديكور" },
    { name: "أسماء حسين", position: "مسؤولة بند التكيفات", phone: "1278865758", image: "/images/مهندسه اسماء حسين.jpeg", department: "الفرش والديكور" },
    { name: "سعيد سمير عبد العزيز علي", position: "مسؤل بند المشتريات الكهربي", phone: "1115086941", image: "/images/saeed-samir.jpeg", department: "الفرش والديكور" },
    
    // التعاقدات
    { name: "حبيبه منصور", position: "موظفه تعاقدات", phone: "1222367635", image: "/images/habiba-mansour.jpeg", department: "التعاقدات" },
    { name: "رنا وحيد", position: "موظفه تعاقدات", phone: "1222630606", image: "/images/rana-waheed.jpeg", department: "التعاقدات" },
    { name: "نيفين عيد محمد", position: "موظفه تعاقدات", phone: "1273545667", image: "/images/neveen.jpeg", department: "التعاقدات" },
    { name: "يوسف علاء محمد عبد الهادي", position: "موظف تعاقدات - سيلز", phone: "1222620606", image: "/images/youssef-ola.jpeg", department: "التعاقدات" },
    { name: "ملك خالد خليل", position: "موظفه تعاقدات", phone: "1278863141", department: "التعاقدات" },
    { name: "هدير خالد", position: "مسئولة تعاقدات", phone: "1110800534", image: "/images/هدير خالد.jpeg", department: "التعاقدات" },
    
    // تلي سيلز
    { name: "ندى حامد سعيد حامد", position: "موظفة تلي سيلز", phone: "1278864748", image: "/images/d9-86-d8-af-d9-8a-20-d8-ad-d8-a7-d9-85-d8-af-20-d8-aa-d9-84-d9-8a-20-d8-b3-d9-8a-d9-84-d8-b2.jpeg", department: "تلي سيلز" },
    { name: "محمد عزب عرب محمد السيد", position: "تلي سيلز", phone: "1032654499", image: "/images/mohamed-azab-updated.jpeg", department: "تلي سيلز" },
    { name: "فاطمه راضي أحمد صادق", position: "تلي سيلز", phone: "1155402956", image: "/images/fatma-rady.jpeg", department: "تلي سيلز" },
    
    // السيراميك
    { name: "محمد يحيي عبدالحميد عبد الرازق", position: "مسؤول قسم السيراميك", phone: "1101946616", image: "/images/mohamed-yahya.jpeg", department: "السيراميك" },
    { name: "امنيه مصطفى", position: "منسق سيراميك", phone: "1110800552", image: "/images/omnia-mostafa-new.jpeg", department: "السيراميك" },
    { name: "محمد يسري", position: "منسق سيراميك", phone: "1101605351", image: "/images/mohamed-yosry.jpeg", department: "السيراميك" },
    
    // التشغيل
    { name: "محمد سعيد محمد", position: "مدير قسم التشغيل", phone: "1278865930", image: "/images/mohamed-saeed.jpeg", department: "التشغيل" },
    { name: "م/ سامح عبد الصبور", position: "مدير مشاريع", phone: "1278864735", image: "/images/sameh-abdelsabour.jpeg", department: "التشغيل" },
    { name: "اسامة حمدي أحمد ابراهيم", position: "مسئول مقاولين", phone: "1110800523", image: "/images/osama-hamdy-new.jpeg", department: "التشغيل" },
    { name: "احمد خالد", position: "مسئول مقاولين", phone: "1115612784", image: "/images/d8-a7-d8-ad-d9-85-d8-af-20-d8-ae-d8-a7-d9-84-d8-af.jpeg", department: "التشغيل" },
    
    // البوفيه
    { name: "حسام اشرف فرج احمد", position: "مسئول البوفيه", phone: "1097836360", image: "/images/d8-ad-d8-b3-d8-a7-d9-85-20-d8-a7-d8-b4-d8-b1-d9-81.jpeg", department: "البوفيه" },
    { name: "حنان عباس", position: "بوفيه", phone: "1100088455", image: "/images/حنان بوفيه.jpeg", department: "البوفيه" },
    
    // معرض الكهرباء
    { name: "محمد محمد عبد العليم", position: "مسئول معرض الكهرباء", phone: "1153767222", image: "/images/mohamed-abdelhalim.jpeg", department: "معرض الكهرباء" },
    
    // معرض الدهانات
    { name: "محمود علي", position: "مسئول معرض الدهانات", phone: "1212093894", department: "معرض الدهانات" },
    
    // IT
    { name: "م/ أحمد أبو السعود", position: "مدير تكنولوجيا المعلومات", phone: "01158444748", image: "/images/ahmed-abu-alsoud-it.jpeg", department: "IT" },
    
    // السيارات
    { name: "عزام", position: "مسؤول السيارات", phone: "01111108751", image: "/images/azzam.jpeg", department: "السيارات" },
  ]
}

// موظفون جدد
export function addNewEmployees() {
  return [
    { name: "م/ ايهاب", position: "مدير تشغيل", phone: "01111291411", image: "/images/placeholder.jpg", department: "التشغيل" },
    { name: "مينا", position: "قسم التجارة", phone: "01282985986", image: "/images/placeholder.jpg", department: "التجارة" },
    { name: "م/ ايناس", position: "مهندسة مكتب فني", phone: "01208097317", image: "/images/placeholder.jpg", department: "المكتب الفني" },
    { name: "ياسمين", position: "سكرتيرة نجارة", phone: "01142677399", image: "/images/placeholder.jpg", department: "النجارة" },
    { name: "م/ اسماء", position: "مهندسة مكتب فني", phone: "01142960514", image: "/images/placeholder.jpg", department: "المكتب الفني" },
  ]
}