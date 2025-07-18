import Link from "next/link";

interface CardBonekaProps {
  image: string;
  name: string;
  price: number;
  bonekaId: number;
}

export default function CardBoneka({ image, name, price, bonekaId }: CardBonekaProps) {
  return (
    <Link href={`/boneka/detailBoneka/${bonekaId}`}>
      <div className="text-center bg-softblue cursor-pointer hover:scale-105 transition-transform p-4 border rounded-lg shadow-sm">
        <img
          src={image}
          alt={name}
          className="mx-auto w-full h-[200px] object-cover rounded-lg"
        />
        <p className="mt-2 font-semibold">{name}</p>
        <p className="text-sm text-gray-500">Rp {price.toLocaleString()}</p>
      </div>
    </Link>
  );
}
