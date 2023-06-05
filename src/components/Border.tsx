import { Chess } from "../utils/Types"
import { useEffect, useState } from "react"

import ChessCell from "./ChessCell"
import Socket from "../utils/Socket"

const chessIconSets = [
  {
    black: "X",
    white: "O",
  },
  {
    black: "🖤",
    white: "🤍",
  },
  {
    black: "🍕",
    white: "🍔",
  },
  {
    black: "😎",
    white: "😍",
  },
  {
    black: "👽",
    white: "👾",
  },
  {
    black: "🐱",
    white: "🐺",
  },
  {
    black: "⚫️",
    white: "⚪️",
  },
  {
    black: "🏴",
    white: "🏳️",
  },
  {
    black: "🍇",
    white: "🍉",
  },
  {
    black: "👻",
    white: "🎃",
  },
  {
    black: "🌚",
    white: "🌝",
  },
  {
    black: "🦊",
    white: "🦁",
  },
  {
    black: "⚔️",
    white: "🛡️",
  },
  {
    black: "🌑",
    white: "🌕",
  },
  {
    black: "🦄",
    white: "🐉",
  },
  {
    black: "🎸",
    white: "🎹",
  },
  {
    black: "🍫",
    white: "🍬",
  },
  {
    black: "🎱",
    white: "🏀",
  },
]

function Border() {
  const [board, setBoard] = useState<Array<Chess>>(Array(9).fill(Chess.none))
  const [aiWin, setAiWin] = useState(true)

  const [win, setWin] = useState<null | boolean>(null)

  const [chessIcon, setChessIcon] = useState({
    black: "X",
    white: "O",
  })

  const handleClick = (index: number) => {
    if (board[index] === Chess.none && !win) {
      const newBoard = [...board]
      newBoard[index] = Chess.black

      handleSocket(aiWin, newBoard)

      setBoard(newBoard)

      if (win === null) {
        handleSocket(aiWin, newBoard).then((data) => {
          console.log("here is socket")
          console.log(data)
          setBoard(data)
        })
      }
    }
  }

  const handleSocket = (ai: boolean, data: Array<Chess>) => {
    console.log(`from handleSocket: ${ai} ${data}`)
    console.log("here is socket function")
    return Socket(ai, data)
  }

  const checkWinner = () => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (const combo of winningCombos) {
      const [a, b, c] = combo
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        if (board[a] === Chess.black) {
          setWin(true)
        } else {
          setWin(false)
        }
        break
      }
    }
  }

  const handleChangeIcon = () => {
    function getRandomInt(max: number) {
      return Math.floor(Math.random() * max)
    }

    const i = getRandomInt(chessIconSets.length)

    setChessIcon(chessIconSets[i])
  }

  const resetGame = () => {
    setBoard(Array(9).fill(Chess.none))

    const num = Math.random()
    if (num > 0.25) {
      setAiWin(false)
    } else {
      setAiWin(true)
    }

    setWin(null)
  }

  useEffect(checkWinner, [board])

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl mb-5" onClick={handleChangeIcon}>
        {chessIcon.black} vs {chessIcon.white}
      </h1>
      {win !== null && (
        <div className="text-2xl mb-5">{win ? "You Win" : "You Lose"}</div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {board.map((chess, index) => (
          <div
            key={index}
            className="bg-gray-200 p-4 text-4xl font-bold flex items-center justify-center cursor-pointer w-16 h-16"
            onClick={() => handleClick(index)}
          >
            <ChessCell chess={chess} icon={chessIcon} />
          </div>
        ))}
      </div>

      <button
        className="mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  )
}

export default Border
