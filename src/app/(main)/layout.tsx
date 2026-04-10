import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="mt-32">
        {children}
      </div>
      <Footer />
    </>
  );
}
