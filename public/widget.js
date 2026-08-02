(function() {
    // 1. Locate the widget script element to extract parameters
    const scriptTag = document.currentScript || document.querySelector('script[data-tenant-id]');
    if (!scriptTag) {
        console.error("WhatsApp AI Widget: Script tag containing data-tenant-id not found!");
        return;
    }

    const tenantId = scriptTag.getAttribute('data-tenant-id');
    const scriptSrc = scriptTag.getAttribute('src');
    const baseUrl = window.location.origin;

    // Generate or fetch a persistent session ID for the widget user
    let sessionId = localStorage.getItem("vendachat_widget_session");
    if (!sessionId) {
        sessionId = "visitor_" + Math.random().toString(36).substring(2, 15);
        localStorage.setItem("vendachat_widget_session", sessionId);
    }

    // 2. Fetch configuration from public backend API
    fetch(`${baseUrl}/api/groply/widget-config/${tenantId}`)
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
        .then(data => {
            initWidget(data, baseUrl);
        })
        .catch(err => {
            console.error("WhatsApp AI Widget: Failed to load configuration", err);
        });

    function initWidget(data, baseUrl) {
        const phone = data.phone;
        const businessName = data.business_name || "Store Assistant";
        const config = data.config || {};
        const themeColor = config.color || "#7C3AED";
        const bubbleText = config.bubble_text || "Chat with AI";
        const welcomeMessage = config.welcome_message || "Hello! How can we help you today?";
        const position = config.position || "right";
        const defaultWhatsappText = config.whatsapp_text || "Hello!";

        if (!phone) {
            console.warn("WhatsApp AI Widget: Merchant phone number is missing. Widget disabled.");
            return;
        }

        // 3. Inject CSS styles
        const styles = `
            #wa-widget-container {
                position: fixed;
                bottom: 24px;
                ${position}: 24px;
                z-index: 999999;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                display: flex;
                flex-direction: column;
                align-items: ${position === 'right' ? 'flex-end' : 'flex-start'};
            }
            .wa-widget-bubble {
                background: ${themeColor};
                color: #FFFFFF;
                padding: 12px 20px;
                border-radius: 30px;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 15px;
                font-weight: 600;
                transition: transform 0.2s, box-shadow 0.2s;
                user-select: none;
                border: none;
                outline: none;
                position: relative;
            }
            .wa-widget-bubble:hover {
                transform: scale(1.05);
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
            }
            .wa-widget-bubble svg {
                width: 22px;
                height: 22px;
                fill: currentColor;
            }
            .wa-widget-badge {
                width: 8px;
                height: 8px;
                background-color: #EF4444;
                border-radius: 50%;
                position: absolute;
                top: -2px;
                right: -2px;
                box-shadow: 0 0 0 2px #FFFFFF;
                animation: wa-badge-pulse 2s infinite;
            }
            @keyframes wa-badge-pulse {
                0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
                70% { box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
                100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
            }
            .wa-widget-panel {
                width: 340px;
                height: 450px;
                background: #FFFFFF;
                border-radius: 16px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
                margin-bottom: 16px;
                display: none;
                flex-direction: column;
                overflow: hidden;
                transition: opacity 0.3s, transform 0.3s;
                opacity: 0;
                transform: translateY(20px);
                border: 1px solid rgba(0, 0, 0, 0.08);
            }
            .wa-widget-panel.open {
                display: flex;
                opacity: 1;
                transform: translateY(0);
            }
            .wa-widget-header {
                background: #075E54;
                color: #FFFFFF;
                padding: 16px;
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .wa-widget-avatar {
                width: 40px;
                height: 40px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 18px;
            }
            .wa-widget-header-info {
                display: flex;
                flex-direction: column;
            }
            .wa-widget-name {
                font-weight: 600;
                font-size: 15px;
            }
            .wa-widget-status {
                font-size: 12px;
                opacity: 0.85;
                display: flex;
                align-items: center;
                gap: 4px;
            }
            .wa-widget-status-dot {
                width: 6px;
                height: 6px;
                background: #4ADE80;
                border-radius: 50%;
            }
            .wa-widget-body {
                background: #E5DDD5;
                padding: 16px;
                overflow-y: auto;
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            .wa-widget-msg-row {
                display: flex;
                flex-direction: column;
                margin-bottom: 2px;
            }
            .wa-widget-message-bot {
                background: #FFFFFF;
                padding: 10px 14px;
                border-radius: 0 12px 12px 12px;
                max-width: 85%;
                font-size: 14px;
                color: #333333;
                box-shadow: 0 1px 2px rgba(0,0,0,0.1);
                line-height: 1.4;
                align-self: flex-start;
            }
            .wa-widget-message-user {
                background: #DCF8C6;
                padding: 10px 14px;
                border-radius: 12px 0 12px 12px;
                max-width: 85%;
                font-size: 14px;
                color: #333333;
                box-shadow: 0 1px 2px rgba(0,0,0,0.1);
                line-height: 1.4;
                align-self: flex-end;
            }
            .wa-widget-typing {
                align-self: flex-start;
                background: rgba(255, 255, 255, 0.7);
                padding: 8px 12px;
                border-radius: 8px;
                font-size: 12px;
                color: #666666;
                font-style: italic;
                display: none;
            }
            .wa-widget-footer {
                padding: 12px;
                background: #F0F2F5;
                display: flex;
                flex-direction: column;
                gap: 8px;
                border-top: 1px solid rgba(0, 0, 0, 0.05);
            }
            .wa-widget-input-row {
                display: flex;
                align-items: center;
                gap: 8px;
                width: 100%;
            }
            .wa-widget-input {
                flex-grow: 1;
                border: none;
                border-radius: 20px;
                padding: 8px 14px;
                font-size: 14px;
                outline: none;
                background: #FFFFFF;
                color: #333333;
                box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
            }
            .wa-widget-send-btn {
                background: #00A884;
                color: #FFFFFF;
                border: none;
                border-radius: 50%;
                width: 36px;
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: background 0.2s;
            }
            .wa-widget-send-btn:hover {
                background: #008F72;
            }
            .wa-widget-send-btn svg {
                width: 18px;
                height: 18px;
                fill: currentColor;
                transform: rotate(-45deg) translate(2px, -1px);
            }
            .wa-widget-wa-link {
                text-align: center;
                font-size: 11px;
                color: #075E54;
                text-decoration: none;
                font-weight: bold;
                padding: 2px 0;
                transition: color 0.2s;
            }
            .wa-widget-wa-link:hover {
                color: #128C7E;
            }
        `;

        const styleEl = document.createElement("style");
        styleEl.textContent = styles;
        document.head.appendChild(styleEl);

        // 4. Inject Widget HTML structures
        const container = document.createElement("div");
        container.id = "wa-widget-container";

        container.innerHTML = `
            <div class="wa-widget-panel" id="wa-widget-panel">
                <div class="wa-widget-header">
                    <div class="wa-widget-avatar">${businessName.charAt(0).toUpperCase()}</div>
                    <div class="wa-widget-header-info">
                        <div class="wa-widget-name">${businessName}</div>
                        <div class="wa-widget-status">
                            <span class="wa-widget-status-dot"></span> Assistant Online
                        </div>
                    </div>
                </div>
                <div class="wa-widget-body" id="wa-widget-body">
                    <div class="wa-widget-message-bot">
                        ${welcomeMessage}
                    </div>
                    <div class="wa-widget-typing" id="wa-widget-typing">
                        Assistant is typing...
                    </div>
                </div>
                <div class="wa-widget-footer">
                    <div class="wa-widget-input-row">
                        <input type="text" class="wa-widget-input" id="wa-widget-input" placeholder="Type a message..." autocomplete="off">
                        <button class="wa-widget-send-btn" id="wa-widget-send-btn">
                            <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                        </button>
                    </div>
                    <a href="#" class="wa-widget-wa-link" id="wa-widget-wa-link">
                        💬 Connect to WhatsApp (Human Agent)
                    </a>
                </div>
            </div>
            <button class="wa-widget-bubble" id="wa-widget-bubble">
                <span class="wa-widget-badge" id="wa-widget-badge"></span>
                <svg viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.734-1.455L0 24zm6.59-4.846c1.6.95 2.698 1.498 4.67 1.499 5.485 0 9.94-4.455 9.94-9.94 0-2.643-1.03-5.127-2.901-7c-1.872-1.873-4.358-2.903-7.007-2.903-5.485 0-9.94 4.456-9.94 9.94.002 2.012.533 3.02 1.514 4.66l-.995 3.635 3.72-.975z"/>
                </svg>
                <span>${bubbleText}</span>
            </button>
        `;

        document.body.appendChild(container);

        // 5. Setup Action Listeners
        const bubble = document.getElementById("wa-widget-bubble");
        const panel = document.getElementById("wa-widget-panel");
        const badge = document.getElementById("wa-widget-badge");
        const input = document.getElementById("wa-widget-input");
        const sendBtn = document.getElementById("wa-widget-send-btn");
        const chatBody = document.getElementById("wa-widget-body");
        const typingIndicator = document.getElementById("wa-widget-typing");
        const waLink = document.getElementById("wa-widget-wa-link");

        // Keep track of chat logs to forward to WhatsApp if requested
        let chatHistory = [`[Bot] ${welcomeMessage}`];

        // Hide notification badge upon click
        bubble.addEventListener("click", () => {
            if (badge) badge.style.display = "none";
            const isOpen = panel.classList.contains("open");
            if (isOpen) {
                panel.classList.remove("open");
                setTimeout(() => panel.style.display = "none", 300);
            } else {
                panel.style.display = "flex";
                panel.offsetHeight; 
                panel.classList.add("open");
                input.focus();
                scrollChatToBottom();
            }
        });

        function scrollChatToBottom() {
            chatBody.scrollTop = chatBody.scrollHeight;
        }

        async function handleSend() {
            const messageText = input.value.trim();
            if (!messageText) return;

            // 1. Render User Message bubble
            const userMsg = document.createElement("div");
            userMsg.className = "wa-widget-message-user";
            userMsg.textContent = messageText;
            chatBody.insertBefore(userMsg, typingIndicator);
            chatHistory.push(`[User] ${messageText}`);
            input.value = "";
            scrollChatToBottom();

            // 2. Display Typing State
            typingIndicator.style.display = "block";
            scrollChatToBottom();

            try {
                // 3. POST user message to backend widget chat endpoint
                const response = await fetch(`${baseUrl}/api/groply/widget-chat`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        tenant_id: tenantId,
                        session_id: sessionId,
                        message: messageText
                    })
                });

                if (!response.ok) throw new Error("API call failed");
                const data = await response.json();
                
                // Hide typing state
                typingIndicator.style.display = "none";

                // 4. Render Bot Reply bubble
                const botMsg = document.createElement("div");
                botMsg.className = "wa-widget-message-bot";
                botMsg.innerHTML = data.reply.replace(/\n/g, "<br>");
                chatBody.insertBefore(botMsg, typingIndicator);
                chatHistory.push(`[Bot] ${data.reply}`);
                scrollChatToBottom();

            } catch (err) {
                console.error("Widget chat error:", err);
                typingIndicator.style.display = "none";
                
                const errMsg = document.createElement("div");
                errMsg.className = "wa-widget-message-bot";
                errMsg.style.color = "#EF4444";
                errMsg.textContent = "⚠️ Sorry, we are experiencing connection issues. Please try again or chat with us on WhatsApp.";
                chatBody.insertBefore(errMsg, typingIndicator);
                scrollChatToBottom();
            }
        }

        // WhatsApp redirect click handler (forward chat transcript)
        waLink.addEventListener("click", (e) => {
            e.preventDefault();
            const transcript = chatHistory.join("\n");
            const whatsappMsg = `${defaultWhatsappText}\n\n--- My Chat Transcript ---\n${transcript}`;
            const waUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMsg)}`;
            window.open(waUrl, "_blank");
        });

        sendBtn.addEventListener("click", handleSend);
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                handleSend();
            }
        });
    }
})();
