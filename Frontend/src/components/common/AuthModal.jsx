import { useState } from 'react'
import { ArrowUpRight, AudioLines } from 'lucide-react'
import { Modal } from './Modal.jsx'

export function AuthModal({ mode, setMode, onClose, onSubmit }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [busy, setBusy] = useState(false)
  return (
    <Modal onClose={onClose}>
      <div className="modal-icon icon-purple">
        <AudioLines size={20} />
      </div>
      <h2>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
      <p>
        {mode === 'login'
          ? 'Sign in to keep your conversations connected.'
          : 'Start bringing your conversations closer.'}
      </p>
      <form
        onSubmit={async (event) => {
          event.preventDefault()
          setBusy(true)
          await onSubmit(form)
          setBusy(false)
        }}
      >
        {mode === 'register' && (
          <label className="field-label">
            Your name
            <input
              required
              placeholder="Alex Morgan"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
        )}
        <label className="field-label">
          Email address
          <input
            type="email"
            required
            placeholder="you@company.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </label>
        <label className="field-label">
          Password
          <input
            type="password"
            minLength="8"
            required
            placeholder="At least 8 characters"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </label>
        <button disabled={busy} className="button button-primary modal-submit" type="submit">
          {busy ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}{' '}
          <ArrowUpRight size={15} />
        </button>
      </form>
      <div className="auth-switch">
        {mode === 'login' ? 'New to Lingua?' : 'Already have an account?'}{' '}
        <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
          {mode === 'login' ? 'Create an account' : 'Sign in'}
        </button>
      </div>
    </Modal>
  )
}
