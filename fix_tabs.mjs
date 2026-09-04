import fs from 'fs';
let content = fs.readFileSync('src/views/DashboardView.tsx', 'utf-8');

content = content.replace(
    ">            Overview          </button>",
    ">{t('Overview', 'Visão Geral')}          </button>"
);
content = content.replace(
    ">            Audit History          </button>",
    ">{t('Audit History', 'Histórico')}          </button>"
);
content = content.replace(
    "No audit history found",
    "{t('No audit history found', 'Nenhum histórico encontrado')}"
);
content = content.replace(
    "View tx ↗",
    "{t('View tx ↗', 'Ver tx ↗')}"
);
content = content.replace(
    "Secured by ZK-SNARKs",
    "{t('Secured by ZK-SNARKs', 'Protegido por ZK-SNARKs')}"
);

fs.writeFileSync('src/views/DashboardView.tsx', content);
