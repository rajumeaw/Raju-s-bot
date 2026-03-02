const fs = require("fs-extra");
const path = require("path");
const request = require("request");
const moment = require("moment-timezone");

module.exports.config = {
 name: "admin",
 version: "1.0.0",
 hasPermssion: 0,
 credits: "RAJU OFCL",
 description: "Show Owner Info",
 commandCategory: "Info",
 usages: "admin",
 cooldowns: 2,
 usePrefix: true
};

module.exports.run = async ({ api, event }) => {
 const conf = global.config;
 const mediaLink = conf.AuthorPhoto;

 const date = moment().tz("Asia/Dhaka").format("DD/MM/YYYY");
 const time = moment().tz("Asia/Dhaka").format("hh:mm:ss A");

 const body = `
👑 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢

👤 Name : ${conf.—𝐑𝐚𝐣𝐮  𝐎𝐟𝐜𝐥}
🧸 NickName : ${conf.𝗥𝗔𝗝𝗨 }
🚹 Gender : ${conf.MALE}
❤️ Relation : ${conf.AKHIR  JAMAI}
🎂 Age : ${conf.19+}
🕌 Religion : ${conf.ISLAM}
🏡 Address : ${conf.NOAKHALI}

🌐 𝗖𝗢𝗡𝗧𝗔𝗖𝗧

📘 Facebook :
${conf.https://www.facebook.com/raju.ofcl12?mibextid=rS40aB7S9Ucbxw6v}

💬 Messenger :
${conf.AuthorMessenger}

🔰 GitHub :
${conf.AuthorGithub}

📲 WhatsApp :
${conf.https://wa.me/8801815896135}

🕒 Updated
📅 Date : ${date}
⏰ Time : ${time}
🌍 TZ : Asia/Dhaka
`;

 if (!mediaLink) {
 return api.sendMessage(body, event.threadID);
 }

 const cacheDir = path.join(__dirname, "cache");
 if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });

 const ext = path.extname(mediaLink.split("?")[0]) || ".bin";
 const mediaPath = path.join(cacheDir, `admin${ext}`);

 let sent = false;

 const send = () => {
 if (sent) return;
 sent = true;

 api.sendMessage(
 {
 body,
 attachment: fs.createReadStream(mediaPath)
 },
 event.threadID,
 () => fs.unlinkSync(mediaPath)
 );
 };

 request(encodeURI(mediaLink))
 .pipe(fs.createWriteStream(mediaPath))
 .on("close", send)
 .on("error", () => api.sendMessage(body, event.threadID));
};
