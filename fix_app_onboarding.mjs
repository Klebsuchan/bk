import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(
  "import { LandingPageView } from './views/LandingPageView';", 
  "import { LandingPageView } from './views/LandingPageView';\nimport { WalletOnboardingView } from './views/WalletOnboardingView';"
);

const stateTarget = "  const [isLandingPage, setIsLandingPage] = useState(true);";
const stateReplacement = `  const [isLandingPage, setIsLandingPage] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);`;
content = content.replace(stateTarget, stateReplacement);

const landingLogicTarget = `  if (isLandingPage) {
    return <LandingPageView onLaunch={(addr) => {
      setWalletAddress(addr);
      setIsLandingPage(false);
    }} />;
  }`;
const landingLogicReplacement = `  if (isLandingPage) {
    return <LandingPageView onLaunch={(addr) => {
      setWalletAddress(addr);
      setIsLandingPage(false);
      if (addr) {
        setShowOnboarding(true);
      }
    }} />;
  }

  if (showOnboarding && walletAddress) {
    return <WalletOnboardingView walletAddress={walletAddress} onProceed={() => setShowOnboarding(false)} />;
  }`;
content = content.replace(landingLogicTarget, landingLogicReplacement);

// Make sure useEffect for polling only runs after onboarding too
const effectTarget = `  useEffect(() => {
    if (!isLandingPage) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 10000); // poll every 10s
      return () => clearInterval(interval);
    }
  }, [isLandingPage]);`;
const effectReplacement = `  useEffect(() => {
    if (!isLandingPage && !showOnboarding) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 10000); // poll every 10s
      return () => clearInterval(interval);
    }
  }, [isLandingPage, showOnboarding]);`;
content = content.replace(effectTarget, effectReplacement);


fs.writeFileSync('src/App.tsx', content);
console.log('App patched for onboarding');
