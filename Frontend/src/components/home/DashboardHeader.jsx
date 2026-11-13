import { ArrowDownLeft, ArrowUpRight, Plus, ShieldCheck } from 'lucide-react'

export default function DashboardHeader({ user, onCreate, onJoin, onAuth }) {
  return (
    <>
      <div className="welcome-row">
        <div>
          <div className="eyebrow">
            <span className="status-dot" /> TUESDAY, NOVEMBER 3, 2026
          </div>
          <h1>
            Good morning, {user?.name?.split(' ')[0] || 'there'}
            <span className="wave">✳</span>
          </h1>
          <p className="page-subtitle">Your space for conversations without borders.</p>
        </div>
        <div className="welcome-actions">
          <button className="button button-quiet" onClick={onJoin}>
            <ArrowDownLeft size={16} /> Join meeting
          </button>
          <button className="button button-primary" onClick={onCreate}>
            <Plus size={17} /> New meeting
          </button>
        </div>
      </div>
      {!user && (
        <div className="sign-in-banner">
          <ShieldCheck size={18} />
          <span>
            <b>Keep your meetings in sync.</b> Sign in to create meetings and save your history.
          </span>
          <button onClick={onAuth}>
            Sign in <ArrowUpRight size={14} />
          </button>
        </div>
      )}
    </>
  )
}
