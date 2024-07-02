// create utils function to play sound
import { Howl, Howler } from "howler"

let beep = new Howl({
    src: ["/sounds/beep.wav"],
})

let key = new Howl({
    src: ["/sounds/key.wav"],
})

let ding = new Howl({
    src: ["/sounds/ding.wav"],
})

export function playBeep() {
    beep.play()
}

export function playKey() {
    key.play()
}

export function playDing() {
    ding.play()
}
