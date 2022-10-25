export class Path {
  /**
   * Simply always prefer unix style paths
   */
  public static normalise(path: string) {
    return path.replace(/\\/g, '/')
  }
}
