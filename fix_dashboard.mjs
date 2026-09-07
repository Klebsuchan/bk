import fs from 'fs';

let content = fs.readFileSync('src/views/DashboardView.tsx', 'utf-8');

const useEffectTarget = `  useEffect(() => {
    // We would fetch all needed data here in a real app
    // For demo, we just fetch proofs to generate stats
    fetch('/api/proofs')
      .then(res => res.json())
      .then(data => {
        setProofs(data);
        const verified = data.filter((p: Proof) => p.status === 'verified').length;
        const failed = data.filter((p: Proof) => p.status === 'failed').length;
        
        setStats({
          active: 3, // based on seed data
          connected: 4, // based on seed data
          verified,
          failed,
        });
      });
  }, []);

  const lineData = [
    { name: t('Mon', 'Seg'), proofs: 12 },
    { name: t('Tue', 'Ter'), proofs: 19 },
    { name: t('Wed', 'Qua'), proofs: 15 },
    { name: t('Thu', 'Qui'), proofs: 22 },
    { name: t('Fri', 'Sex'), proofs: 28 },
    { name: t('Sat', 'Sáb'), proofs: 14 },
    { name: t('Sun', 'Dom'), proofs: Math.max(10, proofs.length) },
  ];`;

const useEffectReplacement = `  const [lineData, setLineData] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        setStats({
          active: data.activePolicies,
          connected: data.activeConnectors,
          verified: data.verifiedProofs,
          failed: data.failedProofs,
        });
        
        const i18nDays: Record<string, string> = {
          'Mon': t('Mon', 'Seg'),
          'Tue': t('Tue', 'Ter'),
          'Wed': t('Wed', 'Qua'),
          'Thu': t('Thu', 'Qui'),
          'Fri': t('Fri', 'Sex'),
          'Sat': t('Sat', 'Sáb'),
          'Sun': t('Sun', 'Dom'),
        };
        
        setLineData(data.lineData.map((d: any) => ({
          name: i18nDays[d.name] || d.name,
          proofs: d.proofs
        })));
      });
      
    fetch('/api/proofs')
      .then(res => res.json())
      .then(data => {
        setProofs(data);
      });
  }, [t]);`;

content = content.replace(useEffectTarget, useEffectReplacement);
fs.writeFileSync('src/views/DashboardView.tsx', content);
console.log('DashboardView updated');
