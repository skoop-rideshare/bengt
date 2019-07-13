const mongoose = require('mongoose')
const RideRequests = mongoose.model('RideRequests')

const findMatches = async () => {
	const driverRequests = await RideRequests.find({ driver: true})
	console.log('driverRequests: ', driverRequests)
}

const scheduleJob = (job, interval) => {
	if (!job || !interval) return
	return setInterval(job, interval)
}

scheduleJob(findMatches, 10000)

module.exports = scheduleJob