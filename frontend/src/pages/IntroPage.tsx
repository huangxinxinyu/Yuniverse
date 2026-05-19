import { motion, useScroll, useTransform } from 'framer-motion'
import { profile, siteSections } from '../content/siteContent'

const introChapters = [
  {
    id: 'home',
    label: 'Home',
    sound: 'WHOOSH',
    soundStyle: 'burst',
    title: profile.name,
    body: profile.heroText,
  },
  {
    id: 'about',
    label: siteSections.about.label,
    sound: 'SHOOM',
    soundStyle: 'slash',
    title: '黄新宇',
    body: siteSections.about.summary,
  },
  {
    id: 'work',
    label: siteSections.work.label,
    sound: 'SKRRR',
    soundStyle: 'stamp',
    title: 'All AI',
    body: 'Projects, tools, and software craft.',
  },
  {
    id: 'life',
    label: siteSections.life.label,
    sound: 'SWISH',
    soundStyle: 'caption',
    title: 'razzle dazzle',
    body: 'Cities, school chapters, and small field notes.',
  },
  {
    id: 'blog',
    label: 'Blog',
    sound: 'SNAP',
    soundStyle: 'stamp',
    title: 'all kinds of craps',
    body: '',
  },
  {
    id: 'collection',
    label: 'Collection',
    sound: null,
    soundStyle: null,
    title: 'music, movie, picture',
    body: '',
  },
] as const

const renderIntroTitle = (title: string | readonly string[]) =>
  Array.isArray(title)
    ? title.map((line) => (
        <span className="intro-title-line" key={line}>
          {line}
        </span>
      ))
    : title

