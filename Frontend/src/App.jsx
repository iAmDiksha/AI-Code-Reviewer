import { useState, useEffect } from 'react'
import './App.css'

import "prismjs/themes/prism-tomorrow.css"
// import"prismjs/components/prism-jsx"
import prism from "prismjs"

import Editor from "react-simple-code-editor"

import axios from "axios"

import Markdown from "react-markdown"

import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css";


function App() {
  const [code, setCode] = useState(`function sum(){
    return 1+1;
}`)

  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState(``)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    if (!code || code.trim() === "") {
      setReview("Code can't be empty"); // Show message if code is empty
      return;
    }
    setLoading(true);
    const response = await axios.post("http://localhost:3000/ai/get-review", { code });
    setLoading(false);
    setReview(response.data);
    return response.data;
  }

  return (
    <>
      <div className="container">
        <header>
          <h3 className='center'>GET YOUR CODE REVIEWED</h3>
        </header>
        <main>
          <div className='left'>
            <div className="code">
              <Editor value={code} onValueChange={code => setCode(code)} highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 16,
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  height: "100%",
                  width: "100%"
                }}
              />
            </div>
            <button className="review" onClick={reviewCode} disabled={loading}>{loading ? "Generating Review" : "Review"}</button>
          </div>
          <div className='right'>
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          </div>
        </main>
      </div>
    </>
  )
}

export default App
