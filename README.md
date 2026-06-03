# regex-implementation-attempt-ts

A simple implementation of a regex engine in TypeScript.

### Fragments: Concepts

Fragments are the fundamental building blocks of a regex pattern. Each fragment represents one of the following:

- A single character
- A range of characters
- A repetition of a fragment
- A group of fragments

### Example: Single Character Fragment

For example, the fragment `^a$` represents the single character `a`. Here, `^` indicates that the match must start at the beginning of the string, and `$` means the match must end at the end of the string.

### Automata Representation

A single character fragment (like `^a$`) can be represented by a simple automaton:

- **States:**  
  - `q0` (start state)  
  - `q1` (accepting state)

- **Transitions:**  
  - From `q0`, on input `a`, go to `q1`

- **Accepting State:**  
  - `q1`

**Diagram:**

```
(q0) --a--> ((q1))
```

**Table Representation:**

| From | Input | To  |
|------|-------|-----|
| q0   | a     | q1  |

- Start state: `q0`
- Accepting state: `q1`

Any input string consisting of exactly the character `a` will be accepted by this automaton.


### Composition

Fragments can be composed into larger patterns using the following operators:

- Concatenation
- Alternation
- Repetition
- Grouping



### AST node representation for fragments

- `SingleCharacterFragment`: Represents a single character fragment.
- `RangeFragment`: Represents a range of characters.
- `RepetitionFragment`: Represents a repetition of a fragment.
- `GroupFragment`: Represents a group of fragments.

#### Example: AST node representation for the fragment `^a$`

```
{
  type: 'LiteralFragment',
  character: 'a'
}
```

<!-- #### Example: AST node representation for the fragment `[a-z]`

```
{
  type: 'RangeFragment',
  start: 'a',
  end: 'z'
}
``` -->

#### Example: AST node representation for a composition `(a|b)`

```
{
  type: 'Or',
  fragments: [
    { type: 'SingleCharacterFragment', character: 'a' },
    { type: 'SingleCharacterFragment', character: 'b' }
  ]
}
```

### Execution
1. AST -> Automata
2. Automata -> Execution
3. Execution -> Result

### Implementation Steps

1. [ ] Parse the regex pattern and build a tree of fragments
2. [ ] Implement the tree of fragments to determine if the pattern matches the input string.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.3.11. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
