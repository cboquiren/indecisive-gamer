import { describe, expect, test } from "vitest";
import { Transform } from "../Assets/transformations";


describe('capitalize', () => {
  test('carl => Carl', () => {
    expect(Transform.capitalize('carl')).toBe('Carl');
  })
  
  test('kuya => Kuya', () => {
    expect(Transform.capitalize('kuya')).toBe('Kuya');
  })

  test('try this => Try this', () => {
    expect(Transform.capitalize('try this')).toBe('Try this');
  })
})

