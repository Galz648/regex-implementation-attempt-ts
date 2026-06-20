import { Automaton, State } from "../state"


function rep(machine: Automaton) {
  machine.outState.accepting = false

  const inState = new State()
  const outState = new State(true)

  inState.addTransitionForSymbol("EPSILON", outState)
  inState.addTransitionForSymbol("EPSILON", machine.inState)
  outState.addTransitionForSymbol("EPSILON", machine.inState)


  return new Automaton(inState, outState)
}


export { rep }
