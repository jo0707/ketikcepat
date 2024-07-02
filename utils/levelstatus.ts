// create a localstorage to store levels status as boolean[] sized 20

const LEVEL_STATUS = "levelStatus"

export function createLevelStatus() {
    const levelStatus = new Array(20).fill(false)

    if (!localStorage.getItem(LEVEL_STATUS)) {
        localStorage.setItem(LEVEL_STATUS, JSON.stringify(levelStatus))
    }
}

export function getLevelStatus() {
    const levelStatus = localStorage.getItem(LEVEL_STATUS)
    if (!levelStatus) {
        createLevelStatus()
    }
    return JSON.parse(levelStatus!)
}

export function setLevelStatus(level: number, status: boolean) {
    const levelStatus = getLevelStatus()
    levelStatus[level] = true
    localStorage.setItem(LEVEL_STATUS, JSON.stringify(levelStatus))
}
