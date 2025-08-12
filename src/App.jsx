import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [currentSection, setCurrentSection] = useState('home')
  const [profileImage, setProfileImage] = useState('default')

  const imageStates = {
    default: '/assets/profile-photos/default.jpg',
    movies: '/assets/profile-photos/movies.jpg',
    drawings: '/assets/profile-photos/drawings.jpg',
    resume: '/assets/profile-photos/resume.jpg',
    music: '/assets/profile-photos/music.jpg'
  }

  // Create bubble effect
  const createBubbles = () => {
    const bubbleContainer = document.createElement('div')
    bubbleContainer.className = 'bubble-transition'
    document.body.appendChild(bubbleContainer)

    for (let i = 0; i < 15; i++) {
      const bubble = document.createElement('div')
      bubble.className = 'bubble'
      
      // Random size between 20px and 80px
      const size = Math.random() * 60 + 20
      bubble.style.width = size + 'px'
      bubble.style.height = size + 'px'
      
      // Random horizontal position
      bubble.style.left = Math.random() * 100 + '%'
      
      // Random delay for natural bubble effect
      bubble.style.animationDelay = Math.random() * 0.5 + 's'
      
      bubbleContainer.appendChild(bubble)
    }

    // Remove bubbles after animation
    setTimeout(() => {
      if (bubbleContainer.parentNode) {
        bubbleContainer.parentNode.removeChild(bubbleContainer)
      }
    }, 2000)
  }

  // Update body class based on current section
  useEffect(() => {
    const bodyClasses = ['bg-home', 'bg-movies', 'bg-drawings', 'bg-resume', 'bg-music']
    
    // Remove all background classes
    bodyClasses.forEach(cls => document.body.classList.remove(cls))
    
    // Add the appropriate background class
    const bgClass = currentSection === 'home' ? 'bg-home' : `bg-${currentSection}`
    document.body.classList.add(bgClass)
    
    // Cleanup function to remove classes when component unmounts
    return () => {
      bodyClasses.forEach(cls => document.body.classList.remove(cls))
    }
  }, [currentSection])

  const getGradientForSection = (section) => {
    const gradients = {
      movies: 'linear-gradient(45deg, #ff6b6b, #ffd93d)',
      drawings: 'linear-gradient(45deg, #74b9ff, #0984e3)',
      resume: 'linear-gradient(45deg, #00b894, #55a3ff)',
      music: 'linear-gradient(45deg, #1abc9c, #16a085)'
    }
    return gradients[section] || '#2c3e50'
  }

  const handleIconHover = (imageType) => {
    setProfileImage(imageType)
  }

  const handleIconLeave = () => {
    setProfileImage('default')
  }

  const showSection = (sectionName) => {
    createBubbles()
    setTimeout(() => {
      setCurrentSection(sectionName)
    }, 100)
  }

  const showHome = () => {
    createBubbles()
    setTimeout(() => {
      setCurrentSection('home')
      setProfileImage('default')
    }, 100)
  }

  const renderHomeSection = () => (
    <div className="home-section">
      <h1>Justin Rhodes</h1>
      <p className="tagline">Computer Science Student & Developer</p>
      
      <div className="home-content">
        <div className="nav-column-left">
          <div 
            className="nav-icon" 
            onMouseEnter={() => handleIconHover('movies')}
            onMouseLeave={handleIconLeave}
            onClick={() => showSection('movies')}
          >
            <div className="nav-icon-symbol">🎬</div>
            <div className="nav-icon-text">Movies</div>
          </div>
          <div 
            className="nav-icon"
            onMouseEnter={() => handleIconHover('drawings')}
            onMouseLeave={handleIconLeave}
            onClick={() => showSection('drawings')}
          >
            <div className="nav-icon-symbol">🎨</div>
            <div className="nav-icon-text">Drawings</div>
          </div>
        </div>

        <div className="profile-container">
          <div 
            className="profile-image"
            style={{ 
              background: profileImage === 'default' ? `url(${imageStates.default}) center/cover` : `url(${imageStates[profileImage]}) center/cover`
            }}
          >
          </div>
        </div>

        <div className="nav-column-right">
          <div 
            className="nav-icon"
            onMouseEnter={() => handleIconHover('resume')}
            onMouseLeave={handleIconLeave}
            onClick={() => showSection('resume')}
          >
            <div className="nav-icon-symbol">📄</div>
            <div className="nav-icon-text">Resume</div>
          </div>
          <div 
            className="nav-icon"
            onMouseEnter={() => handleIconHover('music')}
            onMouseLeave={handleIconLeave}
            onClick={() => showSection('music')}
          >
            <div className="nav-icon-symbol">🎵</div>
            <div className="nav-icon-text">Music</div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderMoviesSection = () => (
    <div className="content-section active">
      <button className="back-button" onClick={showHome}>← Back to Home</button>
      <div className="section-header">
        <h2 className="section-title">My Favorite Movies</h2>
        <p>Here are my top 6 favorite films of all time</p>
      </div>
      <div className="movies-grid">
        {[
          { title: "The Thing", year: "1982", poster: "/assets/movie-posters/the-thing.jpg" },
          { title: "Taxi Driver", year: "1976", poster: "/assets/movie-posters/taxi-driver.jpg" },
          { title: "Chinatown", year: "1974", poster: "/assets/movie-posters/chinatown.jpg" },
          { title: "Jaws", year: "1975", poster: "/assets/movie-posters/jaws.jpg" },
          { title: "Eternal Sunshine of the Spotless Mind", year: "2004", poster: "/assets/movie-posters/eternal-sunshine.jpg" },
          { title: "Dr. Strangelove", year: "1964", poster: "/assets/movie-posters/dr-strangelove.jpg" }
        ].map((movie, index) => (
          <div key={index} className="movie-card">
            <div className="movie-poster" style={{overflow: 'hidden', position: 'relative'}}>
              <img 
                src={movie.poster} 
                alt={`${movie.title} poster`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  borderRadius: '12px',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  display: 'block'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; color: #bdc3c7; font-size: 16px; font-weight: 700;">${movie.title} Poster</div>`;
                }}
              />
            </div>
            <div className="movie-title">{movie.title}</div>
            <div className="movie-year">{movie.year}</div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderDrawingsSection = () => (
    <div className="content-section active">
      <button className="back-button" onClick={showHome}>← Back to Home</button>
      <div className="section-header">
        <h2 className="section-title">My Artwork</h2>
        <p>I love to doodle in my free time</p>
      </div>
      <div className="drawings-stack">
        {[
          "/assets/drawings/drawing1.jpg",
          "/assets/drawings/drawing2.jpg",
          "/assets/drawings/drawing3.jpg",
          "/assets/drawings/drawing4.jpg"
        ].map((imagePath, index) => (
          <div key={index} className="drawing-image">
            <img 
              src={imagePath} 
              alt={`Doodle ${index + 1}`}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 200px; color: #bdc3c7; font-size: 16px; font-weight: 700;">Doodle ${index + 1}</div>`;
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )

  const renderResumeSection = () => (
    <div className="content-section active">
      <button className="back-button" onClick={showHome}>← Back to Home</button>
      <div className="section-header">
        <h2 className="section-title">Resume</h2>
        <p>Computer Science Junior at University of Pittsburgh</p>
      </div>
      <div className="resume-content">
        <div style={{ 
          width: '100%', 
          height: '800px', 
          border: '4px solid #f39c12', 
          borderRadius: '15px',
          overflow: 'hidden',
          boxShadow: '8px 8px 25px rgba(0,0,0,0.4)'
        }}>
          <iframe 
            src="/assets/justin-rhodes-resume.pdf" 
            width="100%" 
            height="100%"
            style={{ border: 'none' }}
            title="Justin Rhodes Resume"
          >
            <p>Your browser does not support PDFs. 
              <a href="/assets/justin-rhodes-resume.pdf" target="_blank" rel="noopener noreferrer">
                Download the PDF
              </a>
            </p>
          </iframe>
        </div>
        <div style={{ 
          textAlign: 'center', 
          marginTop: '20px' 
        }}>
          <a 
            href="/assets/justin-rhodes-resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              background: 'linear-gradient(145deg, #3498db, #2980b9)',
              border: '3px solid #f39c12',
              borderRadius: '25px',
              padding: '15px 30px',
              color: 'white',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '16px',
              boxShadow: '4px 4px 12px rgba(0,0,0,0.4)',
              transform: 'rotate(-1deg)',
              display: 'inline-block',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'rotate(0deg) scale(1.05)'
              e.target.style.background = 'linear-gradient(145deg, #e74c3c, #c0392b)'
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'rotate(-1deg) scale(1)'
              e.target.style.background = 'linear-gradient(145deg, #3498db, #2980b9)'
            }}
          >
            📄 Download Resume PDF
          </a>
        </div>
      </div>
    </div>
  )

  const renderMusicSection = () => (
    <div className="content-section active">
      <button className="back-button" onClick={showHome}>← Back to Home</button>
      <div className="section-header">
        <h2 className="section-title">My Favorite Albums</h2>
        <p>Here are my top 6 favorite albums that inspire me</p>
      </div>
      <div className="music-list">
        {[
          { 
            title: "The Stone Roses", 
            artist: "The Stone Roses",
            genre: "Indie Rock, Madchester",
            year: "1989",
            favoriteTrack: "I Wanna Be Adored",
            rating: "4.9",
            cover: "/assets/album-covers/stone-roses.jpg"
          },
          { 
            title: "Souvlaki", 
            artist: "Slowdive",
            genre: "Shoegaze, Dream Pop",
            year: "1993",
            favoriteTrack: "Alison",
            rating: "4.8",
            cover: "/assets/album-covers/souvlaki.jpg"
          },
          { 
            title: "Born to Run", 
            artist: "Bruce Springsteen",
            genre: "Rock, Heartland Rock",
            year: "1975",
            favoriteTrack: "Thunder Road",
            rating: "4.7",
            cover: "/assets/album-covers/born-to-run.jpg"
          },
          { 
            title: "Abbey Road", 
            artist: "The Beatles",
            genre: "Rock, Pop",
            year: "1969",
            favoriteTrack: "Come Together",
            rating: "4.9",
            cover: "/assets/album-covers/abbey-road.jpg"
          },
          { 
            title: "Rumours", 
            artist: "Fleetwood Mac",
            genre: "Rock, Pop Rock",
            year: "1977",
            favoriteTrack: "Dreams",
            rating: "4.8",
            cover: "/assets/album-covers/rumours.jpg"
          },
          { 
            title: "Doolittle", 
            artist: "Pixies",
            genre: "Alternative Rock",
            year: "1989",
            favoriteTrack: "Debaser",
            rating: "4.6",
            cover: "/assets/album-covers/doolittle.jpg"
          }
        ].map((album, index) => (
          <div key={index} className="album-item">
            <div className="album-number">{index + 1}</div>
            <div className="album-cover" style={{overflow: 'hidden', position: 'relative'}}>
              <img 
                src={album.cover} 
                alt={`${album.title} album cover`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  borderRadius: '12px',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  display: 'block'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; color: #bdc3c7; font-size: 14px; font-weight: 700;">${album.title} Cover</div>`;
                }}
              />
            </div>
            <div className="album-info">
              <h3 className="album-title">{album.title}</h3>
              <p className="album-artist">{album.artist}</p>
              <div className="album-details">
                <p className="album-genre">{album.genre}</p>
                <p className="album-year">Released: {album.year}</p>
                <p className="favorite-track">Favorite Track: <span>{album.favoriteTrack}</span></p>
              </div>
            </div>
            <div className="album-rating">
              <span className="rating-star">⭐</span>
              <span className="rating-number">{album.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="container">
      {currentSection === 'home' && renderHomeSection()}
      {currentSection === 'movies' && renderMoviesSection()}
      {currentSection === 'drawings' && renderDrawingsSection()}
      {currentSection === 'resume' && renderResumeSection()}
      {currentSection === 'music' && renderMusicSection()}
    </div>
  )
}

export default App