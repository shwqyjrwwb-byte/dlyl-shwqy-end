const http = require('http');
const fs = require('fs');
const path = require('path');

// قراءة ملفات المشروع
function readProjectFiles() {
  const projectData = {
    contacts: [],
    contractors: [],
    clients: [],
    areas: []
  };

  try {
    // قراءة بيانات جهات الاتصال
    const contactsPath = path.join(__dirname, 'components', 'contacts-table.tsx');
    if (fs.existsSync(contactsPath)) {
      const contactsContent = fs.readFileSync(contactsPath, 'utf8');
      // استخراج البيانات من الملف
      projectData.contacts = extractContactsData(contactsContent);
    }

    // قراءة بيانات المقاولين
    const contractorsPath = path.join(__dirname, 'components', 'contractors-list.tsx');
    if (fs.existsSync(contractorsPath)) {
      const contractorsContent = fs.readFileSync(contractorsPath, 'utf8');
      projectData.contractors = extractContractorsData(contractorsContent);
    }

  } catch (error) {
    console.log('Error reading project files:', error.message);
  }

  return projectData;
}

function extractContactsData(content) {
  const contacts = [];
  // البحث عن البيانات في الكود
  const nameMatches = content.match(/name:\s*["']([^"']+)["']/g) || [];
  const phoneMatches = content.match(/phone:\s*["']([^"']+)["']/g) || [];
  const positionMatches = content.match(/position:\s*["']([^"']+)["']/g) || [];

  for (let i = 0; i < Math.min(nameMatches.length, phoneMatches.length); i++) {
    contacts.push({
      name: nameMatches[i]?.match(/["']([^"']+)["']/)?.[1] || 'غير محدد',
      phone: phoneMatches[i]?.match(/["']([^"']+)["']/)?.[1] || 'غير محدد',
      position: positionMatches[i]?.match(/["']([^"']+)["']/)?.[1] || 'غير محدد'
    });
  }

  return contacts;
}

