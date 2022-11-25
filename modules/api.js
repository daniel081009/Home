import axios from "axios";

const notionKey = "secret_1QFPDVV8hM9UvPW8CFUmRkAFLpBsHqDlR47MINrvoX0";
const notionDatabaseKey = "24294139ef8d468e999e688f3131a8e3";

export default class Api {
  static async NotiongetItemToday() {
    const data = await axios.post(
      `https://square-bread-ed1d.danbrother.workers.dev/?https://api.notion.com/v1/databases/${notionDatabaseKey}/query`,
      {
        filter: {
          property: "작업 날짜",
          date: {
            equals: new Date().toISOString().split("T")[0],
          },
        },
      },
      {
        headers: {
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
          Authorization: `Bearer ${notionKey}`,
        },
      }
    );
    return data.data;
  }

  static async NotionUpdateCheck() {
    const options = {
      method: "PATCH",
      url: "https://api.notion.com/v1/databases/" + notionDatabaseKey,
      headers: {
        accept: "application/json",
        "Notion-Version": "2022-06-28",
        "content-type": "application/json",
      },
      data: { properties: "string" },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  static async UnsplashgetItem() {
    const unsplashKey = "P76BjiJG61Y64Ken2SenYED2BuKMVkLGxVmdHsq-Pk4";
    try {
      const result = await axios({
        url:
          "https://api.unsplash.com/photos/random?query=office&client_id=" +
          unsplashKey,
        data: {
          topics: "background",
          orientation: "landscape",
          content_filter: "high",
        },
        method: "GET",
      });
      return result.data.urls.full;
    } catch (error) {
      console.log(error);
    }
  }
}
