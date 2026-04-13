import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: Math.random() < 0.5 ? 1 : Math.random() < 0.7 ? 2 : 3,
  duration: `${(Math.random() * 8 + 8).toFixed(1)}s`,
  delay: `${(Math.random() * 6).toFixed(1)}s`,
  color: i % 3 === 0 ? '#3B82F6' : i % 3 === 1 ? '#818CF8' : '#38BDF8',
}));

export default function NotFound() {
  const navigate = useNavigate();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const handle = (e) =>
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 24,
        y: (e.clientY / window.innerHeight - 0.5) * 24,
      });
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Mono:wght@400;500&display=swap');

        /* ─── Animations ─── */
        @keyframes floatUp {
          0%   { opacity:0; transform:translateY(0) scale(0.8); }
          10%  { opacity:1; }
          90%  { opacity:0.7; }
          100% { opacity:0; transform:translateY(-110px) scale(1.1); }
        }
        @keyframes orbitCW  { to { transform: rotate(360deg);  } }
        @keyframes orbitCCW { to { transform: rotate(-360deg); } }
        @keyframes breathe  {
          0%,100% { opacity:0.55; transform:scale(1);     }
          50%     { opacity:0.8;  transform:scale(1.012); }
        }
        @keyframes iconFloat {
          0%,100% { transform:translateY(0)    rotate(-0.5deg); }
          40%     { transform:translateY(-10px) rotate( 0.5deg); }
          70%     { transform:translateY(-5px)  rotate(-0.3deg); }
        }
        @keyframes sat1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes sat2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes shimmer { to { background-position: 200% center; } }
        @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes fadeDown {
          from { opacity:0; transform:translateY(-14px); }
          to   { opacity:1; transform:translateY(0);     }
        }

        .nx-particle   { animation: floatUp   var(--dur) ease-in-out var(--dly) infinite; }
        .nx-orbit-cw   { animation: orbitCW  14s linear infinite; }
        .nx-orbit-ccw  { animation: orbitCCW 20s linear infinite; }
        .nx-breathe    { animation: breathe  4s ease-in-out infinite; }
        .nx-float      { animation: iconFloat 3.2s ease-in-out infinite; }
        .nx-sat1       { animation: sat1 2.6s ease-in-out 0.4s infinite; }
        .nx-sat2       { animation: sat2 3.1s ease-in-out 0.9s infinite; }
        .nx-blink      { animation: blink 1.6s ease-in-out infinite; }

        .nx-fd0  { animation: fadeDown 0.55s ease 0.00s both; }
        .nx-fd1  { animation: fadeDown 0.55s ease 0.10s both; }
        .nx-fd2  { animation: fadeDown 0.55s ease 0.20s both; }
        .nx-fd3  { animation: fadeDown 0.55s ease 0.30s both; }
        .nx-fd4  { animation: fadeDown 0.55s ease 0.42s both; }
        .nx-fd5  { animation: fadeDown 0.55s ease 0.54s both; }

        .nx-shimmer {
          background: linear-gradient(90deg,#3B82F6 0%,#818CF8 40%,#38BDF8 70%,#3B82F6 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }

        /* Orbit dot knob */
        .nx-orbit-cw::after {
          content:'';
          position:absolute;
          width:6px; height:6px;
          background:#3B82F6;
          border-radius:50%;
          top:-3px; left:50%;
          transform:translateX(-50%);
          box-shadow: 0 0 8px 2px rgba(59,130,246,0.85);
        }

        /* Grid pattern using CSS only */
        .nx-grid {
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg,rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 80px 80px;
          -webkit-mask-image: radial-gradient(ellipse 65% 65% at 50% 50%, black 10%, transparent 80%);
          mask-image: radial-gradient(ellipse 65% 65% at 50% 50%, black 10%, transparent 80%);
        }
        /* Scan lines */
        .nx-scan {
          background: repeating-linear-gradient(
            0deg,transparent,transparent 2px,
            rgba(0,0,0,0.035) 2px,rgba(0,0,0,0.035) 4px
          );
        }
        /* Button transitions */
        .nx-btn-ghost  { transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1); }
        .nx-btn-ghost:hover  { background: rgba(255,255,255,0.065); border-color: rgba(255,255,255,0.13)!important; color:#F1F5F9; }
        .nx-btn-ghost:hover .nx-arrow { transform: translateX(-4px); }
        .nx-arrow { transition: transform 0.2s ease; }

        .nx-btn-prim  { transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1); box-shadow:0 8px 24px rgba(37,99,235,0.32),0 2px 8px rgba(0,0,0,0.3); }
        .nx-btn-prim:hover { transform:translateY(-2px); box-shadow:0 16px 36px rgba(37,99,235,0.46),0 4px 12px rgba(0,0,0,0.3); }

        .nx-pill:hover { background:rgba(59,130,246,0.1); border-color:rgba(59,130,246,0.25)!important; color:#93C5FD; }
        .nx-pill { transition: all 0.2s ease; }
      `}</style>

      {/* Root wrapper */}
      <div
        className="relative min-h-screen bg-[#060A14] flex items-center justify-center px-6 py-20 overflow-hidden"
        style={{ fontFamily: "'Syne', sans-serif", opacity: visible ? 1 : 0, transition: 'opacity 0.3s' }}
      >

        {/* Scan lines */}
        <div className="nx-scan absolute inset-0 pointer-events-none z-1" />
        {/* Grid */}
        <div className="nx-grid absolute inset-0 pointer-events-none z-1" />
        {/* Noise */}
        <div
          className="absolute inset-0 pointer-events-none z-1 opacity-[0.028]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />

        {/* Parallax orbs */}
        <div
          className="absolute -top-40 -left-32 w-135 h-135 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.13) 0%, transparent 70%)',
            filter: 'blur(80px)',
            transform: `translate(${mouse.x * 0.3}px, ${mouse.y * 0.3}px)`,
            transition: 'transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
        />
        <div
          className="absolute -bottom-40 -right-32 w-115 h-115 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.11) 0%, transparent 70%)',
            filter: 'blur(80px)',
            transform: `translate(${-mouse.x * 0.22}px, ${-mouse.y * 0.22}px)`,
            transition: 'transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Floating particles */}
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="nx-particle absolute rounded-full pointer-events-none opacity-0"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
              '--dur': p.duration,
              '--dly': p.delay,
            }}
          />
        ))}

        {/* ─── MAIN CONTENT ─── */}
        <div className="relative z-10 w-full max-w-190 text-center">

          {/* Ghost 404 backdrop */}
          <div
            className="nx-breathe absolute inset-0 -z-10 flex items-center justify-center pointer-events-none select-none overflow-hidden"
            aria-hidden
          >
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(140px, 28vw, 320px)',
                lineHeight: 1,
                letterSpacing: '-0.05em',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.055) 0%, transparent 80%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              404
            </span>
          </div>

          {/* ─── Icon cluster ─── */}
          <div className="nx-fd0 relative flex items-center justify-center mb-12" style={{ height: 170 }}>

            {/* Orbit ring 1 */}
            <div
              className="nx-orbit-cw absolute w-50 h-50 rounded-full"
              style={{ border: '1px dashed rgba(59,130,246,0.15)' }}
            />
            {/* Orbit ring 2 */}
            <div
              className="nx-orbit-ccw absolute w-65 h-65 rounded-full"
              style={{ border: '1px dashed rgba(99,102,241,0.09)' }}
            />

            {/* Main icon card */}
            <div
              className="nx-float relative z-10 flex items-center justify-center w-24 h-24 rounded-[22px]"
              style={{
                background: 'linear-gradient(135deg,#0F1F3D 0%,#162040 100%)',
                border: '1px solid rgba(59,130,246,0.22)',
                boxShadow: '0 0 55px rgba(59,130,246,0.12), 0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
            >
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ filter: 'drop-shadow(0 0 10px rgba(59,130,246,0.7))' }}>
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
            </div>

            {/* Satellite: Warning */}
            <div
              className="nx-sat1 absolute top-1 flex items-center justify-center w-11 h-11 rounded-[11px]"
              style={{
                right: 'calc(50% - 80px)',
                background: 'linear-gradient(135deg,#0F1F3D,#1E2D50)',
                border: '1px solid rgba(251,191,36,0.22)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 9v4" />
                <path d="m10.363 3.591-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636-2.87L13.637 3.59a1.914 1.914 0 0 0-3.274 0Z" />
                <path d="m12 16 .01-.011" />
              </svg>
            </div>

            {/* Satellite: Globe */}
            <div
              className="nx-sat2 absolute bottom-3 flex items-center justify-center w-11 h-11 rounded-[11px]"
              style={{
                left: 'calc(50% - 88px)',
                background: 'linear-gradient(135deg,#0F1F3D,#1E2D50)',
                border: '1px solid rgba(52,211,153,0.22)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                <path d="M2 12h20" />
              </svg>
            </div>
          </div>

          {/* ─── Status badge ─── */}
          <div className="nx-fd1 flex justify-center mb-5">
            <span
              className="inline-flex items-center gap-2 px-4 py-[0.35rem] rounded-full text-blue-400 border border-blue-500/20 bg-blue-500/[0.07]"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase' }}
            >
              <span className="nx-blink w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_6px_#3B82F6] shrink-0" />
              HTTP&nbsp;
              <span
                className="text-sky-400 bg-sky-400/10 border border-sky-400/20 rounded px-[0.4rem] py-[0.1rem]"
                style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.68rem' }}
              >
                404
              </span>
              &nbsp;—&nbsp;Page Not Found
            </span>
          </div>

          {/* ─── Heading ─── */}
          <h1
            className="nx-fd2 font-black tracking-tight leading-[1.05] text-slate-50 mb-5"
            style={{ fontSize: 'clamp(2rem,6vw,3.6rem)' }}
          >
            Lost in the<br />
            <em className="nx-shimmer not-italic">Digital Halls</em>
          </h1>

          {/* ─── Body copy ─── */}
          <p
            className="nx-fd3 text-slate-500 max-w-115 mx-auto mb-10 leading-[1.8]"
            style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.93rem' }}
          >
            You've wandered into an uncharted wing of{' '}
            <strong className="text-slate-400 font-semibold">Shahid Cadet Academy</strong>.
            This page doesn't exist, has moved, or requires special clearance.
          </p>

          {/* ─── CTA Buttons ─── */}
          <div className="nx-fd4 flex flex-col sm:flex-row items-center justify-center gap-4 mb-9">
            <button
              onClick={() => navigate(-1)}
              className="nx-btn-ghost group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-[0.9rem] rounded-2xl font-bold text-[0.92rem] text-slate-300 bg-white/3 border border-white/8 cursor-pointer active:scale-95"
            >
              <svg className="nx-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
              </svg>
              Go Back
            </button>

            <Link
              to="/dashboard"
              className="nx-btn-prim w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-[0.9rem] rounded-2xl font-bold text-[0.92rem] text-white bg-linear-to-br from-blue-600 to-indigo-600 active:scale-95"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.25))' }}>
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Return to Dashboard
            </Link>
          </div>

          {/* ─── Divider ─── */}
          <div className="nx-fd4 flex items-center gap-4 mb-5 px-6">
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-white/6 to-transparent" />
            <span
              className="text-slate-600 uppercase tracking-[0.14em]"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.68rem' }}
            >
              quick nav
            </span>
            <div className="flex-1 h-px bg-linear-to-l from-transparent via-white/6 to-transparent" />
          </div>
        </div>

        {/* ─── Footer status bar ─── */}
        <div
          className="nx-fd5 absolute bottom-4 left-0 right-0 z-10 hidden sm:flex items-center justify-center gap-8"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          {[
            ['STATUS', '404 NOT_FOUND'],
            ['NODE',   'NEXUS_EDU_01'],
            ['TIME',   new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })],
          ].map(([k, v]) => (
            <span key={k} className="inline-flex items-center gap-1.5 text-[0.67rem] tracking-wider">
              <span className="text-[#1E3A5F]">{k}</span>
              <span className="text-[#152840]">//</span>
              <span className="text-[#1E3A5F]">{v}</span>
            </span>
          ))}
        </div>

      </div>
    </>
  );
}