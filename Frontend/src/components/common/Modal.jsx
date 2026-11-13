import { useEffect } from 'react'
import { X } from 'lucide-react'

export function Modal({ children, onClose }) {
  useEffect(() => {
    const key = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [onClose])
  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <section className="modal-card">
        {' '}
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
        {children}
      </section>
    </div>
  )
}
