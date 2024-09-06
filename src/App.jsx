import React, { useState } from "react";

// js-bin logo
import logo from "./assets/logo/jsBin-log.svg";

// GitHub icon
import { FaGithub } from "react-icons/fa";

// Monaco Editor
import CodeEditor from "./components/CodeEditor";


// Default HTML boilerplate
const HTML_BOILERPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
  

</body>
</html>
`;

const App = () => {

  // set initial values false
  const [codeToggle, setCodeToggle] = useState({
    html: false,
    css: false,
    javaScript: false,
    output: false,
  });

  // values of each code
  const [htmlCode, setHtmlCode] = useState(HTML_BOILERPLATE);

  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  const [outputContent, setOutputContent] = useState("");


  // toggle state of each codes
  const toggleStates = (state) => {
    setCodeToggle((prevStates) => ({
      ...prevStates,
      [state]: !prevStates[state],
    }));
  };


  // set values to false 
  const hideAllCode = () => {
    setCodeToggle({
      html: false,
      css: false,
      javaScript: false,
      output: false,
    });
  };

  //main logo visibility toggle 
  const isLogoVisible =
    !codeToggle.html &&
    !codeToggle.css &&
    !codeToggle.javaScript &&
    !codeToggle.output;

  // takes state and filter its bol values and set width according using tailwind css
  const activeCodeToggleCount = Object.values(codeToggle).filter(Boolean).length;

  const widthClass = () => {
    switch (activeCodeToggleCount) {
      case 1:
        return "w-full";
      case 2:
        return "w-1/2";
      case 3:
        return "w-1/3";
      case 4:
        return "w-1/4";
      default:
        return "w-0";
    }
  };



  const runCode = () => {
    const output = `
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}<\/script>
        </body>
      </html>
    `;

    setOutputContent(output);
  };

  // login / register dropDown toggle
  const [dropDown, setDropDown] = useState(false);
  const toggleDropDown = () => {
    setDropDown(!dropDown);
  };

  return (
    <div>
      <header className="header">
        <nav className="headerNav ">
          <div>
            <img
              src={logo}
              alt="JsBin logo"
              className="logo"
              onClick={hideAllCode}
            />
          </div>
          <nav className="nav-btn-container">
            <div
              onClick={() => toggleStates("html")}
              className={`nav-btn ${codeToggle.html ? "bg-white" : "bg-gray-300"}`}
            >
              HTML
            </div>
            <div
              onClick={() => toggleStates("css")}
              className={`nav-btn ${codeToggle.css ? "bg-white" : "bg-gray-300"}`}
            >
              CSS
            </div>
            <div
              onClick={() => toggleStates("javaScript")}
              className={`nav-btn ${codeToggle.javaScript ? "bg-white" : "bg-gray-300"}`}
            >
              JavaScript
            </div>
            <div
              onClick={() => toggleStates("output")}
              className={`nav-btn ${codeToggle.output ? "bg-white" : "bg-gray-300"}`}
            >
              Output
            </div>
          </nav>
          <div className="nav-end-box">
            <button onClick={runCode} className="run-btn">
              Run
            </button>
            <div className="login-register" onClick={toggleDropDown}>
              Login or Register
              {dropDown && (
                <div className="drop-box">
                  <div className="box-content">
                    <div className="box-item">
                      <FaGithub size={30} />
                      <span>Login or register via GitHub</span>
                    </div>
                    <span>Or</span>
                    <a href="https://jsbin.com/login" target="_blank">
                      use your email address
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>



      {/* main screen */}
      <div className="main">

        {/* main logo */}
        {isLogoVisible && (
          <img src={logo} alt="JsBin logo" width={250} className="home-logo" />
        )}

        <div className="code-container">
          {codeToggle.html && (
            <div className={`codeBox ${widthClass()}`}>
              <h1>HTML</h1>
              <CodeEditor
                language="html"
                value={htmlCode}
                onChange={setHtmlCode}
              />
            </div>
          )}

          {codeToggle.css && (
            <div className={`codeBox ${widthClass()}`}>
              <h1>CSS</h1>
              <CodeEditor
                language="css"
                value={cssCode}
                onChange={setCssCode}
              />
            </div>
          )}

          {codeToggle.javaScript && (
            <div className={`codeBox ${widthClass()}`}>
              <h1>JavaScript</h1>
              <CodeEditor
                language="javascript"
                value={jsCode}
                onChange={setJsCode}
              />
            </div>
          )}

          {codeToggle.output && (
            <div className={`codeBox flex-grow bg-gray-300 ${widthClass()}`}>
              <h1>Output</h1>
              <iframe
                title="output"
                className="w-full h-full"
                srcDoc={outputContent}
              />
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default App;
