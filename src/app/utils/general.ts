export const isTruthy = <T>(value: T | null | undefined): value is T => !!value;

export const isElement = (node: Node): node is Element =>
  node.nodeType === Node.ELEMENT_NODE;
