import fs from 'fs';

// 1. App.tsx
let appContent = fs.readFileSync('src/App.tsx', 'utf-8');
const appTarget = `<div className="w-8 h-8 rounded-full bg-[#99ff66]/20 border border-[#99ff66]/30 flex items-center justify-center text-[#99ff66] font-bold text-sm overflow-hidden">
                {walletAddress ? (
                  <img src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=150&q=80" alt="Auditor" className="w-full h-full object-cover" />
                ) : (
                  <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=150&q=80" alt="Guest" className="w-full h-full object-cover" />
                )}
              </div>`;
const appReplacement = `<div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#99ff66]/40 to-transparent border border-[#99ff66]/50 flex items-center justify-center text-[#99ff66] font-bold text-xs overflow-hidden relative group shrink-0">
                <div className="absolute inset-0 bg-[#99ff66]/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10">{walletAddress ? 'AU' : 'GU'}</span>
              </div>`;
appContent = appContent.replace(appTarget, appReplacement);
fs.writeFileSync('src/App.tsx', appContent);


// 2. LandingPageView.tsx
let landingContent = fs.readFileSync('src/views/LandingPageView.tsx', 'utf-8');

// Hero
const heroTarget = `<div className="absolute inset-0 grayscale contrast-125 opacity-80 mix-blend-screen transition-transform duration-1000 group-hover:scale-105">
            <img 
              src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop" 
              alt="Cyber background" 
              className="w-full h-full object-cover object-center"
            />
          </div>`;
const heroReplacement = `<div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#99ff66]/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
          </div>`;
landingContent = landingContent.replace(heroTarget, heroReplacement);

// Quote Profile
const quoteTarget = `<div className="w-28 h-28 rounded-full overflow-hidden border border-white/30 shrink-0 relative group">
                 <img src="https://images.unsplash.com/photo-1614064641936-7327320b66b7?q=80&w=2564&auto=format&fit=crop" className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-110 transition-transform duration-700" alt="Profile" />
                 <div className="absolute inset-0 bg-[#99ff66]/10 mix-blend-overlay"></div>
               </div>`;
const quoteReplacement = `<div className="w-28 h-28 rounded-full overflow-hidden border border-white/30 shrink-0 relative group flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#222]">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(153,255,102,0.2)_0,transparent_70%)] opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                 <span className="text-4xl text-[#99ff66]/30 font-serif italic relative z-10 leading-none mt-4">"</span>
               </div>`;
landingContent = landingContent.replace(quoteTarget, quoteReplacement);

// ZK-Rollup Grid
const gridTarget = `<div className="h-[450px] flex flex-col md:flex-row gap-4">
                <div className="flex-1 bg-white/5 rounded-sm overflow-hidden relative group">
                  <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover grayscale contrast-[1.4] brightness-75 group-hover:scale-105 transition-transform duration-700" alt="Tech" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-xs font-mono tracking-widest text-white/80">ZK-ROLLUP</div>
                </div>
                <div className="w-full md:w-[40%] bg-white/5 rounded-sm overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" className="w-full h-full object-cover grayscale contrast-150" alt="Abstract liquid" />
                </div>
              </div>`;
const gridReplacement = `<div className="h-[450px] flex flex-col md:flex-row gap-4">
                <div className="flex-1 bg-[#050505] border border-white/10 rounded-sm overflow-hidden relative group">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(153,255,102,0.03)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity duration-700">
                    <div className="w-32 h-32 border border-[#99ff66]/50 rounded-full flex items-center justify-center">
                      <div className="w-24 h-24 border-t-2 border-[#99ff66] rounded-full animate-spin"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 text-xs font-mono tracking-widest text-white/80 relative z-10 bg-black/50 px-2 py-1 rounded backdrop-blur-sm border border-white/10">ZK-ROLLUP</div>
                </div>
                <div className="w-full md:w-[40%] bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden relative group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0,transparent_70%)]"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-30 group-hover:opacity-60 transition-opacity duration-700">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div key={i} className={\`h-px bg-white/50 w-full \${i % 2 === 0 ? 'max-w-[120px]' : 'max-w-[80px]'}\`}></div>
                    ))}
                  </div>
                </div>
              </div>`;
