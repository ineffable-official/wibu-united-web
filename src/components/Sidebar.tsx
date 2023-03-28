export default function Sidebar() {
  return (
    <div className="w-[350px] h-full border-r-[1px] p-2 flex flex-col">
      <div className="w-full flex items-center hover:bg-[rgba(0,0,0,0.05)] gap-2 rounded-xl">
        <div className="w-12 h-12 flex items-center justify-center">
          <i className="fa-light fa-house"></i>
        </div>
        <span className="text-sm">Home</span>
      </div>
      <div className="w-full flex items-center hover:bg-[rgba(0,0,0,0.05)] gap-2 rounded-xl">
        <div className="w-12 h-12 flex items-center justify-center">
          <i className="fa-light fa-history"></i>
        </div>
        <span className="text-sm">History</span>
      </div>
      <div className="w-full flex items-center hover:bg-[rgba(0,0,0,0.05)] gap-2 rounded-xl">
        <div className="w-12 h-12 flex items-center justify-center">
          <i className="fa-light fa-list-tree"></i>
        </div>
        <span className="text-sm">Playlist</span>
      </div>
      <hr className="my-2" />
      <div className="w-full flex items-center hover:bg-[rgba(0,0,0,0.05)] gap-2 rounded-xl">
        <div className="w-12 h-12 flex items-center justify-center">
          <i className="fa-light fa-rectangle-history"></i>
        </div>
        <span className="text-sm">Collection</span>
      </div>
      <div className="w-full flex items-center hover:bg-[rgba(0,0,0,0.05)] gap-2 rounded-xl">
        <div className="w-12 h-12 flex items-center justify-center">
          <i className="fa-light fa-fire-flame-curved"></i>
        </div>
        <span className="text-sm">Popular</span>
      </div>
    </div>
  );
}
