
import { start } from "node:repl";
import { Automaton, convertFragmentToAutomaton, State, Transition } from "./state";



type FragmentNode = {
  type: "SingleCharacterFragment";
  symbol: string;
};

type OrCompositionAST = {
  type: "OrComposition";
  left: AST;
  right: AST;
};

type concatAST = {
  type: "concatAST";
  first: AST;
  last: AST;
}
type CompositionAST = OrCompositionAST | concatAST
type AST = FragmentNode | CompositionAST;

// ─── Exhaustiveness ───────────────────────────────────────────────────────────
function assertNever(x: never): never {
  throw new Error(`Unhandled AST node: ${(x as any).type}`);
}

// ─── Type Guards ──────────────────────────────────────────────────────────────
function isFragmentNode(ast: AST): ast is FragmentNode {
  return ast.type === "SingleCharacterFragment";
}

function concatanateAutomata(fm: Automaton, lm: Automaton) {

  const start_state = fm.start;
  const end_state = lm.end;

  // Connect end of first automaton to start of second with epsilon
  const connector = new Transition(fm.end, lm.start, "EPSILON");

  return new Automaton(
    [start_state, ...fm.states, ...lm.states, end_state],
    [...fm.transitions, ...lm.transitions, connector],
    start_state,
    end_state
  );
}
function isCompositionAST(ast: AST): ast is CompositionAST {
  if (ast.type === "OrComposition") {
    return true
  }
  if (ast.type === "concatAST") {
    return true
  }
  return false
}

function unionAutomata(lm: Automaton, rm: Automaton): Automaton {

  const start_state = new State("OrComposition - Start State");
  const end_state = new State("OrComposition - End State");
  const lt = new Transition(start_state, lm.start, "EPSILON");
  const rt = new Transition(start_state, rm.start, "EPSILON");
  return new Automaton(
    [start_state, end_state],
    [lt, rt, ...lm.transitions, ...rm.transitions],
    start_state,
    end_state
  );
}
// ─── Walkers ──────────────────────────────────────────────────────────────────
function walkCompositionAST(ast: CompositionAST): Automaton {
  if (ast.type === "concatAST") {
    const fm = walkAST(ast.first);
    const lm = walkAST(ast.last);

    return concatanateAutomata(fm, lm)
  }

  if (ast.type === "OrComposition") {


    const lm = walkAST(ast.left);
    const rm = walkAST(ast.right);
    return unionAutomata(lm, rm)
  }

  return assertNever(ast);
}

function walkAST(ast: AST): Automaton {
  if (isFragmentNode(ast)) {
    return convertFragmentToAutomaton(ast);
  }
  if (isCompositionAST(ast)) {
    return walkCompositionAST(ast);
  }

  return assertNever(ast);
}

export type { FragmentNode, CompositionAST, AST, concatAST };
export { walkAST, isFragmentNode, isCompositionAST };
