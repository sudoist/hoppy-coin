// Shared ranked qualification rules and feedback; stages retain their own gameplay.
const RankedResults = {
    qualification(scores, score) {
        if (!scores || scores.unavailable || !Array.isArray(scores.data)) {
            return {qualified: false, message: 'Git gud...', unavailable: true}
        }
        const topTen = scores.data.slice(0, 10)
        const cutoff = topTen.length === 0 ? 0 : Number(topTen[topTen.length - 1].score)
        // Strictly beat the existing score, including when fewer than 10 entries exist.
        const qualified = score > 0 && Number.isFinite(cutoff) && score > cutoff
        if (qualified) return {qualified: true, message: 'Congratulations!', unavailable: false}
        if (score > 0 && cutoff - score <= 20) {
            return {qualified: false, message: 'Almost there!', unavailable: false}
        }
        return {qualified: false, message: 'Git gud...', unavailable: false}
    },

    showFeedback(scene, message) {
        return scene.add.text(400, 570, message, {fontSize: '24px', fill: '#FFF'})
            .setOrigin(0.5)
    }
}
