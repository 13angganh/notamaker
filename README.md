# 📝 NotaMaker v7.3

Aplikasi nota/kwitansi PWA untuk UMKM Indonesia — 11 template nota, Firebase cloud sync, cetak ke semua jenis printer, edit langsung di preview, dan auto-update tanpa reinstall.

## ✨ Fitur Terbaru (v7.3)

- ✏️ **Edit Mode di Preview** — klik langsung teks di struk untuk edit, muncul input floating tepat di atasnya
- ⊞ **Split View** — editor dan preview tampil berdampingan di tablet/desktop
- 📱 **Auto landscape split** — putar HP ke landscape, otomatis tampil split view
- 🖨️ **SPBU Pertamina** — No. Trans dan jam sekarang sejajar rapi seperti struk asli
- 🟢 **PLN Tokopedia** — Jenis Layanan support Enter/multiline agar lebih rapi
- 🖼️ **PLN Abia** — logo Bukalapak lebih besar (default 40px), tetap bisa diatur
- 📄 **Banner Invoice** — label meta (Nomor, Tanggal, Kasir, Terms) sekarang sejajar tabel, format tanggal diperbaiki

## ✨ Fitur v7.2

- ⚙️ **Panel Layout** — atur ukuran logo, font, line height, dan padding per template langsung dari app
- 👋 **Layar Selamat Datang Kembali** — jika sudah pernah login, muncul layar konfirmasi sebelum masuk
- ☁️ **Layout Prefs sync Firebase** — pengaturan tampilan ikut tersimpan di cloud
- 🔁 **Sync lebih andal** — retry otomatis 3x, validasi data sebelum upload, pesan error lebih jelas
- 🔴 **PLN Abia** — garis pemisah full-width + titik dua sejajar 3 kolom
- 🟢 **PLN Tokopedia** — garis pemisah full-width + titik dua sejajar rapi

## ✨ Fitur v7.1

- 🐛 Fix `SyntaxError` kritis yang menyebabkan seluruh fungsi auth tidak terdefinisi
- 🐛 Fix `onLogout is not defined` dari Firebase module
- 🐛 Fix `initFirebase()` → nama fungsi yang benar `initFB()`
- 🐛 Fix `#main-app` tidak tampil setelah login
- 🐛 Fix `onLogin`/`onLogout` tidak bisa diakses dari ES module scope

## ✨ Fitur v7

- 📲 **Tombol Pasang** langsung di header — install ke layar utama 1 tap
- 🔄 **Auto-update tanpa reinstall** — saat file GitHub diupdate, apps otomatis refresh
- ☁️ **Tombol Sync** di user bar untuk sinkron cloud manual
- 🛡️ Security rules Firestore diperkuat
- 🐛 Perbaikan bug auth duplikat, recycle bin, dan struktur HTML

---

## Template Nota

| Template | Ukuran | Keterangan |
|----------|--------|------------|
| 🖥️ KAIROS Komputer | 80mm | Toko komputer & elektronik |
| 📒 ROVINS ATK | 58mm | ATK, kelontong kecil |
| 🛋️ LANCAR Furnitur | 58mm | Furnitur, material |
| 🏪 Toko Laris Jaya | 80mm | Toko umum, lampu, barang |
| ⚡ Thomas Elektronik | 80mm | Elektronik, Merchant Copy |
| 👕 Putra Megah Kaos | 80mm | Pakaian, seragam, kaos |
| ⛽ SPBU Pertamina | 58mm | Struk bahan bakar BBM |
| 🛒 Token PLN Abia (Shopee/BL) | 80mm | Mitra Bukalapak/Shopee |
| 🟢 Token PLN Tokopedia | 80mm | VINA — Courier New |
| ⚡ Token PLN KHOLIDAHZA | 80mm | Struk Pembayaran Token PLN |
| 🖼️ Invoice/Banner A4 | A4/F4 | Invoice formal + TTD |

---

## Fitur Lengkap

- ✅ Preview & Export PDF / Excel / PNG / Word
- ✅ Print ke thermal printer (58mm/80mm) & Epson L-series
- ✅ **Edit Mode** — klik teks di preview, edit langsung dengan floating input
- ✅ **Split View** — editor + preview berdampingan (landscape / desktop)
- ✅ **Panel Layout** — atur ukuran logo, font size, line height, padding per template
- ✅ Firebase Auth (login / register / reset password)
- ✅ Layar "Selamat Datang Kembali" — konfirmasi sebelum masuk jika sudah login
- ✅ Cloud sync dengan Firestore (auto-sync saat simpan, retry otomatis)
- ✅ Layout preferences ikut sync ke cloud
- ✅ Recycle Bin (pulihkan nota terhapus)
- ✅ Kunci/Buka nota (prevent edit/hapus)
- ✅ Ganti nama & ubah tanggal nota
- ✅ Import dari foto/PDF/Excel/Word (AI-powered)
- ✅ PWA installable + auto-update tanpa hard refresh

---

## File yang Perlu Diupload ke GitHub

| File | Keterangan |
|------|-----------|
| `index.html` | Aplikasi utama — update setiap versi |
| `sw.js` | Service Worker — update jika versi SW berubah |
| `manifest.json` | PWA manifest — jarang berubah |
| `firestore.rules` | Security rules Firestore |

---

## Setup & Deploy

Lihat [TUTORIAL.md](TUTORIAL.md) untuk panduan lengkap setup Firebase, GitHub Pages, dan Netlify.

**Ringkasan cepat:**
1. Upload semua file ke GitHub repository
2. Aktifkan GitHub Pages — Settings → Pages → main branch
3. Isi Firebase config di `index.html` (cari `window.FIREBASE_CONFIG`)
4. Deploy Firestore rules: `firebase deploy --only firestore:rules`

---

## Cara Pakai Fitur Edit Mode

1. Buka tab **Preview**
2. Tekan tombol **✏️ Edit**
3. Klik teks apapun di struk yang ingin diubah
4. Input floating muncul — ketik perubahan
5. Tekan **✓ Simpan** atau Enter — preview langsung update

**Field yang bisa diedit langsung:** nama toko, alamat, telepon, nomor nota, nama pelanggan, kasir, footer, catatan, nama outlet PLN/SPBU, judul struk, dan lainnya.

**Field yang tidak bisa diedit dari preview** (karena kalkulasi otomatis): total, subtotal, kembalian, PPN, PPJ.

---

## Cara Pakai Split View

1. Buka tab **Preview**
2. Tekan tombol **⊞ Split**
3. Editor dan preview tampil berdampingan
4. Atau: putar HP ke **landscape** — split view aktif otomatis

---

## Catatan Firebase Config

```javascript
window.FIREBASE_CONFIG = {
  apiKey: "...",
  authDomain: "nama-project.firebaseapp.com",
  projectId: "nama-project",
  storageBucket: "nama-project.firebasestorage.app",  // format baru Firebase — normal
  messagingSenderId: "...",
  appId: "..."
};
```

Format `storageBucket` dengan `.firebasestorage.app` adalah format baru Firebase dan sudah benar.

---

## Riwayat Versi

| Versi | Tanggal | Ringkasan |
|-------|---------|-----------|
| **v7.3** | Apr 2026 | Edit Mode preview, Split View landscape, fix SPBU/PLN/Banner |
| **v7.2** | Apr 2026 | Panel Layout, Welcome Back screen, sync lebih andal, fix PLN separator |
| **v7.1** | Apr 2026 | Fix SyntaxError kritis, fix auth functions, fix main-app tidak tampil |
| **v7** | Mar 2026 | PWA install button, auto-update SW, Firestore rules diperkuat |
