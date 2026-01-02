import { ThemeProvider } from "./components/theme-provider";
import RootLayout from "./layout/RootLayout";
import HeroSection from "./pages/Portfolio/HeroSection/HeroSection";

export function App() {
  return (
    <ThemeProvider>

    <RootLayout>
      <HeroSection />
    </RootLayout>
    </ThemeProvider>
  );
}

export default App;
