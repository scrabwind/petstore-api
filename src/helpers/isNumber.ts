export const isNumber = (event: KeyboardEvent): void => {
  const keysAllowed: RegExp = /(Backspace|Delete|Copy|Paste|Cut|[0-9])/g
  const keyPressed: string = event.key

  if (!keysAllowed.test(keyPressed)) {
    event.preventDefault()
  }
}
