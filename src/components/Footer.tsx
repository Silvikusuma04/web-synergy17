export default function Footer() {
    return (
      <footer className="bg-deep-sea-blue text-sand-beige/80 py-10">
        <div className="container mx-auto px-6 text-center">
          <p className="font-bold">&copy; {new Date().getFullYear()} SYNERGY GROUP 17 Archibiotech And Terangi</p>
          <p className="text-sm mt-2">A collaboration between Archipelago Biotechnology Indonesia & Yayasan TERANGI</p>
        </div>
      </footer>
    );
  }