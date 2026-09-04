import { useEffect, useState } from 'react'
import {
  ChevronDown,
  Disc3,
  Menu,
  Music2,
  Play,
  ShoppingBag,
  X
} from 'lucide-react'
import { songs } from './data/songs'
import { contactEmail, videos } from './data/content'

function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  const links = [
    ['discografia', 'Discografía'],
    ['videos', 'Videos'],
    ['canciones', 'Canciones']
  ]

  return (
    <header className='site-header'>
      <a className='brand' href='#inicio' aria-label='Sergio Cruz, inicio'>
        <span className='brand-mark'>
          <img src='/images/logo.jpg' alt='Sergio Cruz' />
        </span>
        <span>Sergio Cruz</span>
      </a>
      <button
        className='menu-button'
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label='Abrir menú'
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav
        className={open ? 'nav open' : 'nav'}
        aria-label='Navegación principal'
      >
        {links.map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  )
}

function SectionTitle({ eyebrow, children, light = false }) {
  return (
    <div className={`section-title ${light ? 'light' : ''}`}>
      <span>{eyebrow}</span>
      <h2>{children}</h2>
    </div>
  )
}

function AlbumCover() {
  const [missing, setMissing] = useState(false)
  return (
    <div className='cover-wrap'>
      {!missing && (
        <img
          src='/images/portada-memorias-artesanales.jpg'
          alt='Portada del álbum Memorias Artesanales'
          onError={() => setMissing(true)}
        />
      )}
      {missing && (
        <div className='cover-placeholder'>
          <Disc3 size={54} />
          <strong>Portada del álbum</strong>
          <span>
            Sube tu imagen como
            <br />
            public/images/portada-memorias-artesanales.jpg
          </span>
        </div>
      )}
    </div>
  )
}

function VideoCard({ video, index }) {
  const isConfigured = !video.videoId.startsWith('PEGA_AQUI')
  return (
    <article className='video-card'>
      <div className='video-frame'>
        {isConfigured ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.videoId}`}
            title={video.title}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        ) : (
          <div className='video-placeholder'>
            <Play fill='currentColor' />
            <span>Video {String(index + 1).padStart(2, '0')}</span>
            <small>
              Pega el ID de YouTube en
              <br />
              src/data/content.js
            </small>
          </div>
        )}
      </div>
      <h3>{video.title}</h3>
    </article>
  )
}

function Song({ song, index }) {
  return (
    <details className='song-card'>
      <summary>
        <span className='track-number'>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className='song-name'>{song.title}</span>
        <span className='listen-label'>
          <Music2 /> Letra
        </span>
        <ChevronDown className='chevron' />
      </summary>
      <div className='song-content'>
        <pre>{song.lyrics}</pre>
        {song.spotifyUrl ? (
          <a
            className='spotify-button'
            href={song.spotifyUrl}
            target='_blank'
            rel='noreferrer'
          >
            <Music2 /> Escuchar en Spotify
          </a>
        ) : (
          <span className='spotify-pending'>
            Añade el enlace de Spotify en src/data/songs.js
          </span>
        )}
      </div>
    </details>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <section className='hero' id='inicio'>
          <div className='hero-content'>
            <p className='hero-kicker'>Músicas del Mundo</p>
            <h1>
              Sergio
              <br />
              <em>Cruz</em>
            </h1>
            <p className='hero-role'>Músico · Compositor</p>
            <a className='hero-link' href='#discografia'>
              Descubrir el álbum <span>↓</span>
            </a>
          </div>
          <p className='hero-note'>Villa de Leyva · Colombia</p>
        </section>

        <section className='album-section paper' id='discografia'>
          <div className='container'>
            <SectionTitle eyebrow='01 · Discografía'>
              Memorias Artesanales
            </SectionTitle>
            <div className='album-grid'>
              <AlbumCover />
              <div className='album-copy'>
                <p className='lead'>
                  Una obra íntima, sonora, melancólica y esperanzadora.
                </p>
                <p>
                  Propuesta que explora la música como manifestación artística y
                  materia prima. La memoria como componente subjetivo del duelo;
                  vista desde una perspectiva íntima, sonora, melancólica y
                  esperanzadora.
                </p>
                <p>
                  Originada en la música académica, la producción navega en
                  géneros populares diversos con herramientas de músicas
                  contemporáneas de influencia colombiana y latinoamericana.
                </p>
                <p>
                  La propuesta ha sido presentada en diferentes escenarios de
                  Bogotá: Feria Barcú, Circuito Candelaria, Circuito ArtMenia,
                  el Auditorio Ernesto Martin de la Universidad de Los Andes y
                  el Auditorio Teresa Cuervo Borda del Museo Nacional de
                  Colombia.
                </p>
                <div className='album-meta'>
                  <span>
                    <Disc3 /> Disco compacto
                  </span>
                  <strong>8 canciones</strong>
                  <span>CD original + librillo con letras</span>
                </div>
                <div className='price-row'>
                  <div>
                    <small>Valor simbólico</small>
                    <strong>US$ 10</strong>
                    <span>$40.000 COP</span>
                  </div>
                  <div className='shipping'>
                    <ShoppingBag />
                    <span>
                      Envío gratis en toda Colombia
                      <br />
                      <small>Envíos nacionales e internacionales</small>
                    </span>
                  </div>
                </div>
                <a
                  className='order-button'
                  href={`mailto:${contactEmail}?subject=Quiero%20comprar%20Memorias%20Artesanales`}
                >
                  Quiero el disco
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className='videos-section' id='videos'>
          <div className='container'>
            <SectionTitle eyebrow='02 · Audiovisual' light>
              Videos
            </SectionTitle>
            <div className='videos-grid'>
              {videos.map((video, i) => (
                <VideoCard video={video} index={i} key={video.videoId} />
              ))}
            </div>
          </div>
        </section>

        <section className='songs-section paper' id='canciones'>
          <div className='container narrow'>
            <SectionTitle eyebrow='03 · Cancionero'>
              Letras & canciones
            </SectionTitle>
            <p className='songs-intro'>
              Ocho viajes sonoros. Abre cada canción para leer su letra
              completa.
            </p>
            <div className='song-list'>
              {songs.map((song, i) => (
                <Song song={song} index={i} key={song.title} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer>
        <span className='brand-mark'>SC</span>
        <p>© {new Date().getFullYear()} Sergio Cruz</p>
        <a href={`mailto:${contactEmail}`}>Contacto</a>
      </footer>
    </>
  )
}
