export const getValue = (elements: HTMLFormControlsCollection, name: string) => {
    return (elements.namedItem(name) as HTMLInputElement).value;
}
