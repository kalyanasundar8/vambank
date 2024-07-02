import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();
import asyncHandler from "express-async-handler";

// Twilio
const accountSID = process.env.ACCOUNT_ID;
const accountAuthToken = process.env.AUTH_TOKEN;

if (!accountSID || !accountAuthToken) {
  console.log("Not set");
}

const twilioClient = twilio(accountSID, accountAuthToken);

// Send message to the user
const sendSMS = asyncHandler(async (userMobile, mssgFor, userName, id) => {
  if (mssgFor === "User") {
    try {
      await twilioClient.messages.create({
        body: `🙏Welcome to VAMBank MR.${userName}. We are happy to serve for you. Create a bank account, save money💰, get loans easy, and we assure your money will be safe🔐.`,
        from: process.env.MOBILE_NUMBER,
        to: `+91${userMobile}`,
      });
    } catch (twilioError) {
      console.log("Error while sending message");
    }
  } else if (mssgFor === "Manager") {
    try {
      await twilioClient.messages.create({
        body: `🙏Welcome to VAMBank MR.${userName}. We are happy to assign you as a manager for our bank. Here is your ID:${id}`,
        from: process.env.MOBILE_NUMBER,
        to: `+91${userMobile}`,
      });
    } catch (twilioError) {
      console.log("Error while sending message");
    }
  }
});

export { sendSMS };
