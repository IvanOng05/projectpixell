import SideNav from '@/app/customers/sidenav';
import Footer from "@/app/ui/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Side Navigation */}
      <div className="">
        <SideNav />
      </div>

      {/* Main Content + Footer */}
      <div className="flex flex-1 flex-col">
        <main className="flex-grow p-6 md:p-12 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}