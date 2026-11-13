import { ArrowUpRight, AudioLines, Mic, X } from 'lucide-react'
import { initials } from '../../utils/format.js'

export default function ChatPanel({
  user,
  sideTab,
  setSideTab,
  onClose,
  messages,
  message,
  setMessage,
  onSend,
}) {
  return (
    <aside className="room-panel">
      <div className="panel-tabs">
        {['Chat', 'People'].map((tab) => (
          <button
            className={sideTab === tab ? 'selected' : ''}
            onClick={() => setSideTab(tab)}
            key={tab}
          >
            {tab}
            {tab === 'People' && <span>1</span>}
          </button>
        ))}
        <button className="panel-close" onClick={onClose} aria-label="Close panel">
          <X size={17} />
        </button>
      </div>
      {sideTab === 'Chat' ? (
        <>
          <div className="chat-empty">
            <div className="empty-icon">
              <AudioLines size={18} />
            </div>
            <b>Say hello</b>
            <p>Messages sent here are visible to everyone in this meeting.</p>
          </div>
          <div className="chat-messages">
            {messages.map((item, index) => (
              <div className="chat-message" key={item.id || index}>
                <span className="avatar avatar-tiny">{initials(user?.name)}</span>
                <div>
                  <b>
                    {item.name || user?.name || 'You'} <small>now</small>
                  </b>
                  <p>{item.text || item}</p>
                </div>
              </div>
            ))}
          </div>
          <form
            className="chat-form"
            onSubmit={(event) => {
              event.preventDefault()
              onSend()
            }}
          >
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Message everyone…"
            />
            <button aria-label="Send">
              <ArrowUpRight size={16} />
            </button>
          </form>
        </>
      ) : (
        <div className="people-row">
          <span className="avatar avatar-small">{initials(user?.name)}</span>
          <span>
            <b>{user?.name || 'You'}</b>
            <small>Meeting host</small>
          </span>
          <Mic size={16} />
        </div>
      )}
    </aside>
  )
}
