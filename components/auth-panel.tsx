'use client'

import { FormEvent, useState } from 'react'
import { authClient } from '@/lib/auth-client'

export function AuthPanel({ onSuccess, onClose }: { onSuccess: () => void; onClose: () => void }) {
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  async function submit(event: FormEvent) { event.preventDefault(); setPending(true); setError(''); const result = mode === 'sign-in' ? await authClient.signIn.email({ email, password }) : await authClient.signUp.email({ email, password, name }); setPending(false); if (result.error) { setError('We could not complete that request. Check your details and try again.'); return }; onSuccess() }
  return <div className="modal-backdrop" onClick={onClose}><form className="report-modal auth-modal" onSubmit={submit} onClick={event => event.stopPropagation()}><div className="section-kicker">COMMUNITY IDENTITY</div><h2>{mode === 'sign-in' ? 'Welcome back' : 'Join the connector'}</h2><p className="auth-copy">{mode === 'sign-in' ? 'Sign in to publish and track your community reports.' : 'Create a free citizen account to make your street heard.'}</p>{mode === 'sign-up' && <label>Your name<input required value={name} onChange={event => setName(event.target.value)} placeholder="Asha Kumar" /></label>}<label>Email<input required type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" /></label><label>Password<input required minLength={8} type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="8+ characters" /></label>{error && <p className="form-error">{error}</p>}<button className="submit-report" disabled={pending}>{pending ? 'Connecting…' : mode === 'sign-in' ? 'Sign in' : 'Create account'} <span>→</span></button><button type="button" className="auth-switch" onClick={() => setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in')}>{mode === 'sign-in' ? 'Need an account? Sign up' : 'Already a member? Sign in'}</button></form></div>
}
