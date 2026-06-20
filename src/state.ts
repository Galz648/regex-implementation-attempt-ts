

class State {
  transitionsMap: Map<string, Array<State>> = new Map()
  test(str: string): boolean {
    throw new Error("Method not implemented.");
  }
  constructor(public accepting: boolean = false) {
    this.accepting = accepting;
    this.transitionsMap = new Map<string, Array<State>>()
  }

  addTransitionForSymbol(symbol: string, state: State) {

    // if it doesn't - create
    if (!this.transitionsMap.has(symbol)) {
      this.transitionsMap.set(symbol, [state])
    }

    // check if symbol already exists
    this.transitionsMap.get(symbol)!.push(state)
  }

  getTransitionsForSymbol(symbol: string): Array<State> {

    return this.transitionsMap.get(symbol) ?? []
  }
}

class Transition {
  constructor(public from: State, public to: State, public symbol: string) { }
}

class Automaton {
  test(str: string): boolean {
    return this.inState.test(str)
  }
  constructor(public inState: State, public outState: State) {
    this.inState = inState
    this.outState = outState
  }



}

export { State, Transition, Automaton }
