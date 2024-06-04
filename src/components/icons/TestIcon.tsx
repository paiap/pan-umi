import React, { FC } from 'react'
interface Props {
  [key: string]: any
}

const TestIcon: FC<Props> = () => {
  return (
    <svg style={{marginRight:'8px'}} className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path d="M170.667 853.333H896v85.334H170.667zM896 85.333H170.667a82.773 82.773 0 0 0-85.334 80.214v522.24A82.773 82.773 0 0 0 170.667 768H896a82.773 82.773 0 0 0 85.333-80.213v-522.24A82.773 82.773 0 0 0 896 85.333z m-529.493 435.2L294.4 593.067 128 426.667l166.4-166.4 72.533 72.533-93.866 93.867z m151.04 162.134H411.733l137.387-512h106.24z m256-90.027l-72.534-72.533 92.587-93.44-93.867-93.867 72.534-72.533 166.4 166.4z" fill="#d4237a" data-spm-anchor-id="a313x.search_index.0.i21.662f3a81o7hih5" className="selected"></path></svg>
  )
}

export default TestIcon