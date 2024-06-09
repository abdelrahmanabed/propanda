import Image from 'next/image'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className=' flex flex-col items-center mt-10 md:flex-row justify-center gap-3'>
        <Image className=' drop-shadow-2xl shadow-black w-32 md:w-40' width={500} height={500} src={'/imgs/notfound.png'} />
      <div className=' flex items-center gap-5 justify-evenly font-black flex-col'><h2>هذه الصفحة غير متوفرة</h2>
      <p className=' text-2xl'>يمكن ان تكون قيد الانشاء</p>
      <Link className=' bg-black rounded-xl p-2 text-green-500 ' href="/">الذهاب للرئيسية</Link></div>

    </div>
  )
}