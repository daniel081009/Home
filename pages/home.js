import Head from "next/head";
import { useState, useEffect } from "react";
import Api from "../modules/api";

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function firstpage() {
  const [time, setTime] = useState("");
  const [goodmsg, setgoodmsg] = useState("");

  let timeer = null;
  function currentTime() {
    const date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let session = "AM";

    if (hh > 12) {
      session = "PM";
    }

    hh = hh < 10 ? "0" + hh : hh;
    mm = mm < 10 ? "0" + mm : mm;
    setTime(hh + ":" + mm + " " + session);
    if (time == "") {
      timeer = setTimeout(() => currentTime(), 60000 - ss * 1000);
    } else {
      clearInterval(timeer);
      timeer = setTimeout(() => currentTime(), 60000 - ss * 1000);
    }
  }

  useEffect(() => {
    return async () => {
      currentTime();
      let list = await Api.NotionGoodMsgGet();
      if (list && list.results && list.results.length != 0) {
        setgoodmsg(
          list.results[Math.floor(Math.random() * list.results.length)]
            .properties.글.title[0].plain_text
        );
      }
    };
  }, []);
  // function PrintGoodMsg() {
  //   if (goodmsglist && goodmsglist.results && goodmsglist.results.length != 0) {
  //     // console.log(randomint(0, goodmsglist.length - 1));
  //     return <h2>{goodmsg}</h2>;
  //   } else {
  //     return <h2>Not Loding</h2>;
  //   }
  // }

  return (
    <main
      className="background"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1533090161767-e6ffed986c88?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzODAzMDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjgzOTk0MDU&ixlib=rb-4.0.3&q=80')",
      }}
    >
      <h1>{time}</h1>
      <h2>{goodmsg}</h2>
      <style jsx>{`
        h1 {
          font-size: 150px;

          font-weight: 200;
          font-family: "SBAggroB";
        }
        h2 {
          font-size: 40px;
          font-weight: 600;
          padding: 2vw;
          font-family: "S-CoreDream-3Light";
        }
      `}</style>
    </main>
  );
}

