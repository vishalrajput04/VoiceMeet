import { AudioLines, Globe2, Headphones, Sparkles, Subtitles } from 'lucide-react'

export default function TranslationBar({ status, language, captions, onToggleCaptions, notify }) {
  return (
    <div className="translation-bar">
      <div className="translation-state">
        <span className="translation-pulse">
          <AudioLines size={16} />
        </span>
        <div>
          <b>Live captions</b>
          <small>{status}</small>
        </div>
      </div>
      <div className="translation-settings">
        <label>
          <Globe2 size={14} />
          <span className="caption-language">{language || 'English'}</span>
        </label>
        <span className="translation-divider" />
        <button onClick={onToggleCaptions} className={captions ? 'on' : ''}>
          <Subtitles size={17} />
          <span>Captions</span>
          <i className="toggle-track" />
        </button>
        <button
          onClick={() => notify('Voice dubbing is not yet connected to the in-call audio flow')}
        >
          <Headphones size={17} />
          <span>Translated voice</span>
          <i className="toggle-track" />
        </button>
      </div>
      <span className="translation-powered">
        <Sparkles size={12} /> On-device captions
      </span>
    </div>
  )
}
