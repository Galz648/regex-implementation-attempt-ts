import { describe, it, expect } from 'bun:test';
import { walkAST, type FragmentNode, type CompositionAST, type AST } from '../../src/AST';
import { State, Transition, Automaton } from '../../src/state';

describe('Composition', () => {
    it('Should turn an OR composition AST into an automaton with correct structure', () => {
        const leftFragment: FragmentNode = {
            type: 'SingleCharacterFragment',
            symbol: 'a'
        };
        const rightFragment: FragmentNode = {
            type: 'SingleCharacterFragment',
            symbol: 'b'
        };
        const orCompositionAST: CompositionAST = {
            type: 'OrComposition',
            left: leftFragment,
            right: rightFragment
        };
        const automaton = walkAST(orCompositionAST);

        // The automaton for OR of two fragments should have:
        //  - a start and end state for 'OrComposition'
        //  - two inner automata for 'a' and 'b', each with start/end and a transition
        //  - initial state with EPSILON to each left/right's start
        // For now, test only high-level structure
        expect(automaton.states.length).toBeGreaterThanOrEqual(2); // At least 2 new states
        expect(
            automaton.transitions.filter(t => t.symbol === "EPSILON").length
        ).toBe(2);
        // Each fragment's symbol should still appear in transitions
        expect(
            automaton.transitions.some(t => t.symbol === "a")
        ).toBe(true);
        expect(
            automaton.transitions.some(t => t.symbol === "b")
        ).toBe(true);

        // // Check that the start and end states have meaningful names
        // expect(automaton.start.name).toMatch(/Start State/);
        // expect(automaton.end.name).toMatch(/End State/);
    });
});
