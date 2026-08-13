import React, { useEffect, useState } from 'react'
import { useSiteData } from '../data/SiteDataContext'

const clone = value => JSON.parse(JSON.stringify(value))

const ADMIN_PAGES = [
  {
    id: 'home',
    label: 'Trang chủ',
    path: '/',
    desc: 'Banner cuộn, countdown, preview News & Schedule',
    sections: ['Banner slider', 'Countdown'],
  },
  {
    id: 'news',
    label: 'News',
    path: '/news',
    desc: 'Danh sách tin tức — hiện ở trang News và preview trang chủ',
    sections: ['Tin tức'],
  },
  {
    id: 'schedule',
    label: 'Schedule',
    path: '/schedule',
    desc: 'Lịch sự kiện — hiện ở trang Schedule và preview trang chủ',
    sections: ['Sự kiện'],
  },
  {
    id: 'profiles',
    label: 'Profile',
    path: '/profiles',
    desc: 'Hồ sơ Milk, Love, MuvMuv',
    sections: ['Nhân vật'],
  },
  {
    id: 'works',
    label: 'Works',
    path: '/works',
    desc: 'Danh sách phim/series và thống kê',
    sections: ['Tác phẩm', 'Thống kê'],
  },
  {
    id: 'settings',
    label: 'Cài đặt chung',
    path: '/',
    desc: 'Logo, tên site, footer, mạng xã hội — áp dụng toàn website',
    sections: ['Thương hiệu', 'Footer', 'Social'],
  },
]

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
          <p>Hoặc dùng đường dẫn: /images/ten-file.jpg</p>
        </div>
      </div>
      <input value={value ?? ''} onChange={event => onChange(event.target.value)} placeholder="/images/..." />
      {error && <small className="admin-error">{error}</small>}
    </div>
  )
}

function PageHeader({ page, itemCount }) {
  return (
    <div className="admin-page-header">
      <div className="admin-page-badge">
        <span className="admin-page-badge-label">Đang chỉnh trang</span>
        <strong>{page.label}</strong>
        <code>{page.path}</code>
      </div>
      <div className="admin-page-meta">
        <p>{page.desc}</p>
        {itemCount != null && <span className="admin-page-count">{itemCount} mục</span>}
        <a href={page.path} target="_blank" rel="noreferrer" className="admin-preview-link">
          Xem trang này ↗
        </a>
      </div>
    </div>
  )
}

