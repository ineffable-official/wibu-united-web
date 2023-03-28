import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/router";
export default function Video() {
  const router = useRouter();
  const { s } = router.query;
  return (
    <div className="w-full h-screen overflow-hidden">
      <Navbar />
      <div className="w-full h-full flex">
        <Sidebar />
        <div className="w-full h-full p-8 overflow-y-scroll pb-32">
          <video controls style={{ width: "100%" }}>
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" />
          </video>
          <div className="flex flex-col my-4">
            <div className="text-2xl">One piece episode 254</div>
            <div className="w-[300px] h-auto flex p-2 border-[1px] rounded-xl gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <picture>
                  <img src="https://picsum.photos/512" alt="" />
                </picture>
              </div>
              <div className="flex flex-col">
                <div className="text-lg">One Piece</div>
                <div className="text-sm"><i className="fa-solid fa-star mr-2 text-yellow-400"></i>9.1</div>
              </div>
            </div>
            <div className="text-sm my-2">
              Gol D. Roger dikenal sebagai “Raja Bajak Laut,” terkuat dan paling
              terkenal yang telah berlayar di Grand Line. Penangkapan dan
              kematian Roger oleh Pemerintah Dunia membawa perubahan di seluruh
              dunia. Kata-kata terakhirnya sebelum kematiannya mengungkapkan
              keberadaan harta terbesar di dunia, yaitu One Piece. kata2
              tersebut membawa dan menjadi Era bajak laut, siapapun pria yang
              bermimpi untuk menemukan One Piece-yang menjanjikan jumlah yang
              tidak terbatas dari kekayaan dan ketenaran-dan sangat mungkin
              puncak kemuliaan dan gelar Raja Bajak Laut. Seorang Pria bernama
              Monkey D. Luffy, adalah seorang anak 17 tahun yang menentang
              definisi standar dari bajak laut. tidak tertarik aka pesona,
              kepopuleran dan tdak berbuat jahat, ada suatu mengapa alasan Luffy
              menjadi bajak laut adalah salah satu keajaiban murni: pemikiran
              dari sebuah petualangan menarik yang mendorongnya untuk harta yang
              dijanjikan. Mengikuti jejak pahlawan masa kecilnya, Luffy dan
              perjalanan krunya di Grand Line, ini adalah petualangan yg benar2
              gila, misteri dan memerangi musuh yang kuat, semua untuk mencapai
              paling didambakan kekayaan-One Piece.
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col">
              <span className="text-sm my-2">Previous</span>
              <div className="w-full min-w-[300px] h-auto flex gap-3 p-2 border-[1px] rounded-xl">
                <div className="w-[100px] h-fit rounded-xl overflow-hidden">
                  <picture>
                    <img src="https://picsum.photos/512/300" alt="" />
                  </picture>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-normal">One piece episode 253</div>
                  <div className="flex flex-wrap gap-2">
                    <div className="w-fit h-auto p-1 px-2 text-xs bg-[rgba(0,0,0,0.05)] rounded-full text-gray-500">
                      100k watched
                    </div>
                    <div className="w-fit h-auto p-1 px-2 text-xs bg-[rgba(0,0,0,0.05)] rounded-full text-gray-500">
                      2 hour ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-fit p-8 border-[1px] rounded-xl text-center">
              All episodes
            </div>
            <div className="flex flex-col">
              <span className="text-sm my-2">Next</span>
              <div className="w-full min-w-[300px] h-auto flex gap-3 p-2 border-[1px] rounded-xl">
                <div className="w-[100px] h-fit rounded-xl overflow-hidden">
                  <picture>
                    <img src="https://picsum.photos/512/300" alt="" />
                  </picture>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-normal">One piece episode 253</div>
                  <div className="flex flex-wrap gap-2">
                    <div className="w-fit h-auto p-1 px-2 text-xs bg-[rgba(0,0,0,0.05)] rounded-full text-gray-500">
                      100k watched
                    </div>
                    <div className="w-fit h-auto p-1 px-2 text-xs bg-[rgba(0,0,0,0.05)] rounded-full text-gray-500">
                      2 hour ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[550px] h-full p-2 flex flex-col gap-2">
          <div className="w-full h-auto flex gap-3 p-2 border-[1px] rounded-xl">
            <div className="w-[100px] h-auto rounded-xl overflow-hidden">
              <picture>
                <img src="https://picsum.photos/512/300" alt="" />
              </picture>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-normal">One piece episode 253</div>
              <div className="flex flex-wrap gap-2">
                <div className="w-fit h-auto p-1 px-2 text-xs bg-[rgba(0,0,0,0.05)] rounded-full text-gray-500">
                  100k watched
                </div>
                <div className="w-fit h-auto p-1 px-2 text-xs bg-[rgba(0,0,0,0.05)] rounded-full text-gray-500">
                  2 hour ago
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
