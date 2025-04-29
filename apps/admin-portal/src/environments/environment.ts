export const environment = {
	production: true,
	firebase: {
		apiKey: process.env['KLB_FIREBASE_APIKEY'],
		authDomain: process.env['KLB_FIREBASE_AUTHDOMAIN'],
		projectId: process.env['KLB_FIREBASE_PROJECTID'],
		storageBucket: process.env['KLB_FIREBASE_STORAGEBUCKET'],
		messagingSenderId: process.env['KLB_FIREBASE_MESSAGINGSENDERID'],
		appId: process.env['KLB_FIREBASE_APPID'],
		measurementId: process.env['KLB_FIREBASE_MEASUREMENTID'],
	},
	apiUrl: 'https://devapi.klubiq.com/',
	appName: 'Klubiq Admin Portal',
	recaptchaSiteKey: process.env['KLB_RECAPTCHA_SITE_KEY'],
	recaptchaValidationUrl: process.env['KLB_RECAPTCHA_VALIDATION_URL'],
	recaptchaDebugToken: process.env['KLB_RECAPTCHA_DEBUG_TOKEN'],
};
