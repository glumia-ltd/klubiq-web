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
	apiUrl: process.env['KLB_API_URL'],
};
