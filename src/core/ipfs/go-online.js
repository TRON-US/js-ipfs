'use strict'

const series = require('run-series')
const Bitswap = require('ipfs-bitswap')

module.exports = function goOnline (self) {
  return (cb) => {
    series([
      self.load,
      self.libp2p.start
    ], (err) => {
      if (err) {
        return cb(err)
      }

      self._bitswap = new Bitswap(
        self._peerInfo,
        self._libp2pNode,
        self._repo.datastore,
        self._peerInfoBook
      )
      self._bitswap.start()
      self._blockS.goOnline(self._bitswap)
      cb()
    })
  }
}
