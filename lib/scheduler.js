const mongoose = require('mongoose')
const RideRequest = mongoose.model('RideRequest')
const RideMatch = mongoose.model('RideMatch')
const GreatCircle = require('great-circle')
const limit = 2000

// Shitty way to match rides
const findMatches = async () => {
  const driverRequests = await RideRequest.find({ driver: true })
  const riderRequests = await RideRequest.find({ driver: false })
  driverRequests.forEach((driverRequest) => {
    riderRequests.forEach(async (riderRequest) => {
      const driver = driverRequest.user
      const rider = riderRequest.user
      // Don't matches with yourself
      if (rider.equals(driver)) return

      const fromDistance = GreatCircle.distance(
        driverRequest.fromCoordinates.lat,
        driverRequest.fromCoordinates.lon,
        riderRequest.fromCoordinates.lat,
        riderRequest.fromCoordinates.lon,
        'M'
      )

      const toDistance = GreatCircle.distance(
        driverRequest.toCoordinates.lat,
        driverRequest.toCoordinates.lon,
        riderRequest.toCoordinates.lat,
        riderRequest.toCoordinates.lon,
        'M'
      )
      if (fromDistance + toDistance < limit) {
        const exists = await RideMatch.find({ users: { $all: [driver, rider] } })

        if (!exists.length) {
          const finalMatch = new RideMatch({ users: [driver, rider], requests: [riderRequest, driverRequest] })
          await finalMatch.save()
        }
      }
    })
  })
}

const scheduleJob = (job, interval) => {
  if (!job || !interval) return
  setInterval(job, interval)
}

scheduleJob(findMatches, 1000)

module.exports = scheduleJob
