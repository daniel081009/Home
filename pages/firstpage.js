import { useState, useEffect } from "react";
import Api from "../modules/api";
import Image from "next/image";
export default function Firstpage(backgroundurl) {
  const [time, setTime] = useState("");
  const [goodmsg, setgoodmsg] = useState("");

  let timeer = null;
  function currentTime(date) {
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
    timeer = setTimeout(() => currentTime(new Date()), 60000 - ss * 1000);
  }
  useEffect(() => {
    currentTime(new Date());
  }, [currentTime]);

  useEffect(() => {
    (async () => {
      if (
        localStorage.getItem("goodmsg") &&
        localStorage.getItem("goodmsg").length != 0 &&
        localStorage.getItem("goodmsg") != ""
      ) {
        let list = JSON.parse(localStorage.getItem("goodmsg"));
        setgoodmsg(
          list[Math.floor(Math.random() * list.length)].properties.글.title[0]
            .plain_text
        );
      } else {
        let list = await Api.NotionGoodMsgGet();
        localStorage.setItem("goodmsg", JSON.stringify(list.results));
      }
    })();
  }, []);

  return (
    <main className="background">
      {backgroundurl && (
        <Image
          className="backgroundasdf"
          src={backgroundurl}
          fill
          placeholder="blur"
          blurDataURL="data:image/png;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4gIcSUNDX1BST0ZJTEUAAQEAAAIMbGNtcwIQAABtbnRyUkdCIFhZWiAH3AABABkAAwApADlhY3NwQVBQTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApkZXNjAAAA/AAAAF5jcHJ0AAABXAAAAAt3dHB0AAABaAAAABRia3B0AAABfAAAABRyWFlaAAABkAAAABRnWFlaAAABpAAAABRiWFlaAAABuAAAABRyVFJDAAABzAAAAEBnVFJDAAABzAAAAEBiVFJDAAABzAAAAEBkZXNjAAAAAAAAAANjMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB0ZXh0AAAAAElYAABYWVogAAAAAAAA9tYAAQAAAADTLVhZWiAAAAAAAAADFgAAAzMAAAKkWFlaIAAAAAAAAG+iAAA49QAAA5BYWVogAAAAAAAAYpkAALeFAAAY2lhZWiAAAAAAAAAkoAAAD4QAALbPY3VydgAAAAAAAAAaAAAAywHJA2MFkghrC/YQPxVRGzQh8SmQMhg7kkYFUXdd7WtwegWJsZp8rGm/fdPD6TD////bAEMACQYGCAYFCQgHCAoJCQoNFg4NDAwNGhMUEBYfHCEgHxweHiMnMiojJS8lHh4rOywvMzU4ODghKj1BPDZBMjc4Nf/bAEMBCQoKDQsNGQ4OGTUkHiQ1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1NTU1Nf/AABEIAAcACgMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAABf/EACEQAAEDAwQDAAAAAAAAAAAAAAEAAgQDBUEGEiIxESGR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAQP/xAAZEQACAwEAAAAAAAAAAAAAAAACEQABBBP/2gAMAwEAAhEDEQA/AIsbVDI9njGtbY0mRVbwqPZt956OMKadfy3OJbbo+0nyOI6+oikOg0ochq3P/9k="
          priority={true}
          style={{
            objectFit: "cover",
          }}
          alt="background"
        />
      )}

      <div className="h1title">{time}</div>
      <h2>{goodmsg}</h2>
      <style jsx global>{`
        .h1title {
          font-size: 150px;

          font-weight: 200;
          font-family: "SBAggroB";
        }
        h2 {
          font-size: 30px;
          font-weight: 400;
          margin: 20vw;
          font-family: "S-CoreDream-3Light";
          background-color: rgba(72, 72, 72, 0.5);
          border-radius: 1vh;
          word-break: break-all;
        }

        .backgroundasdf {
          position: fixed;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          z-index: -1;
        }
        }
      `}</style>
    </main>
  );
}
