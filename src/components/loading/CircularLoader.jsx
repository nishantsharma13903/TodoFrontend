import { Loader } from '@mantine/core'
import React from 'react'

export default function CircularLoader({col}) {
  return (
    <div>
      <Loader color={col} size='sm' />
    </div>
  )
}
