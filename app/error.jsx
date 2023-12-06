'use client'

const error = ({error, reset}) => {
  return (
    <div>
      <h2>Server Error {error}</h2>
      <p>Sorry, something went wrong on the server side. Please try again later.</p>
      <button onClick={reset}>Retry</button>
  </div>
  )
}

export default error