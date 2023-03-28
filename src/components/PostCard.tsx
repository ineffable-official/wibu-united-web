export default function PostCard(props) {
  return (
    <div className="w-full max-w-[325px] flex flex-col">
      <div className="w-auto h-auto rounded-2xl overflow-hidden">
        <picture>
          <img
            src="https://picsum.photos/512/300"
            style={{ width: "100%", height: "auto" }}
            alt=""
          />
        </picture>
      </div>
      <div className="flex flex-col py-2">
        <div className="text-xl font-medium">{props.post.title}</div>
        <div className="w-full flex my-2 items-center gap-2 bg-[rgba(0,0,0,0.025)] hover:bg-[rgba(0,0,0,0.05)] p-2 rounded-2xl">
          <div className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden">
            <picture>
              <img
                src="https://picsum.photos/512"
                style={{ width: "auto", height: "auto" }}
                alt=""
              />
            </picture>
          </div>
          <span className="text-sm">One Piece</span>
        </div>
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
  );
}
