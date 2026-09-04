import fs from 'fs';
let content = fs.readFileSync('src/views/DashboardView.tsx', 'utf-8');

const oldEffect = `  useEffect(() => {
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
    { name: t('Sat', 'Sáb'), proofs: 31 },
    { name: t('Sun', 'Dom'), proofs: 45 },
  ];

  const pieData = [
    { name: t('Verified', 'Verificado'), value: stats.verified || 75, color: '#99ff66' },
    { name: t('Anomalies', 'Anomalias'), value: stats.failed || 25, color: '#f43f5e' },
  ];`;

const newEffect = `  const [lineData, setLineData] = useState<any[]>([]);
  const [pieData, setPieData] = useState<any[]>([]);

  useEffect(() => {
    // Fetch proofs for the table
    fetch('/api/proofs')
      .then(res => res.json())
      .then(data => {
        setProofs(data);
      });
      
    // Fetch real aggregated stats from the database
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        setStats({
          active: data.active,
          connected: data.connected,
          verified: data.verified,
          failed: data.failed,
        });
        
        // Map backend english days to localized days if needed
        const localizedLineData = data.lineData.map((d: any) => {
          let translated = d.name;
          if (d.name === 'Mon') translated = t('Mon', 'Seg');
          if (d.name === 'Tue') translated = t('Tue', 'Ter');
          if (d.name === 'Wed') translated = t('Wed', 'Qua');
          if (d.name === 'Thu') translated = t('Thu', 'Qui');
          if (d.name === 'Fri') translated = t('Fri', 'Sex');
          if (d.name === 'Sat') translated = t('Sat', 'Sáb');
          if (d.name === 'Sun') translated = t('Sun', 'Dom');
          return { name: translated, proofs: d.proofs };
        });
        setLineData(localizedLineData);
        
        setPieData([
          { name: t('Verified', 'Verificado'), value: data.verified, color: '#99ff66' },
          { name: t('Anomalies', 'Anomalias'), value: data.failed, color: '#f43f5e' },
        ]);
      });
  }, [t]);`;

content = content.replace(oldEffect, newEffect);
fs.writeFileSync('src/views/DashboardView.tsx', content);
