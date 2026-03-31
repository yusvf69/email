document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  try {
    await fetch("http://localhost:3005/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, phone, message }),
    });

    // امسح الفورم بعد الإرسال
    document.getElementById("contactForm").reset();
    
    // 👇 مش هيظهر أي رسالة
  } catch (err) {
    console.error(err);
    // برضه مش هنظهر أي alert
  }
});