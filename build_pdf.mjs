import fs from 'fs';

const tsCode = `
import { jsPDF } from 'jspdf';

export function generateWhitepaper(lang: 'pt' | 'en') {
  const doc = new jsPDF();
  const margin = 20;
  let y = margin;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxLineWidth = pageWidth - margin * 2;

  // Formatting helpers
  const checkPageBreak = (needed: number) => {
    if (y + needed > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const addCover = (title: string, subtitle: string, version: string) => {
    doc.setFillColor(5, 5, 5);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
    
    doc.setTextColor(153, 255, 102); // #99ff66
    doc.setFont("helvetica", "bold");
    doc.setFontSize(36);
    const titleLines = doc.splitTextToSize(title, maxLineWidth - 20);
    doc.text(titleLines, pageWidth / 2, pageHeight / 3, { align: 'center' });
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    const subLines = doc.splitTextToSize(subtitle, maxLineWidth - 20);
    doc.text(subLines, pageWidth / 2, (pageHeight / 3) + (titleLines.length * 15) + 10, { align: 'center' });
    
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(10);
    doc.setFont("courier", "normal");
    doc.text(version, pageWidth / 2, pageHeight - 30, { align: 'center' });
    
    doc.addPage();
    y = margin;
    doc.setTextColor(0, 0, 0); // Reset to black for normal pages
  };

  const addHeading = (text: string) => {
    checkPageBreak(30);
    y += 10;
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    const lines = doc.splitTextToSize(text, maxLineWidth);
    doc.text(lines, margin, y);
    y += (lines.length * 9) + 5;
  };

  const addSubHeading = (text: string) => {
    checkPageBreak(20);
    y += 5;
    doc.setTextColor(50, 50, 50);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    const lines = doc.splitTextToSize(text, maxLineWidth);
    doc.text(lines, margin, y);
    y += (lines.length * 7) + 3;
  };

  const addParagraph = (text: string) => {
    doc.setTextColor(70, 70, 70);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(text, maxLineWidth);
    
    lines.forEach((line: string) => {
      checkPageBreak(6);
      doc.text(line, margin, y);
      y += 6.5;
    });
    y += 4; // Space after paragraph
  };

  const addBullet = (text: string) => {
    doc.setTextColor(70, 70, 70);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(text, maxLineWidth - 10);
    
    lines.forEach((line: string, index: number) => {
      checkPageBreak(6);
      if (index === 0) {
        doc.text("• " + line, margin + 5, y);
      } else {
        doc.text(line, margin + 8, y);
      }
      y += 6.5;
    });
    y += 2;
  };

  const addPageBreak = () => {
    doc.addPage();
    y = margin;
  };

  if (lang === 'pt') {
    addCover(
      "bk.auditor®", 
      "O Futuro da Conformidade Zero-Knowledge:\nUma revolução em Privacidade e Confiança na Web3",
      "WHITEPAPER OFICIAL - VERSÃO 2.0.4 | 2026"
    );

    // Sumário
    addHeading("Índice");
    addParagraph("1. Introdução: O Paradoxo da Privacidade");
    addParagraph("2. O que é o bk.auditor?");
    addParagraph("3. A Magia por Trás: ZK-SNARKs (Simples & Técnico)");
    addParagraph("4. Motor de IA (Google Gemini)");
    addParagraph("5. Infraestrutura On-Chain (Solana & Soulbound Tokens)");
    addParagraph("6. Aplicações no Dia a Dia (Para o Cidadão)");
    addParagraph("7. Aplicações Corporativas e B2B");
    addParagraph("8. Segurança e Arquitetura do Sistema");
    addParagraph("9. Conclusão");
    addPageBreak();

    // Capítulo 1
    addHeading("1. Introdução: O Paradoxo da Privacidade");
    addParagraph("Vivemos na era da informação, mas enfrentamos um paradoxo terrível: para provar quem somos ou o que temos, somos forçados a entregar nossos dados mais íntimos. Se você quer alugar um apartamento, precisa entregar seu extrato bancário. Se quer comprar bebida online, precisa enviar a foto da sua identidade. Para comprovar saúde, expõe seu histórico médico.");
    addParagraph("Cada vez que enviamos um PDF com nosso contracheque ou CPF por e-mail, criamos um ponto de falha. Nossos dados ficam armazenados em servidores de terceiros, sujeitos a vazamentos, hackers e venda ilegal de dados. O modelo atual da internet exige que entreguemos a 'informação bruta' apenas para provar uma 'condição'.");
    addParagraph("A Web3 prometeu resolver isso, mas a maioria dos projetos se limitou a criar tokens financeiros ou especulação de criptomoedas. A verdadeira promessa da blockchain — a criptografia imutável aplicada à vida real — ficou esquecida.");
    addParagraph("É aqui que nasce o bk.auditor. Ele não é uma criptomoeda. Ele é um protocolo de verificação de verdades matemáticas que elimina a necessidade de compartilhar dados sensíveis.");

    // Capítulo 2
    addHeading("2. O que é o bk.auditor?");
    addParagraph("O bk.auditor é um oráculo de conformidade Zero-Knowledge (Conhecimento Zero). Ele funciona como uma ponte blindada entre os bancos de dados tradicionais (Web2) e a transparência da blockchain (Web3).");
    addParagraph("Em vez de mover seus dados confidenciais para a blockchain (o que seria desastroso para a privacidade), o bk.auditor leva a matemática até o seu banco de dados local. Ele audita a informação dentro do servidor seguro da empresa e devolve apenas uma Prova Criptográfica (um selo de garantia) para a rede pública.");
    addParagraph("De forma leiga: O sistema atua como um inspetor cego, porém incorruptível. Ele consegue atestar que um documento está perfeito sem nunca ler o que está escrito nele.");

    // Capítulo 3
    addHeading("3. A Magia por Trás: ZK-SNARKs");
    addSubHeading("Para Leigos: Como provar sem revelar?");
    addParagraph("Imagine o famoso jogo 'Onde está o Wally?'. Você encontrou o Wally num pôster gigante e quer provar para o seu amigo que sabe onde ele está, mas não quer apontar no pôster e estragar a brincadeira para ele.");
    addParagraph("Como você faz isso? Você pega um papelão gigante (maior que o pôster), faz um pequeno buraco do tamanho exato do Wally nele, e coloca por cima do pôster. O seu amigo vai olhar pelo buraco e ver o Wally. Ele agora TEM CERTEZA de que você sabe onde o Wally está, mas ele NÃO FAZ IDEIA de qual parte do pôster o Wally se encontra, pois o resto está coberto.");
    addParagraph("Isso é uma Prova de Conhecimento Zero. Você provou que possui um conhecimento (onde está o Wally), sem revelar a localização (os dados).");
    
    addSubHeading("Para Técnicos: ZK-SNARKs");
    addParagraph("No bk.auditor, utilizamos Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge (ZK-SNARKs). O sistema transforma a política de negócios (ex: renda > 3000) em um circuito aritmético, gerando um R1CS (Rank-1 Constraint System) e, posteriormente, um QAP (Quadratic Arithmetic Program).");
    addParagraph("O servidor processa a entrada privada do usuário off-chain, gerando uma prova polinomial compacta que verifica se a computação foi executada corretamente de acordo com as regras estabelecidas. Esta prova, que tem apenas algumas centenas de bytes, é submetida à rede Solana para verificação em tempo constante (O(1)), custando frações de centavo e sendo matematicamente infalsificável.");
    addPageBreak();

    // Capítulo 4
    addHeading("4. Motor de IA (Google Gemini)");
    addParagraph("Uma das maiores barreiras da tecnologia ZK é a complexidade. Escrever circuitos lógicos em linguagens como Circom ou Cairo exige matemáticos e engenheiros altamente especializados.");
    addParagraph("O bk.auditor resolveu isso integrando a Inteligência Artificial do Google Gemini. Nosso motor LLM traduz linguagem humana comum em políticas matemáticas complexas.");
    addParagraph("O usuário apenas digita: 'O funcionário deve ter salário maior que 2000 e ser maior de 18 anos'. O Gemini interpreta essa intenção e compila automaticamente a regra ZK-SNARK necessária, além das queries SQL de extração do banco de dados (PostgreSQL/MongoDB).");
    addParagraph("Isso democratiza a auditoria criptográfica. Agora, gerentes de RH, diretores financeiros e auditores comuns podem criar verificações on-chain com a facilidade de escrever um e-mail.");

    // Capítulo 5
    addHeading("5. Infraestrutura On-Chain (Solana & SBTs)");
    addSubHeading("Por que Solana?");
    addParagraph("A verificação de provas matemáticas exige alto poder computacional e velocidade. Escolhemos a Solana por sua capacidade de processar milhares de transações por segundo e custo ínfimo. Isso viabiliza auditorias contínuas (em tempo real) para milhões de registros.");
    
    addSubHeading("Soulbound Tokens (SBTs)");
    addParagraph("Uma vez que uma prova matemática é validada pela rede, o bk.auditor emite um Soulbound Token para a carteira da pessoa ou empresa. SBTs são NFTs que NÃO podem ser transferidos nem vendidos. Eles nascem e morrem na carteira original.");
    addParagraph("Eles funcionam como 'Certificados e Diplomas Digitais'. Se você passa numa auditoria financeira, recebe um SBT de Solvência. Esse SBT atua como um passaporte universal de confiança.");
    addPageBreak();

    // Capítulo 6
    addHeading("6. Aplicações no Dia a Dia (Para o Cidadão)");
    addSubHeading("1. Comprovação de Renda para Aluguéis / Empréstimos");
    addParagraph("Hoje: Você envia seus últimos 3 meses de extrato bancário para o corretor pelo WhatsApp.");
    addParagraph("Com bk.auditor: O sistema conecta via Open Finance ao seu banco, gera uma prova ZK atestando que 'A renda do Usuário X é suficiente para cobrir o aluguel' e emite o certificado para a imobiliária. A imobiliária tem a garantia matemática do banco, mas NUNCA vê suas transações, seu saldo ou onde você gasta seu dinheiro.");
    
    addSubHeading("2. Verificação de Idade (Maioridade)");
    addParagraph("Hoje: Você faz upload do seu documento de identidade para comprar em sites ou acessar conteúdos +18.");
    addParagraph("Com bk.auditor: O sistema gera um Hash do seu documento em um portal seguro e emite um Soulbound Token de 'Verificado +18'. A partir desse dia, você conecta sua carteira em qualquer site e o acesso é liberado instantaneamente. Ninguém sabe seu nome, sua idade exata, nem o nome da sua mãe.");
    
    addSubHeading("3. Currículos e Diplomas Cegos");
    addParagraph("Universidades emitem diplomas como Soulbound Tokens ZK. Você pode provar para um empregador que 'Possui graduação em Engenharia por uma universidade top 5', sem revelar seu nome na primeira fase do processo seletivo, eliminando preconceitos de gênero ou raça na contratação.");
    
    addPageBreak();

    // Capítulo 7
    addHeading("7. Aplicações Corporativas e B2B");
    addSubHeading("1. Auditoria de Conformidade Trabalhista");
    addParagraph("Grandes empresas terceirizam serviços. Para evitar processos, precisam garantir que a terceirizada pague os impostos e o piso salarial. Hoje, isso exige envio constante de planilhas. Com o bk.auditor, a terceirizada gera uma prova criptográfica conectada ao seu ERP, provando matematicamente que todos estão regulares, blindando a privacidade da folha de pagamento.");
    
    addSubHeading("2. Transparência ESG (Sustentabilidade)");
    addParagraph("Para combater o 'Greenwashing', as fábricas conectam o bk.auditor aos seus sensores de emissão de carbono (IoT). O sistema emite provas imutáveis na blockchain. Qualquer cidadão do mundo pode consultar o Hash da auditoria e ter certeza criptográfica de que a fábrica está cumprindo as leis ambientais, sem que a empresa revele sua capacidade produtiva exata para a concorrência.");
    
    addSubHeading("3. Saúde e Dados Médicos (HIPAA / LGPD)");
    addParagraph("Companhias de seguro podem processar claims e verificar elegibilidade clínica através de hospitais, processando os diagnósticos e tratamentos via provas ZK. A seguradora recebe a confirmação de que o procedimento é válido, e o banco de dados do paciente nunca sai do hospital, preservando intimidade absoluta.");
    addPageBreak();

    // Capítulo 8
    addHeading("8. Segurança e Arquitetura do Sistema");
    addParagraph("O bk.auditor adota uma abordagem de 'Security by Design' (Segurança por Design):");
    addBullet("Nenhum dado pessoal identificável (PII) é enviado para nossos servidores.");
    addBullet("Os nós executores (Workers) rodam localmente na infraestrutura do cliente.");
    addBullet("Todas as chaves privadas são gerenciadas no lado do cliente (Web3 Wallet).");
    addBullet("Os Smart Contracts em Rust na Solana sofrem escrutínio e auditoria contínua.");
    addBullet("A dependência do Google Gemini é restrita à criação do circuito, não ao processamento dos dados.");
    addParagraph("Ao separar a camada de VERIFICAÇÃO (pública na blockchain) da camada de EXECUÇÃO (privada nos servidores locais), resolvemos o Trilema da Blockchain para o mundo corporativo.");

    // Capítulo 9
    addHeading("9. Conclusão");
    addParagraph("Nós aceitamos a exposição de dados como o 'preço a se pagar' pela vida moderna. O bk.auditor prova que não precisa ser assim.");
    addParagraph("Ao unir a Inteligência Artificial para facilitar a criação de regras, o poder dos bancos de dados relacionais e a segurança imutável da Solana com ZK-SNARKs, nós criamos o novo padrão de confiança digital.");
    addParagraph("O futuro da internet não é sobre quem tem acesso aos seus dados. É sobre como você pode provar a verdade para o mundo, mantendo a sua privacidade intacta.");
    addParagraph("Bem-vindo à era da Conformidade Zero-Knowledge. Bem-vindo ao bk.auditor.");

  } else {
    // ENGLISH VERSION
    addCover(
      "bk.auditor®", 
      "The Future of Zero-Knowledge Compliance:\nA Revolution in Privacy and Trust on Web3",
      "OFFICIAL WHITEPAPER - VERSION 2.0.4 | 2026"
    );

    // Sumário
    addHeading("Table of Contents");
    addParagraph("1. Introduction: The Privacy Paradox");
    addParagraph("2. What is bk.auditor?");
    addParagraph("3. The Magic Behind It: ZK-SNARKs (Simple & Technical)");
    addParagraph("4. AI Engine (Google Gemini)");
    addParagraph("5. On-Chain Infrastructure (Solana & Soulbound Tokens)");
    addParagraph("6. Everyday Applications (For the Citizen)");
    addParagraph("7. Corporate and B2B Applications");
    addParagraph("8. Security and System Architecture");
    addParagraph("9. Conclusion");
    addPageBreak();

    // Capítulo 1
    addHeading("1. Introduction: The Privacy Paradox");
    addParagraph("We live in the information age, yet we face a terrible paradox: to prove who we are or what we have, we are forced to surrender our most intimate data. If you want to rent an apartment, you must hand over your bank statements. If you want to buy alcohol online, you must upload a photo of your ID. To prove health conditions, you expose your medical history.");
    addParagraph("Every time we send a PDF with our payslip or social security number via email, we create a point of failure. Our data is stored on third-party servers, subjected to leaks, hackers, and illegal data trading. The current internet model demands that we hand over 'raw information' just to prove a 'condition'.");
    addParagraph("Web3 promised to solve this, but most projects limited themselves to financial tokens or cryptocurrency speculation. The true promise of blockchain — immutable cryptography applied to real life — was forgotten.");
    addParagraph("This is where bk.auditor is born. It is not a cryptocurrency. It is a mathematical truth verification protocol that eliminates the need to share sensitive data.");

    // Capítulo 2
    addHeading("2. What is bk.auditor?");
    addParagraph("bk.auditor is a Zero-Knowledge compliance oracle. It acts as an armored bridge between traditional databases (Web2) and the transparency of the blockchain (Web3).");
    addParagraph("Instead of moving your confidential data to the blockchain (which would be disastrous for privacy), bk.auditor brings the math to your local database. It audits the information within the company's secure server and returns only a Cryptographic Proof (a guarantee seal) to the public network.");
    addParagraph("In layman's terms: The system acts as a blind, yet incorruptible inspector. It can certify that a document is perfect without ever reading what is written on it.");

    // Capítulo 3
    addHeading("3. The Magic Behind It: ZK-SNARKs");
    addSubHeading("For Laypeople: How to prove without revealing?");
    addParagraph("Imagine the famous game 'Where's Waldo?'. You found Waldo in a giant poster and want to prove to your friend that you know where he is, but you don't want to point at the poster and spoil the fun for him.");
    addParagraph("How do you do it? You take a giant piece of cardboard (larger than the poster), cut a small hole exactly the size of Waldo in it, and place it over the poster. Your friend will look through the hole and see Waldo. He is now ABSOLUTELY SURE you know where Waldo is, but he HAS NO IDEA which part of the poster Waldo is in, because the rest is covered.");
    addParagraph("This is a Zero-Knowledge Proof. You proved that you possess knowledge (where Waldo is), without revealing the location (the data).");
    
    addSubHeading("For Techs: ZK-SNARKs");
    addParagraph("At bk.auditor, we use Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge (ZK-SNARKs). The system transforms the business policy (e.g., income > 3000) into an arithmetic circuit, generating an R1CS (Rank-1 Constraint System) and subsequently a QAP (Quadratic Arithmetic Program).");
    addParagraph("The server processes the user's private input off-chain, generating a compact polynomial proof that verifies whether the computation was correctly executed according to the established rules. This proof, which is only a few hundred bytes, is submitted to the Solana network for verification in constant time (O(1)), costing fractions of a cent and being mathematically unforgeable.");
    addPageBreak();

    // Capítulo 4
    addHeading("4. AI Engine (Google Gemini)");
    addParagraph("One of the biggest barriers to ZK technology is complexity. Writing logic circuits in languages like Circom or Cairo requires highly specialized mathematicians and engineers.");
    addParagraph("bk.auditor solved this by integrating Google Gemini's Artificial Intelligence. Our LLM engine translates common human language into complex mathematical policies.");
    addParagraph("The user simply types: 'The employee must have a salary greater than 2000 and be over 18 years old'. Gemini interprets this intent and automatically compiles the necessary ZK-SNARK rule, along with the SQL extraction queries from the database (PostgreSQL/MongoDB).");
    addParagraph("This democratizes cryptographic auditing. Now, HR managers, CFOs, and everyday auditors can create on-chain verifications as easily as writing an email.");

    // Capítulo 5
    addHeading("5. On-Chain Infrastructure (Solana & SBTs)");
    addSubHeading("Why Solana?");
    addParagraph("Verifying mathematical proofs requires high computational power and speed. We chose Solana for its ability to process thousands of transactions per second at a negligible cost. This enables continuous (real-time) auditing for millions of records.");
    
    addSubHeading("Soulbound Tokens (SBTs)");
    addParagraph("Once a mathematical proof is validated by the network, bk.auditor issues a Soulbound Token to the person's or company's wallet. SBTs are NFTs that CANNOT be transferred or sold. They are born and die in the original wallet.");
    addParagraph("They act as 'Digital Certificates and Diplomas'. If you pass a financial audit, you receive a Solvency SBT. This SBT acts as a universal passport of trust.");
    addPageBreak();

    // Capítulo 6
    addHeading("6. Everyday Applications (For the Citizen)");
    addSubHeading("1. Income Verification for Rent / Loans");
    addParagraph("Today: You send your last 3 months of bank statements to the broker via WhatsApp.");
    addParagraph("With bk.auditor: The system connects via Open Finance to your bank, generates a ZK proof attesting that 'User X's income is sufficient to cover the rent', and issues the certificate to the agency. The agency has the bank's mathematical guarantee, but NEVER sees your transactions, your balance, or where you spend your money.");
    
    addSubHeading("2. Age Verification (+18)");
    addParagraph("Today: You upload your ID document to buy from websites or access +18 content.");
    addParagraph("With bk.auditor: The system generates a Hash of your document in a secure portal and issues a 'Verified +18' Soulbound Token. From that day on, you connect your wallet to any site and access is granted instantly. No one knows your name, your exact age, or your mother's name.");
    
    addSubHeading("3. Blind Resumes and Diplomas");
    addParagraph("Universities issue diplomas as ZK Soulbound Tokens. You can prove to an employer that you 'Hold an Engineering degree from a top 5 university' without revealing your name in the first phase of the selection process, eliminating gender or racial bias in hiring.");
    
    addPageBreak();

    // Capítulo 7
    addHeading("7. Corporate and B2B Applications");
    addSubHeading("1. Labor Compliance Auditing");
    addParagraph("Large companies outsource services. To avoid lawsuits, they need to ensure the third party pays taxes and the minimum wage. Today, this requires constantly sending spreadsheets. With bk.auditor, the third party generates a cryptographic proof connected to its ERP, mathematically proving everyone is compliant, shielding payroll privacy.");
    
    addSubHeading("2. ESG Transparency (Sustainability)");
    addParagraph("To combat 'Greenwashing', factories connect bk.auditor to their carbon emission sensors (IoT). The system issues immutable proofs on the blockchain. Any citizen in the world can check the audit Hash and have cryptographic certainty that the factory is complying with environmental laws, without the company revealing its exact production capacity to competitors.");
    
    addSubHeading("3. Health and Medical Data (HIPAA / GDPR)");
    addParagraph("Insurance companies can process claims and check clinical eligibility through hospitals, processing diagnoses and treatments via ZK proofs. The insurer receives confirmation that the procedure is valid, and the patient's database never leaves the hospital, preserving absolute intimacy.");
    addPageBreak();

    // Capítulo 8
    addHeading("8. Security and System Architecture");
    addParagraph("bk.auditor adopts a 'Security by Design' approach:");
    addBullet("No personally identifiable data (PII) is sent to our servers.");
    addBullet("The executor nodes (Workers) run locally on the client's infrastructure.");
    addBullet("All private keys are managed on the client side (Web3 Wallet).");
    addBullet("The Rust Smart Contracts on Solana undergo continuous scrutiny and auditing.");
    addBullet("Google Gemini's dependency is restricted to circuit creation, not data processing.");
    addParagraph("By separating the VERIFICATION layer (public on the blockchain) from the EXECUTION layer (private on local servers), we solved the Blockchain Trilemma for the corporate world.");

    // Capítulo 9
    addHeading("9. Conclusion");
    addParagraph("We have accepted data exposure as the 'price to pay' for modern life. bk.auditor proves it doesn't have to be this way.");
    addParagraph("By uniting Artificial Intelligence to ease rule creation, the power of relational databases, and the immutable security of Solana with ZK-SNARKs, we have created the new standard of digital trust.");
    addParagraph("The future of the internet is not about who has access to your data. It's about how you can prove the truth to the world, keeping your privacy intact.");
    addParagraph("Welcome to the era of Zero-Knowledge Compliance. Welcome to bk.auditor.");
  }

  doc.save(\`bk_auditor_whitepaper_\${lang}.pdf\`);
}
`;

fs.writeFileSync('src/utils/pdfGenerator.ts', tsCode);
console.log('PDF generator updated with massive content.');
