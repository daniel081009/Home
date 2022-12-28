import Head from "next/head";
import { useState, useEffect } from "react";
import Api from "../modules/api";
import firstpage from "./firstpage";
import secondpage from "./secondpage";
import Three from "./Three";

export default function Hoem() {
  const [imglist, setimglist] = useState([]);
  const [load, setload] = useState(false);
  useEffect(() => {
    (async () => {
      if (!window) {
        return;
      }
      if (!localStorage.getItem("imglist")) {
        localStorage.setItem(
          "imglist",
          JSON.stringify([
            [
              "https://unsplash.com/photos/Bkci_8qcdvQ/download?ixid=MnwzODAzMDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzAwNTQ1NDg",
              "https://unsplash.com/photos/bBiuSdck8tU/download?ixid=MnwzODAzMDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzAwNTQ1NDg",
              "https://unsplash.com/photos/049M_crau5k/download?ixid=MnwzODAzMDd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzAwNTQ1NDg",
            ],
          ])
        );
      }
      let temp = JSON.parse(localStorage.getItem("imglist"));
      setimglist(temp[random(0, temp.length - 1)]);
    })();
  }, []);
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  async function imgrand() {
    let list = await Api.UnsplashgetItem();
    list = list.data.map((item) => {
      return item.links.download;
    });
    setimglist(list);
  }
  async function imgsave() {
    if (!window) {
      return;
    }
    let list = JSON.parse(localStorage.getItem("imglist"));
    list.push(imglist);
    localStorage.setItem("imglist", JSON.stringify(list));
  }
  async function imgdelete() {
    if (!window) {
      return;
    }
    let list = JSON.parse(localStorage.getItem("imglist"));
    list = list.filter((item) => {
      return item != imglist;
    });
    localStorage.setItem("imglist", JSON.stringify(list));
    setimglist([]);
  }
  const handleScroll = () => {
    setload(true);
  };

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="maincontainer" onScroll={handleScroll}>
        {firstpage(imglist[0])}
        {secondpage(imglist[1], load)}
        {Three(imglist[2], load)}
        <main
          className="background"
          style={{
            backgroundImage: `url('${imglist[0]}')`,
          }}
        >
          <button onClick={imgrand} type="button" className="btn btn-dark">
            Rand
          </button>
          <button onClick={imgsave} type="button" className="btn btn-dark">
            Save
          </button>
          <button onClick={imgdelete} type="button" className="btn btn-dark">
            Delete
          </button>
        </main>
      </div>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
        crossOrigin="anonymous"
      ></link>

      <style jsx global>
        {`
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
    </>
  );
}
