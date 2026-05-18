console.log("JS LOADED");

document.addEventListener("DOMContentLoaded", function () {

    const toggle = document.querySelector(".theme-toggle");
    const icon = document.getElementById("themeIcon");

    if (!toggle) {
        console.log("Toggle not found");
        return;
    }

    toggle.addEventListener("click", () => {
        console.log("Toggle clicked");

        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
            icon.innerText = "☀️";
            localStorage.setItem("theme", "light");
        } else {
            icon.innerText = "🌙";
            localStorage.setItem("theme", "dark");
        }
    });

    // Load saved theme
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
        icon.innerText = "☀️";
    }
});
async function checkFraud() {
    const token = localStorage.getItem("token"); // store after login

    const data = {
        amount: parseFloat(document.getElementById("amount").value),
        Transaction_Frequency: parseInt(document.getElementById("frequency").value),
        Transaction_Amount_Deviation: parseFloat(document.getElementById("deviation").value),
        message: document.getElementById("message").value,

        Transaction_Type: "Transfer",
        Payment_Gateway: "UPI",
        Transaction_City: "Mumbai",
        Transaction_State: "Maharashtra",
        Device_OS: "Android",
        Merchant_Category: "Retail",
        Transaction_Channel: "Mobile",
        Transaction_Status: "Success",
        Days_Since_Last_Transaction: 1,
        device_id: "dev123",
        ip_address: "192.168.1.1",
        receiver: "normal_user",
        Date: "2026-04-29",
        Time: "14:30:00"
    };

    const res = await fetch("https://paysafe-backend-0wed.onrender.com/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "token": token   // 🔥 IMPORTANT
        },
        body: JSON.stringify(data)
    });

    const result = await res.json();
    console.log(result);
    showResult(result);
}
function showResult(data) {

    // Show result card
    document.getElementById("fraudResult").style.display = "block";

    // ---------------- BASIC INFO ----------------
    document.getElementById("riskLabel").innerText = data.risk_level;
    document.getElementById("riskScore").innerText = (data.risk_score * 100).toFixed(2);

    // ---------------- WHY FRAUD ----------------
    let reasonsList = document.getElementById("reasonsList");
    reasonsList.innerHTML = "";

    if (data.reasons && data.reasons.length > 0) {
        data.reasons.forEach(reason => {
            let li = document.createElement("li");
            li.innerText = "✔ " + reason;
            reasonsList.appendChild(li);
        });
    } else {
        let li = document.createElement("li");
        li.innerText = "✔ No major risk signals detected";
        reasonsList.appendChild(li);
    }

    // ---------------- TOP FEATURES ----------------
    let featuresList = document.getElementById("featuresList");
    featuresList.innerHTML = "";

    if (data.top_features && data.top_features.length > 0) {
        data.top_features.forEach(f => {
            let li = document.createElement("li");
            li.innerText = `${f.feature} (${Number(f.impact).toFixed(3)})`;
            featuresList.appendChild(li);
        });
    } else {
        let li = document.createElement("li");
        li.innerText = "No feature insights available";
        featuresList.appendChild(li);
    }

    // ---------------- COLOR BASED RISK ----------------
    let card = document.querySelector(".result-card");

    if (data.risk_score > 0.7) {
        card.style.border = "2px solid red";
    } else if (data.risk_score > 0.3) {
        card.style.border = "2px solid orange";
    } else {
        card.style.border = "2px solid green";
    }
}