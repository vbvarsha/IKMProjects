import React, { useState } from 'react'

const staticStyles = {
  container: {
    "margin-bottom": "10px"
  },
  title: {
    display: "flex",
    "flex-direction": "row",
    "justify-content": "space-between",
    cursor: "pointer",
    color: "white",
    padding: "10px",
    "box-shadow": "0px 0px 10px rgba(0, 0, 0, 0.2)",
    "border-top-left-radius": "10px",
    "border-top-right-radius": "10px"
  },
  body: {
    "background-color": "#e9e4e1",
    padding: "10px",
    "border-bottom-left-radius": "10px",
    "border-bottom-right-radius": "10px"
  }
}

const Accordion = ({ title = "", content = "", expanded = false, styles = {} }) => {
  const [isActive, setIsActive] = useState(expanded);

  return (
    <div style={{ ...staticStyles.container, ...styles.container || {} }}>
      <div style={{ ...staticStyles.title, ...styles.title, }} className="primary-bg" onClick={() => setIsActive(!isActive)}>
        <div>{title}</div>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      {isActive && <div style={{ ...staticStyles.body, ...styles.body }} >{content}</div>}
    </div>
  );
};


export default Accordion
