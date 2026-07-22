// src/csl/CognitiveStateLedger.js

import { wadMul, wadDiv } from "../math-wad/wad.js";

export function computeElements(state) {
  return {
    e1: state.e1 ?? 0,
    e2: state.e2 ?? 0,
    e3: state.e3 ?? 0,
    e4: state.e4 ?? 0,
    e5: state.e5 ?? 0,
    e6: state.e6 ?? 0,
  };
}

export function computeLambdaComponents(elements) {
  const usub = wadMul(elements.e1, 0.95);
  const aiv = wadMul(elements.e2, 10.0);
  const alphadec = wadMul(elements.e4, 0.95);
  const ec = wadMul(elements.e5, 0.98);
  const rc = 0.25;

  return { usub, aiv, alphadec, ec, rc };
}

export function computeLambdaTotal(components) {
  const ratio = wadDiv(components.ec, components.rc);
  return wadMul(
    wadMul(wadMul(components.usub, components.aiv), components.alphadec),
    ratio
  );
}

export function countElementsMet(elements) {
  let met = 0;
  if (elements.e1 >= 0.85) met++;
  if (elements.e2 >= 0.80) met++;
  if (elements.e3 >= 0.80) met++;
  if (elements.e4 >= 0.85) met++;
  if (elements.e5 >= 0.85) met++;
  if (elements.e6 >= 0.80) met++;
  return met;
}

export function generateLedger(systemId, state) {
  const elements = computeElements(state);
  const lambdaComponents = computeLambdaComponents(elements);
  const lambdaTotal = computeLambdaTotal(lambdaComponents);
  const elementsMet = countElementsMet(elements);

  return {
    systemId,
    timestamp: new Date().toISOString(),
    elements,
    lambdaComponents,
    lambdaTotal,
    elementsMet,
  };
}
