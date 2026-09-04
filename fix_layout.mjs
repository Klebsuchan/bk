import fs from 'fs';
let content = fs.readFileSync('src/views/LandingPageView.tsx', 'utf-8');

// The original line:
// <div className="absolute inset-0 pointer-events-none p-6 md:p-10 flex flex-col justify-between">
content = content.replace(
    '<div className="absolute inset-0 pointer-events-none p-6 md:p-10 flex flex-col justify-between">',
    '<div className="absolute inset-0 pointer-events-none p-6 md:p-10 flex flex-col justify-start">'
);

// We should also check the translations of the Partnership With text:
content = content.replace(
    'In Partnership With',
    '{t("In Partnership With", "Em Parceria Com")}'
);
content = content.replace(
    'Continue as Guest',
    '{t("Continue as Guest", "Continuar como Visitante")}'
);

fs.writeFileSync('src/views/LandingPageView.tsx', content);
