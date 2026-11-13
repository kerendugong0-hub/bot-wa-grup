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

client.on('ready', () => {
    console.log('BOT UDAH READY! CONNECTED!');
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED! BERHASIL LOGIN!');
});

// INI YANG PENTING - DENGERIN SEMUA PESAN
client.on('message_create', async (msg) => {
    console.log('=== PESAN MASUK ===');
    console.log('Dari: ' + msg.from);
    console.log('Isi: ' + msg.body);
    console.log('Dari saya sendiri? ' + msg.fromMe);

    const body = msg.body.toLowerCase().trim();

    if (body === '!ping') {
        console.log('ADA YANG MINTA PING, MAU BALES...');
        try {
            await client.sendMessage(msg.from, 'Pong! Bot aktif ✅');
            console.log('BERHASIL BALES!');
        } catch (e) {
            console.log('GAGAL BALES: ' + e.message);
        }
    }
});

client.on('message', async (msg) => {
    console.log('=== PESAN LEWAT MESSAGE EVENT === Dari: ' + msg.from + ' Isi: ' + msg.body);
});

client.initialize();
