let videoEl =  document.getElementById("video-el")
let streakEl = document.getElementById("streaks-str")
let totalEl = document.getElementById("total-nmbr")
let signEl = document.getElementById("sign-nmbr")
let signCount = 0
let streakCount = 0
let total = 0
let accCount = 0
let safeOrAcc = "safe"

function showSignNmbr() {
    signEl.style.visibility = "visible";
}
function hideSignNmbr() {
    signEl.style.visibility = "hidden";
}

function add() {
    streakCount += 1;
    total += 1;
    totalEl.textContent = total;
    console.log("streakCount: " + streakCount);
    console.log("total: " + total);
}

function resetCounters () {
    streakCount = 0;
    signCount = 0;
    console.log("streakCount: " + streakCount);
    console.log("signCount: " + signCount);
    console.log("total: " + total);
}

function btnDisable() {
    document.getElementById("safe-btn").disabled = true;
    document.getElementById("accident-btn").disabled = true;
}

function btnEnable() {
    document.getElementById("safe-btn").disabled = false;
    document.getElementById("accident-btn").disabled = false;
}

function days() {
    btnDisable();
    videoEl.play();
    if (streakCount === 0) {
        hideSignNmbr();
        videoEl.addEventListener("timeupdate", function firstDay() {
            if (videoEl.currentTime >= 5.8) {
                videoEl.currentTime = 2.5;
                add();
                signCount = 1;
                signEl.textContent = signCount;
                signEl.style.transform = "matrix(1, 0.125, 0, 1, 0, 0)";
                showSignNmbr();
                videoEl.pause();
                safeOrAcc = "safe";
                btnEnable();
                videoEl.removeEventListener("timeupdate", firstDay);
                }
        })

    } else {
        videoEl.addEventListener("timeupdate", function addSign() {
            if (videoEl.currentTime >= 2.8) {
                signCount += 1;
                signEl.textContent = signCount;
                videoEl.removeEventListener("timeupdate", addSign);
                }
            })
        videoEl.addEventListener("timeupdate", function hideSign() {
            if (videoEl.currentTime >= 3.5) {
                hideSignNmbr();
                videoEl.removeEventListener("timeupdate", hideSign);
                }
            })
        videoEl.addEventListener("timeupdate", function otherDays() {
            if (videoEl.currentTime >= 5.8) {
                videoEl.currentTime = 2.5;
                add();
                showSignNmbr();
                videoEl.pause();
                safeOrAcc = "safe";
                btnEnable();
                videoEl.removeEventListener("timeupdate", otherDays);
                }
            })
    }
}

function accident() {
    btnDisable();
    if (safeOrAcc == "acc") {
        hideSignNmbr();
    }
    accCount += 1;
    console.log("accCount: "+ accCount);
    videoEl.play();
    videoEl.addEventListener("timeupdate", function addSign() {
        if (videoEl.currentTime >= 2.8) {
            signCount += 1;
            console.log("signCount: " + signCount);
            signEl.textContent = signCount;
            videoEl.removeEventListener("timeupdate", addSign);
            }
        })
    videoEl.addEventListener("timeupdate", function hideSign() {
        if (videoEl.currentTime >= 3.5) {
            hideSignNmbr();
            videoEl.removeEventListener("timeupdate", hideSign);
            }
        })
    videoEl.addEventListener("timeupdate", function showSign() {
        if (videoEl.currentTime >= 6) {
            signEl.style.transform = "matrix(1, 0.125, 0, 1, 0, 0)";
            showSignNmbr();
            videoEl.removeEventListener("timeupdate", showSign);
            }
        })
    videoEl.addEventListener("timeupdate", function hideAgain() {
        if (videoEl.currentTime >= 7.3) {
            hideSignNmbr();
            if (accCount === 1) {
                streakEl.textContent += streakCount;
            } else {
                streakEl.textContent += " - " + streakCount;
            }
            videoEl.removeEventListener("timeupdate", hideAgain);
            }
        })
    videoEl.addEventListener("timeupdate", function signFalls() {
        if (videoEl.currentTime >= 7.8) {
            console.log("signFalls");
            signEl.style.transform = "matrix(0.8, 0, 0.3, 0.4, -15, 296) rotate(180deg)";
            showSignNmbr();
            videoEl.removeEventListener("timeupdate", signFalls);
            }
        })
    videoEl.addEventListener("timeupdate", function endAcc() {
        if (videoEl.currentTime >= 10.5) {
            resetCounters();
            safeOrAcc = "acc";
            btnEnable();
            videoEl.removeEventListener("timeupdate", endAcc);
            }
        })
}