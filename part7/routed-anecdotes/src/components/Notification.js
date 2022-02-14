import React from 'react'

export const Notification = ({content}) => {
  if(!content) return null;
  return (
    <div style={{border: "1px solid red"}}>{content}</div>
  )
}
