import type { FragmentNode } from "./fragments";


class State {
    constructor(public name: string) { }
}

class Transition {
    constructor(public from: State, public to: State, public symbol: string) { }
}

class Automaton {
    constructor(public states: State[], public transitions: Transition[]) { }

    getTransitionsForState(state: State): Transition[] {
        throw Error("TODO!")
        return []
    }


    addTransitionToState(state: State, symbol: string, to: State) { }

    run() {
        throw new Error("TODO!")
    }
}

function constructAutomatonFromFragment(fragment: FragmentNode): Automaton {
    // fragment AST -> ε-NFA (using Thompson's construction)
    throw Error("TODO!")
}


export { State, Transition, Automaton }
