import { useState, useCallback, useEffect } from 'react';

// ============================================================
//  LANGUAGE DEFINITIONS
// ============================================================

export const LANGUAGES = [
  {
    id: 'anbn',
    label: 'L = { aⁿbⁿ | n ≥ 1 }',
    description: 'Equal number of a\'s followed by b\'s',
    generateExample: (p) => 'a'.repeat(p) + 'b'.repeat(p),
    validate: (str) => {
      if (!str || str.length === 0) return false;
      const match = str.match(/^(a*)(b*)$/);
      if (!match) return false;
      const [, as, bs] = match;
      return as.length === bs.length && as.length > 0;
    },
    defaultP: 3,
  },
  {
    id: 'astar',
    label: 'L = { aⁿ | n ≥ 0 }',
    description: 'Any number of a\'s (this IS regular)',
    generateExample: (p) => 'a'.repeat(p),
    validate: (str) => /^a*$/.test(str),
    defaultP: 3,
  },
  {
    id: 'palindrome',
    label: 'L = { wwᴿ | w ∈ {a,b}* }',
    description: 'Even-length palindromes over {a, b}',
    generateExample: (p) => {
      const half = 'ab'.repeat(Math.ceil(p / 2)).slice(0, p);
      return half + half.split('').reverse().join('');
    },
    validate: (str) => {
      if (str.length % 2 !== 0) return false;
      const rev = str.split('').reverse().join('');
      return str === rev;
    },
    defaultP: 4,
  },
  {
    id: 'anbncn',
    label: 'L = { aⁿbⁿcⁿ | n ≥ 1 }',
    description: 'Equal a\'s, b\'s, c\'s in sequence',
    generateExample: (p) => 'a'.repeat(p) + 'b'.repeat(p) + 'c'.repeat(p),
    validate: (str) => {
      const match = str.match(/^(a*)(b*)(c*)$/);
      if (!match) return false;
      const [, as, bs, cs] = match;
      return as.length === bs.length && bs.length === cs.length && as.length > 0;
    },
    defaultP: 3,
  },
  {
    id: 'prime',
    label: 'L = { aᵖ | p is prime }',
    description: 'Strings of a\'s with prime length',
    generateExample: (p) => {
      const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23];
      const nextPrime = primes.find(pr => pr >= p) || 11;
      return 'a'.repeat(nextPrime);
    },
    validate: (str) => {
      if (!/^a+$/.test(str)) return false;
      const n = str.length;
      if (n < 2) return false;
      for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
      }
      return true;
    },
    defaultP: 5,
  },
  {
    id: 'custom',
    label: 'Custom Expression (JS)',
    description: 'Write custom JavaScript logic to evaluate if s belongs to L.',
    generateExample: (p) => 'ab'.repeat(p),
    validate: (str, customCode) => {
      try {
        const fn = new Function('s', customCode || 'return s.length > 0;');
        return Boolean(fn(str));
      } catch (e) {
        return false;
      }
    },
    defaultP: 4,
  },
];

// ============================================================
//  FORMAL LANGUAGE MATH PARSER ENGINE
// ============================================================

export function generateJSFromDescription(desc) {
  const cleanDesc = desc.replace(/\s+/g, '').replace(/[{}]/g, '').toLowerCase();

  // Palindrome
  if (cleanDesc.includes('ww^r')) {
    return "// Palindrome math detected\nif (s.length % 2 !== 0) return false;\nreturn s === s.split('').reverse().join('');";
  }

  // Prime length
  if (cleanDesc.includes('a^p') || cleanDesc.includes('a^prime')) {
    return "// Prime length math detected\nif (!/^a+$/.test(s)) return false;\nconst n = s.length;\nif (n < 2) return false;\nfor (let i = 2; i <= Math.sqrt(n); i++) { if (n % i === 0) return false; }\nreturn true;";
  }

  // Sequential powers: a^n b^n, a^n b^2n c^3n, a^n b^m ...
  const termRegex = /([a-z])\^([0-9]*[a-z])/g;
  let matches = [...cleanDesc.matchAll(termRegex)];
  
  if (matches.length > 0) {
    let bases = matches.map(m => m[1]);
    let exponents = matches.map(m => m[2]); 

    let baseReg = bases.map(b => `(${b}*)`).join('');
    let code = `// Auto-generated logic for: ${desc}\n`;
    code += `const match = s.match(/^${baseReg}$/);\n`;
    code += `if (!match) return false;\n\n`;
    
    bases.forEach((_, i) => {
      code += `const len${i} = match[${i+1}].length;\n`;
    });
    
    let vars = {}; 
    let conditions = [];
    
      exponents.forEach((exp, i) => {
      const m = exp.match(/^([0-9]*)([a-z])$/);
      if (m) {
        const mult = m[1] ? parseInt(m[1]) : 1;
        const v = m[2];
        
        if (!vars[v]) {
          vars[v] = { lenVar: `len${i}`, mult };
          conditions.push(`len${i} >= 0`); 
        } else {
          const prev = vars[v];
          const c1 = prev.mult === 1 ? `len${i}` : `(len${i} * ${prev.mult})`;
          const c2 = mult === 1 ? prev.lenVar : `(${prev.lenVar} * ${mult})`;
          conditions.push(`${c1} === ${c2}`);
        }
      }
    });

    if (conditions.length > 0) {
      code += `\nreturn ${conditions.join(' && ')};`;
    } else {
      code += `\nreturn true;`;
    }
    return code;
  }
  
  return `// Write formulation correctly, e.g. a^n b^n\nreturn false;`;
}

