const mongoose = require('mongoose')
const RideRequests = mongoose.model('RideRequests')
const Matches = mongoose.model('Matches')
const GreatCircle = require('great-circle')
const limit = 2000

const findMatches = async () => {
  const driverRequests = await RideRequests.find({ driver: true })
  const riderRequests = await RideRequests.find({ driver: false })
  driverRequests.forEach((driverRequest) => {
    riderRequests.forEach(async (riderRequest) => {
      const fromDistance = GreatCircle.distance(driverRequest.fromCoordinates.lat, driverRequest.fromCoordinates.lon, riderRequest.fromCoordinates.lat, riderRequest.fromCoordinates.lon, 'M')
      const toDistance = GreatCircle.distance(driverRequest.toCoordinates.lat, driverRequest.toCoordinates.lon, riderRequest.toCoordinates.lat, riderRequest.toCoordinates.lon, 'M')
      if (!driverRequest.user.equals(riderRequest.user) && (fromDistance + toDistance) < limit) {
        const exists = await Matches.find({ driver: driverRequest.user, rider: riderRequest.user })
        if (!exists.length) {
          const finalMatch = new Matches({ driver: driverRequest.user, rider: riderRequest.user })
          finalMatch.save().then((res) => res.json({ finalMatch }))
        }
      }
    })
  })
}

const scheduleJob = (job, interval) => {
  if (!job || !interval) return
  return setInterval(job, interval)
}

scheduleJob(findMatches, 1000)

module.exports = scheduleJob
