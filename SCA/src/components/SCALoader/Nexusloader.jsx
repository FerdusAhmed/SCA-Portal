import { useState, useEffect, useMemo } from "react";

export default function SCALoader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("Initializing");

 const phases = useMemo(() => {
  return [
    "Initializing",
    "Loading Courses",
    "Syncing Data",
    "Almost Ready"
  ];
}, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 25) setPhase(phases[0]);
    else if (progress < 55) setPhase(phases[1]);
    else if (progress < 80) setPhase(phases[2]);
    else setPhase(phases[3]);
  }, [progress, phases]);

  const orbitItems = [
    { delay: "0s", size: "w-3 h-3", color: "bg-sky-400" },
    { delay: "0.4s", size: "w-2 h-2", color: "bg-indigo-400" },
    { delay: "0.8s", size: "w-2.5 h-2.5", color: "bg-cyan-300" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center font-sans">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-10">
        {/* Logo + Orbit */}
        <div className="relative flex items-center justify-center w-32 h-32">
          {/* Orbit ring */}
          <div className="absolute w-full h-full rounded-full border border-slate-700 animate-spin" style={{ animationDuration: "8s" }}>
            {orbitItems.map((item, i) => (
              <span
                key={i}
                className={`absolute ${item.size} ${item.color} rounded-full shadow-lg`}
                style={{
                  top: i === 0 ? "-6px" : i === 1 ? "50%" : "100%",
                  left: i === 0 ? "50%" : i === 1 ? "100%" : "25%",
                  transform: "translate(-50%, -50%)",
                  animationDelay: item.delay,
                  boxShadow: `0 0 8px ${i === 0 ? "#38bdf8" : i === 1 ? "#818cf8" : "#67e8f9"}`,
                }}
              />
            ))}
          </div>

          {/* Inner logo box */}
          <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-sky-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-sky-500/30">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-white fill-current">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Brand name */}
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tight text-white" style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}>
            SCA
          </h1>
          <p className="text-xs font-semibold tracking-[0.3em] text-sky-400 uppercase mt-1">
            Academy Portal
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 flex flex-col gap-3">
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-linear-to-r from-sky-500 to-indigo-500 transition-all duration-100 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer */}
              <span className="absolute inset-0 bg-white/30 animate-pulse rounded-full" />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-xs tracking-wide">{phase}</span>
            <span className="text-sky-400 text-xs font-mono font-bold">{progress}%</span>
          </div>
        </div>

        {/* Pulsing dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.8s" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}