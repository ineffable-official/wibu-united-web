export default function Home(props) {
  return (
    <div className="w-full h-screen p-16 pb-32">
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <div className="w-full h-auto p-2 text-3xl font-semibold mt-8 bg-[rgba(0,0,0,0.25)]">
        {props.user.name}
      </div>
    </div>
  );
}
