import React, { FC } from 'react'
interface Props {
  [key: string]: any
}

const TrainSet: FC<Props> = () => {
  return (
    <svg
      className="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26">
      <path
        d="M512 1024l-448-256V256l448-256 448 256v512z m384-711.04L512 100.096 128 313.088v397.824l384 212.992 384-212.864V312.96zM448 704V551.552L291.136 456.448a75.136 75.136 0 0 1-25.6-99.904 67.84 67.84 0 0 1 95.168-26.752L512 421.44l151.168-91.648a67.84 67.84 0 0 1 95.168 26.752 75.136 75.136 0 0 1-25.6 99.904L576 551.552V704a64 64 0 0 1-128 0z"
        fill="#F1A389"
      >
      </path>
    </svg>
  )
}

export default TrainSet