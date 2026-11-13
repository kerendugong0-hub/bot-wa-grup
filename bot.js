const { Client, LocalAuth } = require('whatsapp-web.js');

const PHONE_NUMBER = '6281460304191';

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox','--disable-setuid-sandbox','--disable-dev-shm-usage','--disable-accelerated-2d-canvas','--no-first-run','--no-zygote','--single-process','--disable-gpu']
    }
});

let pairingCodeRequested = false;

client.on('qr', async (qr) => {
    if (!pairingCodeRequested) {
        pairingCodeRequested = true;
        try {
            const code = await client.requestPairingCode(PHONE_NUMBER);
            console.log('PAIRING CODE LU: ' + code);
        } catch (e) {
            console.log('Gagal pairing: ' + e.message);
            pairingCodeRequested = false;
        }
    }
});

client.on('ready', () => console.log('BOT UDAH READY! CONNECTED!'));
client.on('authenticated', () => console.log('AUTHENTICATED! BERHASIL LOGIN!'));

const MENU = `*PIP APKSTORE - MENU* 🛒

Ketik aja nama produknya, tanpa tanda ! ya

*INFO*
- cara order
- payment

*APLIKASI / AI*
- canva
- zoom
- scribd
- google drive
- get contact
- gemini
- chatgpt
- capcut pro
- alight motion

*NONTON*
- dramabox
- loklok
- viu
- iqiyi
- vidio platinum
- netflix
- hbo
- disney
- wetv

*LAINNYA*
- top up
- qr maps

Contoh: ketik *canva* aja`;

const CARA_ORDER = `*CARA ORDER* 🛒

Pilih produk > payment > screenshot bukti payment > produk dikirim (admin).

Gampang kan? Ketik *menu* buat pilih produk dulu ya!`;

const PAYMENT = `🕊️Jasa aplikasi premium
✨Pembayaran hanya melalui transfer ke rekening ini

🕊️Seabank: 901607385586 (Fitria Ramadani)
✨Neobank: 5859459406467240 (Fitria Ramadani)

Note: selain diatas admin tidak bertanggung jawab🙏🏽.`;

const PRODUK = {
    'canva': `*CANVA* 🎨
1 bulan : Rp 27.000

Order? Ketik *payment*`,
    'zoom': `*ZOOM* 💻
1 Hari : Rp 6.000
7 hari : Rp 12.000
14 hari : Rp 20.000

Order? Ketik *payment*`,
    'scribd': `*SCRIBD* 📚
1 bulan private : Rp 17.000

Order? Ketik *payment*`,
    'google drive': `*GOOGLE DRIVE* ☁️
*Storage Gdrive 200 GB* 6 bulan : Rp 27.000
Include google AI pro

*Storage Gdrive 5 TB* 18 bulan : Rp 37.000
Include google AI plus

Order? Ketik *payment*`,
    'get contact': `*GET CONTACT* 📞
*Cek nomor*
1 nomor : Rp 1.000

*Premium akun*
1 bulan : Rp 9.000

Order? Ketik *payment*`,
    'gemini': `*GEMINI* ✨
18 bulan : Rp 27.000
& Storage Gdrive 5TB

Order? Ketik *payment*`,
    'chatgpt': `*CHATGPT* 🤖
*Chatgpt Go*
Sharing : Rp 22.000

*Chatgpt Plus*
Sharing : Rp 47.000

Order? Ketik *payment*`,
    'capcut pro': `*CAPCUT PRO* ✂️
1 bulan private : Rp 27.000

Order? Ketik *payment*`,
    'alight motion': `*ALIGHT MOTION* 🎬
_*Private*_
1 bulan : Rp 4.000
6 bulan : Rp 7.000
1 tahun : Rp 12.000

_*Sharing*_
1 tahun : Rp 6.000

Order? Ketik *payment*`,
    'dramabox': `*DRAMABOX* 🎭
_*Sharing*_
1 bulan : Rp 17.000

Order? Ketik *payment*`,
    'loklok': `*LOKLOK* 📺
1 bulan : Rp 22.000

Order? Ketik *payment*`,
    'viu': `*VIU* 📺
1 bulan : Rp 22.000

Order? Ketik *payment*`,
    'iqiyi': `*IQIYI* 📺
_*Sharing*_ : Rp 15.000
_*Private*_ : Rp 32.000

Order? Ketik *payment*`,
    'vidio platinum': `*VIDIO PLATINUM* 👑
1 bulan : Rp 21.000

Order? Ketik *payment*`,
    'netflix': `*NETFLIX* 🎬
1 bulan : Rp 27.000

Order? Ketik *payment*`,
    'hbo': `*HBO* 🎬
1 bulan : Rp 27.000

Order? Ketik *payment*`,
    'disney': `*DISNEY+ PREM* ✨
1 bulan : Rp 27.000

Order? Ketik *payment*`,
    'wetv': `*WETV* 📺
★ *_Private_*
1 bulan : Rp 42.000

*_Sharing 6U_*
1 bulan : Rp 17.000

Order? Ketik *payment*`,
    'top up': `*TOP UP PULSA & KUOTA INTERNET* 📱

Harga tergantung kebutuhan

Bisa top up all operator: Telkomsel, XL, Axis, Indosat, Tri, Smartfren

Chat admin aja buat cek harga ya!`,
    'qr maps': `*BUAT QR MAPS OUTLET* 📍

Harga: Rp 10.000

Buat outlet / toko lu biar gampang dicari di Google Maps + bisa scan QR langsung nyambung ke Maps.

Kirim aja: Nama outlet + Link Maps / Shareloc
Admin bantu buatin!

Order? Ketik *payment*`,
};

client.on('message_create', async (msg) => {
    const body = msg.body.toLowerCase().trim();
    let bales = null;

    if (body === 'ping') bales = 'Pong! Bot aktif ✅';
    else if (body === 'menu') bales = MENU;
    else if (body === 'cara order') bales = CARA_ORDER;
    else if (body === 'payment') bales = PAYMENT;
    else if (PRODUK[body]) bales = PRODUK[body];

    if (bales) {
        try { await client.sendMessage(msg.from, bales); }
        catch(e){ console.log('Gagal bales: ' + e.message); }
    }
});

client.initialize();
