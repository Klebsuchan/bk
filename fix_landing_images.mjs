import fs from 'fs';
let content = fs.readFileSync('src/views/LandingPageView.tsx', 'utf-8');

const functionalitiesReplacement = `
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16 md:mb-24">
              <div className="rounded-xl overflow-hidden border border-white/10 relative h-[300px] lg:h-[450px]">
                <img src="https://images.unsplash.com/photo-1614064641913-6b03606615b4?auto=format&fit=crop&w=1200&q=80" alt="Cryptography abstract" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-[#99ff66] font-mono uppercase tracking-widest text-xs mb-4 border border-[#99ff66]/20 bg-[#99ff66]/10 px-3 py-1 rounded-full">
                  {t('Under the Hood', 'Por Baixo do Capô')}
                </span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
                  {t('How bk.auditor Works', 'Como o bk.auditor Funciona')}
                </h2>
                <p className="text-white/50 text-sm md:text-base leading-relaxed">
                  {t('An end-to-end cryptographic infrastructure that allows companies to prove compliance without exposing raw data. Powered by advanced ZK-SNARKs and integrated seamlessly into your legacy databases.', 'Uma infraestrutura criptográfica ponta-a-ponta que permite empresas comprovarem compliance sem expor dados brutos. Alimentada por ZK-SNARKs avançados e integrada perfeitamente aos seus bancos de dados legados.')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">`;

content = content.replace(
  `<div className="max-w-[1600px] mx-auto">
            <div className="flex flex-col items-center mb-16 md:mb-24 text-center">
              <span className="text-[#99ff66] font-mono uppercase tracking-widest text-xs mb-4 border border-[#99ff66]/20 bg-[#99ff66]/10 px-3 py-1 rounded-full">
                {t('Under the Hood', 'Por Baixo do Capô')}
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
                {t('How bk.auditor Works', 'Como o bk.auditor Funciona')}
              </h2>
              <p className="text-white/50 max-w-2xl text-sm md:text-base leading-relaxed">
                {t('An end-to-end cryptographic infrastructure that allows companies to prove compliance without exposing raw data.', 'Uma infraestrutura criptográfica ponta-a-ponta que permite empresas comprovarem compliance sem expor dados brutos.')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">`,
  functionalitiesReplacement
);


const roadmapReplacement = `
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16 md:mb-24">
              <div className="flex flex-col">
                <span className="text-blue-400 font-mono uppercase tracking-widest text-xs mb-4 border border-blue-400/20 bg-blue-400/10 px-3 py-1 rounded-full w-max">
                  {t('The Future', 'O Futuro')}
                </span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
                  {t('Development Roadmap', 'Roadmap de Desenvolvimento')}
                </h2>
                <p className="text-white/50 text-sm md:text-base leading-relaxed mb-8">
                  {t('Follow our progression towards full decentralization and enterprise adoption. The bk.auditor protocol is constantly evolving.', 'Acompanhe nossa progressão rumo à descentralização total e adoção empresarial. O protocolo bk.auditor está em constante evolução.')}
                </p>
              </div>
              <div className="rounded-xl overflow-hidden border border-white/10 relative h-[250px] lg:h-[350px]">
                <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80" alt="Future tech" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0a0a0a]/40 to-[#0a0a0a]"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">`;


content = content.replace(
  `<div className="max-w-[1600px] mx-auto">
            <div className="flex flex-col mb-16 md:mb-24">
              <span className="text-blue-400 font-mono uppercase tracking-widest text-xs mb-4 border border-blue-400/20 bg-blue-400/10 px-3 py-1 rounded-full w-max">
                {t('The Future', 'O Futuro')}
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
                {t('Development Roadmap', 'Roadmap de Desenvolvimento')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">`,
  roadmapReplacement
);


fs.writeFileSync('src/views/LandingPageView.tsx', content);
