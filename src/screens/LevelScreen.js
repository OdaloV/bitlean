import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './LevelScreen.module.css';

const COLOR_MAP = {
  red:    { bg: 'rgba(248,81,73,0.1)',   border: 'rgba(248,81,73,0.25)',   text: '#F85149' },
  blue:   { bg: 'rgba(88,166,255,0.1)',  border: 'rgba(88,166,255,0.25)',  text: '#58A6FF' },
  green:  { bg: 'rgba(63,185,80,0.1)',   border: 'rgba(63,185,80,0.25)',   text: '#3FB950' },
  yellow: { bg: 'rgba(227,179,65,0.1)',  border: 'rgba(227,179,65,0.25)',  text: '#E3B341' },
  purple: { bg: 'rgba(188,140,255,0.1)', border: 'rgba(188,140,255,0.25)', text: '#BC8CFF' },
  accent: { bg: 'rgba(247,147,26,0.1)',  border: 'rgba(247,147,26,0.25)',  text: '#F7931A' },
};

const PHASE = { INTRO: 'intro', STORY: 'story', QUIZ: 'quiz', BADGE: 'badge' };

export default function LevelScreen({
  levelNum, levelTitle, levelIcon, levelColor,
  slides, questions, badgeName, badgeIcon, xpReward,
  nextLevelRoute
}) {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const [phase, setPhase]             = useState(PHASE.INTRO);
  const [slideIdx, setSlideIdx]       = useState(0);
  const [bodyIdx, setBodyIdx]         = useState(0);   // which paragraph we're showing
  const [choicePicked, setChoicePicked] = useState(null);
  const [choiceResult, setChoiceResult] = useState(null);
  const [choiceLocked, setChoiceLocked] = useState(false);

  const [qIdx, setQIdx]               = useState(0);
  const [selected, setSelected]       = useState(null);
  const [answered, setAnswered]       = useState(false);
  const [score, setScore]             = useState(0);
  const [xpEarned, setXpEarned]       = useState(0);

  const bodyRef = useRef(null);

  const slide    = slides[slideIdx];
  const question = questions[qIdx];
  const col      = COLOR_MAP[slide?.color] || COLOR_MAP.accent;

  // reset body paragraph when slide changes
  useEffect(() => { setBodyIdx(0); setChoicePicked(null); setChoiceResult(null); setChoiceLocked(false); }, [slideIdx]);

  // scroll to top on phase change
  useEffect(() => { window.scrollTo(0,0); }, [phase, slideIdx, qIdx]);

  // ── helpers ────────────────────────────────────────────────────────────────
  const allParasShown = bodyIdx >= slide?.body?.length - 1;

  const handleNextPara = () => {
    if (bodyIdx < slide.body.length - 1) {
      setBodyIdx(i => i + 1);
    }
  };

  const handleChoice = (idx) => {
    if (choiceLocked) return;
    setChoicePicked(idx);
    setChoiceResult(idx === slide.choice.correct ? 'correct' : 'wrong');
    setChoiceLocked(true);
  };

  const afterChoice = () => {
    if (slideIdx < slides.length - 1) {
      setSlideIdx(i => i + 1);
    } else {
      setPhase(PHASE.QUIZ);
    }
  };

  const goNextSlide = () => {
    if (slideIdx < slides.length - 1) {
      setSlideIdx(i => i + 1);
    } else {
      setPhase(PHASE.QUIZ);
    }
  };

  const handleAnswer = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === question.answer) setScore(s => s + 1);
  };

  const nextQuestion = () => {
    const isLast = qIdx >= questions.length - 1;
    if (!isLast) {
      setQIdx(i => i + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      const finalCorrect = score + (selected === question?.answer ? 1 : 0);
      const pct = Math.round((finalCorrect / questions.length) * 100);
      const earned = Math.round((pct / 100) * xpReward);
      setXpEarned(earned);
      const alreadyDone = user?.completedLevels?.includes(levelNum);
      if (!alreadyDone) {
        updateUser({
          xp: (user?.xp || 0) + earned,
          completedLevels: [...(user?.completedLevels || []), levelNum],
          streak: (user?.streak || 0) + 1,
          badges: [...(user?.badges || []), { icon: badgeIcon, name: badgeName, when: 'Today' }]
        });
      }
      setPhase(PHASE.BADGE);
    }
  };

  const finalScore = questions.length > 0
    ? Math.round(((score + (answered && selected === question?.answer ? 1 : 0)) / questions.length) * 100)
    : 0;

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if (phase === PHASE.INTRO) {
    const c = COLOR_MAP[levelColor] || COLOR_MAP.accent;
    return (
      <div className="screen">
        <div className={styles.topbar}>
          <button className={styles.back} onClick={() => navigate('/dashboard')}>← Back</button>
        </div>
        <div className={styles.introWrap}>
          <div className={styles.introBadge} style={{ background: c.bg, border: `1px solid ${c.border}` }}>
            <span className={`${styles.introTag} mono`} style={{ color: c.text }}>Level {levelNum}</span>
          </div>
          <div className={styles.introIcon}>{levelIcon}</div>
          <h1 className={styles.introTitle}>{levelTitle}</h1>
          <div className={styles.introMeta}>
            <span className={`${styles.metaChip} mono`}>📖 {slides.length} slides</span>
            <span className={`${styles.metaChip} mono`}>❓ {questions.length} questions</span>
            <span className={`${styles.metaChip} mono`}>⚡ +{xpReward} XP</span>
          </div>
          <p className={styles.introSub}>Read each slide at your own pace. Tap <strong>Continue</strong> when ready to move on.</p>

          <div className={styles.topicList}>
            {slides.map((s, i) => (
              <div key={i} className={styles.topicItem}>
                <span className={styles.topicDot} style={{ background: (COLOR_MAP[s.color] || COLOR_MAP.accent).text }} />
                <span className={`${styles.topicTag} mono`} style={{ color: (COLOR_MAP[s.color] || COLOR_MAP.accent).text }}>{s.tag}</span>
                <span className={styles.topicTitle}>{s.title}</span>
              </div>
            ))}
          </div>

          <button className="btn-primary" style={{ marginTop: 'auto' }} onClick={() => setPhase(PHASE.STORY)}>
            Start learning →
          </button>
        </div>
      </div>
    );
  }

  // ── STORY ──────────────────────────────────────────────────────────────────
  if (phase === PHASE.STORY) return (
    <div className="screen">
      {/* Topbar */}
      <div className={styles.topbar}>
        <button className={styles.back} onClick={() => navigate('/dashboard')}>← Back</button>
        <div className={styles.progressBar}>
          <div className={styles.progressFill}
            style={{ width: `${((slideIdx) / slides.length) * 100}%` }} />
        </div>
        <span className={`${styles.counter} mono`}>{slideIdx + 1}/{slides.length}</span>
      </div>

      {/* Tag + title */}
      <div className={styles.storyHead} style={{ borderBottomColor: col.border }}>
        <span className={`${styles.tagPill} mono`} style={{ background: col.bg, color: col.text, border: `1px solid ${col.border}` }}>
          {slide.tag}
        </span>
        <div className={styles.slideIcon}>{slide.icon}</div>
        <h2 className={styles.slideTitle}>{slide.title}</h2>
      </div>

      {/* Body paragraphs — reveal one at a time */}
      <div className={styles.storyBody} ref={bodyRef}>
        {slide.body.slice(0, bodyIdx + 1).map((para, i) => (
          <p
            key={i}
            className={`${styles.para} ${i === bodyIdx ? styles.paraNew : styles.paraOld}`}
          >
            {para}
          </p>
        ))}

        {/* "Show more" nudge when more paragraphs remain */}
        {!allParasShown && (
          <button className={styles.moreBtn} onClick={handleNextPara}>
            Read more ↓
          </button>
        )}

        {/* Choice block — shows only when all text revealed and no result yet */}
        {allParasShown && slide.choice && !choiceResult && (
          <div className={styles.choiceBlock}>
            <p className={`${styles.choiceQ} mono`}>💬 {slide.choice.question}</p>
            <div className={styles.choiceGrid}>
              {slide.choice.options.map((opt, i) => (
                <button
                  key={i}
                  className={`${styles.choiceBtn} ${choicePicked === i ? styles.choicePicked : ''}`}
                  onClick={() => handleChoice(i)}
                  disabled={choiceLocked}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Feedback after choice — only render when current slide has a choice */}
        {choiceResult && slide.choice && choicePicked !== null && (
          <div className={`${styles.feedback} ${choiceResult === 'correct' ? styles.fbGood : styles.fbBad}`}>
            <span className={styles.fbIcon}>{choiceResult === 'correct' ? '✓' : '✗'}</span>
            <p>{slide.choice.feedback[choicePicked]}</p>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className={styles.footer}>
        {!slide.choice && allParasShown && (
          <button className="btn-primary" onClick={goNextSlide}>
            {slideIdx < slides.length - 1 ? 'Continue →' : 'Take the quiz →'}
          </button>
        )}
        {slide.choice && choiceResult && (
          <button className="btn-primary" onClick={afterChoice}>
            {slideIdx < slides.length - 1 ? 'Continue →' : 'Take the quiz →'}
          </button>
        )}
        {slide.choice && !choiceResult && allParasShown && (
          <p className={`${styles.choiceHint} mono`}>Answer the question above to continue</p>
        )}
        {!allParasShown && (
          <p className={`${styles.choiceHint} mono`}>Reading… tap "Read more" to continue</p>
        )}
      </div>
    </div>
  );

  // ── QUIZ ────────────────────────────────────────────────────────────────────
  if (phase === PHASE.QUIZ && question) return (
    <div className="screen">
      <div className={styles.topbar}>
        <button className={styles.back} onClick={() => navigate('/dashboard')}>← Back</button>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${(qIdx / questions.length) * 100}%` }} />
        </div>
        <span className={`${styles.counter} mono`}>{qIdx + 1}/{questions.length}</span>
      </div>

      <div className={styles.quizWrap}>
        <div className={styles.quizMeta}>
          <span className={`${styles.quizTag} mono`}>Quiz · Level {levelNum}</span>
          <span className={`${styles.quizScore} mono`}>{score} correct</span>
        </div>

        <h2 className={styles.quizQ}>{question.question}</h2>

        <div className={styles.options}>
          {question.options.map((opt, i) => {
            let cls = styles.option;
            if (answered) {
              if (i === question.answer) cls += ' ' + styles.optCorrect;
              else if (i === selected)   cls += ' ' + styles.optWrong;
              else                        cls += ' ' + styles.optDim;
            } else if (selected === i) {
              cls += ' ' + styles.optSelected;
            }
            return (
              <button key={i} className={cls} onClick={() => handleAnswer(i)} disabled={answered}>
                <span className={`${styles.optLetter} mono`}>{['A','B','C','D'][i]}</span>
                <span className={styles.optText}>{opt}</span>
                {answered && i === question.answer && <span className={styles.tick}>✓</span>}
                {answered && i === selected && i !== question.answer && <span className={styles.cross}>✗</span>}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className={`${styles.explanation} ${selected === question.answer ? styles.explGood : styles.explBad}`}>
            <strong>{selected === question.answer ? '✓ Correct' : '✗ Not quite'}</strong>
            <p>{question.explanation}</p>
          </div>
        )}
      </div>

      {answered && (
        <div className={styles.footer}>
          <button className="btn-primary" onClick={nextQuestion}>
            {qIdx < questions.length - 1 ? 'Next question →' : 'See my results →'}
          </button>
        </div>
      )}
    </div>
  );

  // ── BADGE ────────────────────────────────────────────────────────────────────
  if (phase === PHASE.BADGE) {
    const grade = finalScore >= 80 ? 'Excellent' : finalScore >= 60 ? 'Good job' : 'Keep learning';
    return (
      <div className="screen">
        <div className={styles.badgeScreen}>
          <div className={styles.badgeGlow} />
          <div className={styles.badgeIconBig}>{badgeIcon}</div>
          <h2 className={styles.badgeTitle}>Level {levelNum} complete!</h2>
          <p className={styles.badgeSub}>{grade} — you earned the <em>{badgeName}</em> badge</p>

          <div className={styles.scoreGrid}>
            <div className={styles.scoreCard}>
              <div className={styles.scoreVal}>{finalScore}%</div>
              <div className={`${styles.scoreLabel} mono`}>Quiz score</div>
            </div>
            <div className={styles.scoreCard}>
              <div className={styles.scoreVal} style={{ color: 'var(--accent)' }}>+{xpEarned}</div>
              <div className={`${styles.scoreLabel} mono`}>XP earned</div>
            </div>
            <div className={styles.scoreCard}>
              <div className={styles.scoreVal}>{slides.length}</div>
              <div className={`${styles.scoreLabel} mono`}>Slides read</div>
            </div>
            <div className={styles.scoreCard}>
              <div className={styles.scoreVal}>{questions.length}</div>
              <div className={`${styles.scoreLabel} mono`}>Questions</div>
            </div>
          </div>

          <div className={styles.badgePill}>{badgeIcon} {badgeName}</div>

          <div className={styles.badgeActions}>
            {nextLevelRoute && (
              <button className="btn-primary" onClick={() => navigate(nextLevelRoute)}>
                Next level →
              </button>
            )}
            <button className="btn-ghost" onClick={() => navigate('/dashboard')}>
              Back to dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
