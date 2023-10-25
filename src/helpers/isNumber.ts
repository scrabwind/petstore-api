export const isNumber = (event: KeyboardEvent): void => {
  const keysAllowed: string[] = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'Backspace',
    'Delete',
    'Copy',
    'Paste',
    'Cut'
  ]
  const keyPressed: string = event.key

  if (!keysAllowed.includes(keyPressed)) {
    event.preventDefault()
  }
}
