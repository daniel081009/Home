import axios from "axios";
const { Client } = require("@notionhq/client");

const notionKey = "secret_1QFPDVV8hM9UvPW8CFUmRkAFLpBsHqDlR47MINrvoX0";
const notionTODODatabaseKey = "24294139ef8d468e999e688f3131a8e3";
const notionCalendarDatabaseKey = "ba9439ba7114482f82046a3b9cb7ea7b";
const notionGoodDatabaseKey = "6506f2b130a2436eb465d8d7df2aa349";
const notion = new Client({
  auth: notionKey,
  baseUrl: "https://cors.daoh.workers.dev/?https://api.notion.com",
});

export default class Api {
  static async NotionGet(idpage) {
    try {
      const response = await notion.pages.retrieve({
        page_id: idpage,
      });
      return response;
    } catch (error) {}
  }
  static async NotionGoodMsgGet() {
    try {
      const response = await notion.databases.query({
        database_id: notionGoodDatabaseKey,
      });
      return response;
    } catch (error) {
      console.log(error.body);
    }
  }

  static async NotionTODOTodayGet() {
    try {
      const response = await notion.databases.query({
        database_id: notionTODODatabaseKey,
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

  static async NotioTODOnUpdate(id, check) {
    const response = await notion.pages.update({
      page_id: id,
      properties: {
        "": {
          checkbox: check,
        },
      },
    });
    return response;
  }

  static async NotionCalenderTodayGet() {
    try {
      const response = await notion.databases.query({
        database_id: notionCalendarDatabaseKey,
        filter: {
          property: "날짜",
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

  static async NotionCalenderUpdate(id, check) {
    let name = "";
    if (check == "cd7bb281-5483-4bee-ad3a-90362f5c40d4") {
      name = "참석";
    } else if (check == "DJqc") {
      name = "불참";
    } else {
      name = "대기";
    }
    const response = await notion.pages.update({
      page_id: id,
      properties: {
        "": {
          status: {
            id: check,
            name: name,
          },
        },
      },
    });
    console.log(response);
  }

  static async ImgGet() {
    let list = JSON.parse(localStorage.getItem("background_img_list"));
    if (list) {
      return list[Math.floor(Math.random() * list.length)];
    }
    return [];
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
