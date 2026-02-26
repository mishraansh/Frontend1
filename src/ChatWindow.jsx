import Chat from "./Chat";
import "./ChatWindow.css";
import { useContext } from "react";
import { MyContext } from "./MyContext";
import { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";


function ChatWindow() {
   const {prompt, setPrompt, reply, setReply, currThreadId, prevChats, setPrevChats} = useContext(MyContext);
   const [loading, setLoading] = useState(false);
   const getReply = async () => {
    setLoading(true);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId
      }),
      
    };
    try {
      const response = await fetch("http://localhost:8000/chat", options);
       const res = await response.json();
       console.log(res);
        setReply(res.reply);        
  }
  catch (error) {
    console.error("Error fetching reply:", error);
  }
  setLoading(false);
}

useEffect(() => {
  if (prompt && reply) {
    setPrevChats(prevChats => ([...prevChats, 
      { role: "user", content: prompt }, { role: "assistant", content: reply }]));
  }
  setPrompt("");
}, [ reply ]);

  return (
    <div className="chatWindow">
      
      <div className="navbar">
        <span>
          SigmaGPT <i className="fa-solid fa-arrow-down"></i>
        </span>
        <div className="userIcon">
          <span>
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>

      <Chat />
      <ScaleLoader color="#ffffff" loading={loading}></ScaleLoader>

      <div className="chatInput">
        <div className="InputBox">
          <input
            type="text"
            placeholder="Ask anything..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && getReply()}
          />

          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>

        <p className="info">
          SigmaGPT can make mistakes. Check important info carefully.you use carefully. This is a demo version, so the responses may not be accurate. Please verify any critical information provided by SigmaGPT before relying on it.This is a project  Only , and it  make in mearn stack.good luck.
        </p>
      </div>

    </div>
  );
}

export default ChatWindow;

















// import Chat from "./Chat";
// import "./ChatWindow.css";

// function ChatWindow() {
//   return (
//     <div className="chatWindow">
      
//       <div className="navbar">
//         <span>
//           SigmaGPT <i className="fa-solid fa-arrow-down"></i>
//         </span>
//         <div className="userIcon">
//           <span>
//             <i className="fa-solid fa-user"></i>
//           </span>
//         </div>
//       </div>

//       <Chat />

//       <div className="chatInput">
//         <div className="InputBox">
//           <input
//             type="text"
//             placeholder="Ask anything..."
//           />

//           <div id="submit">
//             <i className="fa-solid fa-paper-plane"></i>
//           </div>
//         </div>

//         <p className="info">
//           SigmaGPT can make mistakes. Check important info carefully.you use carefully. This is a demo version, so the responses may not be accurate. Please verify any critical information provided by SigmaGPT before relying on it.This is a project  Only , and it  make in mern stack.good luck.
//         </p>
//       </div>

//     </div>
//   );
// }

// export default ChatWindow;