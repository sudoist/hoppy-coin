// Shared ranked qualification rules and feedback; stages retain their own gameplay.
const RankedResults = {
    qualification(scores, score) {
        if (!scores || scores.unavailable || !Array.isArray(scores.data)) {
            return {qualified: false, message: 'Git gud...', unavailable: true}
        }
        // The results screen displays four rows, but the leaderboard holds ten.
        // Until all ten slots are filled, any positive score may enter.
        const topTen = scores.data.slice(0, 10)
        const cutoff = topTen.length === 10 ? Number(topTen[9].score) : 0
        const qualified = score > 0 && Number.isFinite(cutoff) &&
            (topTen.length < 10 || score > cutoff)
        if (qualified) return {qualified: true, message: 'Congratulations!', unavailable: false}
        if (score > 0 && cutoff - score <= 20) {
            return {qualified: false, message: 'Almost there!', unavailable: false}
        }
        return {qualified: false, message: 'Git gud...', unavailable: false}
    },

    showFeedback(scene, message) {
        return scene.add.text(400, 570, message, {fontSize: '24px', fill: '#FFF', stroke: '#152b3d', strokeThickness: 3})
            .setOrigin(0.5)
    }
}
