

const imapConfig = {
  imap: {
    user: process.env.GMAIL_USER,
    password: process.env.GMAIL_APP_PASSWORD,

    host: "imap.gmail.com",
    port: 993,
    tls: true,

    tlsOptions: {
      rejectUnauthorized: false, // 🔥 IMPORTANT for Gmail
    },

    authTimeout: 10000,
  },
};

export default imapConfig;
