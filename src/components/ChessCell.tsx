import { Chess } from "../utils/Types"

type ChessCellProps = {
  chess: Chess
  icon: { black: string; white: string }
}

function ChessCell({ chess, icon }: ChessCellProps) {
  return (
    <>
      {chess === Chess.black
        ? icon.black
        : chess === Chess.white
        ? icon.white
        : null}
    </>
  )
}

export default ChessCell
