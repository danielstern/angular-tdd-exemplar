// An example configuration file
exports.config = {
  /* The address of a running selenium server.
		easy access but you have to have selenium running in another terminal with webdriver-manager start
	*/
	//  seleniumAddress: 'http://localhost:4444/wd/hub'
	
	/* need to install this manually on windows with 
		webdriver-manager update  --out_dir=node_modules/protractor/selenium/ 
	*/
	seleniumServerJar: '.././node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar', // 

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  specs: ['e2e/**/*.js'],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true, // Use colors in the command line report.
  }
};