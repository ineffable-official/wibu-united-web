export default function Notification(props) {
  if (props.show)
    return (
      <div
        className="w-screen h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.25)]"
        id="container"
        onClick={(evt) => {
          if (evt.target.id === "container") props.reset();
        }}
      >
        <div className="w-fit h-auto p-4 py-2 bg-[#1a253b] absolute left-1/2 top-8 rounded-xl text-sm shadow-lg text-red-500 -translate-x-1/2">
          {props.data}
        </div>
      </div>
    );
}
