import { useEffect, useState } from "react";
// import Api from "./api";

export default function Three(backgroundurl, load) {
  const [musichistory, setmusichistory] = useState([]);
  const [music, setmusic] = useState(
    "http://www.youtube.com/embed?listType=playlist&list=PLk04kbCQty9Lm8kTKMIjpXpAfo_XDmEXZ&autoplay=1"
  );
  const [input, setinput] = useState("");
  useEffect(() => {
    return async () => {
      if (load) {
        if (!localStorage.getItem("musichistory")) {
          localStorage.setItem("musichistory", JSON.stringify([]));
        }
        setmusichistory(JSON.parse(localStorage.getItem("musichistory")));
      }
    };
  }, []);
  if (!load) {
    return;
  }

  return (
    <main
      className="background"
      style={{
        backgroundImage: `url('${backgroundurl}')`,
      }}
    >
      <iframe src={music} frameBorder="0"></iframe>
      <div className="history list-group">
        {musichistory &&
          musichistory.map((item, i) => {
            return (
              <div
                key={i}
                onClick={() => {
                  setmusic(item);
                }}
                className="list-group-item"
              >
                {item}
              </div>
            );
          })}
        <div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              URL
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => {
                setinput(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  setmusic(input);
                  musichistory.push(input);
                  localStorage.setItem(
                    "musichistory",
                    JSON.stringify(musichistory)
                  );
                }
              }}
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        iframe {
          width: 70vw;
          height: 80vh;
          border-radius: 4vh;
        }
        .history {
          color: rgb(255, 255, 255);
          width: 50vw;
          height: 20vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1vh;
        }
      `}</style>
    </main>
  );
}
