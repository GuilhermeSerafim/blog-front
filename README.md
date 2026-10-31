# Blog

## Contexto do projeto

Desafio de desenvolvimento web do Centro Universitário Senac. A página principal carrega postagens e usa diálogos para incluir e alterar textos, além de solicitar exclusão. O serviço HTTP implementa GET, POST, PUT e DELETE.

## Dependência da API e execução

`src/app/services/post.service.ts` aponta para `http://localhost:8080/api/postagens`. A API complementar está em [blog-back](https://github.com/GuilhermeSerafim/blog-back). O frontend precisa de uma API compatível disponível nesse endereço; iniciar apenas o Angular não fornece os dados.

Com Node.js e npm compatíveis com Angular 20, `npm install` instala as dependências e `npm start` usa o script `ng serve` do manifesto. `npm run build` e `npm test` também estão declarados.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.2.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
