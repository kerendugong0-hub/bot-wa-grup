const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const PHONE_NUMBER = '6281460304191'; // nomor bot lu

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
    }
});

let pairingCodeRequested = false;

client.on('qr', async (qr) => {
    console.log('QR RECEIVED, tapi kita pake PAIRING CODE aja');
    if (!pairingCodeRequested) {
        pairingCodeRequested = true;
        try {
            // Minta kode pairing
            const code = await client.requestPairingCode(PHONE_NUMBER);
            console.log('=====================================');
            console.log('PAIRING CODE LU: ' + code);
            console.log('=====================================');
            console.log('Masukin kode di atas ke WhatsApp > Perangkat Tertaut > Tautkan dengan nomor telepon');
        } catch (e) {
            console.log('Gagal minta pairing code: ', e.message);
            pairingCodeRequested = false;
        }
    }
});

client.on('ready', () => {
    console.log('BOT UDAH READY! CONNECTED!');
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED! BERHASIL LOGIN!');
});

client.on('auth_failure', (msg) => {
    console.log('AUTH FAILURE: ', msg);
});

client.on('disconnected', (reason) => {
    console.log('DISCONNECTED: ', reason);
});

client.on('message', async (msg) => {
    // Cek di grup aja biar gak spam
    const chat = await msg.getChat();
    if (!chat.isGroup) return;

    const body = msg.body.toLowerCase();

    if (body === '!ping') {
        msg.reply('Pong! Bot aktif ✅');
    }
    if (body === '!menu') {
        msg.reply('Menu Bot:\n!ping - cek bot hidup\n!menu - liat menu');
    }
    // Tambahin perintah lama lu di sini kalo ada
});

client.initialize();
