# ACM Display

Digital signage for the ACM Office television.

## Setup

```bash
npm install
cd src
cp secrets.js.sample secrets.js
```

Populate `secrets.js` with your API keys.

## How to run

Download a prebuilt binary of [Electron](https://github.com/atom/electron/releases). Then run:

`npm start`

If you need to use a custom version of electron: 
```bash
npm run build
/path/to/electron . # Replace with actual path to Electron binary
```

## Adding a new Panel

A panel is just a React component that can be fit flexibly inside a `div` (to conform with the dashboard layout).
To add a new type of panel:

1. Create a new panel component in `src/panels/`.
2. Import your panel component in `src/panels.js` and give it a representative name.
3. Add an entry in `src/layout.json` to render your panel on the dashboard.
4. Follow the instructions for 'Changing the layout' to graphically resize and position your panel.

## Changing the layout

You can manually edit `src/layout.json` to change the layout of the Dashboard.
However, you can also run dashboard in layout mode with `--layout`, which allows you to drag and resize panels.

1. Run `npm run start:layout` or `/path/to/electron . --layout`
2. Drag and resize panels on the dashboard.
3. Copy the newly created `current_layout.json` from the project root directory to `src/layout.json`.
    
    ```mv curent_layout.json src/layout.json```


## Raspberry Pi setup guide

See the [wiki](https://github.com/acm-uiuc/display/wiki/Raspberry-Pi-2-3-Setup-Guide) for instructions for setting up a production display on a Raspberry Pi.
