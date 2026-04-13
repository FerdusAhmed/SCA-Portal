import React from 'react';
import { Handshake } from 'lucide-react';
import Container from '../../Layouts/Container';

const Collaboration = () => {
  const sponsors = [
    "Panjabi Guide", "Edu Board", "Creative IT", "Study Care",
    "Book Worm", "Scholar Lab", "Future Pen", "Exam Aid",
    "Knowledge Co", "Tutor Point", "Science Academy", "Alpha Library"
  ];

  const doubled = [...sponsors, ...sponsors];
  const doubledRev = [...sponsors].reverse().flatMap(s => [s, s]);

  const Item = ({ name }) => (
    <div className="inline-flex items-center gap-5 px-7">
      <div className="w-1.5 h-1.5 rotate-45 border border-[#c8bfb2] shrink-0" />
      <span
        className="font-bold uppercase tracking-[0.12em] text-[13px] text-[#4a4238] hover:text-blue-600 transition-colors cursor-default"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {name}
      </span>
    </div>
  );

  const ItemSmall = ({ name }) => (
    <div className="inline-flex items-center gap-5 px-7">
      <div className="w-1 h-1 rotate-45 border border-[#ddd5cb] shrink-0" />
      <span
        className="font-bold uppercase tracking-[0.12em] text-[12px] text-[#8a7e72] hover:text-blue-600 transition-colors cursor-default"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {name}
      </span>
    </div>
  );

  return (
    <section
      className="py-10 overflow-hidden relative bg-[#f8f6f1]"
    >
      {/* Header */}
      <Container>
        <div className="text-center mb-14 px-6">
          <div className="inline-flex items-center gap-2 text-blue-600 text-[10px] font-semibold uppercase tracking-[0.2em] mb-5">
            <span className="w-1.25 h-1.25 rounded-full bg-blue-600" />
            Strategic Partnerships
            <span className="w-1.25 h-1.25 rounded-full bg-blue-600" />
          </div>

          <h2
            className="text-4xl font-black tracking-tight text-slate-800 leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Trusted by <span className="text-blue-600">Education Leaders</span>
          </h2>

          <p className="text-sm text-slate-500 mt-3">
            Institutions and platforms that rely on our infrastructure
          </p>
        </div>
      </Container>

      {/* Row 1 */}
      <div className="relative py-7 border-y border-[#c8bfb2]/50 mb-3">
        <div
          className="relative overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          }}
        >
          <div className="flex whitespace-nowrap animate-marquee">
            {doubled.map((name, i) => (
              <Item key={i} name={name} />
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="relative py-7 border-b border-[#c8bfb2]/50">
        <div
          className="relative overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          }}
        >
          <div className="flex whitespace-nowrap animate-marquee-reverse">
            {doubledRev.map((name, i) => (
              <ItemSmall key={i} name={name} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .animate-marquee         { animation: marquee 35s linear infinite; }
        .animate-marquee-reverse { animation: marquee-reverse 42s linear infinite; }
      `}</style>
    </section>
  );
};

export default Collaboration;