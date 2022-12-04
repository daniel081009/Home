import { useEffect, useState } from "react";
import Api from "../pages/api/api";

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Secondpage(backgroundurl, load) {
  const [NotionClender, setNotionClender] = useState("");
  const [NotionTodo, setNotionTodo] = useState("");
  let asdfasdf = 0;
  useEffect(() => {
    return async () => {
      console.log("load", asdfasdf);
      if (asdfasdf != 0) {
        setNotionClender(await Api.NotionCalenderTodayGet());
        setNotionTodo(await Api.NotionTODOTodayGet());
      } else {
        asdfasdf = 1;
      }
      // schedule.scheduleJob(date, function () {
      //   console.log("The world is going to end today.");
      // });
      // console.log(Api.NotionCalenderUpdate(to.results[1].id, false));
    };
  }, [load]);
  if (!load) {
    return;
  }

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
    <>
      <main
        className="background"
        style={{
          backgroundImage: `url('${backgroundurl}')`,
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
        <style jsx global>{`
          .Work {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1vh;
          }
          .text {
            font-size: 1.7rem;
            background-color: rgba(72, 72, 72, 0.5);
            border-radius: 1vh;
          }
          label {
            background-color: rgba(72, 72, 72, 0.5);
            border-radius: 1vh;
          }

          input[id="cb1"] {
            display: inline-block;
            width: 25px;
            height: 25px;
            border: 2px solid #1e1e1e;
            cursor: pointer;
          }

          .join {
            color: rgb(43, 228, 43);
          }
          .notjoin {
            color: rgb(223, 106, 106);
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

          .Todo {
            width: max-content;
            height: max-content;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-flow: column;
            border-radius: 1vh;
          }
        `}</style>
      </main>
    </>
  );
}
