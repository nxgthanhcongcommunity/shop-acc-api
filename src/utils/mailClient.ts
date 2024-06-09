import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ngthanhcong666@gmail.com",
    pass: "sppe ypaj snjx wdsu",
  },
});

export const mailOptions = {
  from: "ngthanhcong666@gmail.com",
  //   to: "nxgthanhcongcommunity@gmail.com",
  subject: "[SHPACC]",
  text: "... have a good day",
};
