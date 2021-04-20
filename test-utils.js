function removeWhiteSpace(str) {
  return str && str.replace(/[\n\t\s]/g, '')
}

module.exports = {
  removeWhiteSpace,
}
