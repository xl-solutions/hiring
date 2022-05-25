import React from 'react'

export const Error = ({input, message}) => {
  return (
    <div class="alert alert-danger" role="alert">
        {input}: {message}
    </div>
  )
}
