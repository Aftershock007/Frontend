function ErrorMessageGenerator(data) {
  const errorMessage = (data.match(/Error: (.+?)<br>/) || [])[1]
  return errorMessage
}

export { ErrorMessageGenerator }
