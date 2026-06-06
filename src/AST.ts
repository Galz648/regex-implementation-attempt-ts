
// write a few examples of an AST, with fragments and compositions

import type { Automaton } from "./state";

type FragmentNode = {
    type: "SingleCharacterFragment"
    symbol: string
}

function walkAST(ast: AST): Automaton {

}

type OrCompositionAST = {
    type: 'OrComposition',
    fragments: AST[]
}

type CompositionAST = OrCompositionAST

type AST = FragmentNode | CompositionAST

export type { FragmentNode, CompositionAST, AST }
