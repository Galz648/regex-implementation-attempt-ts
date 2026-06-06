import { describe, it, expect } from 'bun:test';
import type { FragmentNode } from '../../src/AST';
import { convertFragmentToAutomaton, State } from '../../src/state';

describe('Fragments', () => {
    it('Should turn an AST fragment into an automaton', () => {
        const fragmentAST: FragmentNode = {
            type: 'SingleCharacterFragment',
            symbol: 'a'
        };
        const automaton = convertFragmentToAutomaton(fragmentAST);
        expect(automaton.states.length).toEqual(2);
        expect(automaton.transitions.length).toEqual(1);
        expect(automaton.transitions[0]?.symbol).toEqual('a');
    });
});
