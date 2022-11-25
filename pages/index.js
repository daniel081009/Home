import Head from "next/head";
import { useState, useEffect } from "react";
import Api from "../modules/api";

export default function Home() {
  const [background_img, setBackground_img] = useState(
    "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzODAzMDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjgzOTk0MDU&ixlib=rb-4.0.3&q=80"
  );
  const [notionData, setNotionData] = useState([]);
  const [music_vi, setMusic_vi] = useState("none");
  const [goodmsg, setGoodmsg] = useState("");
  const [time, setTime] = useState("");

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
      setGoodmsg(RandomGoodMsg());
      // setBackground_img(await Api.UnsplashgetItem());
      setNotionData(await Api.NotiongetItemToday());
    };
  }, []);
  function PrintNotionDayList() {
    if (notionData.results) {
      return notionData.results.map((item, i) => {
        return (
          <div key={i} className="Todo_item">
            <input type={"checkbox"} />
            <div>{item.properties["이름"].title[0].plain_text}</div>
          </div>
        );
      });
    }
    return <div>loading...</div>;
  }
  function RandomGoodMsg() {
    let msg = ["Good!", "Nice!", "very good!", "very nice!"];
    return msg[Math.floor(Math.random() * msg.length)];
  }
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main className="background">
        <div className="Music">
          <button
            onClick={() => {
              setMusic_vi(music_vi == "none" ? "block" : "none");
            }}
          >
            Player
          </button>
          <iframe
            width="400"
            height="300"
            src="http://www.youtube.com/embed?listType=playlist&list=PLk04kbCQty9Lm8kTKMIjpXpAfo_XDmEXZ&autoplay=1"
            style={{ display: music_vi }}
            frameBorder="0"
          ></iframe>
        </div>
        <div className="center">
          <div className="Center_right">
            <div className="time">{time}</div>
            <div className="goodmsg">{goodmsg}</div>
          </div>
        </div>
        <div>
          <div className="worklist">{PrintNotionDayList()}</div>
        </div>
        <div></div>
      </main>
      <style global jsx>
        {`
          .Music {
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: center;
          }
          .background {
            background-image: url(${background_img});
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
          }
          main {
            height: 100vh;
            display: flex;
            flex-flow: column;
            align-items: center;
            justify-content: space-between;
            text-shadow: 0 1px 9px rgb(0 0 0 / 20%);
          }
          button {
            -webkit-appearance: none;
            -moz-appearance: none;
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
          .center {
            display: flex;
            align-items: center;
            color: white;
          }
          .Center_right {
            display: flex;
            flex-flow: column;
            align-items: center;
          }
          .Todo_item {
            display: flex;
          }
          .time {
            font-size: 9rem;
            font-family: "Nanum Gothic";
            font-weight: 700;
          }
          .goodmsg {
            font-size: 4rem;
            font-family: "Pretendard-Regular";
            font-weight: 500;
          }
          #check-btn {
            display: none;
          }
          #check-btn:checked ~ .menubars {
            display: block;
          }
          .menubars {
            display: none;
          }
          @font-face {
            font-family: "Pretendard-Regular";
            src: url("https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff")
              format("woff");
            font-weight: 400;
            font-style: normal;
          }
          @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);

          .nanumgothic * {
            font-family: "Nanum Gothic", sans-serif;
          }
          @font-face {
            font-family: "SBAggroB";
            src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SBAggroB.woff")
              format("woff");
            font-weight: normal;
            font-style: normal;
          }
        `}
      </style>
    </>
  );
}
