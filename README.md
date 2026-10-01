# message-broker-email

message broker di gunakan untuk menampung pesan (perantara pesan) <br/>
contohnya  seperti code ini, jadi saat user mengirim email lewat login / registrasi<br/>
Server backend menyimpan akun ke database, lalu mengirim pesan singkat ke broke<br/>
Website langsung merespons ke layar pengguna: "Pendaftaran Berhasil! Cek email Anda." dengan cepat<br/>
tujuannya jika terdapat 1000 user melakukan registrasi secara bersamaan website tetap melakukan respons dengan cepat <br/>
tanpa ada lonjakan trafik di database / server, karena lonjakan di tampung di antrian message broker, tidak lanngsung ke server<br/> 

#Berikut langkah langkahnya <br/>
1. buat folder project nya dulu <br/>
2. buka termminal, jalankan ( npm init -y, npm install amqplib express )
3. untuk pengujian jalankan di terminal 1 (node src/worker.js) 
4. untuk pengujian jalankan di terminal 2 (node src/api.js)
5. test kirim datanya lewat postman / thunder client
6. ling api : http://localhost:3000/register
7. stting geadernya Content-Type: application/json
8. isi body nya {"name": "anggi", "email": "anggi@example.com"}

# message broker 
1. RabbitMQ
2. Apache Kafka
3. Redis Pub/Sub
4. Amazon SQS / Google Cloud Pub/Sub
    contoh google cloud yang bisa di pake api.cloudamqp.com,
   bisa daftar dan coba yang layanan gratis
         
