console.log('Starting server...');
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <!DOCTYPE html>
    <html dir="rtl">
    <head>
        <meta charset="UTF-8">
        <title>دليل شوقي - يعمل!</title>
        <style>
            body { 
                font-family: Arial; 
                text-align: center; 
                padding: 50px;
                background: #f0f0f0;
            }
            .success {
                background: #4CAF50;
                color: white;
                padding: 20px;
                border-radius: 10px;
                margin: 20px;
            }
        </style>
    </head>
    <body>
        <h1>🎉 دليل شوقي</h1>
        <div class="success">
            <h2>✅ الخادم يعمل بنجاح!</h2>
            <p>تم تشغيل المشروع على المنفذ 3000</p>
            <p>الوقت: ${new Date().toLocaleString('ar-EG')}</p>
        </div>
        <h3>📋 معلومات المشروع</h3>
        <p>• 31 مقاول بحاجة لأرقام تواصل</p>
        <p>• 4 موظفين بحاجة لصور</p>
        <p>• عميل "ابانوب" بحاجة لبيانات كاملة</p>
    </body>
    </html>
  `);
});

server.listen(3000, () => {
  console.log('✅ Server running at http://localhost:3000');
  console.log('Press Ctrl+C to stop');
});