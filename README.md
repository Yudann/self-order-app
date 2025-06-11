

````md
# Self Service App

Aplikasi **Self Service Ordering** untuk pelanggan melakukan pemesanan makanan & minuman secara mandiri tanpa kasir. Cocok untuk digunakan di restoran, kafe, atau foodcourt.

---

## 📁 Struktur Project (Singkat)

Berikut adalah penjelasan singkat dari struktur folder yang ada:

- `src/app/` – Folder utama routing halaman (Next.js App Router).
  - `cart/` – Halaman keranjang.
  - `checkout/` – Halaman checkout.
  - `products/` – Halaman daftar produk.
- `src/components/` – Komponen UI reusable.
  - `fragments/` – Potongan UI untuk checkout, summary, dsb.
  - `templates/` – Template untuk item, footer, dll.
- `src/hooks/` – Custom hook seperti `useCart`.
- `src/lib/` – File utilitas dan konfigurasi axios.
- `src/repositories/` – Untuk pemanggilan API (fetching data).
- `src/services/` – Logic pemrosesan data.
- `src/types/` – TypeScript type definitions.

---

## 🚀 Cara Menjalankan Project

### 1. Clone Project
```bash
git clone https://github.com/Yudann/self-service-app.git
cd self-service-app
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Jalankan di Development

```bash
npm run dev
```

Aplikasi bisa diakses di [http://localhost:3000](http://localhost:3000)
dan karena aplikasi ini menggunakan backend dengan link [http://localhost:8081](http://localhost:8081)
Pastikan kamu juga udh running backend project nya ya
Link Github Backend :
[https://github.com/Yudann/self-services-app-backend](https://github.com/Yudann/self-services-app-backend)

---

## 📦 Build untuk Production

```bash
npm run build
npm start
```

---

## ⚙️ Teknologi yang Digunakan

* **Next.js App Router**
* **TypeScript**
* **Tailwind CSS**
* **Zustand** (untuk manajemen state cart)
* **Axios** (untuk komunikasi ke backend)

---

## 📌 Catatan

* Folder `.next/` akan otomatis dibuat saat build, isinya bisa dihapus jika terjadi error saat build.
* Data produk dan transaksi disiapkan dari backend (terpisah).

---

```
