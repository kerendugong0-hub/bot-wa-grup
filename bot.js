const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

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

client.on('qr', (qr) => {
    console.log('SCAN QR INI DI LOG RAILWAY:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot udah online di Railway!');
});

client.on('message', async (msg) => {
    const chat = await msg.getChat();
    if (!chat.isGroup) return;
    if (msg.fromMe) return;
    if (!msg.body.startsWith('!')) return;

    const perintah = msg.body.toLowerCase().split(' ')[0];

    if (perintah === '!menu') {
        msg.reply('MENU BOT ??\n\n!halo - sapa bot\n!harga - cek harga\n!rules - peraturan grup\n!admin - panggil admin');
    }
    else if (perintah === '!halo') {
        msg.reply('Halo kak! Ada yang bisa dibantu?');
    }
    else if (perintah === '!harga') {
        msg.reply('Harganya 50k kak!');
    }
    else if (perintah === '!rules') {
        msg.reply('RULES: No spam, No toxic');
    }
    else if (perintah === '!admin') {
        msg.reply('Min, ada yang nyariin nih!');
    }
});

client.initialize();