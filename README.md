# petanque-map-client

Petanque terrains (playing areas) from OpenStreetMap on an interactive map.

Based on Angular 2+ and Bootstrap 4.

## Installation

Install dependencies,
```
npm install
```

## Development

Start a local Django development server for tha api, see [petanque-map-server](https://github.com/bartromgens/petanque-map-server)

Run a development Angular server that uses a local petanque-map-server api,
```
ng serve
```

The application is available on `http://localhost:4200/`.

## Build

Run `ng build --prod` to build the project.

The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
