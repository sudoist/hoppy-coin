// Local-only guest progress. This is not proof of a competitive score.
// Account progress will be loaded from Laravel separately in a later phase.
const GuestProgress = (() => {
    const KEY = 'hoppy-coin:guest-progress:v1'
    const fresh = () => ({version: 1, coins: 0, unlockedSkins: ['default'], selectedSkin: 'default', achievements: [], personalBests: {}})

    function load() {
        try {
            const raw = localStorage.getItem(KEY)
            if (!raw) return fresh()
            const value = JSON.parse(raw)
            if (!value || value.version !== 1 || !Array.isArray(value.unlockedSkins) || !value.personalBests || typeof value.personalBests !== 'object' || Array.isArray(value.personalBests)) return fresh()
            return {...fresh(), ...value}
        } catch (error) {
            console.warn('Guest progress unavailable:', error)
            return fresh()
        }
    }

    function save(progress) {
        try {
            localStorage.setItem(KEY, JSON.stringify({...progress, version: 1}))
            return true
        } catch (error) {
            console.warn('Could not save guest progress:', error)
            return false
        }
    }

    function recordRun(stage, score, coins = 0) {
        if (!/^[a-zA-Z][a-zA-Z0-9-]{0,39}$/.test(stage) || !Number.isSafeInteger(score) || score < 0 || !Number.isSafeInteger(coins) || coins < 0) return load()
        const progress = load()
        progress.coins = Math.max(0, (Number.isSafeInteger(progress.coins) ? progress.coins : 0) + coins)
        progress.personalBests[stage] = Math.max(Number(progress.personalBests[stage]) || 0, score)
        save(progress)
        return progress
    }

    return {load, save, recordRun}
})()
