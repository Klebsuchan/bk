import fs from 'fs';

let policies = fs.readFileSync('src/views/PoliciesView.tsx', 'utf-8');
policies = policies.replace("export function PoliciesView({ onRunAudit }: PoliciesViewProps) {", "export function PoliciesView({ onRunAudit }: PoliciesViewProps) {\n  const { t } = useI18n();");
fs.writeFileSync('src/views/PoliciesView.tsx', policies);

let proofs = fs.readFileSync('src/views/ProofsView.tsx', 'utf-8');
if (!proofs.includes("const { t } = useI18n();")) {
    proofs = proofs.replace("export function ProofsView() {", "export function ProofsView() {\n  const { t } = useI18n();");
    fs.writeFileSync('src/views/ProofsView.tsx', proofs);
}

let connectors = fs.readFileSync('src/views/ConnectorsView.tsx', 'utf-8');
if (!connectors.includes("const { t } = useI18n();")) {
    connectors = connectors.replace("export function ConnectorsView() {", "export function ConnectorsView() {\n  const { t } = useI18n();");
    fs.writeFileSync('src/views/ConnectorsView.tsx', connectors);
}

let modal = fs.readFileSync('src/components/ProofGeneratorModal.tsx', 'utf-8');
if (!modal.includes("const { t } = useI18n();")) {
    modal = modal.replace("export function ProofGeneratorModal({ policy, onClose, onComplete, walletAddress }: ProofGeneratorModalProps) {", "export function ProofGeneratorModal({ policy, onClose, onComplete, walletAddress }: ProofGeneratorModalProps) {\n  const { t } = useI18n();");
    fs.writeFileSync('src/components/ProofGeneratorModal.tsx', modal);
}

