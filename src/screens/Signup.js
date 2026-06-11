import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Auth.module.css';

export default function Signup() {
  const { signup }  = useAuth();
  const navigate    = useNavigate();
  const [name, setName]   = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass]   = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = () => {
    if (!name || !email || !pass) { setError('Please fill in all fields'); return; }
    if (pass.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true); setError('');
    setTimeout(() => {
      const res = signup(name, email, pass);
      if (res.error) { setError(res.error); setLoading(false); }
      else navigate('/dashboard');
    }, 400);
  };

  return (
    <div className="screen">
      <div className={styles.wrap}>
        <div className={styles.logoBlock}>
          <div className={styles.logoIcon}>₿</div>
          <div className={styles.wordmark}>
            <span className={styles.bit}>Bit</span><span className={styles.lrn}>Learn</span>
          </div>
          <p className={styles.tagline}>Master Bitcoin through play</p>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Create your account</h2>
          <p className={styles.cardSub}>Free — no credit card needed</p>

          <div className={styles.fields}>
            {[
              { label: 'Your name', type: 'text', ph: 'Amara Osei', val: name, set: setName },
              { label: 'Email', type: 'email', ph: 'you@example.com', val: email, set: setEmail },
              { label: 'Password', type: 'password', ph: '6+ characters', val: pass, set: setPass },
            ].map(f => (
              <div key={f.label} className={styles.fieldGroup}>
                <label className={`${styles.label} mono`}>{f.label}</label>
                <input className="input-field" type={f.type} placeholder={f.ph}
                  value={f.val} onChange={e => f.set(e.target.value)} />
              </div>
            ))}
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button className="btn-primary" onClick={submit} disabled={loading}>
            {loading ? 'Creating account…' : 'Start learning →'}
          </button>
        </div>

        <p className={styles.switchText}>
          Already have an account?{' '}
          <Link to="/login" className={styles.switchLink}>Log in</Link>
        </p>
      </div>
    </div>
  );
}
