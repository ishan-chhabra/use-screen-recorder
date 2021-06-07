import React from 'react'

import { useMyHook } from 'use-screen-recorder'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App
