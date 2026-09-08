import fs from 'fs';

let content = fs.readFileSync('src/views/DashboardView.tsx', 'utf-8');

const pieDataTarget = `  const pieData = [
    { name: t('Verified', 'Verificado'), value: stats.verified || 1, color: '#99ff66' },
    { name: t('Failed', 'Falha'), value: stats.failed || 0, color: '#fb7185' },
  ];`;

const pieDataReplacement = `  const pieData = stats.verified === 0 && stats.failed === 0 
    ? [{ name: t('No Data', 'Sem Dados'), value: 1, color: '#222' }] 
    : [
        { name: t('Verified', 'Verificado'), value: stats.verified, color: '#99ff66' },
        { name: t('Failed', 'Falha'), value: stats.failed, color: '#fb7185' }
      ].filter(d => d.value > 0);`;

content = content.replace(pieDataTarget, pieDataReplacement);

fs.writeFileSync('src/views/DashboardView.tsx', content);
console.log('Dashboard fixed');
