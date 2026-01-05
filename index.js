const bedrock = require('bedrock-protocol')
const http = require('http')

const client = bedrock.createClient({
  host: "Qpmz.aternos.me",
  port: 34263,
  username: "AFK_Bot",
  offline: true
})

let position = { x: 0, y: 0, z: 0 }
let step = 0
const DIST = 5

client.on('join', () => {
  console.log("✅ Бот зашёл на сервер")

  setInterval(moveSquare, 5 * 60 * 1000)
})

function moveSquare() {
  let dx = 0
  let dz = 0

  switch (step) {
    case 0:
      dz = DIST
      console.log("⬆️ Вперёд (приседая)")
      break
    case 1:
      dx = DIST
      console.log("⬅️ Влево (приседая)")
      break
    case 2:
      dz = -DIST
      console.log("⬇️ Назад (приседая)")
      break
    case 3:
      dx = -DIST
      console.log("➡️ Вправо (приседая)")
      break
  }

  step = (step + 1) % 4

  position.x += dx
  position.z += dz

  client.queue('player_auth_input', {
    pitch: 0,
    yaw: 0,
    position,
    moveVector: {
      x: dx !== 0 ? 0.3 : 0,
      z: dz !== 0 ? 0.3 : 0
    },
    headYaw: 0,
    inputData: ['sneaking'],
    inputMode: 0,
    playMode: 0,
    interactionModel: 0
  })
}

// анти-сон Replit
http.createServer((_, res) => {
  res.end("AFK bot alive")
}).listen(3000)

client.on('disconnect', reason => {
  console.log("❌ Бот кикнут:", reason)
})
