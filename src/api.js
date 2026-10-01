const express = require("express");
const amqp = require("amqplib");

const app = express();
app.use(express.json());

const QUEUE_NAME = "email_queue";
let channel;

// Koneksi ke RabbitMQ
async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect("amqps: //ubah dengan url claudAMQP Anda");
    channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    console.log("Terhubung ke RabbitMQ");
  } catch (error) {
    console.error("Gagal terhubung ke RabbitMQ:", error);
  }
}

connectRabbitMQ();

// Endpoint Pendaftaran User
app.post("/register", async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ message: "Email dan nama wajib diisi" });
  }

  // 1. Simpan user ke database (Simulasi)
  console.log(`[Database] User ${name} (${email}) berhasil disimpan.`);

  // 2. Buat pesan untuk dikirim ke antrean RabbitMQ
  const mailPayload = {
    email,
    name,
    type: "WELCOME_EMAIL",
    createdAt: new Date(),
  };

  // 3. Kirim pesan ke antrean (Queue)
  channel.sendToQueue(
    QUEUE_NAME,
    Buffer.from(JSON.stringify(mailPayload)),
    { persistent: true }, // Pesan tersimpan di disk agar aman dari server restart
  );

  console.log(`[Producer] Pesan dikirim ke antrean untuk: ${email}`);

  // 4. Berikan respons cepat ke pengguna
  return res.status(200).json({
      message: `Pendaftaran ${email} berhasil! Cek email Anda beberapa saat lagi.`,
  });
});

app.listen(3000, () => {
  console.log("Server API berjalan di http://localhost:3000");
});