// ============================================================
//  CORE PUMPING LEMMA LOGIC
// ============================================================

/**
 * Decompose string s into x, y, z given yStart and yEnd (0-indexed, inclusive).
 * Constraints enforced: |xy| ≤ p, |y| ≥ 1
 */
export function decompose(s, yStart, yEnd) {
  const x = s.slice(0, yStart);
  const y = s.slice(yStart, yEnd + 1);
  const z = s.slice(yEnd + 1);
  return { x, y, z };
}

/**
 * Generate pumped string xy^i z
 */
export function pump(x, y, z, i) {
  return x + y.repeat(i) + z;
}

/**
 * Get valid decomposition options for a string given pumping length p
 * Returns all (yStart, yEnd) pairs satisfying |xy| ≤ p and |y| ≥ 1
 */
export function getValidDecompositions(s, p) {
  const results = [];
  const maxXYLen = Math.min(p, s.length);

  for (let yStart = 0; yStart < maxXYLen; yStart++) {
    for (let yEnd = yStart; yEnd < maxXYLen; yEnd++) {
      results.push({ yStart, yEnd });
    }
  }
  return results;
}

/**
 * Bulk evaluate all valid decompositions to find adversarial survival
 */
export function evaluateAllDecompositions(s, p, language, customCode) {
  const decompositions = getValidDecompositions(s, p);
  const report = decompositions.map(({ yStart, yEnd }) => {
    const { x, y, z } = decompose(s, yStart, yEnd);
    const tests = [0, 1, 2, 3, 4].map(i => {
      const pumped = pump(x, y, z, i);
      const valid = language.id === 'custom' 
        ? language.validate(pumped, customCode)
        : language.validate(pumped);
      return { i, pumped, valid };
    });

    const survived = tests.every(t => t.valid);
    const firstFailure = tests.find(t => !t.valid);

    return { 
      id: `${yStart}-${yEnd}`,
      x, y, z, 
      yStart, yEnd, 
      tests, 
      survived, 
      reason: survived ? "All i tested remained in L" : `Failed at i=${firstFailure.i} ("${firstFailure.pumped}")`
    };
  });

  const total = report.length;
  const successful = report.filter(d => d.survived).length;
  const failed = total - successful;

  return {
    total,
    successful,
    failed,
    report,
    isNonRegularEvidence: successful === 0 && total > 0
  };
}

// ============================================================
//  HOOK
// ============================================================

export function usePumpingLemma() {
  const [languageId, setLanguageId] = useState('anbn');
  const [inputString, setInputString] = useState('aaabbb');
  const [pumpingLength, setPumpingLength] = useState(3);
  const [yStart, setYStart] = useState(1);
  const [yEnd, setYEnd] = useState(1);
  const [iValue, setIValue] = useState(2);
  const [customDescription, setCustomDescription] = useState("a^n b^{2n}");
  const [customValidatorCode, setCustomValidatorCode] = useState("");

  useEffect(() => {
    if (languageId === 'custom') {
      const generatedCode = generateJSFromDescription(customDescription);
      setCustomValidatorCode(generatedCode);
    }
  }, [customDescription, languageId]);

  const language = LANGUAGES.find(l => l.id === languageId) || LANGUAGES[0];

  const { x, y, z } = decompose(inputString, yStart, yEnd);
  const pumped = pump(x, y, z, iValue);

  const isOriginalValid = language.id === 'custom'
    ? language.validate(inputString, customValidatorCode)
    : language.validate(inputString);
  const isPumpedValid = language.id === 'custom'
    ? language.validate(pumped, customValidatorCode)
    : language.validate(pumped);

  // Constraints
  const xyLen = yStart + (yEnd - yStart + 1);
  const yLen = yEnd - yStart + 1;
  const constraint1 = xyLen <= pumpingLength;  // |xy| ≤ p
  const constraint2 = yLen >= 1;               // |y| ≥ 1
  const hasMinimumLength = inputString.length >= pumpingLength; // Initial Condition: |s| >= p

  const loadExample = useCallback((langId) => {
    const lang = LANGUAGES.find(l => l.id === langId);
    if (!lang) return;
    const p = lang.defaultP;
    const example = lang.generateExample(p);
    setLanguageId(langId);
    setPumpingLength(p);
    setInputString(example);
    setCustomDescription("a^n b^{2n}"); // Reset to default custom rule
    
    // Default: start at earliest valid position
    const defaultYStart = Math.max(0, Math.min(1, example.length - 1));
    const defaultYEnd = Math.max(defaultYStart, Math.min(p - 1, example.length - 1));
    setYStart(defaultYStart);
    setYEnd(defaultYEnd);
    setIValue(2);
  }, []);

  return {
    languageId, setLanguageId,
    inputString, setInputString,
    pumpingLength, setPumpingLength,
    yStart, setYStart,
    yEnd, setYEnd,
    iValue, setIValue,
    customValidatorCode, setCustomValidatorCode,
    customDescription, setCustomDescription,
    language,
    x, y, z, pumped,
    isOriginalValid, isPumpedValid,
    constraint1, constraint2, hasMinimumLength, xyLen, yLen,
    loadExample,
    LANGUAGES,
  };
}
