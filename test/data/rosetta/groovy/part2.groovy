#!/usr/bin/env groovy


def input = new File('input.txt') as String []

// Load rules
def rRules = /(.*) => (.*)/
rules = input.findAll({ it.contains('=>') }).collectEntries({ s ->
    def (_, v, k) = (s =~ rRules)[0]    // k and v inverted
    [(k): v]
})

// Target molecule
def molecule = input[-1]

// Build a list of atoms, ordered by length desc
def rAtoms = /[A-Z][a-z]*/
sortedRules = rules.keySet().sort({ (it =~ rAtoms).size() }).reverse() as List<String>

// Recursively undo molecule down to electron
def search(String s, int count) {
    if (s == 'e') return count
    // Longest sequence found in current molecule wins
    def rule = sortedRules.find({ s.contains(it) })
    // Replace by precursor
    s = s.replaceFirst(rule, rules[rule])
    // Recurse
    search(s, count + 1)
}

// Reverse engineer
println search(molecule, 0)
