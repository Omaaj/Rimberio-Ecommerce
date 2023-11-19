import React from 'react';
import "./InfoBox.css";

export default function InfoBox({cardClass, title, count, icon}) {
  return (
    <div className='info-box'>
      <div className={cardClass}>
        <h4>{title}</h4>
        <span>
            <h3>{count}</h3>
            {icon}
        </span>
      </div>
    </div>
  )
}
