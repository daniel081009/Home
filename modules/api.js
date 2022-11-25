import axios from "axios";
const { Client } = require("@notionhq/client");

const notionKey = "secret_1QFPDVV8hM9UvPW8CFUmRkAFLpBsHqDlR47MINrvoX0";
const notionDatabaseKey = "24294139ef8d468e999e688f3131a8e3";
const notion = new Client({
  auth: notionKey,
  baseUrl:
    "https://square-bread-ed1d.danbrother.workers.dev/?https://api.notion.com",
});

export default class Api {
  static async NotionTODOgetItemToday() {
    const databaseId = notionDatabaseKey;
    try {
      const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
          property: "작업 날짜",
          date: {
            equals: new Date().toISOString().split("T")[0],
          },
        },
      });
      return response;
    } catch (error) {
      console.log(error.body);
    }
  }
  static async NotioTODOnUpdateComplit(id, check) {
    try {
      const response = await notion.pages.update({
        page_id: id,
        properties: {
          "": {
            checkbox: check,
          },
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error.body);
    }
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
