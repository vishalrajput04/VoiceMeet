import {
  ArrowUpRight,
  AudioLines,
  ChevronDown,
  CircleHelp,
  LayoutDashboard,
  LogOut,
  MoreHorizontal,
  Settings2,
  Sparkles,
  Users,
  Video,
} from 'lucide-react'
import { initials } from '../../utils/format.js'

const navigation = [
  ['Home', LayoutDashboard],
  ['Meetings', Video],
  ['Contacts', Users],
  ['Settings', Settings2],
]

export default function Sidebar({
  page,
  user,
  meetingCount,
  onNavigate,
  onSignOut,
  onSignIn,
  notify,
}) {
  return (
    <aside className="sidebar">
      <a
        className="brand"
        href="/"
        onClick={(event) => {
          event.preventDefault()
          onNavigate('Home')
        }}
      >
        <span className="brand-mark">
          <AudioLines size={20} />
        </span>
        <span>
          lingua<span className="brand-dot">.</span>
        </span>
      </a>
      <div className="workspace-label">
        WORKSPACE{' '}
        <button aria-label="Switch workspace">
          <ChevronDown size={14} />
        </button>
      </div>
      <div className="workspace-card">
        <span className="workspace-icon">N</span>
        <span>
          <b>Northstar Studio</b>
          <small>Free workspace</small>
        </span>
        <MoreHorizontal size={17} />
      </div>
      <nav className="nav-list" aria-label="Main navigation">
        <div className="nav-caption">MENU</div>
        {navigation.map(([item, Icon]) => (
          <button
            key={item}
            className={`nav-item ${page === item ? 'active' : ''}`}
            onClick={() => onNavigate(item)}
          >
            <Icon size={18} />
            <span>{item}</span>
            {item === 'Meetings' && <span className="nav-count">{meetingCount}</span>}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="upgrade-card">
          <div className="upgrade-glow">
            <Sparkles size={17} />
          </div>
          <b>Make every voice heard.</b>
          <p>See how Lingua can bring your whole team closer.</p>
          <button onClick={() => notify('More plans are coming soon')}>
            Explore plans <ArrowUpRight size={14} />
          </button>
        </div>
        <button className="help-link" onClick={() => notify('Help center coming soon')}>
          <CircleHelp size={17} /> Help center
        </button>
        <div className="sidebar-profile">
          <span className="avatar avatar-small">{initials(user?.name)}</span>
          <span className="profile-name">
            <b>{user?.name || 'Guest user'}</b>
            <small>{user?.email || 'Sign in to sync meetings'}</small>
          </span>
          <button onClick={user ? onSignOut : onSignIn} aria-label={user ? 'Sign out' : 'Sign in'}>
            {user ? <LogOut size={17} /> : <ArrowUpRight size={17} />}
          </button>
        </div>
      </div>
    </aside>
  )
}
