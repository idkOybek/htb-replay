# HTB Lab Replay

A browser extension that allows users to locally replay completed tasks on HackTheBox and HTB Academy.

## Features

- Hides previously submitted answers and unlocks input fields for completed tasks.
- Performs local validation of entered flags without sending requests to HTB servers.
- Recalculates local progress visually within the HTB Academy interface.
- Provides support for both `app.hackthebox.com` and `academy.hackthebox.com`.
- Allows independent toggling of the extension for Labs and Academy via the popup interface.
- Supports English and Russian localizations.

## Installation

1. Clone or download the repository.
2. Open your browser's extensions page (`chrome://extensions/` or `brave://extensions/`).
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the directory containing the extension files.

## Usage

Navigate to any completed HackTheBox Lab or Academy page. The extension will automatically intercept solved forms, allowing you to re-enter and validate answers locally. You can enable or disable the extension for specific platforms using the extension's popup menu.
