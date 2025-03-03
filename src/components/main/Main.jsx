import { useContext, useRef, useEffect } from "react";
import { assets } from "../../assets/assets";
import "./main.css";
import { Context } from "../../context/Context";


const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResults,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const resultContainerRef = useRef(null); // Create a ref for result container

  const handleCardClick = (promptText) => {
    setInput(promptText);
  };

  // Auto-scroll to bottom when resultData or loading changes
  useEffect(() => {
    if (resultContainerRef.current) {
      resultContainerRef.current.scrollTop = resultContainerRef.current.scrollHeight;
    }
  }, [resultData, loading]); // Trigger scroll when resultData or loading changes

  return (
    <div className="main">
      <div className="nav">
        <div className="nav-title">
        <p>CodePy AI Assistant</p>
        </div>
        <img src={assets.user} alt="" />
      </div>
      <div className="main-container">
        {!showResults ? (
          <>
            <div className="greet">
              <p>
                <span>Hello , Dev </span>
              </p>
              <p>How Can I Help You Today?</p>
            </div>
            
          </>
        ) : (
          <div className="result" ref={resultContainerRef}>
            <div className="result-title">
              <img src={assets.user} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
            <img src="/codepy_logo(1).PNG" alt="CodePy Logo" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter the Prompt Here..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') { // Check if Enter key is pressed
                  onSent(); // Call onSent function when Enter is pressed
                }
              }}
            />
            <div>
              {/* <img src={assets.gallery_icon} alt="" /> */}
              {/* <img src={assets.mic_icon} alt="" /> */}
              <img
                src={assets.send_icon}
                alt=""
                onClick={() => {
                  onSent();
                }}
              />
            </div>
          </div>
          <div className="bottom-info">
            <p>
              CodePy AI Assistant may display inaccurate info, including about people, so
              double-check its responses. 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