landingContent = landingContent.replace(gridTarget, gridReplacement);

// 3D Object
const objectTarget = `<div className="bg-[#0a0a0a] border border-white/10 p-4 h-[400px]">
              <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover grayscale contrast-125 mix-blend-screen scale-110 hover:scale-125 transition-transform duration-1000" alt="3d object" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]/80"></div>
              </div>`;
const objectReplacement = `<div className="bg-[#0a0a0a] border border-white/10 p-4 h-[400px]">
              <div className="w-full h-full bg-gradient-to-br from-[#050505] to-[#111] flex flex-col items-center justify-center overflow-hidden relative group border border-white/5">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
                <div className="w-24 h-24 border border-[#99ff66]/30 rotate-45 group-hover:rotate-90 transition-transform duration-1000 flex items-center justify-center shadow-[0_0_30px_rgba(153,255,102,0.1)] relative z-10">
                  <div className="w-12 h-12 border border-[#99ff66]/50 -rotate-45 flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#99ff66] animate-ping"></div>
                  </div>
                </div>
              </div>`;
landingContent = landingContent.replace(objectTarget, objectReplacement);

// Functionalities Under The Hood
const cryptoTarget = `<div className="rounded-xl overflow-hidden border border-white/10 relative h-[300px] lg:h-[450px]">
                <img src="https://images.unsplash.com/photo-1614064641913-6b03606615b4?auto=format&fit=crop&w=1200&q=80" alt="Cryptography abstract" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
              </div>`;
const cryptoReplacement = `<div className="rounded-xl overflow-hidden border border-white/10 relative h-[300px] lg:h-[450px] bg-[#050505] flex items-center justify-center group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(153,255,102,0.05)_0,transparent_60%)] group-hover:bg-[radial-gradient(circle_at_center,rgba(153,255,102,0.1)_0,transparent_70%)] transition-all duration-700"></div>
                <div className="grid grid-cols-6 grid-rows-6 gap-2 sm:gap-3 w-full h-full p-8 sm:p-12 opacity-30 relative z-10">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div key={i} className={\`border border-[#99ff66] \${i % 4 === 0 ? 'bg-[#99ff66]/30 animate-pulse' : ''} \${i % 7 === 0 ? 'hidden' : 'rounded-sm'} transition-colors duration-500 hover:bg-[#99ff66]/50\`}></div>
                  ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-20"></div>
              </div>`;
landingContent = landingContent.replace(cryptoTarget, cryptoReplacement);

// Roadmap
const roadmapTarget = `<div className="rounded-xl overflow-hidden border border-white/10 relative h-[250px] lg:h-[350px]">
                <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80" alt="Future tech" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0a0a0a]/40 to-[#0a0a0a]"></div>
              </div>`;
const roadmapReplacement = `<div className="rounded-xl overflow-hidden border border-white/10 relative h-[250px] lg:h-[350px] bg-[#050505]">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_25%,rgba(96,165,250,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:40px_40px]"></div>
                <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
                <div className="absolute top-1/2 left-1/4 w-3 h-3 -mt-1.5 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)] animate-pulse"></div>
                <div className="absolute top-1/2 left-2/4 w-2 h-2 -mt-1 bg-white/50 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                <div className="absolute top-1/2 left-3/4 w-4 h-4 -mt-2 bg-[#99ff66] rounded-full shadow-[0_0_30px_rgba(153,255,102,0.8)]"></div>
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0a0a0a]/60 to-[#0a0a0a] z-10"></div>
              </div>`;
landingContent = landingContent.replace(roadmapTarget, roadmapReplacement);

fs.writeFileSync('src/views/LandingPageView.tsx', landingContent);
console.log("Images replaced with CSS effects.");
