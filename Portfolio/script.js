document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const btn = document.getElementById("sendBtn");
  const btnText = btn.querySelector(".btn-text");
  const toast = document.getElementById("toast");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!form.name.value.trim() || !form.email.value.trim() || !form.service.value.trim() || !form.message.value.trim()) {
      alert("Please fill in all required fields (Name, Email, Service, Message)");
      return;
    }

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim() || undefined,
      service: form.service.value.trim(),
      message: form.message.value.trim()
    };

    btn.disabled = true;
    btn.classList.add("loading");
    btnText.textContent = "Sending...";

    try {
      const response = await fetch(
        "https://portfolio-backend-1-kpk8.onrender.com/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }

      btn.classList.remove("loading");
      btn.classList.add("success");
      btnText.textContent = "✔ Sent";

      toast.classList.add("show");

      setTimeout(() => {
        toast.classList.remove("show");
        btn.classList.remove("success");
        btnText.textContent = "SEND MESSAGE";
        btn.disabled = false;
        form.reset();
      }, 3000);

    } catch (error) {
      btn.classList.remove("loading");
      btnText.textContent = "SEND MESSAGE";
      btn.disabled = false;
      alert(error.message || "Failed to send message");
    }
  });
});
