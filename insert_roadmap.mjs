import fs from 'fs';
let content = fs.readFileSync('src/views/LandingPageView.tsx', 'utf-8');

const newSections = `
        {/* PLATFORM FUNCTIONALITIES SECTION */}
        <motion.section 
          id="functionalities"
          className="px-6 md:px-12 py-24 md:py-32 bg-[#050505] relative z-20 border-t border-white/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
        >
          <div className="max-w-[1600px] mx-auto">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: LayoutDashboard,
                  title: t('Real-Time Analytics', 'Analytics em Tempo Real'),
                  desc: t('Dashboard tracks success rates, anomalies, and active database connectors via the backend.', 'Painel que rastreia taxas de sucesso, anomalias e conectores de banco de dados ativos via backend.')
                },
                {
                  icon: Sparkles,
                  title: t('AI Policy Generator', 'Gerador de Políticas IA'),
                  desc: t('Zero-knowledge policies are complex. Our AI translates natural language into robust SQL/ZK rules.', 'Políticas ZK são complexas. Nossa IA traduz linguagem natural para regras robustas SQL/ZK.')
                },
                {
                  icon: ShieldCheck,
                  title: t('Zero-Knowledge Engine', 'Motor Zero-Knowledge'),
                  desc: t('The core engine creates a SHA-256 / SNARK cryptographic hash of the query + timestamp without exposing data.', 'O motor central cria um hash SHA-256 / SNARK da query + timestamp sem expor os dados reais.')
                },
                {
                  icon: Database,
                  title: t('Immutable Ledger', 'Livro-Razão Imutável'),
                  desc: t('Every proof is logged on-chain. Guests/Regulators can verify hash authenticity without credentials.', 'Cada prova é registrada on-chain. Visitantes/Reguladores podem verificar a autenticidade do hash sem credenciais.')
                }
              ].map((feature, i) => (
                <div key={i} className="p-8 border border-white/10 rounded-xl bg-[#0a0a0a] hover:bg-white/5 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-[#99ff66]/10 border border-[#99ff66]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-[#99ff66]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ROADMAP SECTION */}
        <motion.section 
          id="roadmap"
          className="px-6 md:px-12 py-24 md:py-32 bg-[#0a0a0a] relative z-20 border-t border-white/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
        >
          <div className="max-w-[1600px] mx-auto">
            <div className="flex flex-col mb-16 md:mb-24">
              <span className="text-blue-400 font-mono uppercase tracking-widest text-xs mb-4 border border-blue-400/20 bg-blue-400/10 px-3 py-1 rounded-full w-max">
                {t('The Future', 'O Futuro')}
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
                {t('Development Roadmap', 'Roadmap de Desenvolvimento')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {/* Connection line for desktop */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-y-1/2 z-0"></div>

              {[
                {
                  q: 'Q1',
                  status: 'completed',
                  title: t('Platform Launch', 'Lançamento da Plataforma'),
                  items: [
                    t('Core ZK-SNARK Engine', 'Motor Central ZK-SNARK'),
                    t('Wallet Authentication', 'Autenticação via Carteira'),
                    t('Public Hash Verifier', 'Verificador Público de Hash')
                  ]
                },
                {
                  q: 'Q2',
                  status: 'active',
                  title: t('AI Integrations', 'Integrações de IA'),
                  items: [
                    t('Natural Language to SQL', 'Linguagem Natural para SQL'),
                    t('Smart Database Connectors', 'Conectores Inteligentes'),
                    t('Advanced Dashboard Analytics', 'Analytics Avançado no Painel')
                  ]
                },
                {
                  q: 'Q3',
                  status: 'upcoming',
                  title: t('Enterprise Rollout', 'Expansão Empresarial'),
                  items: [
                    t('Role-Based Access (Guest/Admin)', 'Acesso Baseado em Cargos'),
                    t('Multi-Chain SBT Minting', 'Mintagem Multi-Chain de SBTs'),
                    t('Automated Audit Schedules', 'Agendamentos Automáticos')
                  ]
                },
                {
                  q: 'Q4',
                  status: 'upcoming',
                  title: t('Decentralization', 'Descentralização Total'),
                  items: [
                    t('Decentralized Oracle Network', 'Rede de Oráculos'),
                    t('DAO Governance Model', 'Governança DAO'),
                    t('Mainnet V1 Launch', 'Lançamento Mainnet V1')
                  ]
                }
              ].map((phase, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center md:items-start p-6 bg-[#050505] border border-white/10 rounded-xl hover:border-white/20 transition-colors">
                  <div className={\`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg mb-6 border-2 \${
                    phase.status === 'completed' ? 'bg-[#99ff66]/10 text-[#99ff66] border-[#99ff66]/30' :
                    phase.status === 'active' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                    'bg-white/5 text-white/40 border-white/10'
                  }\`}>
                    {phase.q}
                  </div>
                  <h3 className="text-lg font-bold mb-4 text-center md:text-left">{phase.title}</h3>
                  <ul className="space-y-3 w-full">
                    {phase.items.map((item, j) => (
                      <li key={j} className="flex items-start text-sm text-white/50">
                        <CheckCircle2 className={\`w-4 h-4 mr-2 mt-0.5 shrink-0 \${
                          phase.status === 'completed' || phase.status === 'active' ? 'text-white/80' : 'text-white/20'
                        }\`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
`;

content = content.replace("</main>", newSections + "\n      </main>");

fs.writeFileSync('src/views/LandingPageView.tsx', content);
