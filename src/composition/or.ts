
import { Automaton, State } from "../state.ts";


function or(first: Automaton, ...rest: Array<Automaton>): Automaton {

  for (let fragment of rest) {
    first = orPair(first, fragment)
  }
  return first
}

function orPair(first: Automaton, second: Automaton): Automaton {
  // add epsilon transition between the automata (in state -> out state)

  first.outState.accepting = false;
  second.outState.accepting = false;

  const inState = new State()
  const outState = new State(true)

  inState.addTransitionForSymbol("EPSILON", first.inState)
  inState.addTransitionForSymbol("EPSILON", second.inState)


  first.outState.addTransitionForSymbol("EPSILON", outState)
  second.outState.addTransitionForSymbol("EPSILON", outState)






  return new Automaton(first.inState, second.outState)
}


export { or, orPair }
