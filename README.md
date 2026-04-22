# Smart Aquarium Web App 🐠

Sistem web cerdas untuk memonitor akuarium dan memberikan makan ikan secara otomatis maupun manual. Aplikasi ini dibangun untuk sistem IoT yang menggunakan sensor kualitas air (pH).

## Fitur Utama
- **Monitoring Kadar pH:** Menampilkan visualisasi tingkat keasaman (pH) air akuarium secara realtime (simulasi/mockup).
- **Manual Feeding:** Tombol interaktif untuk memberi makan ikan secara manual kapan saja.
- **Auto Schedule:** Fitur untuk menjadwalkan waktu makan ikan otomatis.
- **Sistem Keamanan:** Jika kadar pH air turun di bawah batas kritis (5,5), jadwal pemberian makan otomatis akan dinonaktifkan, dan akan muncul peringatan "Air keruh dengan kadar Ph di bawah 5,5, segera bersihkan akuarium".

## Teknologi
- [Vite](https://vitejs.dev/) - Build tool yang sangat cepat
- [React](https://react.dev/) - Library antarmuka
- [TypeScript](https://www.typescriptlang.org/) - Typings untuk JavaScript
- **Vanilla CSS** - Untuk styling yang clean, modern, dan premium
- [Lucide React](https://lucide.dev/) - Icon set

## Cara Instalasi

Pastikan Anda memiliki [Node.js](https://nodejs.org/) yang terinstal.

1. Clone repositori ini atau masuk ke direktori proyek.
2. Instal dependensi:
   ```bash
   npm install
   ```
3. Jalankan development server:
   ```bash
   npm run dev
   ```

## Penggunaan (Simulasi)
1. Buka browser pada alamat `http://localhost:5173`.
2. Klik tombol "Beri Makan Ikan" untuk menguji fungsi manual.
3. Tambahkan jadwal pada form "Jadwal Otomatis" (misal: "08:00").
4. Tombol "Simulasikan pH Rendah" (< 5.5) dapat digunakan untuk melihat bagaimana aplikasi menghentikan jadwal otomatis dan menampilkan notifikasi peringatan.

---
*Dikembangkan untuk mempermudah perawatan akuarium dengan sistem terotomatisasi dan peringatan dini.*
