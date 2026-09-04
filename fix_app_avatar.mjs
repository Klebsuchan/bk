import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(
  `<div className="w-8 h-8 rounded-full bg-[#99ff66]/20 border border-[#99ff66]/30 flex items-center justify-center text-[#99ff66] font-bold text-sm">
                {walletAddress ? 'W' : 'A'}
              </div>`,
  `<div className="w-8 h-8 rounded-full bg-[#99ff66]/20 border border-[#99ff66]/30 flex items-center justify-center text-[#99ff66] font-bold text-sm overflow-hidden">
                {walletAddress ? (
                  <img src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=150&q=80" alt="Auditor" className="w-full h-full object-cover" />
                ) : (
                  <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=150&q=80" alt="Guest" className="w-full h-full object-cover" />
                )}
              </div>`
);

fs.writeFileSync('src/App.tsx', content);
