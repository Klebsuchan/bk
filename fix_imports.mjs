import fs from 'fs';
let c = fs.readFileSync('src/views/LandingPageView.tsx', 'utf-8');

c = c.replace(
  "import { Instagram, Link as LinkIcon, Menu, AlertCircle, Search, ShieldCheck, Database, FileText, Fingerprint, Lock, Zap, ArrowRight, Github, Twitter, Layers, HelpCircle } from 'lucide-react';",
  "import { Instagram, Link as LinkIcon, Menu, AlertCircle, Search, ShieldCheck, Database, FileText, Fingerprint, Lock, Zap, ArrowRight, Github, Twitter, Layers, HelpCircle, LayoutDashboard, Sparkles, CheckCircle2 } from 'lucide-react';"
);

fs.writeFileSync('src/views/LandingPageView.tsx', c);
