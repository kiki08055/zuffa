export default function Footer() {
  return (
    <footer className="bg-softblue text-choco py-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <h1 className="text-2xl font-bold mb-2 text-blue-800">Zuffa</h1>
          <p className="text-sm max-w-xs">
            Membawa solusi terbaik untuk anak-anak di sekitar Anda, bahkan untuk orang tersayang.
          </p>
        </div>

        <div className="flex space-x-8 mb-6 md:mb-0">
          <div>
            <h2 className="font-semibold mb-2">Perusahaan</h2>
            <ul className="text-sm space-y-1">
              <li><a href="#" className="hover:underline">Tentang Kami</a></li>
              <li><a href="#" className="hover:underline">Karir</a></li>
              <li><a href="#" className="hover:underline">Email</a></li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Ikuti Kami</h2>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-blue-700">🌐 Facebook</a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-700">🐦 Twitter</a>
            <a href="#" aria-label="Instagram" className="hover:text-blue-700">📸 Instagram</a>
          </div>
        </div>
      </div>

      <div className="border-t border-blue-300 mt-8 pt-4 text-center text-sm text-blue-700">
        &copy; {new Date().getFullYear()} Zuffa. All rights reserved.
      </div>
    </footer>
  );
}
