var mccs = [];
var regions = {
	// United States
	310: 'us',
	// United Kingdom
	235: 'uk',
	// Brazil
	724: 'br',
	// Spain
	214: 'es',
	// Colombia
	732: 'co',
	// Venezuela
	734: 've',
	// Poland
	260: 'pl',
	// Mexico
	334: 'mx',
	// Hungary
	216: 'hu',
	// Germany
	262: 'de',
	// Australia
	505: 'au'
};

// get the right URL by country code in the table above
var urls = {
	'mx': 'http://m.website.com.mx/',
	'de': 'http://m.website.de/',
	'es': 'http://m.website.es/',
	'au': 'http://m.website.com.au/',
	'default': 'http://m.website.com/'
};

try {
	var conn;
	if ((conn = navigator.mozMobileConnection)) {
		console.log('navigator.mozMobileConnection available');

		var network = (conn.lastKnownHomeNetwork || conn.lastKnownNetwork || '-').split('-');
		var mcc = network[0];
		var mnc = network[1];
		console.log('MCC = ' + mcc + ', MNC = ' + mnc);
		mccs.push({mcc: mcc, mnc: mnc});

	} else if ((conn = navigator.mozMobileConnections)) {
		console.log('navigator.mozMobileConnections available', conn.length, conn);

		for (var i = 0; i < conn.length; i++) {
			var c = conn[i];

			var network = (c.lastKnownHomeNetwork || c.lastKnownNetwork || '-').split('-');
			var mcc = network[0];
			var mnc = network[1];
			console.log('MCC = ' + mcc + ', MNC = ' + mnc);
			mccs.push({mcc: mcc, mnc: mnc});
		}
	}
} catch (e) {
	// Fail gracefully if `navigator.mozMobileConnection` gives us problems.
	console.warn('Error accessing navigator.mozMobileConnection:', e);
}

(function app() {
	'use strict';

	function ready() {
		// Are we there yet?
		if (!navigator.onLine) {
			return;
		}

		var url = urls['default'];

		// found an mcc
		var mcc = mccs[0];
		if (mcc) {
			var country = regions[mcc.mcc];
			url = urls[country];
		}

		console.log("URL =", url);
		location.replace(url);
	}

	// Called on start and on every offline/online event
	function onlineCheck() {
		if (navigator.onLine) {
			document.documentElement.classList.remove('is-offline');
			ready();
		} else {
			document.documentElement.classList.add('is-offline');
		}
	}

	// Called on load to ensure splashscreen shows up
	window.addEventListener('load', function() {
		window.addEventListener('online', onlineCheck);
		window.addEventListener('offline', onlineCheck);
		onlineCheck();
	});

})();