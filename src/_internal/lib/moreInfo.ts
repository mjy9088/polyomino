import { bitsToB64 } from "./bitsToB64";
import { Polyomino } from "./Polyomino";
import { polyominoToBits } from "./polyominoToBits";
import { rotate } from "./rotate";
import { SymmetryGroup } from "./SymmetryGroup";
import { transpose } from "./transpose";

export function moreInfo(
  s0: Polyomino
): [
  symmetryGroup: SymmetryGroup,
  s0: Polyomino,
  s1: Polyomino,
  s2: Polyomino,
  s3: Polyomino,
  t0: Polyomino,
  t1: Polyomino,
  t2: Polyomino,
  t3: Polyomino
] {
  const [s0p, s0n] = s0;
  const s1p = rotate(s0p);
  const s2p = rotate(s1p);
  const s3p = rotate(s2p);
  const t0p = transpose(s0p);
  const t1p = rotate(t0p);
  const t2p = rotate(t1p);
  const t3p = rotate(t2p);
  const s1n = bitsToB64(polyominoToBits(s1p));
  const s2n = bitsToB64(polyominoToBits(s2p));
  const s3n = bitsToB64(polyominoToBits(s3p));
  const t0n = bitsToB64(polyominoToBits(t0p));
  const t1n = bitsToB64(polyominoToBits(t1p));
  const t2n = bitsToB64(polyominoToBits(t2p));
  const t3n = bitsToB64(polyominoToBits(t3p));
  const part = [
    s0,
    [s1p, s1n],
    [s2p, s2n],
    [s3p, s3n],
    [t0p, t0n],
    [t1p, t1n],
    [t2p, t2n],
    [t3p, t3n],
  ] as const;

  if (s0n == s1n) {
    if (s0n == t0n) {
      return ["All", ...part];
    }
    return ["Rotation4Fold", ...part];
  } else if (s0n == t0n || s0n == t2n) {
    if (s0n == s2n) {
      return ["Rotation2FoldMirror45", ...part];
    }
    return ["Mirror45", ...part];
  } else if (s0n == t1n || s0n == t3n) {
    if (s0n == s2n) {
      return ["Rotation2FoldMirror90", ...part];
    }
    return ["Mirror90", ...part];
  } else if (s0n == s2n) {
    return ["Rotation2Fold", ...part];
  }
  return ["None", ...part];
}
