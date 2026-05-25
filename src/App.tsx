import {
  Archive,
  CalendarDays,
  Camera,
  ChevronRight,
  Clock,
  Download,
  Heart,
  ImagePlus,
  Link,
  MessageCircleHeart,
  Play,
  Send,
  Share2,
  Sparkles,
  Users,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

type StageId = 'brief' | 'live' | 'reveal' | 'story' | 'guests' | 'vault'

const stages: Array<{
  id: StageId
  eyebrow: string
  title: string
  description: string
  icon: typeof Heart
}> = [
  {
    id: 'brief',
    eyebrow: 'Before',
    title: 'Private Memory Space',
    description: 'Capture emotional priorities, key people, timing, and tone before the event.',
    icon: Heart,
  },
  {
    id: 'live',
    eyebrow: 'During',
    title: 'Shared Memory Stream',
    description: 'Let guests quietly add their own photos, clips, notes, and context.',
    icon: ImagePlus,
  },
  {
    id: 'reveal',
    eyebrow: 'Hours Later',
    title: 'First Memories Reveal',
    description: 'Deliver a small, cinematic sequence instead of a file dump.',
    icon: Play,
  },
  {
    id: 'story',
    eyebrow: 'Delivery',
    title: 'Chaptered Story Gallery',
    description: 'Organise the gallery by emotional pacing, relationships, and narrative.',
    icon: Camera,
  },
  {
    id: 'guests',
    eyebrow: 'Network',
    title: 'Guest Relationship Layer',
    description: 'Send elegant private links to people who appear in the event story.',
    icon: Users,
  },
  {
    id: 'vault',
    eyebrow: 'Aftercare',
    title: 'Memory Vault',
    description: 'Keep the relationship alive with anniversaries, print prompts, and family history.',
    icon: Archive,
  },
]

const people = [
  { name: 'Amelia', role: 'Bride', note: 'Wants quiet moments with her grandmother preserved.' },
  { name: 'Jonah', role: 'Groom', note: 'Close friends from university are travelling in.' },
  { name: 'Marian', role: 'Grandmother', note: 'Limited mobility; ceremony reactions matter.' },
  { name: 'Theo', role: 'Brother', note: 'Likely to give an informal speech late evening.' },
]

const memories = [
  'The private look before the ceremony',
  'Parents seeing the room before guests arrive',
  'Grandmother holding Amelia’s hand',
  'Unscripted reactions during speeches',
  'The last song with the original friendship group',
]

const stream = [
  {
    guest: 'Maya',
    time: '18:42',
    text: 'Jonah’s dad practised his speech outside by the rose wall.',
    type: 'Note',
  },
  {
    guest: 'Ravi',
    time: '19:08',
    text: 'Uploaded a short clip of the table laughing before starters.',
    type: 'Video',
  },
  {
    guest: 'Clara',
    time: '20:31',
    text: 'The flower girls kept the confetti in their pockets.',
    type: 'Photo',
  },
]

const chapters = [
  {
    name: 'Anticipation',
    count: 18,
    mood: 'quiet, close, textural',
    image:
      'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'The Room Changed',
    count: 24,
    mood: 'arrival, glances, breath',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'People Who Held Us',
    count: 31,
    mood: 'family, hands, reactions',
    image:
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80',
  },
]

const guests = [
  { name: 'Marian Ellis', photos: 16, status: 'Private link ready', relation: 'Grandmother' },
  { name: 'The Durham Table', photos: 42, status: 'Shared collection', relation: 'Friends' },
  { name: 'Nora Patel', photos: 9, status: 'Print suggestion', relation: 'Mother' },
]

function App() {
  const [activeStage, setActiveStage] = useState<StageId>(() => {
    const hashStage = window.location.hash.replace('#', '') as StageId
    return stages.some((stage) => stage.id === hashStage) ? hashStage : 'brief'
  })
  const stagePanelRef = useRef<HTMLElement | null>(null)
  const active = useMemo(
    () => stages.find((stage) => stage.id === activeStage) ?? stages[0],
    [activeStage],
  )
  useEffect(() => {
    const handleHashChange = () => {
      const hashStage = window.location.hash.replace('#', '') as StageId
      if (stages.some((stage) => stage.id === hashStage)) {
        setActiveStage(hashStage)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const selectStage = (stage: StageId, shouldScroll = true) => {
    setActiveStage(stage)
    window.history.replaceState(null, '', `#${stage}`)
    if (shouldScroll) {
      window.requestAnimationFrame(() => {
        stagePanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }

  return (
    <main className="app-shell">
      <aside className="side-rail">
        <div className="brand-lockup">
          <span className="brand-mark">MA</span>
          <div>
            <p>Memory Atelier</p>
            <span>Prototype for premium photography experiences</span>
          </div>
        </div>

        <StageNav activeStage={activeStage} setActiveStage={selectStage} variant="rail" />

        <div className="rail-note">
          <Sparkles size={18} aria-hidden="true" />
          <p>AI stays backstage: curation, tagging, sequencing, and speed.</p>
        </div>
      </aside>

      <section className="experience-canvas">
        <header className="hero-band">
          <div className="hero-copy">
            <span className="kicker">Premium memory experience</span>
            <h1>Photography delivered as emotional preservation.</h1>
            <p>
              A branded client journey that starts before the event, includes guests during the
              day, and turns the final gallery into a living family archive.
            </p>
            <div className="hero-actions">
              <button className="primary-action" type="button" onClick={() => selectStage('reveal')}>
                <Play size={17} aria-hidden="true" />
                Preview reveal
              </button>
              <button className="secondary-action" type="button" onClick={() => selectStage('brief')}>
                <CalendarDays size={17} aria-hidden="true" />
                View client brief
              </button>
            </div>
          </div>

          <div className="hero-photo" aria-label="Wedding memory preview">
            <img
              src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85"
              alt="Couple walking through a warm wedding celebration"
            />
            <div className="photo-caption">
              <span>First memories</span>
              <strong>14 frames selected</strong>
            </div>
          </div>
        </header>

        <section className="stage-panel" ref={stagePanelRef}>
          <div className="stage-heading">
            <span>{active.eyebrow}</span>
            <h2>{active.title}</h2>
            <p>{active.description}</p>
          </div>
          <StageContent activeStage={activeStage} setActiveStage={selectStage} />
          <StageNav activeStage={activeStage} setActiveStage={selectStage} variant="mobile" />
        </section>
      </section>
    </main>
  )
}

function StageNav({
  activeStage,
  setActiveStage,
  variant,
}: {
  activeStage: StageId
  setActiveStage: (stage: StageId) => void
  variant: 'rail' | 'mobile'
}) {
  return (
    <nav
      className={variant === 'mobile' ? 'stage-list mobile-stage-list' : 'stage-list rail-stage-list'}
      aria-label="Memory experience stages"
    >
      {stages.map((stage) => {
        const Icon = stage.icon
        const selected = stage.id === activeStage
        return (
          <a
            className={selected ? 'stage-button active' : 'stage-button'}
            href={`#${stage.id}`}
            key={stage.id}
            onClick={(event) => {
              event.preventDefault()
              setActiveStage(stage.id)
            }}
          >
            <Icon size={18} aria-hidden="true" />
            <span>
              <small>{stage.eyebrow}</small>
              {stage.title}
            </span>
            <ChevronRight size={16} aria-hidden="true" />
          </a>
        )
      })}
    </nav>
  )
}

function StageContent({
  activeStage,
  setActiveStage,
}: {
  activeStage: StageId
  setActiveStage: (stage: StageId, shouldScroll?: boolean) => void
}) {
  const [sentGuest, setSentGuest] = useState<string | null>(null)

  if (activeStage === 'brief') {
    return (
      <div className="content-grid brief-grid">
        <section className="module wide">
          <div className="module-head">
            <div>
              <span>Amelia & Jonah</span>
              <h3>Memory brief</h3>
            </div>
            <Clock size={19} aria-hidden="true" />
          </div>
          <div className="brief-columns">
            <div>
              <p className="field-label">Emotional priorities</p>
              <ul className="memory-list">
                {memories.map((memory) => (
                  <li key={memory}>
                    <Heart size={15} aria-hidden="true" />
                    {memory}
                  </li>
                ))}
              </ul>
            </div>
            <div className="tone-card">
              <p className="field-label">Desired feeling</p>
              <h4>Warm, observant, family-centred</h4>
              <p>
                Less posed coverage, more gestures, atmosphere, hands, reactions, and quiet
                transitions.
              </p>
            </div>
          </div>
          <div className="screen-actions">
            <button type="button" onClick={() => setActiveStage('live')}>
              <ImagePlus size={17} aria-hidden="true" />
              Open guest stream
            </button>
            <button type="button" onClick={() => setActiveStage('reveal')}>
              <Play size={17} aria-hidden="true" />
              Jump to reveal
            </button>
          </div>
        </section>

        <section className="module">
          <div className="module-head">
            <div>
              <span>People</span>
              <h3>Relationship map</h3>
            </div>
            <Users size={19} aria-hidden="true" />
          </div>
          <div className="people-stack">
            {people.map((person) => (
              <article key={person.name} className="person-row">
                <div>
                  <strong>{person.name}</strong>
                  <span>{person.role}</span>
                </div>
                <p>{person.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="module">
          <div className="module-head">
            <div>
              <span>Preparation</span>
              <h3>Timeline guidance</h3>
            </div>
            <CalendarDays size={19} aria-hidden="true" />
          </div>
          <div className="timeline">
            <span>10:30 Details and family objects</span>
            <span>13:10 Quiet reveal with parents</span>
            <span>16:30 Guest story prompts open</span>
            <span>22:45 Final song and private exit</span>
          </div>
        </section>
      </div>
    )
  }

  if (activeStage === 'live') {
    return (
      <div className="content-grid">
        <section className="module wide stream-module">
          <div className="module-head">
            <div>
              <span>Guest layer</span>
              <h3>Live memory stream</h3>
            </div>
            <ImagePlus size={19} aria-hidden="true" />
          </div>
          <div className="upload-strip">
            <button type="button">
              <ImagePlus size={18} aria-hidden="true" />
              Add moment
            </button>
            <button type="button">
              <MessageCircleHeart size={18} aria-hidden="true" />
              Leave note
            </button>
            <button type="button">
              <Send size={18} aria-hidden="true" />
              Send to curator
            </button>
          </div>
          <div className="stream-list">
            {stream.map((item) => (
              <article key={`${item.guest}-${item.time}`} className="stream-item">
                <span>{item.time}</span>
                <div>
                  <strong>{item.guest}</strong>
                  <p>{item.text}</p>
                </div>
                <small>{item.type}</small>
              </article>
            ))}
          </div>
        </section>
        <section className="module phone-preview">
          <div className="phone-topbar">
            <span>Guest view</span>
            <strong>Amelia & Jonah</strong>
          </div>
          <img
            src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80"
            alt="Guest moment at a wedding reception"
          />
          <div className="guest-prompt">
            <span>Prompt of the hour</span>
            <p>What moment should the couple hear about later?</p>
          </div>
          <button type="button" onClick={() => setActiveStage('reveal')}>
            Send to curator
          </button>
        </section>
      </div>
    )
  }

  if (activeStage === 'reveal') {
    return (
      <div className="reveal-layout">
        <section className="reveal-player">
          <img
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=85"
            alt="Wedding ceremony aisle with guests"
          />
          <button className="play-control" type="button" onClick={() => setActiveStage('story')}>
            <Play size={22} fill="currentColor" aria-hidden="true" />
          </button>
          <div className="reveal-meta">
            <span>Delivered 7:42pm</span>
            <strong>First Memories: Amelia & Jonah</strong>
          </div>
        </section>
        <section className="module reveal-copy">
          <span>Curated sequence</span>
          <h3>Fourteen images, paced like a short film.</h3>
          <p>
            The photographer selects the emotional centre of the day while AI quietly helps group,
            score, tag, and order the strongest frames.
          </p>
          <div className="score-row">
            <span>Reaction density</span>
            <strong>High</strong>
          </div>
          <div className="score-row">
            <span>Family coverage</span>
            <strong>Balanced</strong>
          </div>
          <div className="score-row">
            <span>Share-ready set</span>
            <strong>6 images</strong>
          </div>
          <div className="screen-actions stacked">
            <button type="button" onClick={() => setActiveStage('story')}>
              <Camera size={17} aria-hidden="true" />
              Open full gallery
            </button>
            <button type="button" onClick={() => setActiveStage('guests')}>
              <Users size={17} aria-hidden="true" />
              Prepare guest links
            </button>
          </div>
        </section>
      </div>
    )
  }

  if (activeStage === 'story') {
    return (
      <div className="gallery-screen">
        <section className="module gallery-browser">
          <div className="module-head">
            <div>
              <span>Client gallery</span>
              <h3>The day as a story</h3>
            </div>
            <Camera size={19} aria-hidden="true" />
          </div>
          <div className="chapter-tabs">
            {chapters.map((chapter, index) => (
              <button className={index === 0 ? 'active' : ''} key={chapter.name} type="button">
                {chapter.name}
              </button>
            ))}
          </div>
          <div className="featured-chapter">
            <img src={chapters[0].image} alt="Anticipation wedding chapter" />
            <div>
              <span>{chapters[0].count} images</span>
              <h4>{chapters[0].name}</h4>
              <p>{chapters[0].mood}</p>
            </div>
          </div>
        </section>
        <div className="chapter-grid">
          {chapters.map((chapter) => (
            <article className="chapter-card" key={chapter.name}>
              <img src={chapter.image} alt={`${chapter.name} wedding chapter`} />
              <div>
                <span>{chapter.count} images</span>
                <h3>{chapter.name}</h3>
                <p>{chapter.mood}</p>
              </div>
            </article>
          ))}
        </div>
        <section className="module next-step-card">
          <h3>Next: turn gallery viewers into private recipients.</h3>
          <p>Faces and relationships become thoughtful guest links rather than generic downloads.</p>
          <button type="button" onClick={() => setActiveStage('guests')}>
            Build guest links
          </button>
        </section>
      </div>
    )
  }

  if (activeStage === 'guests') {
    return (
      <div className="content-grid">
        <section className="module wide">
          <div className="module-head">
            <div>
              <span>Private sharing</span>
              <h3>Guest links</h3>
            </div>
            <Link size={19} aria-hidden="true" />
          </div>
          <div className="guest-table">
            {guests.map((guest) => (
              <article key={guest.name}>
                <div>
                  <strong>{guest.name}</strong>
                  <span>{guest.relation}</span>
                </div>
                <span>{guest.photos} photos</span>
                <small>{sentGuest === guest.name ? 'Link sent just now' : guest.status}</small>
                <button
                  type="button"
                  aria-label={`Share link with ${guest.name}`}
                  onClick={() => setSentGuest(guest.name)}
                >
                  <Share2 size={17} aria-hidden="true" />
                </button>
              </article>
            ))}
          </div>
        </section>
        <section className="module referral-card">
          <Share2 size={20} aria-hidden="true" />
          <h3>Referral without the hard sell</h3>
          <p>
            Every guest link feels like a gift. The photographer’s brand travels through the best
            moments, not an advert.
          </p>
          <div className="screen-actions stacked inverted">
            <button type="button" onClick={() => setActiveStage('vault')}>
              <Archive size={17} aria-hidden="true" />
              Open aftercare vault
            </button>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="content-grid">
      <section className="module wide vault-module">
        <div className="module-head">
          <div>
            <span>Long-term relationship</span>
            <h3>Family memory vault</h3>
          </div>
          <Archive size={19} aria-hidden="true" />
        </div>
        <div className="vault-items">
          <article>
            <CalendarDays size={18} aria-hidden="true" />
            <div>
              <strong>First anniversary resurfacing</strong>
              <p>A private highlight sequence appears before the date.</p>
            </div>
          </article>
          <article>
            <Download size={18} aria-hidden="true" />
            <div>
              <strong>Print and album prompts</strong>
              <p>Curated suggestions based on people, rooms, and emotional weight.</p>
            </div>
          </article>
          <article>
            <Heart size={18} aria-hidden="true" />
            <div>
              <strong>Family archive continuity</strong>
              <p>Future shoots attach to the same story, not a new folder.</p>
            </div>
          </article>
        </div>
        <div className="vault-calendar">
          <span>Upcoming memory touchpoints</span>
          <strong>1 month: album shortlist</strong>
          <strong>6 months: framed print prompt</strong>
          <strong>1 year: anniversary filmlet</strong>
        </div>
      </section>
      <VisualCard
        image="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=80"
        label="Aftercare"
        title="The event becomes the beginning of the relationship."
      />
    </div>
  )
}

function VisualCard({ image, label, title }: { image: string; label: string; title: string }) {
  return (
    <section className="visual-card">
      <img src={image} alt={title} />
      <div>
        <span>{label}</span>
        <h3>{title}</h3>
      </div>
    </section>
  )
}

export default App
