import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { siteData as defaultSiteData } from './siteData'
import { auth, db, isFirebaseEnabled } from '../lib/firebase'

const STORAGE_KEY = 'milklove-hub-content-v1'
const FIRESTORE_DOC = ['site', 'content']
const SiteDataContext = createContext(null)

function normalizeFact(fact) {
  if (Array.isArray(fact)) return { label: fact[0] ?? '', value: fact[1] ?? '' }
  return { label: fact?.label ?? '', value: fact?.value ?? '' }
}

function normalizeStat(stat) {
  if (Array.isArray(stat)) return { label: stat[0] ?? '', value: Number(stat[1] ?? 0) }
  return { label: stat?.label ?? '', value: Number(stat?.value ?? 0) }
}

function normalizeData(data) {
  const merged = { ...defaultSiteData, ...data }
  return {
    ...merged,
    profiles: (merged.profiles || []).map(profile => ({
      ...profile,
      facts: (profile.facts || []).map(normalizeFact),
    })),
    stats: (merged.stats || []).map(normalizeStat),
    projects: merged.projects || defaultSiteData.projects || [],
  }
}

function loadLocalData() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) return defaultSiteData
    return normalizeData(JSON.parse(saved))
  } catch {
    return defaultSiteData
  }
}

export function SiteDataProvider({ children }) {
  const [data, setData] = useState(defaultSiteData)
  const [loading, setLoading] = useState(isFirebaseEnabled)
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!isFirebaseEnabled) {
      setData(loadLocalData())
      setLoading(false)
      return undefined
    }

    const unsubscribeAuth = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
    })

    const docRef = doc(db, ...FIRESTORE_DOC)
    const unsubscribeData = onSnapshot(
      docRef,
      snapshot => {
        if (snapshot.exists()) {
          setData(normalizeData(snapshot.data()))
        } else {
          setData(defaultSiteData)
        }
        setLoading(false)
        setError('')
      },
      err => {
        console.error(err)
        setError('Không thể tải dữ liệu từ Firebase.')
        setData(loadLocalData())
        setLoading(false)
      }
    )

    return () => {
      unsubscribeAuth()
      unsubscribeData()
    }
  }, [])

  const value = useMemo(() => ({
    data,
    loading,
    error,
    user,
    isFirebaseEnabled,
    isAdmin: !isFirebaseEnabled || Boolean(user),

    async login(email, password) {
      if (!isFirebaseEnabled) return
      await signInWithEmailAndPassword(auth, email, password)
    },

    async logout() {
      if (!isFirebaseEnabled) return
      await signOut(auth)
    },

    async saveData(nextData) {
      const clean = normalizeData(nextData)
      if (isFirebaseEnabled) {
        if (!auth.currentUser) throw new Error('Bạn cần đăng nhập admin trước khi lưu.')
        await setDoc(doc(db, ...FIRESTORE_DOC), {
          ...clean,
          updatedAt: new Date().toISOString(),
        })
        setData(clean)
        return
      }

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(clean))
      setData(clean)
    },

    async resetData() {
      if (isFirebaseEnabled) {
        if (!auth.currentUser) throw new Error('Bạn cần đăng nhập admin trước khi reset.')
        await setDoc(doc(db, ...FIRESTORE_DOC), {
          ...defaultSiteData,
          updatedAt: new Date().toISOString(),
        })
        setData(defaultSiteData)
        return
      }

      window.localStorage.removeItem(STORAGE_KEY)
      setData(defaultSiteData)
    },
  }), [data, loading, error, user])

  if (loading) {
    return (
      <div className="loading-screen">
        <p className="wf">Loading...</p>
      </div>
    )
  }

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>
}

export function useSiteData() {
  const context = useContext(SiteDataContext)
  if (!context) throw new Error('useSiteData must be used inside SiteDataProvider')
  return context
}
