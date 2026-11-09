# 🎂 Website Ulang Tahun Interaktif (Dark Pink Aesthetic - Versi Upgrade) ✨💖

Website ucapan ulang tahun interaktif modern, elegan, dan estetik dengan nuansa warna **Dark Pink** (kombinasi *deep magenta*, *dark rose*, *burgundy/plum*, dan aksen *neon/soft pink*).

---

## 🌟 Fitur Utama & Interaktif

1. **Layar Pembuka (*Landing Overlay*)**:
   - Menampilkan modal pembuka bertuliskan *"Ada pesan spesial buat kamu... Klik untuk membuka ❤️"*.
   - Memicu interaksi awal pengguna agar musik latar otomatis langsung terputar (*bypass browser autoplay restriction*).

2. **Autoplay & Pemutar Musik dengan SFX (*Sound Effects*)**:
   - *Floating widget* musik dengan piringan hitam (*vinyl disc*) berputar dan animasi *soundwave equalizer*.
   - Dilengkapi efek suara interaktif bawaan (*Web Audio API*): suara klik tombol (*pop*), suara tiupan lilin (*whoosh*), dan kembang api/fanfare (*tada/cheering*).
   - Dilengkapi *lofi synthesizer melody fallback* sehingga musik tetap berbunyi merdu meski file MP3 belum ditambahkan.

3. **Animasi Kartu ala Spotify Wrapped**:
   - Tampilan kartu berseri (*carousel slide*) ala Spotify Wrapped dengan *story progress bars* di bagian atas.
   - Mendukung **gesture swipe** di layar HP (geser kanan/kiri) serta tombol Next/Prev dan indikator titik (*dots*).
   - Berisi statistik manis: *"365 Hari Bersama"*, *"Top Track of the Year: Suara Tawamu 🥰"*, *"Top Genre: 100% Menggemaskan 💖"*, dan *"Artis Terfavorit: KAMU 👑"*.

4. **Surat Ucapan Interaktif (*Amplop 3D & Typewriter Effect*)**:
   - Amplop 3D realistis dengan segel lilin hati (*wax seal*). Saat diklik, amplop terbuka dan kertas surat meluncur keluar.
   - Teks ucapan diketik otomatis huruf demi huruf (*typewriter animation*).
   - Dilengkapi tombol kontrol: **Percepat (2x)**, **Lewati Animasi (Skip)**, dan **Ketik Ulang**.
   - Otomatis menyemburkan konfeti saat surat selesai dibaca!

5. **Tiup Lilin Virtual & Efek Konfeti**:
   - Kue ulang tahun dengan lilin bercahaya dan api yang bergoyang.
   - Klik lilin atau tekan tombol **"Tiup Lilin 🕯️💨"**: api padam, asap mengepul, efek suara tiupan berbunyi, dan kembang api konfeti meledak meriah dari kedua sisi layar!

6. **Galeri Foto Kenangan (*Polaroid Grid & Lightbox Pop-up*)**:
   - Galeri foto polaroid estetik dengan stiker selotip (*washi tape*) dan sudut kemiringan unik.
   - Klik foto mana saja untuk membukanya dalam **Lightbox Modal** berukuran besar lengkap dengan caption ceritanya.

7. **Kotak Harapan & Doa (*Random Wish Generator*)**:
   - Tombol *"Klik untuk Ambil Doa Hari Ini"*, yang ketika diklik akan mengeluarkan kutipan doa/harapan manis secara acak (*random wish*) dengan animasi pop dan letupan konfeti mini.

8. **Tombol Balasan WhatsApp**:
   - Tombol *call-to-action* WhatsApp di bagian bawah yang otomatis mengarahkan ke chat WhatsApp dengan nomor dan pesan balasan terima kasih yang sudah terformat.

---

## 📁 Berkas yang Disediakan di `c:\web ultah`:
* [`index.html`](file:///c:/web%20ultah/index.html) — Struktur HTML modular (terhubung dengan `style.css` & `script.js`).
* [`style.css`](file:///c:/web%20ultah/style.css) — Desain warna Dark Pink, efek partikel, dan animasi transisi.
* [`script.js`](file:///c:/web%20ultah/script.js) — Logika swipe carousel, typewriter, tiup lilin, SFX, dan generator doa.
* [`all_in_one.html`](file:///c:/web%20ultah/all_in_one.html) — **Versi 1 File Standalone** (HTML, CSS, dan JS disatukan dalam satu file praktis, siap dikirim atau diunggah tanpa khawatir path file!).

---

## ✏️ Cara Mengubah Data (Nama, Pesan, Nomor WA, Foto, Musik):

Cukup buka file **`script.js`** (atau bagian `<script>` di `all_in_one.html`), lalu ubah objek `CONFIG` paling atas:

```javascript
const CONFIG = {
  receiverName: "Nama Pasangan / Sahabat", // Nama yang ultah
  senderName: "Nama Kamu ❤️",             // Nama kamu
  whatsappNumber: "628123456789",         // Nomor WhatsApp kamu (awalan 62)
  whatsappMessage: "Makasih banyak ya sayang...", // Pesan balasan WA
  letterText: `Tulis isi surat panjangmu di sini...`,
  randomWishes: [
    "Doa harapan 1...",
    "Doa harapan 2..."
  ]
};
```

### Mengganti Foto Galeri:
Buka file `index.html` (atau `all_in_one.html`), cari bagian `<div class="gallery-grid">`. Ganti atribut `data-img="..."`, `src="..."`, dan `data-caption="..."` dengan foto kalian.

### Memasukkan Lagu Sendiri:
Taruh file MP3 di folder `assets/` dan beri nama persis:
`assets/music.mp3`

---

## 🚀 Cara Menjalankan:
Klik ganda (*double click*) file **`index.html`** atau **`all_in_one.html`**, maka website langsung terbuka di browser HP maupun laptop!
