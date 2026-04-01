# 📖 Tutorial Lengkap: Deploy NotaMaker ke GitHub + Firebase

## Daftar Isi
1. [Persiapan Awal](#1-persiapan-awal)
2. [Setup GitHub Repository](#2-setup-github-repository)
3. [Setup Firebase Project](#3-setup-firebase-project)
4. [Konfigurasi Firebase Auth](#4-konfigurasi-firebase-auth)
5. [Konfigurasi Firestore Database](#5-konfigurasi-firestore-database)
6. [Hubungkan Firebase ke NotaMaker](#6-hubungkan-firebase-ke-notamaker)
7. [Deploy ke GitHub Pages](#7-deploy-ke-github-pages)
8. [Deploy ke Netlify (Alternatif)](#8-deploy-ke-netlify-alternatif)
9. [Daftar Akun & Login](#9-daftar-akun--login)
10. [Panduan Penggunaan Fitur](#10-panduan-penggunaan-fitur)
11. [Troubleshooting](#11-troubleshooting)

---

## 1. Persiapan Awal

### Yang Dibutuhkan
- Komputer/laptop (atau HP dengan browser Chrome)
- Akun Google (untuk Firebase)
- Akun GitHub (gratis)
- File `index.html`, `sw.js`, `manifest.json` dari NotaMaker

### Install Git (Opsional, untuk GitHub Desktop alternatif)
- **Windows**: Download [git-scm.com](https://git-scm.com/download/win)
- **Mac**: `xcode-select --install` di Terminal
- **Linux**: `sudo apt install git`

---

## 2. Setup GitHub Repository

### Cara 1: GitHub Desktop (Lebih Mudah)

1. **Download GitHub Desktop** → [desktop.github.com](https://desktop.github.com)
2. Login dengan akun GitHub Anda
3. Klik **"Create a New Repository on your local machine"**
4. Isi:
   - **Name**: `notamaker` (atau nama lain)
   - **Description**: Aplikasi Nota & Kwitansi
   - ✅ **Initialize this repository with a README**
5. Klik **Create Repository**
6. Klik **"Show in Explorer"** → copy file NotaMaker ke folder tersebut:
   ```
   notamaker/
   ├── index.html
   ├── sw.js
   ├── manifest.json
   └── README.md
   ```
7. Kembali ke GitHub Desktop → klik **"Commit to main"**
8. Klik **"Publish repository"** → pastikan **"Keep this code private"** sesuai keinginan

### Cara 2: Via Browser (Termudah)

1. Buka [github.com](https://github.com) → Login
2. Klik tombol **"+"** → **"New repository"**
3. Isi nama repository: `notamaker`
4. Centang **"Add a README file"**
5. Klik **"Create repository"**
6. Di halaman repository, klik **"Add file"** → **"Upload files"**
7. Drag & drop file: `index.html`, `sw.js`, `manifest.json`
8. Klik **"Commit changes"**

---

## 3. Setup Firebase Project

1. Buka [console.firebase.google.com](https://console.firebase.google.com)
2. Klik **"Add project"** (atau **"Create a project"**)
3. Nama project: `notamaker-anda` (ganti sesuai keinginan)
4. **Disable Google Analytics** (tidak perlu untuk ini)
5. Klik **"Create project"** → tunggu selesai
6. Klik **"Continue"**

---

## 4. Konfigurasi Firebase Auth

1. Di Firebase Console, klik **"Authentication"** (menu kiri)
2. Klik **"Get started"**
3. Tab **"Sign-in method"** → pilih **"Email/Password"**
4. Aktifkan toggle **"Email/Password"** → **"Save"**

### Tambah User Admin (Anda sendiri)
1. Tab **"Users"** → **"Add user"**
2. Isi email dan password Anda
3. Klik **"Add user"**

> ⚠️ **Penting**: Jika ingin registrasi tertutup (hanya Anda yang bisa pakai),
> setelah membuat akun, matikan fitur registrasi via Firestore Rules.

---

## 5. Konfigurasi Firestore Database

1. Di Firebase Console, klik **"Firestore Database"** (menu kiri)
2. Klik **"Create database"**
3. Pilih **"Production mode"**
4. Pilih lokasi server terdekat → **"asia-southeast2"** (Jakarta) direkomendasikan
5. Klik **"Done"**

### Setup Security Rules
1. Tab **"Rules"** → ganti dengan:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User hanya bisa akses data milik sendiri
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Block semua akses lain
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

2. Klik **"Publish"**

---

## 6. Hubungkan Firebase ke NotaMaker

### Dapatkan Config Firebase

1. Di Firebase Console → klik ⚙️ **"Project settings"**
2. Tab **"General"** → scroll ke **"Your apps"**
3. Klik ikon **`</>`** (Web)
4. Isi **"App nickname"**: `NotaMaker Web`
5. **JANGAN** centang Firebase Hosting (kita pakai GitHub Pages)
6. Klik **"Register app"**
7. Copy kode config yang muncul:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "notamaker-xxx.firebaseapp.com",
  projectId: "notamaker-xxx",
  storageBucket: "notamaker-xxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

### Edit file index.html

1. Buka `index.html` dengan text editor (Notepad++, VS Code, dll.)
2. Cari baris:
   ```javascript
   window.FIREBASE_CONFIG = {
     apiKey: "YOUR_API_KEY",
   ```
3. Ganti **seluruh blok config** dengan config Firebase Anda:
   ```javascript
   window.FIREBASE_CONFIG = {
     apiKey: "AIzaSy...",          // ← ganti ini
     authDomain: "nama.firebaseapp.com",  // ← ganti ini
     projectId: "nama-project",   // ← ganti ini
     storageBucket: "nama.appspot.com",   // ← ganti ini
     messagingSenderId: "123456789",      // ← ganti ini
     appId: "1:xxx:web:yyy"       // ← ganti ini
   };
   ```
4. Simpan file

---

## 7. Deploy ke GitHub Pages

### Cara Upload File yang Sudah Diedit

1. Buka repository di [github.com](https://github.com)
2. Klik file `index.html` → klik ikon **✏️ edit**
3. Copy-paste seluruh isi file yang sudah diedit
4. Klik **"Commit changes"**

### Aktifkan GitHub Pages

1. Di repository, klik **"Settings"** (tab atas)
2. Scroll ke **"Pages"** (menu kiri)
3. **Source**: pilih **"Deploy from a branch"**
4. **Branch**: pilih **"main"** → folder **"/ (root)"**
5. Klik **"Save"**
6. Tunggu 2-3 menit → URL app Anda akan muncul:
   `https://username.github.io/notamaker/`

### Setup Domain Kustom (Opsional)
1. Di halaman Pages, isi **"Custom domain"**: `nota.domainanda.com`
2. Di DNS domain Anda, tambahkan CNAME record:
   - Name: `nota`
   - Value: `username.github.io`

---

## 8. Deploy ke Netlify (Alternatif Lebih Mudah)

1. Buka [app.netlify.com](https://app.netlify.com)
2. Login dengan GitHub
3. Klik **"Add new site"** → **"Import an existing project"**
4. Pilih **"GitHub"** → authorize Netlify
5. Pilih repository `notamaker`
6. Klik **"Deploy site"**
7. Selesai! URL otomatis: `https://random-name.netlify.app`

### Ubah URL Netlify
1. **Site settings** → **Domain management** → **"Options"** → **"Edit site name"**
2. Ganti jadi: `notamaker-anda.netlify.app`

### Auto Deploy
Setiap push ke GitHub → Netlify otomatis deploy ulang ✓

---

## 9. Daftar Akun & Login

### Daftar Akun Baru
1. Buka URL app Anda
2. Klik tab **"Daftar"**
3. Isi email dan password (min. 6 karakter)
4. Klik **"Daftar"**

### Login
1. Tab **"Masuk"**
2. Isi email + password
3. Klik **"Masuk"**

### Mode Lokal (Tanpa Login)
- Klik **"⚡ Gunakan Tanpa Login"**
- Data hanya tersimpan di browser, tidak sinkron antar device

### Lupa Password
1. Isi email di kolom email
2. Klik **"Lupa password? Kirim reset via email"**
3. Cek inbox → klik link reset

---

## 10. Panduan Penggunaan Fitur

### 📝 Buat Nota Baru
1. Pilih **Jenis Nota** (KAIROS, SPBU, PLN, dll.)
2. Pilih **Ukuran Cetak** (58mm, 80mm, A4, F4)
3. Isi form per bagian (buka tiap section)
4. Klik **💾 Simpan** atau **👁 Preview & Cetak**

### 👁 Preview & Export
- **📄 PDF**: Export file PDF siap cetak
- **📊 Excel**: Export ke .xlsx untuk diedit di spreadsheet
- **🖨 Print**: Print langsung ke printer
- **🖼 PNG**: Simpan sebagai gambar

### 📁 Halaman Tersimpan — Fitur Baru

| Tombol | Fungsi |
|--------|--------|
| ✏️ **Edit** | Buka nota ke editor untuk diubah |
| 👁 **Preview** | Lihat dan export nota |
| 📄 **PDF** | Export PDF langsung |
| ✏️ **Nama** | Ganti nama tampilan nota |
| 🔒 **Kunci** | Kunci nota agar tidak bisa diedit/hapus |
| 📅 **Tanggal** | Ubah tanggal dan tahun nota |
| 🗑 **Hapus** | Pindah ke Recycle Bin |

### 🗑 Recycle Bin
- Klik **"🗑 Recycle Bin"** di pojok halaman Tersimpan
- **♻️ Restore**: Kembalikan nota yang terhapus
- **✕ Hapus Permanen**: Hapus selamanya
- **Kosongkan Semua**: Hapus semua isi recycle bin

### ☁️ Sinkronisasi Cloud
- Klik **"☁️ Sync"** untuk sinkron data dengan Firebase
- Nota baru otomatis ter-upload saat disimpan (jika login)
- Badge **☁️ Cloud** = tersimpan di Firebase
- Badge **💾 Lokal** = hanya di browser

### 📅 Ubah Tanggal
1. Di Tersimpan, klik **"📅 Tanggal"** pada nota
2. Ubah tanggal, waktu, atau isi **Tahun Override**
3. **Tahun Override**: isi `2026` untuk ubah tahun tanpa ubah hari/bulan
4. Klik **Simpan**

---

## 11. Troubleshooting

### ❌ "Firebase not configured"
- Pastikan sudah ganti `YOUR_API_KEY` di `index.html`
- Cek tidak ada spasi/karakter aneh di config

### ❌ "Permission denied" di Firestore
- Cek Firestore Rules sudah di-publish
- Pastikan user sudah login

### ❌ Logo tidak muncul di PDF
- Gunakan browser Chrome atau Edge
- Pastikan koneksi internet aktif

### ❌ Printer tidak terdeteksi
- **58mm Bluetooth**: Pair dulu di Settings HP → lalu Print → pilih printer BT
- **80mm TM-T82X**: Pasang driver Epson → Print → pilih TM-T82X
- **L3110/L6290**: Pasang driver Epson → Print → pilih ukuran F4/A4

### ❌ Nota tidak sinkron
- Cek koneksi internet
- Klik manual **"☁️ Sync"**
- Cek Firestore Rules tidak salah

### ❌ App tidak bisa diinstall (PWA)
- Buka via HTTPS (GitHub Pages/Netlify otomatis HTTPS)
- Chrome: klik ikon install di address bar
- Firefox: Settings → Add to Home Screen

---

## Struktur Data Firebase

```
Firestore Database:
└── users/
    └── {userId}/
        ├── notas/
        │   └── {notaId}/
        │       ├── tpl: "kairos"
        │       ├── shopName: "..."
        │       ├── date: "2026-03-19"
        │       ├── items: [...]
        │       ├── _locked: false
        │       ├── _name: "Nama Custom"
        │       ├── _synced: true
        │       ├── savedAt: "2026-..."
        │       └── updatedAt: timestamp
        └── trash/
            └── {notaId}/
                └── (sama seperti notas + deletedAt)
```

---

## Tips & Best Practices

1. **Backup rutin**: Gunakan Export Excel untuk backup data penting
2. **Kunci nota penting**: Aktifkan 🔒 untuk nota yang sudah final
3. **Nama custom**: Beri nama deskriptif agar mudah dicari
4. **Sync berkala**: Klik Sync setiap selesai bekerja
5. **Multiple device**: Login dengan akun yang sama di HP lain → Sync
6. **Offline**: App tetap bisa dipakai offline, sync saat online kembali

---

## Kontak & Bantuan

Jika ada pertanyaan lebih lanjut, silakan tanyakan kembali.

---

*NotaMaker v6 — Dibuat dengan ❤️ untuk UMKM Indonesia*
