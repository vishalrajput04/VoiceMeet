import { ArrowUpRight, AudioLines, Sparkles, Subtitles } from 'lucide-react'

export default function HeroBanner({ onCreate, onJoin }) {
  return (
    <section className="hero-banner">
      <div className="hero-copy">
        <span className="pill">
          <Sparkles size={13} /> YOUR CONVERSATION, UNDERSTOOD
        </span>
        <h2>
          Different languages.
          <br />
          <em>One conversation.</em>
        </h2>
        <p>Meet across languages with live captions and a little more understanding.</p>
        <div className="hero-buttons">
          <button className="button hero-button" onClick={onCreate}>
            Start a new meeting <ArrowUpRight size={15} />
          </button>
          <button className="hero-link" onClick={onJoin}>
            Join with an ID
          </button>
        </div>
        <div className="hero-foot">
          <span>
            <span className="mini-green" /> Browser captions available
          </span>
          <span>·</span>
          <span>8 language preferences</span>
        </div>
      </div>
      <div className="hero-art">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="language-card card-en">
          <span className="flag">🇬🇧</span>
          <span>
            <small>ENGLISH</small>
            <b>Hey, good to see you!</b>
          </span>
          <AudioLines size={16} />
        </div>
        <div className="language-card card-hi">
          <span className="flag">🇮🇳</span>
          <span>
            <small>हिन्दी · HINDI</small>
            <b>आपसे मिलकर अच्छा लगा!</b>
          </span>
          <Subtitles size={16} />
        </div>
        <div className="person person-back">
          <div className="person-hair hair-back" />
          <div className="person-face face-back" />
          <div className="person-body body-back" />
        </div>
        <div className="person person-front">
          <div className="person-hair hair-front" />
          <div className="person-face face-front" />
          <div className="person-body body-front" />
        </div>
        <div className="sparkle sparkle-a">✳</div>
        <div className="sparkle sparkle-b">✦</div>
        <div className="waveform">
          {Array.from({ length: 14 }, (_, index) => (
            <i key={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
