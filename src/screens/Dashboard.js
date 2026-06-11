import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Dashboard.module.css';

const levels = [
  {
    id: 1, icon: '💸', color: 'accent',
    title: 'What is Money?',
    desc: 'History of money, Bitcoin origin, fixed supply, Africa context',
    meta: '6 slides · 4 questions · 150 XP',
    route: '/level/1'
  },
  {
    id: 2, icon: '⛓️', color: 'blue',
    title: 'How Bitcoin Works',
    desc: 'Transactions, the blockchain, private keys, wallets explained',
    meta: '6 slides · 4 questions · 200 XP',
    route: '/level/2'
  },
  {
    id: 3, icon: '⛏️', color: 'yellow',
    title: 'Mining & Consensus',
    desc: 'Proof of Work, block rewards, halving, why you can\'t cheat',
    meta: 'Coming soon',
    route: null
  },
  {
    id: 4, icon: '🔑', color: 'purple',
    title: 'Wallets & Self-Custody',
    desc: 'Seed phrases, custodial vs non-custodial, hardware wallets',
    meta: 'Coming soon',
    route: null
  },
  {
    id: 5, icon: '⚡', color: 'green',
    title: 'Lightning Network',
    desc: 'Payment channels, routing, instant payments across Africa',
    meta: 'Coming soon',
    route: null
  },
];

const COLOR_MAP = {
  accent: { bg: 'rgba(247,147,26,0.1)', border: 'rgba(247,147,26,0.3)', text: '#F7931A' },
  blue:   { bg: 'rgba(88,166,255,0.1)', border: 'rgba(88,166,255,0.3)', text: '#58A6FF' },
  green:  { bg: 'rgba(63,185,80,0.1)',  border: 'rgba(63,185,80,0.3)',  text: '#3FB950' },
  yellow: { bg: 'rgba(227,179,65,0.1)', border: 'rgba(227,179,65,0.3)', text: '#E3B341' },
  purple: { bg: 'rgba(188,140,255,0.1)',border: 'rgba(188,140,255,0.3)',text: '#BC8CFF' },
};

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) || '?';
  const xpNeeded = 1000;
  const xpPct    = Math.min(100, Math.round(((user?.xp || 0) / xpNeeded) * 100));
  const streak   = user?.streak || 0;
  const days     = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const isCompleted = (id) => user?.completedLevels?.includes(id);
  const isLocked    = (id) => id > 1 && !isCompleted(id - 1);

  return (
    <div className="screen">
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.wordmark}>
          <span className={styles.bit}>Bit</span><span className={styles.learn}>Learn</span>
          <span className={styles.bolt}>⚡</span>
        </div>
        <div className={styles.avatarBtn} onClick={logout} title="Tap to logout">
          <div className={styles.avatar}>{initials}</div>
          <span className={styles.greeting}>Hey, {user?.name?.split(' ')[0]}</span>
        </div>
      </div>

      {/* XP bar */}
      <div className={styles.xpSection}>
        <div className={styles.xpRow}>
          <span className={`${styles.xpLabel} mono`}>Level {user?.level || 1}</span>
          <span className={`${styles.xpVal} mono`}>{user?.xp || 0} / {xpNeeded} XP</span>
        </div>
        <div className={styles.xpTrack}>
          <div className={styles.xpFill} style={{ width: `${xpPct}%` }} />
        </div>
      </div>

      {/* Stats row */}
      <div className={styles.statsRow}>
        {[
          { val: user?.xp || 0,                     label: 'XP',     color: 'var(--accent)' },
          { val: `${user?.completedLevels?.length || 0}/5`, label: 'Levels', color: 'var(--blue)' },
          { val: user?.badges?.length || 0,           label: 'Badges', color: 'var(--purple)' },
          { val: streak + '🔥',                       label: 'Streak', color: 'var(--yellow)' },
        ].map((s, i) => (
          <div key={i} className={styles.stat}>
            <div className={styles.statVal} style={{ color: s.color }}>{s.val}</div>
            <div className={`${styles.statLabel} mono`}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Streak */}
      <div className={styles.section}>
        <div className={styles.streakCard}>
          <div className={styles.streakLeft}>
            <div className={styles.streakNum}>{streak}</div>
            <div className={`${styles.streakLabel} mono`}>day streak</div>
          </div>
          <div className={styles.streakRight}>
            <div className={`${styles.streakHint} mono`}>Keep it going 🔥</div>
            <div className={styles.dayRow}>
              {days.map((d, i) => (
                <div key={i} className={`${styles.dayDot} mono ${i < streak ? styles.hit : ''} ${i === streak ? styles.today : ''}`}>{d}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Levels */}
      <div className={styles.section}>
        <div className={styles.sectionHd}>
          <span className={`${styles.sectionTitle} mono`}>Curriculum</span>
          <span className={`${styles.sectionSub} mono`}>{user?.completedLevels?.length || 0} of 5 done</span>
        </div>
        <div className={styles.levelList}>
          {levels.map(lv => {
            const done   = isCompleted(lv.id);
            const locked = isLocked(lv.id) || !lv.route;
            const c      = COLOR_MAP[lv.color];
            return (
              <div
                key={lv.id}
                className={`${styles.lcard} ${locked ? styles.lcardLocked : ''} ${done ? styles.lcardDone : ''}`}
                style={!locked && !done ? { borderColor: c.border } : {}}
                onClick={() => !locked && lv.route && navigate(lv.route)}
              >
                <div className={styles.lcardLeft}>
                  <div
                    className={styles.lcardIconWrap}
                    style={{ background: c.bg, border: `1px solid ${c.border}` }}
                  >
                    <span className={styles.lcardIcon}>{lv.icon}</span>
                  </div>
                </div>
                <div className={styles.lcardBody}>
                  <div className={styles.lcardTop}>
                    <span className={styles.lcardTitle}>{lv.title}</span>
                    {done && <span className={`${styles.pill} mono`} style={{ background: 'rgba(63,185,80,0.15)', color: 'var(--green)', borderColor: 'rgba(63,185,80,0.3)' }}>Done ✓</span>}
                    {!done && !locked && <span className={`${styles.pill} mono`} style={{ background: c.bg, color: c.text, borderColor: c.border }}>Start →</span>}
                    {locked && <span className={`${styles.pill} mono`} style={{ color: 'var(--muted)', borderColor: 'var(--border)' }}>🔒</span>}
                  </div>
                  <p className={styles.lcardDesc}>{lv.desc}</p>
                  <span className={`${styles.lcardMeta} mono`}>{lv.meta}</span>
                  <div className={styles.miniBar}>
                    <div className={styles.miniBarFill} style={{
                      width: done ? '100%' : '0%',
                      background: done ? 'var(--green)' : c.text
                    }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges */}
      {user?.badges?.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionHd}>
            <span className={`${styles.sectionTitle} mono`}>Badges</span>
          </div>
          <div className={styles.badgeGrid}>
            {user.badges.map((b, i) => (
              <div key={i} className={styles.bcard}>
                <div className={styles.bcardIco}>{b.icon}</div>
                <div className={styles.bcardName}>{b.name}</div>
                <div className={`${styles.bcardWhen} mono`}>{b.when}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ height: 40 }} />
    </div>
  );
}
