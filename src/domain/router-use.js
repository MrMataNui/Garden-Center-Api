module.exports = (router, DEBUG, req, res, next) => {
	/**
	 * This middleware function logs all requests before
	 * passing the request to the appropriate handler
	 */
	router.use((req, res, next) => {
		let ip = req.headers["x-forward-for"] || req.connection.remoteAddress;
		DEBUG(`\nRequest from ip: ${ip}`);
		// service.checkConnection();
		next();
	});
};