function extractContractorsData(content) {
  const contractors = [];
  // استخراج بيانات المقاولين
  const matches = content.match(/{\s*id:\s*["'][^"']+["'],\s*name:\s*["'][^"']+["'],\s*specialization:\s*["'][^"']+["']/g) || [];
  
  matches.forEach(match => {
    const id = match.match(/id:\s*["']([^"']+)["']/)?.[1];
    const name = match.match(/name:\s*["']([^"']+)["']/)?.[1];
    const specialization = match.match(/specialization:\s*["']([^"']+)["']/)?.[1];
    
    if (id && name) {
      contractors.push({ id, name, specialization: specialization || 'غير محدد' });
    }
  });

  return contractors;
}

const server = http.createServer((req, res) => {
  const projectData = readProjectFiles();
  
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>دليل شوقي - المشروع الكامل</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                color: white;
                min-height: 100vh;
                padding: 20px;
            }
            .container {
                max-width: 1200px;
                margin: 0 auto;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 20px;
                padding: 30px;
                backdrop-filter: blur(10px);
            }
            .header {
                text-align: center;
                margin-bottom: 40px;
                border-bottom: 2px solid rgba(255, 255, 255, 0.3);
                padding-bottom: 20px;
            }
            .header h1 {
                font-size: 3rem;
                margin-bottom: 10px;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            }
            .section {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 15px;
                padding: 25px;
                margin: 20px 0;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            .section h2 {
                color: #FFD700;
                margin-bottom: 20px;
                font-size: 1.8rem;
                border-bottom: 2px solid #FFD700;
                padding-bottom: 10px;
            }
            .grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
                margin-top: 20px;
            }
            .card {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                padding: 20px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                transition: transform 0.3s ease;
            }
            .card:hover {
                transform: translateY(-5px);
                background: rgba(255, 255, 255, 0.15);
            }
            .card h3 {
                color: #4CAF50;
                margin-bottom: 10px;
            }
            .card p {
                margin: 5px 0;
                opacity: 0.9;
            }
            .stats {
                display: flex;
                justify-content: space-around;
                flex-wrap: wrap;
                gap: 20px;
                margin: 20px 0;
            }
            .stat {
                text-align: center;
                background: rgba(76, 175, 80, 0.2);
                border-radius: 10px;
                padding: 20px;
                min-width: 150px;
                border: 2px solid #4CAF50;
            }
            .stat-number {
                font-size: 2.5rem;
                font-weight: bold;
                color: #4CAF50;
            }
            .stat-label {
                margin-top: 10px;
                opacity: 0.9;
            }
            .missing-data {
                background: rgba(255, 193, 7, 0.2);
                border: 2px solid #FFC107;
                border-radius: 10px;
                padding: 20px;
                margin: 20px 0;
            }
            .missing-data h3 {
                color: #FFC107;
                margin-bottom: 15px;
            }
            .missing-item {
                background: rgba(244, 67, 54, 0.2);
                border-left: 4px solid #F44336;
                padding: 10px 15px;
                margin: 10px 0;
                border-radius: 5px;
            }
            .pages-list {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin-top: 20px;
            }
            .page-item {
                background: rgba(33, 150, 243, 0.2);
                border: 1px solid #2196F3;
                border-radius: 8px;
                padding: 15px;
                text-align: center;
                transition: all 0.3s ease;
            }
            .page-item:hover {
                background: rgba(33, 150, 243, 0.3);
                transform: scale(1.05);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🏗️ دليل شوقي</h1>
                <p>نظام إدارة مشاريع البناء والتشييد</p>
                <p><strong>الحالة:</strong> المشروع يعمل - البيانات تحتاج تحديث</p>
            </div>

            <div class="stats">
                <div class="stat">
                    <div class="stat-number">${projectData.contacts.length}</div>
                    <div class="stat-label">جهات الاتصال</div>
                </div>
                <div class="stat">
                    <div class="stat-number">${projectData.contractors.length}</div>
                    <div class="stat-label">المقاولين</div>
                </div>
                <div class="stat">
                    <div class="stat-number">21</div>
                    <div class="stat-label">صفحات المشروع</div>
                </div>
                <div class="stat">
                    <div class="stat-number">5</div>
                    <div class="stat-label">مناطق العمل</div>
                </div>
            </div>

            <div class="missing-data">
                <h3>⚠️ البيانات الناقصة (حسب خطة العمل)</h3>
                <div class="missing-item">
                    <strong>31 رقم مقاول مفقود</strong> - جميع أرقام المقاولين غير موجودة
                </div>
                <div class="missing-item">
                    <strong>4 صور موظفين مفقودة</strong> - محمد عبد المنعم + 3 موظفات
                </div>
                <div class="missing-item">
                    <strong>بيانات عميل "ابانوب" ناقصة</strong> - اسم غير كامل وبيانات مفقودة
                </div>
            </div>

            <div class="section">
                <h2>📞 جهات الاتصال المتوفرة</h2>
                <div class="grid">
                    ${projectData.contacts.slice(0, 6).map(contact => `
                        <div class="card">
                            <h3>${contact.name}</h3>
                            <p><strong>المنصب:</strong> ${contact.position}</p>
                            <p><strong>الهاتف:</strong> ${contact.phone}</p>
                        </div>
                    `).join('')}
                </div>
                ${projectData.contacts.length > 6 ? `<p style="text-align: center; margin-top: 20px; opacity: 0.8;">... و ${projectData.contacts.length - 6} جهة اتصال أخرى</p>` : ''}
            </div>

            <div class="section">
                <h2>🏗️ المقاولين</h2>
                <div class="grid">
                    ${projectData.contractors.slice(0, 6).map(contractor => `
                        <div class="card">
                            <h3>${contractor.name}</h3>
                            <p><strong>التخصص:</strong> ${contractor.specialization}</p>
                            <p style="color: #F44336;"><strong>الهاتف:</strong> غير متوفر ❌</p>
                        </div>
                    `).join('')}
                </div>
                ${projectData.contractors.length > 6 ? `<p style="text-align: center; margin-top: 20px; opacity: 0.8;">... و ${projectData.contractors.length - 6} مقاول آخر</p>` : ''}
            </div>

            <div class="section">
                <h2>📄 صفحات المشروع المتوفرة</h2>
                <div class="pages-list">
                    <div class="page-item">🏠 الصفحة الرئيسية</div>
                    <div class="page-item">👥 جهات الاتصال</div>
                    <div class="page-item">🏗️ المقاولين</div>
                    <div class="page-item">🗺️ المناطق</div>
                    <div class="page-item">👤 العملاء</div>
                    <div class="page-item">📦 الحزم</div>
                    <div class="page-item">💰 الدفع</div>
                    <div class="page-item">⚖️ الغرامات</div>
                    <div class="page-item">🔄 المراحل</div>
                    <div class="page-item">✅ الجودة</div>
                    <div class="page-item">📋 المواصفات</div>
                    <div class="page-item">🚗 المركبات</div>
                    <div class="page-item">📝 الوصف الوظيفي</div>
                    <div class="page-item">🔧 التعديلات</div>
                    <div class="page-item">🏢 المكتب الفني</div>
                    <div class="page-item">⚙️ الإدارة</div>
                    <div class="page-item">📊 التقارير</div>
                    <div class="page-item">🧪 اختبار API</div>
                    <div class="page-item">👤 اختبار العملاء</div>
                    <div class="page-item">📱 واجهة الجوال</div>
                    <div class="page-item">🤖 المساعد الذكي</div>
                </div>
            </div>

            <div class="section">
                <h2>🎯 الخطوات التالية</h2>
                <div style="background: rgba(76, 175, 80, 0.1); border-radius: 10px; padding: 20px;">
                    <p>✅ <strong>المشروع جاهز للعمل</strong> - جميع الملفات موجودة</p>
                    <p>🔧 <strong>يحتاج إصلاح Next.js</strong> - مشكلة في dependencies</p>
                    <p>📞 <strong>إضافة أرقام المقاولين</strong> - 31 رقم مطلوب</p>
                    <p>📸 <strong>إضافة صور الموظفين</strong> - 4 صور مطلوبة</p>
                    <p>📝 <strong>تحديث بيانات العملاء</strong> - عميل ابانوب</p>
                </div>
            </div>

            <div style="text-align: center; margin-top: 30px; padding: 20px; background: rgba(255, 255, 255, 0.1); border-radius: 10px;">
                <p><strong>المشروع الكامل موجود في:</strong></p>
                <p style="font-family: monospace; background: rgba(0, 0, 0, 0.3); padding: 10px; border-radius: 5px; margin: 10px 0;">
                    D:\\شوقي\\dlyl-shwqy-2\\app\\
                </p>
                <p>لتشغيل Next.js الكامل: <code>npm install && npm run dev</code></p>
            </div>
        </div>
    </body>
    </html>
  `);
});

server.listen(3000, () => {
  console.log('🏗️ دليل شوقي - عرض المشروع الكامل');
  console.log('📍 Server: http://localhost:3000');
  console.log('📁 المشروع في: D:\\شوقي\\dlyl-shwqy-2\\app\\');
  console.log('⏹️  Press Ctrl+C to stop');
});