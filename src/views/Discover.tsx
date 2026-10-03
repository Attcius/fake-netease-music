import './Discover.less'

const PLAYLIST_SLOTS = Array.from({ length: 8 }, (_, i) => i)
const ARTIST_SLOTS = Array.from({ length: 5 }, (_, i) => i)
const ALBUM_SLOTS = Array.from({ length: 4 }, (_, i) => i)

function Discover() {
  return (
    <main className="discover-page">
      <section className="discover-banner" aria-label="推荐轮播">
        <div className="discover-banner-slide" />
      </section>

      <section className="discover-section">
        <h2 className="discover-section-title">
          <span className="discover-section-anchor" />
          推荐歌单
        </h2>
        <ul className="discover-grid">
          {PLAYLIST_SLOTS.map((i) => (
            <li key={i} className="discover-card">
              <div className="discover-cover" aria-hidden="true" />
              <p className="discover-card-title">歌单名称</p>
              <p className="discover-card-meta">播放量：--</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="discover-section">
        <h2 className="discover-section-title">
          <span className="discover-section-anchor" />
          推荐歌手
        </h2>
        <ul className="discover-grid-artist">
          {ARTIST_SLOTS.map((i) => (
            <li key={i} className="discover-artist">
              <div className="discover-avatar" aria-hidden="true" />
              <p className="discover-artist-name">歌手名</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="discover-section">
        <h2 className="discover-section-title">
          <span className="discover-section-anchor" />
          新碟上架
        </h2>
        <ul className="discover-grid">
          {ALBUM_SLOTS.map((i) => (
            <li key={i} className="discover-card">
              <div className="discover-cover" aria-hidden="true" />
              <p className="discover-card-title">专辑名称</p>
              <p className="discover-card-meta">发行日期：--</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Discover