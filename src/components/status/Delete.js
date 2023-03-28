import axios from "axios";

export default function Delete(props) {
  const apiUrl = "http://localhost:8000/api";
  const apiKey = localStorage.getItem("apiKey");

  const deletePost = () => {
    axios
      .delete(apiUrl + "/status/" + props.data.id, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      })
      .then((res) => {
        props.reset();
        window.location.reload(false);
      })
      .catch((err) => {
        throw err;
      });
  };

  if (props.show)
    return (
      <div className="w-screen h-screen bg-[rgba(0,0,0,0.25)] fixed top-0 left-0 flex items-center justify-center">
        <div className="w-auto h-auto bg-[#0e1420] p-8 rounded-lg shadow-lg">
          <div className="text-lg">Confirm to delete {props.data.name}?</div>
          <div className="flex gap-2 mt-4">
            <div
              className="w-fit h-auto p-6 py-2 bg-red-500 cursor-pointer hover:bg-red-700 rounded-lg"
              onClick={deletePost}
            >
              Yes
            </div>
            <div
              className="w-fit h-auto p-6 py-2 bg-blue-500 cursor-pointer hover:bg-blue-700 rounded-lg"
              onClick={props.reset}
            >
              No
            </div>
          </div>
        </div>
      </div>
    );
}
