# Hướng dẫn Firebase + GitHub Deploy

Kiến trúc:
```
GitHub repo  →  Vercel/Netlify (host website)
                    ↓
              Firebase Firestore (lưu news, schedule, works...)
              Firebase Auth (bảo vệ trang admin)
```

---

## Bước 1: Tạo project Firebase

1. Vào [Firebase Console](https://console.firebase.google.com/)
2. **Add project** → đặt tên `milklove-tothemoon` (hoặc tên bạn thích)
3. Tắt Google Analytics nếu không cần → **Create project**

---

## Bước 2: Tạo Web App

1. Trong project → **Project Overview** → icon **Web** `</>`
2. App nickname: `MilkLove - tothemoon`
3. **Register app** → copy các giá trị config
4. Tạo file `.env` trong thư mục project (copy từ `.env.example`):

```env
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=milklove-tothemoon.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=milklove-tothemoon
VITE_FIREBASE_STORAGE_BUCKET=milklove-tothemoon.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

5. Chạy thử local:
```bash
npm run dev
```

---

## Bước 3: Bật Firestore Database

1. Firebase Console → **Build** → **Firestore Database**
2. **Create database** → chọn **Start in test mode** (tạm thời)
3. Location: `asia-southeast1` (Singapore, gần VN nhất)
4. **Enable**

---

## Bước 4: Bật Authentication (cho Admin)

1. Firebase Console → **Build** → **Authentication**
2. **Get started**
3. Tab **Sign-in method** → bật **Email/Password**
4. Tab **Users** → **Add user**:
   - Email: email admin của bạn
   - Password: mật khẩu admin

Đây là tài khoản dùng để đăng nhập `/admin`.

---

## Bước 5: Deploy Firestore Rules (bảo mật)

Cài Firebase CLI (chạy 1 lần):
```bash
npm install -g firebase-tools
firebase login
```

Trong thư mục project:
```bash
firebase use --add
# Chọn project milklove-tothemoon
firebase deploy --only firestore:rules,storage
```

Rules đã có sẵn trong repo:
- **Đọc**: ai cũng đọc được (visitor xem website)
- **Ghi**: chỉ admin đã đăng nhập

---

## Bước 6: Upload dữ liệu mặc định lên Firestore

1. Chạy `npm run dev` với file `.env` đã điền
2. Vào `http://localhost:5173/admin`
3. Đăng nhập bằng email/password admin (Bước 4)
4. Bấm **Lưu thay đổi** → dữ liệu mặc định được ghi lên Firestore

Hoặc tạo thủ công trong Firebase Console:
- Collection: `site`
- Document ID: `content`
- Paste JSON từ `src/data/siteData.js`

---

## Bước 7: Push code lên GitHub

```bash
git init
git add .
git commit -m "MilkLove - tothemoon with Firebase"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/milklove-tothemoon.git
git push -u origin main
```

**Lưu ý:** File `.env` không được push (đã có trong `.gitignore`).

---

## Bước 8: Deploy website qua Vercel (khuyên dùng)

GitHub Pages không hỗ trợ env vars tốt. **Vercel** miễn phí và tích hợp GitHub tốt.

1. Vào [vercel.com](https://vercel.com) → đăng nhập bằng GitHub
2. **Add New Project** → import repo `milklove-tothemoon`
3. Framework: **Vite** (tự detect)
4. **Environment Variables** → thêm 6 biến `VITE_FIREBASE_*` (giống file `.env`)
5. **Deploy**

Sau ~1 phút bạn có link: `https://milklove-tothemoon.vercel.app`

### Cấu hình SPA routing (quan trọng)

Tạo file `vercel.json` trong project:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## Bước 9: Kiểm tra sau deploy

1. Mở website public → thấy news, schedule từ Firebase
2. Vào `/admin` → đăng nhập → sửa 1 tin tức → **Lưu**
3. Refresh trang public → thấy thay đổi ngay (realtime)

---

## Quy trình cập nhật hàng ngày

1. Vào `your-site.vercel.app/admin`
2. Đăng nhập
3. Thêm/sửa News hoặc Schedule
4. **Lưu thay đổi**
5. Xong — không cần build lại, không cần push GitHub

Chỉ push GitHub khi bạn sửa **code** (giao diện, tính năng mới).

---

## Free tier Firebase có đủ không?

| Dịch vụ | Free tier | Đủ cho fan site? |
|---------|-----------|------------------|
| Firestore | 50K reads/ngày | Có (trừ khi viral) |
| Auth | 50K users/tháng | Có |
| Storage | 5GB | Có (nếu dùng link ảnh thay vì upload) |
| Vercel | 100GB bandwidth | Có |

---

## Troubleshooting

**"Không thể tải dữ liệu từ Firebase"**
→ Kiểm tra `.env` / env vars trên Vercel, Firestore đã bật chưa

**Admin không lưu được**
→ Đã deploy `firestore.rules` chưa? Đã đăng nhập chưa?

**Ảnh quá lớn không lưu được**
→ Dùng đường dẫn `/images/...` thay vì upload base64, hoặc host ảnh trên Firebase Storage

---

## Tóm tắt

| Việc | Công cụ |
|------|---------|
| Host website | GitHub + Vercel |
| Lưu nội dung | Firebase Firestore |
| Bảo vệ admin | Firebase Auth |
| Cập nhật news/schedule | `/admin` trên browser |
