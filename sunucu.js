const http = require('http');
const dayjs = require('dayjs');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    console.log(`[${new Date().toISOString()}] İstek Alindi: ${method} ${url}`);

    if (method !== 'GET') {
        res.writeHead(405, {
            'Content-Type': 'text/plain; charset=utf-8',
            'Allow': 'GET'
        });
        res.end('Yöntem Kabul Edilmedi (405). Yalnizca GET istekleri desteklenmektedir.');
        return;
    }

    if (url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <!DOCTYPE html>
            <html lang="tr">
            <head>
                <meta charset="UTF-8">
                <title>BMH231 Ödev 1 - Ana Sayfa</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
                    h1 { color: #2c3e50; }
                    a { color: #3498db; text-decoration: none; font-weight: bold; }
                </style>
            </head>
            <body>
                <h1>BMH231 Web Programlama - Beril Kilci Sunucusu</h1>
                <p>Hoş geldiniz! Benim hakkimda bilgi almak için <a href="/hakkimda">Hakkimda Sayfasi</a>'nı ziyaret edebilirsiniz.</p>
            </body>
            </html>
        `);
    } else if (url === '/hakkimda') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <!DOCTYPE html>
            <html lang="tr">
            <head>
                <meta charset="UTF-8">
                <title>Hakkimda - Beril Kilci</title>
            </head>
            <body>
                <h1>Hakkimda</h1>
                <p>Merhaba, ben <strong>Beril Kilci</strong>.</p>
                <p>Yozgat Bozok Üniversitesi Bilgisayar Mühendisliği Bölümü öğrencisiyim (Öğrenci No: 16008125068).</p>
                <p>Bu sunucu BMH231 Web Programlama dersi Ödev 1 kapsaminda Express kullanilmadan Node.js yerel modülleriyle geliştirilmiştir.</p>
            </body>
            </html>
        `);
    } else if (url === '/api/ders') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        const dersBilgisi = {
            kod: "BMH231",
            ad: "Web Programlama",
            gun: "Cuma"
        };
        res.end(JSON.stringify(dersBilgisi, null, 2));
    } else if (url === '/api/agep') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });

        const hedefTarih = dayjs('2026-11-01');
        const bugun = dayjs();
        const kalanGun = hedefTarih.diff(bugun, 'day');

        const agepBilgisi = {
            sonTeslimTarihi: "2026-11-01",
            kalanGunSayisi: kalanGun >= 0 ? kalanGun : 0,
            hesaplamaTarihi: bugun.format('YYYY-MM-DD HH:mm:ss')
        };
        res.end(JSON.stringify(agepBilgisi, null, 2));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Sayfa bulunamadi (404)');
    }
});

server.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalişiyor...`);
});