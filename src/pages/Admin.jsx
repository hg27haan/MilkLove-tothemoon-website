import React, { useEffect, useState } from 'react'
import { useSiteData } from '../data/SiteDataContext'

const clone = value => JSON.parse(JSON.stringify(value))

async function compressImage(file) {
  if (!file.type.startsWith('image/')) throw new Error('Vui lòng chọn đúng định dạng ảnh.')
  const source = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
  const image = await new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = source
  })
  const max = 1600
  const scale = Math.min(1, max / Math.max(image.width, image.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(image.width * scale)
  canvas.height = Math.round(image.height * scale)
  canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL('image/webp', 0.82)
}

function Field({ label, value, onChange, multiline = false, type = 'text', hint }) {
  const Input = multiline ? 'textarea' : 'input'
  return (
    <label className="admin-field">
      <span>{label}</span>
      <Input type={type} value={value ?? ''} onChange={event => onChange(event.target.value)} />
      {hint && <small>{hint}</small>}
    </label>
  )
}

function ImageField({ label, value, onChange }) {
  const [error, setError] = useState('')
  const upload = async event => {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      setError('')
      onChange(await compressImage(file))
    } catch {
      setError('Không thể đọc ảnh này. Hãy thử JPG, PNG hoặc WebP.')
    }
    event.target.value = ''
  }

  return (
    <div className="admin-field admin-image-field">
      <span>{label}</span>
      <div className="admin-image-row">
        <div className="admin-image-preview">{value ? <img src={value} alt="Xem trước" /> : <span>Chưa có ảnh</span>}</div>
        <div>
          <label className="admin-upload">Chọn ảnh<input type="file" accept="image/*" onChange={upload} /></label>
          <p>Ảnh được tối ưu và lưu trên trình duyệt này.</p>
        </div>
      </div>
      <input value={value ?? ''} onChange={event => onChange(event.target.value)} placeholder="Hoặc dán đường dẫn ảnh" />
      {error && <small className="admin-error">{error}</small>}
    </div>
  )
}

