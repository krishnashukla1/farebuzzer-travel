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

//==============19 jan========================

import imaps from "imap-simple";
import { simpleParser } from "mailparser";
import imapConfig from "../config/imapConfig.js";
import Email from "../models/Email.js";

const fetchEmails = async () => {
  try {
    // 1️⃣ Connect to Gmail
    const connection = await imaps.connect(imapConfig);
    await connection.openBox("INBOX");

    // 2️⃣ Fetch ONLY unread emails (READ ONLY)
    const searchCriteria = ["UNSEEN"];
    const fetchOptions = {
      bodies: ["TEXT"],   // ✅ TEXT ONLY
      markSeen: false     // ✅ Gmail safe
    };

    const messages = await connection.search(searchCriteria, fetchOptions);

    for (const message of messages) {
      const part = message.parts[0];
      const parsed = await simpleParser(part.body);

      const fromEmail =
        parsed.from?.value?.[0]?.address || parsed.from?.text || "";

      // ❌ DO NOT STORE HTML
      await Email.create({
        type: "received",
        emailType: "customer_support",

        from: fromEmail,
        to: "besttripmakers@gmail.com",
        subject: parsed.subject || "No Subject",

        text: parsed.text || "",   // ✅ ONLY TEXT

        meta: {
          billingEmail: fromEmail,
        },

        isRead: false,
      });
    }

    connection.end();
  } catch (error) {
    console.error("Error fetching emails:", error.message);
  }
};

export default fetchEmails;
