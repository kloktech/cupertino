# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Emulate Production
In one terminal, run continuous build for production
`ng build --prod --watch`

In another terminal, run the web server to serve production build
`npx lite-server --baseDir="dist/frontend"`

It will utilize production environment variables for mongo, cors, etc... Make sure local instance can access api via CORS.

## Deployment
### Staging
`ng deploy --repo=git@github.com:kloktech-mark/cupertino.git --base-href=/cupertino/`

### Production
Used `ng add angular-cli-ghpages` to add function to publish to github pages, branch ghpages
`ng deploy --cname merits.bwnc.org`

This pushes to github ghpage branch which the repo should have enabled github page.

This works because angular is for frontend only, everything can be loaded off github.  Just need to ensure any service call can be done by the client.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
