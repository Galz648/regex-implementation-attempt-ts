import type { FragmentNode } from "./AST";


class State {
    constructor(public name: string) { }
}

class Transition {
    constructor(public from: State, public to: State, public symbol: string) { }
}

class Automaton {
    constructor(public states: State[], public transitions: Transition[], public start: State, public end: State) { }

    getTransitionsForState(state: State): Transition[] {
        throw Error("TODO!")
        return []
    }


    addTransitionToState(state: State, symbol: string, to: State) { }

    run() {
        throw new Error("TODO!")
    }
}

function convertFragmentToAutomaton(fragment: FragmentNode): Automaton {
    // fragment AST -> ε-NFA (using Thompson's construction)
    const start_state = new State("start")
    const end_state = new State("end")
    const transition = new Transition(start_state, end_state, fragment.symbol)
    const automaton = new Automaton([start_state, end_state], [transition], start_state, end_state)

    return automaton
    // throw Error("TODO!")
}


export { State, Transition, Automaton, convertFragmentToAutomaton }
