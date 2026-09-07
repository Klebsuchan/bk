import { useI18n } from '../i18n';
import { BookOpen, Database, Sparkles, LockKeyhole, Download } from 'lucide-react';

export function ManualView() {
  const { t } = useI18n();

  const sections = [
    {
      icon: <Database className="w-6 h-6 text-[#99ff66]" />,
      title: t('1. Data Connectors', '1. Conectores de Dados'),
      content: t(
        'Connectors simulate the integration with enterprise databases (e.g., Oracle, PostgreSQL). ' + 
        'Here you can Add, Configure or Test Connections. In a Zero-Knowledge architecture, ' + 
        'these databases never send raw PII (Personally Identifiable Information) to the cloud. ' + 
        'Instead, they run local math proofs and only send cryptographic hashes.',
        'Os conectores simulam a integração com os bancos de dados da empresa (ex: Oracle, PostgreSQL). ' + 
        'Aqui você pode Adicionar, Configurar ou Testar Conexões. Em uma arquitetura Zero-Knowledge, ' + 
        'esses bancos nunca enviam dados sensíveis brutos para a nuvem. Em vez disso, eles rodam ' + 
        'provas matemáticas locais e enviam apenas hashes criptográficos.'
      )
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#99ff66]" />,
      title: t('2. Audit Policies & AI Generator', '2. Políticas de Auditoria & Gerador de IA'),
      content: t(
        'Policies are the rules you want to prove (e.g., "Are all salaries positive?" or "Are we below carbon limits?"). ' + 
        'You can use the AI Generator to translate plain English into SQL/ZK constraints. ' + 
        'Clicking "Run Audit" triggers your wallet to sign and verify this rule mathematically without seeing the raw table.',
        'Políticas são as regras que você quer provar (ex: "Todos os salários são positivos?" ou "Estamos abaixo do limite de carbono?"). ' + 
        'Você pode usar o Gerador de IA para traduzir comandos simples para restrições SQL/ZK. ' + 
        'Clicar em "Run Audit" faz sua carteira assinar e verificar essa regra matematicamente sem ver os dados originais.'
      )
    },
    {
      icon: <LockKeyhole className="w-6 h-6 text-[#99ff66]" />,
      title: t('3. Generating ZK Proofs', '3. Gerando Provas ZK'),
      content: t(
        'When you Run an Audit, the system generates a ZK-SNARK proof. ' + 
        'This is a mathematical certificate that says: "The data complies with the policy." ' + 
        'This certificate is anchored to the Solana Blockchain via your connected wallet, creating an immutable timestamp.',
        'Ao Rodar uma Auditoria (Run Audit), o sistema gera uma prova ZK-SNARK. ' + 
        'Trata-se de um certificado matemático que diz: "Os dados estão em conformidade com a política." ' + 
        'Esse certificado é ancorado na Blockchain Solana através da sua carteira, criando um registro de tempo imutável.'
      )
    },
    {
      icon: <Download className="w-6 h-6 text-[#99ff66]" />,
      title: t('4. Exporting Reports', '4. Exportando Relatórios'),
      content: t(
        'All validated proofs can be found in the "ZK Proofs" tab. ' + 
        'You can export the full history to Excel (CSV) or PDF to share with regulators or internal compliance teams, ' + 
        'providing rock-solid, cryptographically backed evidence of compliance.',
        'Todas as provas validadas ficam na aba "Provas ZK" (ZK Proofs). ' + 
        'Você pode exportar o histórico completo em Excel (CSV) ou PDF para compartilhar com reguladores, ' + 
        'fornecendo uma evidência de conformidade sólida e respaldada por criptografia.'
      )
    }
  ];

  return (
    <div className="p-8 pb-32 animate-in fade-in duration-500">
      <div className="mb-10">
        <h1 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-[#99ff66]" />
          {t('Instruction Manual', 'Manual de Instruções')}
        </h1>
        <p className="text-white/50 font-mono text-xs tracking-widest uppercase">
          {t('A noob-friendly guide to understanding bk.auditor', 'Um guia simples e prático para entender o bk.auditor')}
        </p>
      </div>

      <div className="space-y-6">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-[#0a0a0a] border border-white/10 p-6 rounded-sm flex flex-col md:flex-row gap-6">
            <div className="shrink-0 w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
              {section.icon}
            </div>
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-widest mb-3">{section.title}</h2>
              <p className="text-white/70 text-sm leading-relaxed font-mono">
                {section.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