export function IntroPage() {
  const { scrollYProgress } = useScroll()
  const impactPointX = '54vw'
  const impactPointY = '76vh'
  const cometX = useTransform(scrollYProgress, [0, 0.82, 1], ['78vw', impactPointX, impactPointX])
  const cometY = useTransform(scrollYProgress, [0, 0.82, 1], ['8vh', impactPointY, impactPointY])
  const tailScale = useTransform(scrollYProgress, [0, 0.76, 0.88, 1], [0.58, 1.28, 0.42, 0.08])
  const coreRotate = useTransform(scrollYProgress, [0, 1], [0, 900])
  const cometCoreOpacity = useTransform(scrollYProgress, [0, 0.84, 0.94], [1, 1, 0])
  const compressionOpacity = useTransform(scrollYProgress, [0, 0.8, 0.84, 0.9], [0, 0, 1, 0])
  const compressionScale = useTransform(scrollYProgress, [0, 0.8, 0.84, 0.9], [0.2, 0.2, 1, 1.45])
  const cosmosOpacity = useTransform(scrollYProgress, [0, 0.45, 0.82, 1], [0.28, 0.48, 0.72, 0.36])
  const starShiftX = useTransform(scrollYProgress, [0, 1], ['0vw', '-8vw'])
  const starShiftY = useTransform(scrollYProgress, [0, 1], ['0vh', '6vh'])
  const dustScale = useTransform(scrollYProgress, [0, 0.82, 1], [0.82, 1.42, 0.62])
  const rayOpacity = useTransform(scrollYProgress, [0, 0.55, 0.82, 1], [0.05, 0.22, 0.72, 0.28])
  const nearCosmosOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 1], [0.48, 0.58, 0.28, 0.16])
  const nearCosmosX = useTransform(scrollYProgress, [0, 1], ['0vw', '-3vw'])
  const nearCosmosY = useTransform(scrollYProgress, [0, 1], ['0vh', '4vh'])
  const midCosmosOpacity = useTransform(scrollYProgress, [0, 0.18, 0.46, 0.74, 1], [0, 0.08, 0.52, 0.38, 0.16])
  const midCosmosX = useTransform(scrollYProgress, [0, 1], ['4vw', '-10vw'])
  const midCosmosY = useTransform(scrollYProgress, [0, 1], ['-3vh', '8vh'])
  const deepCosmosOpacity = useTransform(scrollYProgress, [0, 0.34, 0.62, 0.88, 1], [0, 0, 0.46, 0.74, 0.42])
  const deepCosmosX = useTransform(scrollYProgress, [0, 1], ['-6vw', '9vw'])
  const deepCosmosY = useTransform(scrollYProgress, [0, 1], ['5vh', '-7vh'])
  const deepCosmosScale = useTransform(scrollYProgress, [0, 0.58, 1], [0.96, 1.08, 1.18])
  const impactCosmosOpacity = useTransform(scrollYProgress, [0, 0.64, 0.82, 1], [0, 0, 0.42, 0.84])
  const impactCosmosX = useTransform(scrollYProgress, [0, 1], ['8vw', '-4vw'])
  const impactCosmosY = useTransform(scrollYProgress, [0, 1], ['-6vh', '3vh'])
  const planetOpacity = useTransform(scrollYProgress, [0, 0.62, 0.8, 1], [0, 0.75, 1, 0.45])
  const planetScale = useTransform(scrollYProgress, [0, 0.78, 0.84, 1], [0.82, 1, 0.88, 1.12])
  const flashOpacity = useTransform(scrollYProgress, [0, 0.81, 0.84, 0.9], [0, 0, 1, 0])
  const flashScale = useTransform(scrollYProgress, [0, 0.81, 0.84, 0.9], [0.2, 0.2, 1, 1.7])
  const burstOpacity = useTransform(scrollYProgress, [0, 0.84, 0.9, 1], [0, 0, 0.68, 1])
  const burstScale = useTransform(scrollYProgress, [0, 0.84, 0.9, 1], [0.2, 0.2, 0.9, 1.85])
  const impactBoomOpacity = useTransform(scrollYProgress, [0, 0.83, 0.88, 1], [0, 0, 1, 1])
  const impactBoomScale = useTransform(scrollYProgress, [0, 0.83, 0.9, 1], [0.35, 0.35, 1.12, 1])
  const radialsOpacity = useTransform(scrollYProgress, [0, 0.84, 0.92, 1], [0, 0, 0.68, 0.96])
  const radialsScale = useTransform(scrollYProgress, [0, 0.84, 1], [0.2, 0.2, 1.28])
  const shockwaveOpacity = useTransform(scrollYProgress, [0, 0.86, 0.95, 1], [0, 0, 0.8, 0.26])
  const shockwaveScale = useTransform(scrollYProgress, [0, 0.86, 1], [0.2, 0.2, 1.9])
  const smokeOpacity = useTransform(scrollYProgress, [0, 0.88, 0.96, 1], [0, 0, 0.72, 0.86])
  const debrisOpacity = useTransform(scrollYProgress, [0, 0.86, 0.93, 1], [0, 0, 1, 1])
  const finalGateOpacity = useTransform(scrollYProgress, [0, 0.93, 0.98, 1], [0, 0, 0.5, 1])
  const finalGateY = useTransform(scrollYProgress, [0.93, 1], [54, 0])
  const finalGateScale = useTransform(scrollYProgress, [0.93, 1], [0.86, 1])

  return (
    <main className="intro-page" data-route="/intro">
      <motion.div className="intro-scroll-cosmos" aria-hidden="true" style={{ opacity: cosmosOpacity }}>
        <motion.span className="intro-scroll-starfield" style={{ x: starShiftX, y: starShiftY }} />
        <motion.span className="intro-scroll-dust" style={{ scaleX: dustScale }} />
        <motion.span className="intro-scroll-rays" style={{ opacity: rayOpacity }} />
        <motion.span className="intro-cosmos-layer intro-cosmos-near" style={{ opacity: nearCosmosOpacity, x: nearCosmosX, y: nearCosmosY }}>
          <span className="intro-cosmos-comic-stars" />
          <span className="intro-cosmos-orbits" />
        </motion.span>
        <motion.span className="intro-cosmos-layer intro-cosmos-mid" style={{ opacity: midCosmosOpacity, x: midCosmosX, y: midCosmosY }}>
          <span className="intro-cosmos-galaxies" />
          <span className="intro-cosmos-constellations" />
        </motion.span>
        <motion.span className="intro-cosmos-layer intro-cosmos-deep" style={{ opacity: deepCosmosOpacity, x: deepCosmosX, y: deepCosmosY, scale: deepCosmosScale }}>
          <span className="intro-cosmos-meteors" />
          <span className="intro-cosmos-radials" />
        </motion.span>
        <motion.span className="intro-cosmos-layer intro-cosmos-impact" style={{ opacity: impactCosmosOpacity, x: impactCosmosX, y: impactCosmosY }}>
          <span className="intro-cosmos-impact-dust" />
          <span className="intro-cosmos-impact-rays" />
        </motion.span>
      </motion.div>

      <motion.div
        className="intro-comet-track"
        aria-hidden="true"
        style={{ x: cometX, y: cometY }}
      >
        <div className="intro-comet-shell">
          <motion.span
            className="intro-comet-fire-scale"
            style={{ opacity: cometCoreOpacity, scaleX: tailScale }}
          >
            <span className="intro-comet-fire" />
          </motion.span>
          <motion.span
            className="intro-comet-core-spin"
            style={{ opacity: cometCoreOpacity, rotate: coreRotate }}
          >
            <span className="intro-comet-core">
              <span className="intro-comet-ring intro-comet-ring-1" />
              <span className="intro-comet-ring intro-comet-ring-2" />
              <span className="intro-comet-ring intro-comet-ring-3" />
            </span>
          </motion.span>
          <motion.span
            className="intro-comet-compression"
            style={{ opacity: compressionOpacity, scale: compressionScale }}
          />
        </div>
      </motion.div>

      <div className="intro-progress" aria-hidden="true">
        <span>Follow the comet</span>
      </div>
      <div className="intro-scroll-meter" aria-hidden="true">
        <motion.span style={{ scaleY: scrollYProgress }} />
      </div>

      {introChapters.map((chapter, index) => (
        <section className="intro-chapter" key={chapter.id}>
          <motion.div
            className={`intro-copy intro-copy-${index % 2 === 0 ? 'left' : 'right'}${
              chapter.id === 'collection' ? ' intro-copy-collection' : ''
            }`}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.52, once: false }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="intro-label">{chapter.label}</p>
            <h1>{renderIntroTitle(chapter.title)}</h1>
            {chapter.body ? <p>{chapter.body}</p> : null}
          </motion.div>
          {chapter.sound && chapter.soundStyle ? (
            <motion.div
              className={`intro-sound intro-sound-cloud intro-sound-cloud-${index}`}
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.82, x: 22, y: -14 }}
              whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              viewport={{ amount: 0.58, once: false }}
              transition={{ duration: 0.34, ease: 'easeOut' }}
            >
              <span className={`intro-sound-split-mask intro-sound-style-${chapter.soundStyle}`}>
                <span className="intro-sound-word-outside" data-text={chapter.sound}>
                  {chapter.sound}
                </span>
                <span className="intro-sound-bubble">
                  <span className="intro-sound-halftone" />
                  <span className="intro-sound-word-inside" data-text={chapter.sound}>
                    {chapter.sound}
                  </span>
                </span>
              </span>
            </motion.div>
          ) : null}
        </section>
      ))}

      <section className="intro-gate" aria-label="Yuniverse entry">
        <div className="intro-collision-stage" aria-hidden="true">
          <motion.span
            className="intro-impact-planet"
            style={{ opacity: planetOpacity, scale: planetScale }}
          >
            <span className="intro-planet-crack intro-planet-crack-a" />
            <span className="intro-planet-crack intro-planet-crack-b" />
            <span className="intro-planet-piece intro-planet-piece-a" />
            <span className="intro-planet-piece intro-planet-piece-b" />
            <span className="intro-planet-piece intro-planet-piece-c" />
          </motion.span>
          <motion.span className="intro-impact-flash" style={{ opacity: flashOpacity, scale: flashScale }} />
          <motion.span className="intro-impact-burst" style={{ opacity: burstOpacity, scale: burstScale }} />
          <motion.div
            className="intro-sound intro-impact-boom"
            style={{ opacity: impactBoomOpacity, scale: impactBoomScale }}
          >
            <span className="intro-sound-split-mask intro-sound-style-burst intro-impact-boom-word">
              <span className="intro-sound-word-outside" data-text="BOOM">
                BOOM
              </span>
              <span className="intro-sound-bubble">
                <span className="intro-sound-halftone" />
                <span className="intro-sound-word-inside" data-text="BOOM">
                  BOOM
                </span>
              </span>
            </span>
          </motion.div>
          <motion.span
            className="intro-impact-radials"
            style={{ opacity: radialsOpacity, scale: radialsScale }}
          />
          <motion.span
            className="intro-impact-shockwave intro-impact-shockwave-a"
            style={{ opacity: shockwaveOpacity, scale: shockwaveScale }}
          />
          <motion.span
            className="intro-impact-shockwave intro-impact-shockwave-b"
            style={{ opacity: shockwaveOpacity, scale: shockwaveScale }}
          />
          <motion.span className="intro-impact-smoke intro-impact-smoke-a" style={{ opacity: smokeOpacity }} />
          <motion.span className="intro-impact-smoke intro-impact-smoke-b" style={{ opacity: smokeOpacity }} />
          <motion.span
            className="intro-impact-debris intro-impact-debris-a"
            style={{ opacity: debrisOpacity }}
          />
          <motion.span
            className="intro-impact-debris intro-impact-debris-b"
            style={{ opacity: debrisOpacity }}
          />
          <motion.span
            className="intro-impact-debris intro-impact-debris-c"
            style={{ opacity: debrisOpacity }}
          />
        </div>
        <motion.div
          className="intro-comet-final-gate"
          style={{ opacity: finalGateOpacity, y: finalGateY, scale: finalGateScale }}
        >
          <p className="intro-label">Final gate</p>
          <a href="/" className="intro-enter">
            Enter Yuniverse
          </a>
        </motion.div>
      </section>
    </main>
  )
}
