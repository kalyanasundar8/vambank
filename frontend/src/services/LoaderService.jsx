import React from 'react'
import { SyncLoader } from "react-spinners"

const LoaderService = () => {
  return (
    <SyncLoader
    color="#ffff"
    loading={true}
    size={5}
    aria-label="Loading Spinner"
    data-testid="loader"
  />
  )
}

export default LoaderService
