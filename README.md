# 🎮 HTB Lab Replay

Ever wanted to replay a HackTheBox lab or Academy module you've already completed, just to practice or show a friend? Annoyed that all the flags and answers are already filled in and locked? 

**HTB Lab Replay** is a lightweight browser extension that fixes exactly this. It intercepts already-solved questions, wipes the answers from your screen, unlocks the input fields, and lets you solve them all over again. The best part? It checks your new answers entirely *locally* so it doesn't mess with your actual HTB profile or send duplicate requests to the server.

### ✨ What it does
- **Cleans the Slate:** Hides the correct answers you've already submitted and unlocks the text fields so you can type again.
- **Local Checking:** Validates your flags right in the browser. You get that satisfying "Correct! 🎉" notification without hitting the HTB servers.
- **Smart Academy Support:** Fully supports HTB Academy. It automatically expands those annoying closed accordions for solved questions and dynamically tracks your *local* replay progress on the module progress bar!
- **Dual-Platform:** Works on both the main HTB Labs (`app.hackthebox.com`) and Academy (`academy.hackthebox.com`). You can toggle them independently via the extension popup.
- **Bilingual:** Speaks English and Russian right out of the box based on your browser settings.

### 🚀 How to install (Developer Mode)
Since this extension isn't in the Chrome Web Store (yet!), you can install it manually in a few seconds:
1. Clone or download this repository to your computer.
2. Open your browser (Chrome, Brave, Edge, etc.) and go to the extensions page (`chrome://extensions/` or `brave://extensions/`).
3. Toggle on **Developer mode** in the top right corner.
4. Click **Load unpacked** and select the folder containing this extension.
5. Pin the extension to your toolbar, open an already-solved HTB page, and start hacking again!

---
*Built to help the cybersecurity community train better and retain knowledge.* Happy hacking! 👾
