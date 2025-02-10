import React from "react";
import './contentWrapper.scss'

export default function ContentWrapper({ children }) {
  return <div className="contentWrapper">{children}</div>;
}