function AdminLogin() {
  const { login } = useSiteData()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const submit = async event => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await login(email, password)
    } catch {
      setError('Email hoặc mật khẩu không đúng.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="admin-page">
      <div className="admin-login page-width">
        <span className="admin-kicker">MilkLove Hub</span>
        <h1>Đăng nhập Admin</h1>
        <p>Chỉ tài khoản admin mới được chỉnh sửa nội dung trên Firebase.</p>
        <form onSubmit={submit} className="admin-login-form">
          <Field label="Email" type="email" value={email} onChange={setEmail} />
          <Field label="Mật khẩu" type="password" value={password} onChange={setPassword} />
          {error && <p className="admin-error">{error}</p>}
          <button className="admin-save" type="submit" disabled={submitting}>
            {submitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </section>
  )
}

export function Admin() {
  const { data, saveData, resetData, isFirebaseEnabled, isAdmin, user, logout } = useSiteData()
  const [draft, setDraft] = useState(() => clone(data))
  const [tab, setTab] = useState('home')
  const [status, setStatus] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => setDraft(clone(data)), [data])

  if (isFirebaseEnabled && !isAdmin) return <AdminLogin />

  const setSite = (key, value) => setDraft(prev => ({ ...prev, site: { ...prev.site, [key]: value } }))
  const setCountdown = (key, value) => setDraft(prev => ({ ...prev, countdown: { ...prev.countdown, [key]: value } }))
  const updateItem = (group, index, key, value) => setDraft(prev => ({
    ...prev,
    [group]: prev[group].map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item),
  }))
  const removeItem = (group, index) => setDraft(prev => ({ ...prev, [group]: prev[group].filter((_, itemIndex) => itemIndex !== index) }))

  const save = async () => {
    setSaving(true)
    try {
      await saveData(draft)
      setStatus(isFirebaseEnabled ? 'Đã lưu lên Firebase. Mọi người sẽ thấy ngay.' : 'Đã lưu và cập nhật website.')
      window.setTimeout(() => setStatus(''), 4000)
    } catch (err) {
      setStatus(err.message || 'Không thể lưu. Hãy dùng ảnh nhỏ hơn hoặc đường dẫn ảnh.')
    } finally {
      setSaving(false)
    }
  }

  const reset = async () => {
    if (!window.confirm('Khôi phục toàn bộ nội dung mặc định?')) return
    try {
      await resetData()
      setStatus('Đã khôi phục nội dung mặc định.')
    } catch (err) {
      setStatus(err.message || 'Không thể khôi phục.')
    }
  }

  return (
    <section className="admin-page">
      <div className="admin-header page-width">
        <div><span className="admin-kicker">MilkLove Hub</span><h1>Quản trị nội dung</h1><p>{isFirebaseEnabled ? `Đang dùng Firebase · ${user?.email}` : 'Chế độ local — chưa kết nối Firebase'}</p></div>
        <div className="admin-header-actions">
          <a href="/" target="_blank" rel="noreferrer" className="admin-secondary">Xem website ↗</a>
          {isFirebaseEnabled && <button className="admin-secondary" onClick={logout}>Đăng xuất</button>}
          <button className="admin-save" onClick={save} disabled={saving}>{saving ? 'Đang lưu...' : 'Lưu thay đổi'}</button>
        </div>
      </div>

      <div className="admin-workspace page-width">
        <aside className="admin-sidebar">
          <button className={tab === 'home' ? 'active' : ''} onClick={() => setTab('home')}><span>01</span> Trang chủ</button>
          <button className={tab === 'news' ? 'active' : ''} onClick={() => setTab('news')}><span>02</span> Tin tức</button>
          <button className={tab === 'schedule' ? 'active' : ''} onClick={() => setTab('schedule')}><span>03</span> Lịch trình</button>
          <button className={tab === 'profiles' ? 'active' : ''} onClick={() => setTab('profiles')}><span>04</span> Hồ sơ</button>
          <button className={tab === 'works' ? 'active' : ''} onClick={() => setTab('works')}><span>05</span> Tác phẩm</button>
          <div className="admin-local-note"><strong>{isFirebaseEnabled ? 'Firebase' : 'Local'}</strong><p>{isFirebaseEnabled ? 'Nội dung lưu trên Firestore. Visitor đọc realtime, chỉ admin mới ghi được.' : 'Tạo file .env từ .env.example để kết nối Firebase.'}</p></div>
          <button className="admin-reset" onClick={reset}>Khôi phục mặc định</button>
        </aside>

        <div className="admin-content">
          {tab === 'home' && (
            <>
              <div className="admin-section-title"><span>01</span><div><h2>Thông tin trang chủ</h2><p>Tên thương hiệu, tiêu đề hero và sự kiện đếm ngược.</p></div></div>
              <div className="admin-panel">
                <div className="admin-grid two">
                  <Field label="Tên website" value={draft.site.name} onChange={value => setSite('name', value)} />
                  <Field label="Nhãn ngôn ngữ" value={draft.site.languageLabel} onChange={value => setSite('languageLabel', value)} />
                  <Field label="Dòng giới thiệu" value={draft.site.tagline} onChange={value => setSite('tagline', value)} />
                  <Field label="Nhãn ảnh hero" value={draft.site.heroLabel ?? 'MilkLove Family'} onChange={value => setSite('heroLabel', value)} />
                  <Field label="Tiêu đề dòng 1" value={draft.site.titleLine1} onChange={value => setSite('titleLine1', value)} />
                  <Field label="Tiêu đề dòng 2" value={draft.site.titleLine2} onChange={value => setSite('titleLine2', value)} />
                </div>
                <ImageField label="Ảnh hero" value={draft.site.heroImage} onChange={value => setSite('heroImage', value)} />
                <ImageField label="Logo" value={draft.site.logo} onChange={value => setSite('logo', value)} />
              </div>
              <div className="admin-panel">
                <h3>Countdown</h3>
                <div className="admin-grid two">
                  <Field label="Nhãn hiển thị" value={draft.countdown.label} onChange={value => setCountdown('label', value)} hint="VD: Countdown to MilkLove Fancon" />
                  <Field
                    label="Ngày giờ đích"
                    type="datetime-local"
                    value={draft.countdown.target?.slice(0, 16)}
                    onChange={value => setCountdown('target', value ? `${value}:00+07:00` : '')}
                    hint="Mặc định: 15/11/2026"
                  />
                </div>
              </div>
              <div className="admin-panel">
                <h3>Banner trang chủ</h3>
                <p style={{ color: '#69766e', fontSize: 12, marginBottom: 16 }}>Ảnh slider hiển thị ở đầu trang chủ (giống Red Velvet).</p>
                {(draft.banners || []).map((banner, index) => (
                  <div key={index} style={{ borderTop: '1px solid #d6dfd2', paddingTop: 16, marginTop: 16 }}>
                    <div className="admin-item-head"><h3>Banner {index + 1}</h3><button onClick={() => removeItem('banners', index)}>Xóa</button></div>
                    <ImageField label="Ảnh banner" value={banner.image} onChange={value => updateItem('banners', index, 'image', value)} />
                    <div className="admin-grid two">
                      <Field label="Liên kết" value={banner.url} onChange={value => updateItem('banners', index, 'url', value)} hint="/schedule hoặc https://..." />
                      <Field label="Mô tả (alt)" value={banner.alt} onChange={value => updateItem('banners', index, 'alt', value)} />
                    </div>
                  </div>
                ))}
                <button className="admin-add" style={{ marginTop: 12 }} onClick={() => setDraft(prev => ({ ...prev, banners: [...(prev.banners || []), { image: '', url: '/', alt: '' }] }))}>+ Thêm banner</button>
              </div>
              <div className="admin-panel">
                <h3>Chân trang</h3>
                <div className="admin-grid two">
                  <Field label="Ghi chú" value={draft.site.footerNote} onChange={value => setSite('footerNote', value)} />
                  <Field label="Bản quyền" value={draft.site.copyright} onChange={value => setSite('copyright', value)} />
                </div>
              </div>
            </>
          )}

          {tab === 'news' && (
            <>
              <div className="admin-section-title"><span>02</span><div><h2>Tin tức (What's New)</h2><p>Hiển thị ở trang chủ và trang News.</p></div><button className="admin-add" onClick={() => setDraft(prev => ({ ...prev, news: [...(prev.news || []), { id: Date.now(), title: 'Tin mới', date: '2026,08,13', image: '', isNew: true, url: '/news' }] }))}>+ Thêm tin</button></div>
              {(draft.news || []).map((item, index) => (
                <div className="admin-panel admin-item" key={item.id}>
                  <div className="admin-item-head"><h3>{item.title || `Tin ${index + 1}`}</h3><button onClick={() => removeItem('news', index)}>Xóa</button></div>
                  <Field label="Tiêu đề" value={item.title} onChange={value => updateItem('news', index, 'title', value)} />
                  <div className="admin-grid two">
                    <Field label="Ngày (YYYY,MM,DD)" value={item.date} onChange={value => updateItem('news', index, 'date', value)} />
                    <Field label="Liên kết" value={item.url} onChange={value => updateItem('news', index, 'url', value)} />
                  </div>
                  <label className="admin-field"><span>Đánh dấu NEW</span><input type="checkbox" checked={!!item.isNew} onChange={e => updateItem('news', index, 'isNew', e.target.checked)} /></label>
                  <ImageField label="Ảnh thumbnail" value={item.image} onChange={value => updateItem('news', index, 'image', value)} />
                </div>
              ))}
            </>
          )}

          {tab === 'schedule' && (
            <>
              <div className="admin-section-title"><span>03</span><div><h2>Lịch trình (Schedule)</h2><p>Hiển thị ở trang chủ và trang Schedule.</p></div><button className="admin-add" onClick={() => setDraft(prev => ({ ...prev, schedule: [...prev.schedule, { date: '1 Jan 2027', city: 'Bangkok', title: 'Sự kiện mới', type: 'Event' }] }))}>+ Thêm sự kiện</button></div>
              {draft.schedule.map((item, index) => (
                <div className="admin-panel admin-item" key={`${item.title}-${index}`}>
                  <div className="admin-item-head"><h3>{item.title || `Sự kiện ${index + 1}`}</h3><button onClick={() => removeItem('schedule', index)}>Xóa</button></div>
                  <div className="admin-grid two">
                    <Field label="Ngày" value={item.date} onChange={value => updateItem('schedule', index, 'date', value)} hint="VD: 15 Nov 2026" />
                    <Field label="Thành phố" value={item.city} onChange={value => updateItem('schedule', index, 'city', value)} />
                    <Field label="Tên sự kiện" value={item.title} onChange={value => updateItem('schedule', index, 'title', value)} />
                    <Field label="Loại" value={item.type} onChange={value => updateItem('schedule', index, 'type', value)} hint="Fancon, On Stage..." />
                  </div>
                </div>
              ))}
            </>
          )}

          {tab === 'profiles' && (
            <>
              <div className="admin-section-title"><span>04</span><div><h2>Hồ sơ nhân vật</h2><p>Chỉnh tên, mô tả, màu nền và ảnh đại diện.</p></div></div>
              {draft.profiles.map((profile, index) => (
                <div className="admin-panel admin-item" key={`${profile.slug}-${index}`}>
                  <div className="admin-item-head"><h3>{profile.name || `Hồ sơ ${index + 1}`}</h3><span>#{String(index + 1).padStart(2, '0')}</span></div>
                  <div className="admin-grid two">
                    <Field label="Tên hiển thị" value={profile.name} onChange={value => updateItem('profiles', index, 'name', value)} />
                    <Field label="Tên đầy đủ" value={profile.fullName} onChange={value => updateItem('profiles', index, 'fullName', value)} />
                    <Field label="Vai trò" value={profile.subtitle} onChange={value => updateItem('profiles', index, 'subtitle', value)} />
                    <Field label="Màu nền" type="color" value={profile.accent} onChange={value => updateItem('profiles', index, 'accent', value)} />
                  </div>
                  <Field label="Giới thiệu" multiline value={profile.bio} onChange={value => updateItem('profiles', index, 'bio', value)} />
                  <ImageField label="Ảnh đại diện" value={profile.image} onChange={value => updateItem('profiles', index, 'image', value)} />
                </div>
              ))}
            </>
          )}

          {tab === 'works' && (
            <>
              <div className="admin-section-title"><span>05</span><div><h2>Tác phẩm nổi bật</h2><p>Danh sách này xuất hiện ở trang chủ và trang Works.</p></div><button className="admin-add" onClick={() => setDraft(prev => ({ ...prev, works: [...prev.works, { id: Date.now(), year: '2026', category: 'Series', date: 'Soon', title: 'Tác phẩm mới', roles: '', image: '', tag: 'Featured', url: '#' }] }))}>+ Thêm tác phẩm</button></div>
              {draft.works.map((work, index) => (
                <div className="admin-panel admin-item" key={work.id}>
                  <div className="admin-item-head"><h3>{work.title || `Tác phẩm ${index + 1}`}</h3><button onClick={() => removeItem('works', index)}>Xóa</button></div>
                  <div className="admin-grid two">
                    <Field label="Tên tác phẩm" value={work.title} onChange={value => updateItem('works', index, 'title', value)} />
                    <Field label="Vai diễn / mô tả" value={work.roles} onChange={value => updateItem('works', index, 'roles', value)} />
                    <Field label="Thể loại" value={work.category} onChange={value => updateItem('works', index, 'category', value)} />
                    <Field label="Năm" value={work.year} onChange={value => updateItem('works', index, 'year', value)} />
                    <Field label="Ngày phát hành" value={work.date} onChange={value => updateItem('works', index, 'date', value)} />
                    <Field label="Nhãn" value={work.tag} onChange={value => updateItem('works', index, 'tag', value)} />
                  </div>
                  <ImageField label="Ảnh tác phẩm" value={work.image} onChange={value => updateItem('works', index, 'image', value)} />
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {status && <div className="admin-toast" role="status">{status}</div>}
    </section>
  )
}
