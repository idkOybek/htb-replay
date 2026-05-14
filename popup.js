document.addEventListener('DOMContentLoaded', () => {
    // Применяем переводы (i18n)
    document.getElementById('i18n-popupTitle').textContent = chrome.i18n.getMessage("popupTitle");
    document.getElementById('i18n-htbLabs').textContent = chrome.i18n.getMessage("htbLabs");
    document.getElementById('i18n-htbAcademy').textContent = chrome.i18n.getMessage("htbAcademy");
    document.getElementById('i18n-reloadInfo').textContent = chrome.i18n.getMessage("reloadInfo");

    const toggleApp = document.getElementById('toggleApp');
    const toggleAcademy = document.getElementById('toggleAcademy');

    chrome.storage.local.get(['replayEnabledApp', 'replayEnabledAcademy'], (result) => {
        toggleApp.checked = result.replayEnabledApp !== false; // По умолчанию включено
        toggleAcademy.checked = result.replayEnabledAcademy !== false;
    });

    function saveAndReload(key, value) {
        chrome.storage.local.set({ [key]: value }, () => {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                if (tabs[0] && tabs[0].url.includes("hackthebox")) {
                    chrome.tabs.reload(tabs[0].id);
                }
            });
        });
    }

    toggleApp.addEventListener('change', () => {
        saveAndReload('replayEnabledApp', toggleApp.checked);
    });

    toggleAcademy.addEventListener('change', () => {
        saveAndReload('replayEnabledAcademy', toggleAcademy.checked);
    });
});
