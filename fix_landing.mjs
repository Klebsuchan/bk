import fs from 'fs';
let content = fs.readFileSync('src/views/LandingPageView.tsx', 'utf-8');

content = content.replace("import { motion } from 'motion/react';", "import { motion } from 'motion/react';\nimport { useI18n } from '../i18n';");
content = content.replace("  const [activeTab, setActiveTab] = useState<'regulations' | 'financials' | 'esg'>('financials');\n  const [lang, setLang] = useState<'pt' | 'en'>('pt');\n  const t = (en: string, pt: string) => lang === 'pt' ? pt : en;", "  const [activeTab, setActiveTab] = useState<'regulations' | 'financials' | 'esg'>('financials');\n  const { lang, setLang, t } = useI18n();");

fs.writeFileSync('src/views/LandingPageView.tsx', content);
