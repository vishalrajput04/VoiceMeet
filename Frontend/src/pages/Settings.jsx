import { useState } from 'react'
import { Languages, Users } from 'lucide-react'
import { LANGUAGES } from '../utils/constants.js'

export function PlaceholderPage({ page, user, onSave }) {
  const [spoken, setSpoken] = useState(user?.spokenLanguage || 'English')
  const [preferred, setPreferred] = useState(user?.preferredLanguage || 'English')
  return (
    <div className="page-content">
      <div className="welcome-row">
        <div>
          <div className="eyebrow">YOUR WORKSPACE</div>
          <h1>{page}</h1>
          <p className="page-subtitle">
            {page === 'Settings'
              ? 'Make Lingua work the way you do.'
              : `Your ${page.toLowerCase()} will appear here.`}
          </p>
        </div>
      </div>
      {page === 'Settings' ? (
        <div className="settings-card">
          <h2>
            <Languages size={19} /> Language preferences
          </h2>
          <p>Choose the language you speak and the language you want to hear in meetings.</p>
          <label>
            Spoken language
            <select value={spoken} onChange={(e) => setSpoken(e.target.value)}>
              {LANGUAGES.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            Preferred translation language
            <select value={preferred} onChange={(e) => setPreferred(e.target.value)}>
              {LANGUAGES.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <button className="button button-primary" onClick={() => onSave(spoken, preferred)}>
            Save preferences
          </button>
        </div>
      ) : (
        <div className="empty-meetings">
          <div className="empty-icon">
            <Users size={20} />
          </div>
          <div>
            <b>Nothing here yet</b>
            <p>This section will fill in as you use Lingua.</p>
          </div>
        </div>
      )}
    </div>
  )
}