function SectionBlock({ title, hint, children, action }) {
  return (
    <div className="admin-panel">
      <div className="admin-panel-top">
        <div>
          <h3>{title}</h3>
          {hint && <p className="admin-panel-hint">{hint}</p>}
        </div>
        {action}
      </div>
      {children}
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

  const currentPage = ADMIN_PAGES.find(page => page.id === tab) || ADMIN_PAGES[0]

  const setSite = (key, value) => setDraft(prev => ({ ...prev, site: { ...prev.site, [key]: value } }))
  const setCountdown = (key, value) => setDraft(prev => ({ ...prev, countdown: { ...prev.countdown, [key]: value } }))
  const updateItem = (group, index, key, value) => setDraft(prev => ({
    ...prev,
    [group]: prev[group].map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item),
  }))
  const removeItem = (group, index) => setDraft(prev => ({ ...prev, [group]: prev[group].filter((_, itemIndex) => itemIndex !== index) }))
  const updateProfileFact = (profileIndex, factIndex, key, value) => setDraft(prev => ({
    ...prev,
    profiles: prev.profiles.map((profile, i) => {
      if (i !== profileIndex) return profile
      const facts = profile.facts.map((fact, fi) => fi === factIndex ? { ...fact, [key]: value } : fact)
      return { ...profile, facts }
    }),
  }))

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

  const itemCounts = {
    home: draft.banners?.length || 0,
    news: draft.news?.length || 0,
    schedule: draft.schedule?.length || 0,
    profiles: draft.profiles?.length || 0,
    works: draft.works?.length || 0,
  }

  return (
    <section className="admin-page">
      <div className="admin-header page-width">
        <div>
          <span className="admin-kicker">MilkLove Hub</span>
          <h1>Quản trị nội dung</h1>
          <p>{isFirebaseEnabled ? `Firebase · ${user?.email}` : 'Chế độ local'}</p>
        </div>
        <div className="admin-header-actions">
          <a href="/" target="_blank" rel="noreferrer" className="admin-secondary">Xem website ↗</a>
          {isFirebaseEnabled && <button className="admin-secondary" onClick={logout}>Đăng xuất</button>}
          <button className="admin-save" onClick={save} disabled={saving}>{saving ? 'Đang lưu...' : 'Lưu tất cả'}</button>
        </div>
      </div>

      <div className="admin-workspace page-width">
        <aside className="admin-sidebar">
          <p className="admin-sidebar-title">Trang trên website</p>
          {ADMIN_PAGES.map(page => (
            <button
              key={page.id}
              className={tab === page.id ? 'active' : ''}
              onClick={() => setTab(page.id)}
            >
              <span className="admin-nav-path">{page.path}</span>
              <span className="admin-nav-label">{page.label}</span>
              {page.id !== 'settings' && page.id !== 'home' && (
                <span className="admin-nav-count">{itemCounts[page.id]}</span>
              )}
            </button>
          ))}
          <div className="admin-local-note">
            <strong>{isFirebaseEnabled ? 'Firebase' : 'Local'}</strong>
            <p>Chọn trang bên trái → chỉnh nội dung → Lưu tất cả.</p>
          </div>
          <button className="admin-reset" onClick={reset}>Khôi phục mặc định</button>
        </aside>

        <div className="admin-content">
          <PageHeader page={currentPage} itemCount={itemCounts[tab]} />

          {tab === 'home' && (
            <>
              <SectionBlock title="Banner slider" hint="Ảnh cuộn ở đầu trang chủ (/)">
                {(draft.banners || []).map((banner, index) => (
                  <div key={index} className="admin-sub-item">
                    <div className="admin-item-head"><h4>Banner {index + 1}</h4><button onClick={() => removeItem('banners', index)}>Xóa</button></div>
                    <ImageField label="Ảnh" value={banner.image} onChange={value => updateItem('banners', index, 'image', value)} />
                    <div className="admin-grid two">
                      <Field label="Liên kết" value={banner.url} onChange={value => updateItem('banners', index, 'url', value)} />
                      <Field label="Mô tả (alt)" value={banner.alt} onChange={value => updateItem('banners', index, 'alt', value)} />
                    </div>
                  </div>
                ))}
                <button className="admin-add" onClick={() => setDraft(prev => ({ ...prev, banners: [...(prev.banners || []), { image: '', url: '/', alt: '' }] }))}>+ Thêm banner</button>
              </SectionBlock>

              <SectionBlock title="Countdown" hint="Đồng hồ đếm ngược trên trang chủ (/)">
                <div className="admin-grid two">
                  <Field label="Nhãn hiển thị" value={draft.countdown.label} onChange={value => setCountdown('label', value)} />
                  <Field
                    label="Ngày giờ đích"
                    type="datetime-local"
                    value={draft.countdown.target?.slice(0, 16)}
                    onChange={value => setCountdown('target', value ? `${value}:00+07:00` : '')}
                  />
                </div>
              </SectionBlock>

              <div className="admin-info-box">
                <strong>Trang chủ còn hiển thị:</strong>
                <ul>
                  <li><button type="button" onClick={() => setTab('news')}>News</button> — preview 6 tin mới nhất</li>
                  <li><button type="button" onClick={() => setTab('schedule')}>Schedule</button> — preview 4 sự kiện</li>
                </ul>
              </div>
            </>
          )}

          {tab === 'news' && (
            <SectionBlock
              title="Danh sách tin tức"
              hint="Hiển thị tại /news và preview ở trang chủ"
              action={<button className="admin-add" onClick={() => setDraft(prev => ({ ...prev, news: [...(prev.news || []), { id: Date.now(), title: 'Tin mới', date: '2026,08,13', image: '', isNew: true, url: '/news' }] }))}>+ Thêm tin</button>}
            >
              {(draft.news || []).map((item, index) => (
                <div className="admin-sub-item" key={item.id}>
                  <div className="admin-item-head"><h4>{item.title || `Tin ${index + 1}`}</h4><button onClick={() => removeItem('news', index)}>Xóa</button></div>
                  <Field label="Tiêu đề" value={item.title} onChange={value => updateItem('news', index, 'title', value)} />
                  <div className="admin-grid two">
                    <Field label="Ngày (YYYY,MM,DD)" value={item.date} onChange={value => updateItem('news', index, 'date', value)} />
                    <Field label="Liên kết" value={item.url} onChange={value => updateItem('news', index, 'url', value)} />
                  </div>
                  <label className="admin-field"><span>Đánh dấu NEW</span><input type="checkbox" checked={!!item.isNew} onChange={e => updateItem('news', index, 'isNew', e.target.checked)} /></label>
                  <ImageField label="Ảnh thumbnail" value={item.image} onChange={value => updateItem('news', index, 'image', value)} />
                </div>
              ))}
            </SectionBlock>
          )}

          {tab === 'schedule' && (
            <SectionBlock
              title="Lịch sự kiện"
              hint="Hiển thị tại /schedule và preview ở trang chủ"
              action={<button className="admin-add" onClick={() => setDraft(prev => ({ ...prev, schedule: [...prev.schedule, { date: '1 Jan 2027', city: 'Bangkok', title: 'Sự kiện mới', type: 'Event' }] }))}>+ Thêm sự kiện</button>}
            >
              {draft.schedule.map((item, index) => (
                <div className="admin-sub-item" key={`${item.title}-${index}`}>
                  <div className="admin-item-head"><h4>{item.title || `Sự kiện ${index + 1}`}</h4><button onClick={() => removeItem('schedule', index)}>Xóa</button></div>
                  <div className="admin-grid two">
                    <Field label="Ngày" value={item.date} onChange={value => updateItem('schedule', index, 'date', value)} />
                    <Field label="Thành phố" value={item.city} onChange={value => updateItem('schedule', index, 'city', value)} />
                    <Field label="Tên sự kiện" value={item.title} onChange={value => updateItem('schedule', index, 'title', value)} />
                    <Field label="Loại" value={item.type} onChange={value => updateItem('schedule', index, 'type', value)} hint="Fancon, On Stage..." />
                  </div>
                </div>
              ))}
            </SectionBlock>
          )}

          {tab === 'profiles' && (
            <SectionBlock title="Hồ sơ nhân vật" hint="Hiển thị tại /profiles và /profiles/[tên]">
              {draft.profiles.map((profile, index) => (
                <div className="admin-sub-item" key={`${profile.slug}-${index}`}>
                  <div className="admin-item-head">
                    <h4>{profile.name || `Hồ sơ ${index + 1}`}</h4>
                    <span className="admin-slug">/profiles/{profile.slug}</span>
                  </div>
                  <div className="admin-grid two">
                    <Field label="Tên hiển thị" value={profile.name} onChange={value => updateItem('profiles', index, 'name', value)} />
                    <Field label="Slug (URL)" value={profile.slug} onChange={value => updateItem('profiles', index, 'slug', value)} hint="VD: milk, love" />
                    <Field label="Tên đầy đủ" value={profile.fullName} onChange={value => updateItem('profiles', index, 'fullName', value)} />
                    <Field label="Vai trò" value={profile.subtitle} onChange={value => updateItem('profiles', index, 'subtitle', value)} />
                    <Field label="Màu nền" type="color" value={profile.accent} onChange={value => updateItem('profiles', index, 'accent', value)} />
                  </div>
                  <Field label="Giới thiệu" multiline value={profile.bio} onChange={value => updateItem('profiles', index, 'bio', value)} />
                  <ImageField label="Ảnh đại diện" value={profile.image} onChange={value => updateItem('profiles', index, 'image', value)} />
                  <p className="admin-panel-hint">Thông tin chi tiết</p>
                  {profile.facts.map((fact, factIndex) => (
                    <div className="admin-grid two" key={factIndex}>
                      <Field label="Nhãn" value={fact.label} onChange={value => updateProfileFact(index, factIndex, 'label', value)} />
                      <Field label="Giá trị" value={fact.value} onChange={value => updateProfileFact(index, factIndex, 'value', value)} />
                    </div>
                  ))}
                </div>
              ))}
            </SectionBlock>
          )}

          {tab === 'works' && (
            <>
              <SectionBlock
                title="Tác phẩm"
                hint="Hiển thị tại /works"
                action={<button className="admin-add" onClick={() => setDraft(prev => ({ ...prev, works: [...prev.works, { id: Date.now(), year: '2026', category: 'Series', date: 'Soon', title: 'Tác phẩm mới', roles: '', image: '', tag: 'Featured', url: '#' }] }))}>+ Thêm tác phẩm</button>}
              >
                {draft.works.map((work, index) => (
                  <div className="admin-sub-item" key={work.id}>
                    <div className="admin-item-head"><h4>{work.title || `Tác phẩm ${index + 1}`}</h4><button onClick={() => removeItem('works', index)}>Xóa</button></div>
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
              </SectionBlock>

              <SectionBlock title="Thống kê" hint="Dải số hiển thị đầu trang /works">
                {draft.stats.map((stat, index) => (
                  <div className="admin-grid two admin-sub-item" key={stat.label}>
                    <Field label="Nhãn" value={stat.label} onChange={value => setDraft(prev => ({
                      ...prev,
                      stats: prev.stats.map((s, i) => i === index ? { ...s, label: value } : s),
                    }))} />
                    <Field label="Số" type="number" value={stat.value} onChange={value => setDraft(prev => ({
                      ...prev,
                      stats: prev.stats.map((s, i) => i === index ? { ...s, value: Number(value) } : s),
                    }))} />
                  </div>
                ))}
              </SectionBlock>
            </>
          )}

          {tab === 'settings' && (
            <>
              <SectionBlock title="Thương hiệu" hint="Logo header — hiển thị trên mọi trang">
                <div className="admin-grid two">
                  <Field label="Tên website" value={draft.site.name} onChange={value => setSite('name', value)} />
                  <Field label="Nhãn ngôn ngữ" value={draft.site.languageLabel} onChange={value => setSite('languageLabel', value)} />
                  <Field label="Dòng giới thiệu" value={draft.site.tagline} onChange={value => setSite('tagline', value)} />
                </div>
                <ImageField label="Logo" value={draft.site.logo} onChange={value => setSite('logo', value)} />
              </SectionBlock>

              <SectionBlock title="Footer" hint="Chân trang — mọi trang">
                <div className="admin-grid two">
                  <Field label="Ghi chú" value={draft.site.footerNote} onChange={value => setSite('footerNote', value)} />
                  <Field label="Bản quyền" value={draft.site.copyright} onChange={value => setSite('copyright', value)} />
                </div>
              </SectionBlock>

              <SectionBlock
                title="Mạng xã hội"
                hint="Icon góc phải header + footer"
                action={<button className="admin-add" onClick={() => setDraft(prev => ({ ...prev, socials: [...prev.socials, { label: 'Mới', url: '#', icon: 'facebook' }] }))}>+ Thêm</button>}
              >
                {draft.socials.map((social, index) => (
                  <div className="admin-sub-item" key={index}>
                    <div className="admin-item-head"><h4>{social.label}</h4><button onClick={() => removeItem('socials', index)}>Xóa</button></div>
                    <div className="admin-grid two">
                      <Field label="Tên" value={social.label} onChange={value => updateItem('socials', index, 'label', value)} />
                      <Field label="URL" value={social.url} onChange={value => updateItem('socials', index, 'url', value)} />
                      <Field label="Icon" value={social.icon} onChange={value => updateItem('socials', index, 'icon', value)} hint="facebook, twitter, instagram, tiktok" />
                    </div>
                  </div>
                ))}
              </SectionBlock>
            </>
          )}
        </div>
      </div>

      {status && <div className="admin-toast" role="status">{status}</div>}
    </section>
  )
}
