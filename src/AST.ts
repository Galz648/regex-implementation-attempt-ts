
// write a few examples of an AST, with fragments and compositions

import { Fragment } from "react";
import { Automaton, convertFragmentToAutomaton, State, Transition } from "./state";
import { transform } from "typescript";

type FragmentNode = {
    type: "SingleCharacterFragment"
    symbol: string
}

function isCompositionAST(ast: AST): ast is CompositionAST {
    return ast.type === "OrComposition";
}

function isFragmentAST(ast: AST): ast is FragmentNode {
    return ast.type === "SingleCharacterFragment";
}


function walkCompositionAST(ast: CompositionAST) {
    let automaton;
    if (ast.type == "OrComposition") {
        const lm = walkAST(ast.left)
        const rm = walkAST(ast.right)

        const start_state = new State("OrComposition - Start State")
        const end_state = new State("OrComposition - End State")

        const lt = new Transition(start_state, lm.start, "EPSILON")
        const rt = new Transition(start_state, rm.start, "EPSILON")

        automaton = new Automaton([start_state, end_state], [lt, rt, ...lm.transitions, ...rm.transitions], start_state, end_state)
    }

    if (!automaton) {
        throw Error("automaton is undefined, composition AST case is unhandled properly")
    }
    return automaton
}
function walkAST(ast: AST): Automaton {
    // base case
    if (isFragmentAST(ast)) {
        return convertFragmentToAutomaton(ast)
    }
    // recursive case
    else if (isCompositionAST(ast)) {
        return walkCompositionAST(ast)
    }

    else {
        const error_message = `unhandled node type: ${ast.type}`
        throw Error(error_message)
    }
}

type OrCompositionAST = {
    type: 'OrComposition',
    left: AST,
    right: AST
}

type CompositionAST = OrCompositionAST

type AST = FragmentNode | CompositionAST

export type { FragmentNode, CompositionAST, AST }
export { walkAST }

