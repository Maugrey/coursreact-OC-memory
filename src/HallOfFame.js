import PropTypes from 'prop-types'
import React from 'react'

import './HallOfFame.css'

const HallOfFame = ({ entries }) => (
  <table className="hallOfFame">
    <tbody>
      {entries.map(({ date, guesses, id, player }) => (
        <tr key={id}>
          <td className="date">{date}</td>
          <td className="guesses">{guesses}</td>
          <td className="player">{player}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

HallOfFame.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      guesses: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      player: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default HallOfFame

// == Internal helpers ==============================================
const HOF_KEY = '::Memory::HallofFame'
const HOF_MAX_SIZE = 10

export function saveHOFEntry(entry, onStored) {
  entry.date = new Date().toLocaleDateString()
  entry.id = Date.now()

  const entries = JSON.parse(localStorage.getItem(HOF_KEY) || '[]')
  const insertionPoint = entries.findIndex(
    ({ guesses }) => guesses >= entry.guesses
  )

  if (insertionPoint === -1) {
    entries.push(entry)
  } else {
    entries.splice(insertionPoint, 0, entry)
  }
  if (entries.length > HOF_MAX_SIZE) {
    entries.splice(HOF_MAX_SIZE, entries.length)
  }

  localStorage.setItem(HOF_KEY, JSON.stringify(entries))
  onStored(entries)
}
