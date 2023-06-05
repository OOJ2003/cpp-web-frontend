import { invoke } from "@tauri-apps/api"
import { Chess } from "./Types"

type FromTauri = {
  data: Array<Chess>
}

async function Socket(aiWin: boolean, data: Array<Chess>) {
  let result: Array<Chess> = []
  try {
    const res = await invoke("socket", { aiWin: aiWin, data: data })
    result = (res as FromTauri).data
    console.log(result)
    console.log(`result: ${result}`)
  } catch (error) {
    console.error(error)
  }

  return result
}

export default Socket
