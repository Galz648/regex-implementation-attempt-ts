
import { describe, it, expect } from 'bun:test';
import { char } from '../src/fragments';
import { concat, concatPair } from '../src/composition';
import { Automaton } from '../src/state';

describe('concat', () => {
  it('Should concat pair', () => { // TODO:: foo bar
    const former = char("a")
    const latter = char("b")

    expect(concatPair(former, latter)).toBeInstanceOf(Automaton)
  })
  it("Should conact a sequence of machines", () => {

    let re = concat(
      char("a"),
      char("b"),
      char("c")

    )

    expect(re.test("abc")).toBe(true)
  })
});

