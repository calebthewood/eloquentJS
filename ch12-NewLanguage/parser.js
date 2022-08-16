"use strict";

/**
 * Uses regex to parse a program for Egg's 3 atomic elements:
 *  1) Strings
 *  2) Numbers
 *  3) Words
 *
 */
function parseExpression(program) {
  program = skipSpace(program);
  let match, expr;
  if (match = /^"([^"]*)"/.exec(program)) {
    expr = { type: "value", value: match[1] };
  } else if (match = /^\d+\b/.exec(program)) {
    expr = { type: "value", value: Number(match[0]) };
  } else if (match = /^[^\s(),#"]+/.exec(program)) {
    expr = { type: "word", name: match[0] };
  } else {
    throw new SyntaxError("Unexpected syntax: " + program);
  }
  return parseApply(expr, program.slice(match[0].length));
}

/** Skips leading white spaces */
function skipSpace(string) {
  let first = string.search(/\S/);
  if (first == -1) return "";
  return string.slice(first);
}

function parseApply(expr, program) {
  program = skipSpace(program);
}