import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div className="pl-60">
        <AppHeader />
        <main className="min-h-[calc(100vh-4rem)] p-6 scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
}
