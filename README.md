# 📝 NotaMaker v7

Aplikasi nota/kwitansi PWA untuk UMKM Indonesia — 11 template nota, Firebase cloud sync, cetak ke semua jenis printer, dan auto-update tanpa reinstall.

## ✨ Fitur v7 (terbaru)
- 📲 **Tombol Pasang** langsung di header — install ke layar utama 1 tap
- 🔄 **Auto-update tanpa reinstall** — saat file GitHub diupdate, apps otomatis refresh dalam beberapa detik
- ☁️ **Tombol Sync** di user bar untuk sinkron cloud manual
- 🛡️ Security rules Firestore diperkuat
- 🐛 Semua bug kritis diperbaiki (auth duplikat, recycle bin, HTML struktur)

## Template Nota
- 🖥️ KAIROS Komputer (80mm)
- 📒 ROVINS ATK (58mm)
- 🛋️ LANCAR Furnitur (58mm)
- 🏪 Toko Laris Jaya (80mm)
- ⚡ Thomas Elektronik (80mm)
- 👕 Putra Megah Kaos (80mm)
- ⛽ SPBU Pertamina (58mm)
- 🛒 Token PLN Shopee/BL (80mm)
- 🟢 Token PLN Tokopedia (80mm)
- ⚡ Token PLN KHOLIDAHZA (80mm)
- 🖼️ Invoice/Banner A4

## Fitur Lengkap
- ✅ Preview & Export PDF/Excel/PNG/Word
- ✅ Print ke thermal printer (58mm/80mm) & Epson L-series
- ✅ Firebase Auth (login/register/reset password)
- ✅ Cloud sync dengan Firestore (auto-sync saat simpan)
- ✅ Recycle Bin (pulihkan nota terhapus)
- ✅ Kunci/Buka nota (prevent edit/hapus)
- ✅ Ganti nama & ubah tanggal nota
- ✅ Import dari foto/PDF/Excel/Word (AI-powered)
- ✅ PWA installable + auto-update

## Setup
Lihat [TUTORIAL.md](TUTORIAL.md) untuk panduan lengkap.

## Deploy
1. Upload semua file ke GitHub repository
2. Aktifkan GitHub Pages (Settings → Pages → main branch)
3. Isi Firebase config di `index.html` (cari `window.FIREBASE_CONFIG`)
4. Deploy Firestore rules: `firebase deploy --only firestore:rules`

## Versi
- v7 — Perbaikan menyeluruh, PWA install button, auto-update SW, Firestore rules
