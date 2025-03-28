import emailjs from "@emailjs/browser";

const sendEmail = async (email, password_) => {
  const templateParams = {
    email: email,
    message: `   ${password_}`
  };
  await emailjs.send(
        "service_uzxpokm",
        "template_eo6xtol",
        templateParams,
        { publicKey: "XZJW8d0AQg41CAa3P" }
     )
    .then(
      (response) => {
        alert("Email sent successfully!");
        console.log("Email sent:", response);
      },
      (error) => {
        alert("Failed to send email.");
        console.error("Email error:", error);
      }
    );
};


const sendSMS = (phoneNumber, password) => {
    fetch("http://localhost:5000/send-sms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber, password}),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => {
        alert("Failed to send SMS.");
        console.error("SMS error:", error);
      });
  };


export {sendEmail, sendSMS}
