import React from 'react'
import { SyncLoader } from "react-spinners"

const LoaderService = ({ size }) => {
  return (
    <SyncLoader
    color="#ffff"
    loading={true}
    size={size}
    aria-label="Loading Spinner"
    data-testid="loader"
  />
  )
}

export default LoaderService
