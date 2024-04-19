const data = isMobile()

function isMobile() {
    const isMobile = /Android|Tablet|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        // User is accessing the page on a mobile device
        // console.log("Mobile device detected");

        return "mobile"
    } else {
        // User is accessing the page on a desktop device
        // console.log("Desktop device detected");

        return "desktop"
    }
}

export function devicesModule() {
    return data
}
