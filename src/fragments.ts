


// Basic Fragments

import { Automaton, State } from "./state";

function char(symbol: string): Automaton {
  const inState = new State()
  const outState = new State()

  inState.addTransitionForSymbol(symbol, outState)

  return new Automaton(inState, outState)
}


function epsilon(): Automaton {
  const EPSILON = "EPSILON"
  return char(EPSILON)
}


export {
  char,
  epsilon
}
