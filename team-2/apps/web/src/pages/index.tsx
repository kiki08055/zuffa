import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import { useRouter } from "next/router";

interface CategoryCardProps {
  href: string;
  imgSrc: string;
  title: string;
}

export default function HomePage() {

  const router = useRouter();

  const handleClick = () => {
    router.push("/boneka");
  };
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <header className="relative w-full h-[60vh] md:h-[80vh]">
        <img
          src="https://i.pinimg.com/736x/20/c8/23/20c8232afdfa82792c358b2b8a16c61a.jpg"
          alt="Header Image"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Selamat Datang di Zuffa Store
          </h1>
          <p className="text-white text-lg md:text-2xl max-w-xl mb-6">
            Temukan boneka dan kue lezat untuk orang tersayang
          </p>
          <button
            onClick={handleClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105">
            Jelajahi Sekarang
          </button>
        </div>
      </header>

      {/* Category Section */}
      <main className="bg-cream flex-grow px-6 py-10">
        <section className="max-w-7xl mx-auto px-4 py-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Pilihan Kategori</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Temukan produk terbaik untuk semua kebutuhan Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            <CategoryCard
              href="/productboneka"
              imgSrc="https://i.pinimg.com/736x/d5/78/a8/d578a89d005410a5b2725d87b986e681.jpg"
              title="Boneka Lucu"
            />
            <CategoryCard
              href="/productCookies"
              imgSrc="https://i.pinimg.com/736x/f5/56/c2/f556c2bbc7872c91811de95e11a5ec67.jpg"
              title="Kue Lezat"
            />
            <CategoryCard
              href="/productMainan"
              imgSrc="https://i.pinimg.com/736x/13/a0/6c/13a06c70e7766453aa2c42bae49edd68.jpg"
              title="Mainan"
            />
            <CategoryCard
              href="/productPaketan"
              imgSrc="https://i.pinimg.com/736x/c5/af/1f/c5af1faf7c62184e775b9daa69ca0d11.jpg"
              title="Paket Hadiah"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Reusable Category Card Component
function CategoryCard({ href, imgSrc, title }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group relative w-full max-w-xs rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
        <h3 className="text-white text-xl font-bold">{title}</h3>
        <p className="text-white/80 text-sm mt-1">Lihat koleksi</p>
      </div>
    </Link>
  );
}
