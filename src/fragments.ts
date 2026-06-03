type FragmentNode = {
    type: "SingleCharacterFragment"
    character: string
} | {
    type: "RangeFragment"
    start: string
    end: string
}


export {
    type FragmentNode
}
