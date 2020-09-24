const remote = require('electron').remote;
const shell = require('electron').shell;
const win = remote.getCurrentWindow(); /* Note this is different to the
html global `window` variable */

// When document has loaded, initialise
document.onreadystatechange = (event) => {
    if (document.readyState == "complete") {
        handleWindowControls();
        var links = document.querySelectorAll('a[href]');
        //repetition of code I pasted eariler:
        links.forEach((link) => {
            const url = link.getAttribute('href')
            if (url.indexOf('http') === 0) {
                link.addEventListener('click', function (e) {
                    e.preventDefault()
                    shell.openExternal(url)
                })
            }
        })
    }
};

window.onbeforeunload = (event) => {
    /* If window is reloaded, remove win event listeners
    (DOM element listeners get auto garbage collected but not
    Electron win listeners as the win is not dereferenced unless closed) */
    win.removeAllListeners();
}

function handleWindowControls() {
    // Make minimise/maximise/restore/close buttons work when they are clicked
    document.getElementById('stick-mode').addEventListener("change", event => {
        win.setAlwaysOnTop(event.target.value == 'lock' ? true : false);
    });

    document.getElementById('min-button').addEventListener("click", event => {
        win.minimize();
    });

    document.getElementById('max-button').addEventListener("click", event => {
        win.maximize();
    });

    document.getElementById('restore-button').addEventListener("click", event => {
        win.unmaximize();
    });

    document.getElementById('close-button').addEventListener("click", event => {
        win.close();
    });

    // Toggle maximise/restore buttons when maximisation/unmaximisation occurs
    toggleMaxRestoreButtons();
    win.on('maximize', toggleMaxRestoreButtons);
    win.on('unmaximize', toggleMaxRestoreButtons);

    function toggleMaxRestoreButtons() {
        if (win.isMaximized()) {
            document.body.classList.add('maximized');
        } else {
            document.body.classList.remove('maximized');
        }
    }
}

aTags = document.getElementsByTagName("a");
for (var i = 0; i < aTags.length; i++) {
  aTags[i].setAttribute("onclick","require('shell').openExternal('" + aTags[i].href + "')");
  aTags[i].href = "#";
}