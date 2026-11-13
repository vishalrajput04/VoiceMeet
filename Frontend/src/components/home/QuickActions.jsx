import { ArrowUpRight, Languages, Link2, Video } from 'lucide-react'

export default function QuickActions({ onCreate, onJoin, onSettings }) {
  return (
    <>
      <div className="section-heading">
        <div>
          <h2>Make it a good meeting</h2>
          <p>Everything you need to get the conversation started.</p>
        </div>
      </div>
      <div className="action-grid">
        <button className="action-card" onClick={onCreate}>
          <span className="action-icon icon-purple">
            <Video size={19} />
          </span>
          <span className="action-copy">
            <b>Start a meeting</b>
            <small>Start a call right now</small>
          </span>
          <ArrowUpRight className="action-arrow" size={17} />
        </button>
        <button className="action-card" onClick={onJoin}>
          <span className="action-icon icon-blue">
            <Link2 size={19} />
          </span>
          <span className="action-copy">
            <b>Join a meeting</b>
            <small>Enter a code or link</small>
          </span>
          <ArrowUpRight className="action-arrow" size={17} />
        </button>
        <button className="action-card" onClick={onSettings}>
          <span className="action-icon icon-mint">
            <Languages size={19} />
          </span>
          <span className="action-copy">
            <b>Language settings</b>
            <small>Set your spoken language</small>
          </span>
          <ArrowUpRight className="action-arrow" size={17} />
        </button>
      </div>
    </>
  )
}