function secondpage() {
  const [NotionClender, setNotionClender] = useState("");
  const [NotionTodo, setNotionTodo] = useState("");
  useEffect(() => {
    return async () => {
      await sleep(1000);
      setNotionClender(await Api.NotionCalenderTodayGet());
      setNotionTodo(await Api.NotionTODOTodayGet());
      // console.log(Api.NotionCalenderUpdate(to.results[1].id, false));
    };
  }, []);

  function PrintClender() {
    if (
      NotionClender &&
      NotionClender.results &&
      NotionClender.results.length != 0
    ) {
      return NotionClender.results.map((item, i) => {
        let date = "";
        if (item.properties.날짜.date.end == null) {
          date = item.properties.날짜.date.start;
        } else {
          date =
            new Date(item.properties.날짜.date.start).toLocaleTimeString() +
            " ~ " +
            new Date(item.properties.날짜.date.end).toLocaleTimeString();
        }
        return (
          <div key={i} className="Clender_item">
            <select
              value={item.properties[""].status.id}
              onChange={async (e) => {
                await Api.NotionCalenderUpdate(item.id, e.target.value);
                setNotionClender(await Api.NotionCalenderTodayGet());
              }}
              aria-label=".form-select-lg example"
            >
              <option value="cd7bb281-5483-4bee-ad3a-90362f5c40d4">참석</option>
              <option value="DJqc">불참</option>
              <option value="383c4679-9945-468b-b27f-c02da418b7b6">대기</option>
            </select>
            <label
              className={
                item.properties[""].status.id ==
                "cd7bb281-5483-4bee-ad3a-90362f5c40d4"
                  ? "join"
                  : "notjoin"
              }
            >
              {item.properties.이름.title[0].plain_text} - {date}
            </label>
          </div>
        );
      });
    } else {
      return <h2>일정 없음</h2>;
    }
  }

  function PrintTodo() {
    if (NotionTodo && NotionTodo.results && NotionTodo.results.length != 0) {
      return NotionTodo.results.map((item, i) => {
        return (
          <div key={i}>
            <input
              type="checkbox"
              id="cb1"
              onChange={() => {
                Api.NotioTODOnUpdate(item.id, !item.properties[""].checkbox);
              }}
              defaultChecked={item.properties[""].checkbox}
            />
            <label className="text">
              {item.properties.이름.title[0].plain_text}
            </label>
          </div>
        );
      });
    } else {
      return <h2>오늘은 쉬는날</h2>;
    }
  }

  return (
    <main
      className="background"
      style={{
        backgroundImage:
          "url('https://unsplash.com/photos/YkXdt3429hc/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8NXx8YmxhY2t8ZW58MHx8fHwxNjcwMDQ0OTAy&force=true')",
      }}
    >
      <div className="Work">
        <div className="Clender">
          <div>{PrintClender()}</div>
        </div>
        <div className="Todo">
          <div>{PrintTodo()}</div>
        </div>
      </div>
    </main>
  );
}
function Three() {
  const [musichistory, setmusichistory] = useState([]);
  const [music, setmusic] = useState(
    "http://www.youtube.com/embed?listType=playlist&list=PLk04kbCQty9Lm8kTKMIjpXpAfo_XDmEXZ&autoplay=1"
  );
  const [input, setinput] = useState("");
  useEffect(() => {
    return async () => {
      if (!localStorage.getItem("musichistory")) {
        localStorage.setItem("musichistory", JSON.stringify([]));
      }
      setmusichistory(JSON.parse(localStorage.getItem("musichistory")));
    };
  }, []);

  return (
    <main
      className="background"
      style={{
        backgroundImage: `url('https://unsplash.com/photos/ayyHMb7rAUY/download?ixid=MnwxMjA3fDB8MXxhbGx8ODJ8fHx8fHwyfHwxNjY5OTY1NDcz&force=true')`,
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
      `}</style>
    </main>
  );
}

export default function Hoem() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="maincontainer">
        {firstpage()}
        {secondpage()}
        {Three()}
      </div>
      <style jsx global>
        {`
          .text {
            font-size: 1.7rem;
          }
          button {
            appearance: none;

            background: var(#28a745);
            color: var(#218838);

            margin: 0;
            padding: 0.5rem 1rem;

            font-size: 1rem;
            font-weight: 400;
            text-align: center;
            text-decoration: none;

            border: none;
            border-radius: 4px;

            display: inline-block;
            width: auto;

            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);

            cursor: pointer;

            transition: 0.5s;
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
          .Work {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1vh;
          }
          body {
            width: 100vw;
            margin: 0;
            padding: 0;
          }
          .maincontainer {
            width: 100vw;
            height: 100vh;
            display: flex;
            scroll-snap-type: x mandatory;
            overflow-x: scroll;
          }
          .background {
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
          }
          main {
            height: 100vh;
            scroll-snap-align: center;
            flex: 0 0 100vw;

            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: center;

            color: white;
            text-shadow: 0 1px 9px rgb(0 0 0 / 40%);
          }
          .Clender {
            width: max-content;
            height: max-content;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-flow: column;
            border-radius: 1vh;
          }
          .Clender_item {
            margin: 1vh;
            display: flex;
            gap: 1vw;
            font-size: 2rem;
          }

          .join {
            color: rgb(43, 228, 43);
          }
          .notjoin {
            color: rgb(213, 52, 52);
          }

          .Todo {
            width: max-content;
            height: max-content;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-flow: column;
            border-radius: 1vh;
          }

          input[id="cb1"] {
            display: inline-block;
            width: 25px;
            height: 25px;
            border: 2px solid #1e1e1e;
            cursor: pointer;
          }
          @font-face {
            font-family: "SBAggroB";
            src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SBAggroB.woff")
              format("woff");
            font-weight: normal;
            font-style: normal;
          }
          @font-face {
            font-family: "S-CoreDream-3Light";
            src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff")
              format("woff");
            font-weight: normal;
            font-style: normal;
          }
        `}
      </style>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
        crossOrigin="anonymous"
      ></link>
    </>
  );
}
