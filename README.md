## Glossary

### Jasmine
> DOM-less simple JavaScript testing framework
A test runner/assertion/mocking utility combination.
Use: Run tests, write assertions and mock functionality.
Compare To: Mocha+Chai

### Mocha
Just a test runner. Often used in combination with an assertion library (see Assert, Chai)
Compare to: Jasmine

### Karma
> The main goal for Karma is to bring a productive testing environment to developers. The environment being one where they don't have to set up loads of configurations, but rather a place where developers can just write the code and get instant feedback from their tests.

Karma is a browser test runner.

The idea is that browsers do not have natively a concept of loading tests files, running them, and reporting results. What karma does is (roughly):

- Start a small web server to serve "client-side" javascript files to be tested (1)
- Also serve the "client-side" javascript files with the tests (or Specs, as they're often called) (2)
-serve a custom web page that will run javascript code for the tests (3)
- Start a browser to load this page (4)
- Report the results of the test to the server (5)
- Karma can then again report the results to text files, the console, anything your CI server likes, etc...

Use: Karma can be used to run your tests in browsers. If your tests are simple JavaScript that would run the same in Node as in Chrome, this is not necessary, but if you wish to support Firefox, Chrome, IE, et al, in your tests, Karma lets you do it, via a configuration file.
Compare To: N/A

### Gulp
> 
Use: Automate tasks.
Environment: Command Line / JavaScript
Compare to: Grunt, Broccoli

### gulp-karma
>
Use: Simplify automation of running Karma in Gulp

### angular
MVC Framework.
Use: Build single-page apps or augment static apps
Compare to: Ember, React 

### angular-mocks
A library necessary to run tests on your angular app
Use: Include the script on your page to gain access to `inject` and `module`
Compare to: N/A

### Chai
Assertion framework. Allows assertions to be written in `expect.to.be` form. Adds additional assertions to `assert` library.
Use: Write assertions in a descriptive way
Compare to: assert

### assert
A library built in to Node that can run certain assertions. 
Use: Use to write tests that can throw errors if code returns unexpected results.
Compare to: Chai