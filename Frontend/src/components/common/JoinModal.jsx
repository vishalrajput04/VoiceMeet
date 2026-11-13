import { useState } from 'react'
import { ArrowUpRight, Link2, ShieldCheck } from 'lucide-react'
import { Modal } from './Modal.jsx'

export function JoinModal({ onClose, onJoin }) {
  const [id, setId] = useState('')
  return (
    <Modal onClose={onClose}>
      <div className="modal-icon icon-blue">
        <Link2 size={20} />
      </div>
      <h2>Join a meeting</h2>
      <p>Enter the meeting ID or paste an invitation link to join.</p>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          onJoin(id.includes('/meeting/') ? id.split('/meeting/').pop().split(/[?#]/)[0] : id)
        }}
      >
        <label className="field-label">
          Meeting ID or link
          <input
            id="join-id"
            autoFocus
            placeholder="e.g. 482 193 760"
            value={id}
            onChange={(event) => setId(event.target.value)}
          />
        </label>
        <button className="button button-primary modal-submit" type="submit">
          Continue <ArrowUpRight size={15} />
        </button>
      </form>
      <div className="modal-secure">
        <ShieldCheck size={14} /> Your meeting is private and encrypted
      </div>
    </Modal>
  )
}
