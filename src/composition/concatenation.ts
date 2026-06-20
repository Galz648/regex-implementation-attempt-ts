import { Automaton } from "../state.ts";


function concat(first: Automaton, ...rest: Array<Automaton>): Automaton {
  for (let fragment of rest) {
    first = concatPair(first, fragment)
  }

  return first
}

function concatPair(former: Automaton, latter: Automaton): Automaton {
  // add epsilon transition between the automata (in state -> out state)
  former.outState.accepting = false;
  latter.outState.accepting = true;

  former.outState.addTransitionForSymbol("EPSILON", latter.inState)








  return new Automaton(former.inState, latter.outState)
}


export { concatPair, concat }
