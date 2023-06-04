export enum Chess {
  none = 0,
  black = 1,
  white = 2
}



export type BorderProps = {
  black: string
  white: string
  state: Array<Chess>
}
