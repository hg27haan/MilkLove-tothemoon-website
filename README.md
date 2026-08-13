# MilkLove Hub — Editable React/Vite Edition

Đây là bản code độc lập lấy cảm hứng từ cấu trúc của MilkLove Hub, được thiết kế để bạn **dễ đổi ảnh và thêm nội dung** mà không phải sửa layout.

## 1. Chạy project

```bash
npm install
npm run dev
```

Mở URL Vite hiển thị, thường là:

```text
http://localhost:5173/
```

## 2. File cần chỉnh nhiều nhất

```text
src/data/siteData.js
```

Trong file này bạn có thể sửa:

- Tên website
- Hero / cover
- Countdown
- Profiles
- Works
- Schedule
- Stats
- Guide
- Social links

## 3. Đổi ảnh

Cho ảnh vào:

```text
public/images/
```

Ví dụ:

```text
public/images/milk.jpg
public/images/love.jpg
public/images/cover.jpg
```

Rồi đổi trong `src/data/siteData.js`:

```js
image: '/images/milk.jpg'
```

Hero:

```js
heroImage: '/images/cover.jpg'
```

## 4. Thêm một Work mới

Trong `works` của `src/data/siteData.js`, copy một object:

```js
{
  id: 7,
  year: '2026',
  category: 'Event',
  date: '20 Dec 2026',
  title: 'Tên sự kiện',
  roles: 'Thông tin thêm',
  image: '/images/event-new.jpg',
  tag: 'Event',
  url: '#',
},
```

Không cần sửa component.

## 5. Thêm profile mới

Copy một phần tử trong `profiles`, đổi `slug`, `name`, `image`, `facts`.

## 6. Deploy Vercel

Project đã có `vercel.json` để các route như `/works`, `/profiles/milk` chạy trực tiếp.

Có thể deploy bằng GitHub + Vercel hoặc Vercel CLI.

## 7. Cấu trúc chính

```text
src/
├── App.jsx
├── main.jsx
├── styles.css
├── data/
│   └── siteData.js        <- chỉnh nội dung ở đây
├── components/
│   ├── Layout.jsx
│   ├── Countdown.jsx
│   └── WorkCard.jsx
└── pages/
    ├── Home.jsx
    ├── Profiles.jsx
    ├── Works.jsx
    ├── Schedule.jsx
    ├── Stats.jsx
    ├── Guide.jsx
    └── Game.jsx
```

## Lưu ý

Các ảnh trong project hiện tại chỉ là placeholder SVG. Hãy thay bằng ảnh bạn có quyền sử dụng.
