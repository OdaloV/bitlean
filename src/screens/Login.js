import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Auth.module.css';

export default function Login() {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const [email, setEmail]     = useState('');
  const [pass, setPass]       = useState('');
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!email || !pass) { setError('Please fill in all fields'); return; }
    setLoading(true); setError('');
    setTimeout(() => {
      const res = login(email, pass);
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
          <h2 className={styles.cardTitle}>Welcome back</h2>
          <p className={styles.cardSub}>Log in to continue your journey</p>

          <div className={styles.fields}>
            <div className={styles.fieldGroup}>
              <label className={`${styles.label} mono`}>Email</label>
              <input className="input-field" type="email" placeholder="you@example.com"
                value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className={styles.fieldGroup}>
              <label className={`${styles.label} mono`}>Password</label>
              <input className="input-field" type="password" placeholder="••••••••"
                value={pass} onChange={e => setPass(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && submit(e)} />
            </div>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button className="btn-primary" onClick={submit} disabled={loading}>
            {loading ? 'Logging in…' : 'Log in →'}
          </button>
        </div>

        <p className={styles.switchText}>
          Don't have an account?{' '}
          <Link to="/signup" className={styles.switchLink}>Sign up free</Link>
        </p>
      </div>
    </div>
  );
}
