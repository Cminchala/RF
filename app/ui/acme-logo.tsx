import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
     
      <p className="text-[30px] relative top-[-20px]">Reliance Auto Works</p>
    </div>
  );
}
