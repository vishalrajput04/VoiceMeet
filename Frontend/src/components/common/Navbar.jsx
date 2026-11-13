import { Bell, ChevronDown, Menu, Search } from 'lucide-react'
import { initials } from '../../utils/format.js'

export default function Navbar({ page, user, onProfile, notify }) {
  return (
    <header className="topbar">
      <button className="mobile-menu" aria-label="Menu">
        <Menu size={20} />
      </button>
      <div className="breadcrumbs">
        <span>Workspace</span>
        <span className="crumb-sep">/</span>
        <b>{page}</b>
      </div>
      <div className="top-actions">
        <button
          className="search-trigger"
          onClick={() => document.querySelector('#join-id')?.focus()}
        >
          <Search size={16} />
          <span>Search anything</span>
          <kbd>⌘ K</kbd>
        </button>
        <button
          className="icon-button notification"
          aria-label="Notifications"
          onClick={() => notify('You’re all caught up')}
        >
          <Bell size={18} />
          <i />
        </button>
        <span className="top-divider" />
        <button className="top-user" onClick={onProfile}>
          <span className="avatar avatar-small">{initials(user?.name)}</span>
          <ChevronDown size={14} />
        </button>
      </div>
    </header>
  )
}
