const amqp = require('amqplib');

const QUEUE_NAME = 'email_queue';

// Fungsi simulasi pengiriman email
function sendEmail(payload) {
  return new Promise((resolve) => {
    console.log(`[Worker] Mengirim email ke ${payload.email}...`);
    
    // Simulasi proses kirim email yang memakan waktu 3 detik
    setTimeout(() => {
      console.log(`[Worker] Email BERHASIL dikirim ke ${payload.email}!`);
      resolve();
    }, 3000);
  });
}

async function startWorker() {
  try {
    const connection = await amqp.connect('aamqps: //ubah dengan url claudAMQP Anda');
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });
    
    // Membatasi worker agar hanya memproses 1 pesan dalam satu waktu
    channel.prefetch(1);

    console.log('[Worker] Menunggu pesan masuk di antrean...');

    // Ambil pesan dari antrean
    channel.consume(QUEUE_NAME, async (msg) => {
      if (msg !== null) {
        const payload = JSON.parse(msg.content.toString());
        console.log(`[Worker] Memproses tugas pengiriman email untuk: ${payload.name}`);

        // Jalankan pengiriman email
        await sendEmail(payload);

        // Beritahu RabbitMQ bahwa pesan telah selesai diproses (Acknowledge)
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Error pada Worker:', error);
  }
}

startWorker();