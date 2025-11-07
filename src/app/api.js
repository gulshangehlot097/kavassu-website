import { openDB } from "idb";
//import {constant} from './pages'
const DB_NAME = "DIGIBIMA";
const STORE_NAME = "digibima";
import constant from "./env";


export async function callApi(url, method = "POST", data = null) {
  console.log(url, data);
  // let token = localStorage.getItem("token");
  let options = {
    method,
    headers: {
      "Content-Type": "application/json",
      // Authorization: `${token}`,
    },
  };
  if (data) {
    options.body = JSON.stringify({ data: data });
  }
  let res = await fetch(url, options);
  if (!res.ok) throw new Error("API request failed");
  return await res.json();
}
export async function callApiData(url, method = "POST", data = null) {
  console.log(url, data);
  // let token = localStorage.getItem("token");

  let options = {
    method,
    headers: {
      "Content-Type": "application/json",
      // Authorization: `${token}`,
    },
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  let res = await fetch(url, options);
  if (!res.ok) throw new Error("API request failed");
  return await res.json();
}

// export async function callApi(url, method = "POST", data = null) {
//   const token = localStorage.getItem("token");

//   try {
//     const res = await axios({
//       method,
//       url,
//       headers: {
//         "Content-Type": "application/json",
//         // Authorization: `${token}`,
//       },
//       data: data ? { data } : undefined,
//     });

//     return res.data;
//   } catch (err) {
//     console.error("API Error:", err.response?.data || err.message);
//     throw err;
//   }
// }

export async function callApiWithFile(url, method = "POST", payload = null) {
  const token = localStorage.getItem("token");
  const isFormData =
    typeof FormData !== "undefined" && payload instanceof FormData;

  const options = {
    method,
    headers: {},
  };

  // if (token) options.headers.Authorization = `${token}`;

  if (payload != null) {
    if (isFormData) {
      options.body = payload;
    } else {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(payload);
    }
  }
  console.log("hello", payload);
  console.log(options);
  const res = await fetch(url, options);
  const ct = res.headers.get("content-type") || "";

  if (!res.ok) {
    const errText = ct.includes("application/json")
      ? JSON.stringify(await res.json())
      : await res.text();
    throw new Error(`API request failed: ${res.status} ${errText}`);
  }

  return ct.includes("application/json") ? res.json() : res.text();
}

export async function uploadDocument(url, method = "POST", file = null) {
  const token = localStorage.getItem("token");

  // const formData = new FormData();
  // if (file) {
  //   formData.append("file", file);
  // }

  let options = {
    method,
    headers: {
      Authorization: `${token}`,
    },
    body: file,
  };

  const res = await fetch(url, options);
  if (!res.ok) throw new Error("API request failed");
  return await res.json();
}

export async function getUserinfo(token = localStorage.getItem("token")) {
  const response = await fetch("/api/getuserinfo", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
  return response;
}
export async function verifyToken(pretoken) {
  //let token = localStorage.getItem('token');
  const response = await fetch("/api/verifytoken", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${pretoken}`,
    },
  });
  return response;
}

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
}

export async function storeDBToken(token) {
  const db = await getDB();
  await db.put(STORE_NAME, token, "authToken");
}

export async function getDBToken() {
  const db = await getDB();
  return db.get(STORE_NAME, "authToken");
}

export async function deleteDBToken() {
  const db = await getDB();
  await db.delete(STORE_NAME, "authToken");
}

export async function isAuth() {
  return localStorage.getItem("token") ? true : false;
}
