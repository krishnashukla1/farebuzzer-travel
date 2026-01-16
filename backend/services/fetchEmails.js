// import imaps from "imap-simple";
// import { simpleParser } from "mailparser";
// import imapConfig from "../config/imapConfig.js";
// import Email from "../models/Email.js";

// const fetchEmails = async () => {
//   try {
//     // 1️⃣ Connect to Gmail
//     const connection = await imaps.connect(imapConfig);
//     await connection.openBox("INBOX");

//     // 2️⃣ Only unread emails
//     const searchCriteria = ["UNSEEN"];
//     const fetchOptions = { bodies: [""] };

//     const messages = await connection.search(
//       searchCriteria,
//       fetchOptions
//     );

//     // 3️⃣ Loop through emails
//     for (const message of messages) {
//       const part = message.parts[0];
//       const parsed = await simpleParser(part.body);

//       const fromEmail =
//         parsed.from?.value?.[0]?.address || parsed.from?.text || "";

//       const subject = parsed.subject || "No Subject";
//       const text = parsed.text || "";
//       const html = parsed.html || null;

//       // 4️⃣ Save incoming email into CRM Inbox (Email collection)
//       await Email.create({
//         type: "received", // 👈 INBOX
//         emailType: "customer_support",

//         from: fromEmail,
//         to: "besttripmakers@gmail.com",
//         subject,

//         text,
//         html,

//         meta: {
//           billingEmail: fromEmail,
//         },

//         isRead: false,
//       });
//     }

//     connection.end();
//   } catch (error) {
//     console.error("Error fetching emails:", error.message);
//   }
// };

// export default fetchEmails;

//======================================


import imaps from "imap-simple";
import { simpleParser } from "mailparser";
import imapConfig from "../config/imapConfig.js";
import Email from "../models/Email.js";

const fetchEmails = async () => {
  try {
    const connection = await imaps.connect(imapConfig);
    await connection.openBox("INBOX");

    const searchCriteria = ["UNSEEN"];
    const fetchOptions = {
      bodies: [""],
      markSeen: true, // 👈 VERY IMPORTANT
    };

    const messages = await connection.search(searchCriteria, fetchOptions);

    console.log("📨 New Emails:", messages.length);

    for (const item of messages) {
      const part = item.parts[0];
      const parsed = await simpleParser(part.body);

      const fromEmail =
        parsed.from?.value?.[0]?.address || parsed.from?.text;

      const subject = parsed.subject || "No Subject";
      const text = parsed.text || "";
      const html = parsed.html || null;

      // 🔁 DUPLICATE CHECK (IMPORTANT)
      const alreadyExists = await Email.findOne({
        from: fromEmail,
        subject,
        text,
      });

      if (alreadyExists) continue;

      await Email.create({
        type: "received",
        emailType: "customer_support",

        from: fromEmail,
        to: "besttripmakers@gmail.com",
        subject,

        text,
        html,

        meta: {
          billingEmail: fromEmail,
        },

        isRead: false,
      });
    }

    connection.end();
  } catch (error) {
    console.error("❌ IMAP ERROR:", error.message);
  }
};

export default fetchEmails;

//==========================

// import imaps from "imap-simple";
// import { simpleParser } from "mailparser";
// import imapConfig from "../config/imapConfig.js";
// import Email from "../models/Email.js";

// const fetchEmails = async () => {
//   try {
//     const connection = await imaps.connect(imapConfig);
//     await connection.openBox("INBOX");

//     const messages = await connection.search(
//       ["UNSEEN"],
//       { bodies: [""], markSeen: true }
//     );

//     console.log("📨 New Emails:", messages.length);

//     for (const item of messages) {
//       const parsed = await simpleParser(item.parts[0].body);

//       const fromEmail = parsed.from?.value?.[0]?.address;
//       const subject = parsed.subject || "No Subject";
//       const text = parsed.text || "";
//       const html = parsed.html || null;
//       const messageId = parsed.messageId;

//       if (!messageId) continue;

//       const exists = await Email.findOne({ messageId });
//       if (exists) continue;

//       await Email.create({
//         type: "received",
//         emailType: "customer_support",

//         from: fromEmail,
//         to: process.env.GMAIL_USER,
//         subject,

//         text,
//         html,
//         messageId,

//         meta: {
//           billingEmail: fromEmail,
//         },

//         isRead: false,
//       });
//     }

//     connection.end();
//   } catch (err) {
//     console.error("❌ IMAP ERROR:", err);
//   }
// };

// export default fetchEmails;
