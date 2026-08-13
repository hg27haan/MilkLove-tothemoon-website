# MilkLove — tothemoon

Website **MilkLove - tothemoon**, lấy cảm hứng từ phong cách official fan site (Red Velvet JP). Đây là nơi tổng hợp profile, tác phẩm, lịch trình, tin tức và các dự án tothemoon — giao diện nhẹ, ấm, dễ duyệt trên cả desktop lẫn mobile.

> *Love you tothemoon and back*

---

## Tổng quan

Project là một single-page app React/Vite, deploy lên Vercel. Nội dung được quản lý qua trang **Admin** (`/admin`), đồng bộ qua Firebase Firestore khi đã cấu hình; nếu chưa có Firebase thì dùng dữ liệu mặc định + localStorage.

Trang chủ không phải nơi nhập nội dung riêng — **tin tức** và **lịch trình** trên homepage tự lấy từ cùng nguồn với `/news` và `/schedule`, sắp theo ngày mới nhất (6 tin, 4 sự kiện). Phần chỉnh riêng trên trang chủ chỉ gồm banner slider và countdown (có thể ẩn/hiện).

---

## Trang & chức năng

| Trang | Đường dẫn | Mô tả |
|-------|-----------|--------|
| Trang chủ | `/` | Banner, countdown, preview tin & lịch |
| Profile | `/profiles`, `/profiles/:slug` | Thông tin thành viên |
| Works | `/works` | Phim, series, sự kiện |
| Schedule | `/schedule` | Lịch sự kiện đầy đủ |
| News | `/news` | Tin tức đầy đủ |
| Project | `/project`, `/project/:slug` | Dự án fan, chi tiết nội bộ |
| Admin | `/admin` | Quản trị nội dung (yêu cầu đăng nhập) |

Hỗ trợ **song ngữ EN / VI** — chuyển đổi ngay trên header.

---

## Giao diện

Bảng màu 4 tone: xanh lá `#c0dbae`, hồng `#ffc5c4`, cam đậm `#f47447`, cam nhạt `#fcb567`. Layout dùng glass card, gradient nền, typography nhẹ — hướng tới cảm giác fan site chính thức nhưng vẫn mang dấu ấn riêng của tothemoon.

---

## Kiến trúc dữ liệu

```
Admin (/admin)
    │
    ├── Banner, Countdown          → chỉ ảnh hưởng trang chủ
    ├── News, Schedule             → /news, /schedule + preview trang chủ
    ├── Project, Profile, Works    → các trang tương ứng
    └── Settings                   → badge MỚI, cấu hình site
            │
            ▼
    Firebase Firestore  (hoặc localStorage khi dev offline)
            │
            ▼
    SiteDataContext  →  toàn bộ trang public
```

- **Badge MỚI** trên tin: tự hiện trong N ngày sau ngày đăng, hoặc bật thủ công từng tin.
- **Ảnh & media**: lưu trong `public/images/`, tham chiếu bằng đường dẫn `/images/...`.

---

## Công nghệ

| Lớp | Công nghệ |
|-----|-----------|
| Frontend | React, Vite |
| Styling | CSS thuần (`src/styles.css`) |
| Routing | Client-side (pathname) |
| Backend / DB | Firebase Firestore + Auth |
| Deploy | Vercel |

---

## Cấu trúc source (tóm tắt)

```
src/
├── pages/          Trang public + Admin
├── components/     Layout, slider, countdown, section title...
├── data/           Dữ liệu mặc định + SiteDataContext
├── i18n/           Bản dịch EN/VI
└── lib/            Firebase, parse ngày, logic preview trang chủ
```

Chi tiết cấu hình Firebase và deploy: xem [`FIREBASE_SETUP.md`](./FIREBASE_SETUP.md).

---

## Credit

**MilkLove — tothemoon** · Made by NahHuynh

Website fan-made, không liên kết chính thức với MilkLove hay agency quản lý nghệ sĩ.
