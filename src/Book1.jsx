import React, { useState } from 'react';

function Book1() {
  const [seats, setSeats] = useState({
    standard: Array(100).fill('available'), // Initialize all standard seats as available
    premium: Array(50).fill('available'), // Initialize all premium seats as available
  });
  const [selectedSeats, setSelectedSeats] = useState({ standard: [], premium: [] });
  const [selectedSeatType, setSelectedSeatType] = useState('standard');
  const [numSeats, setNumSeats] = useState(0);

  const selectSeatType = (event) => {
    setSelectedSeatType(event.target.value);
  };

  const handleNumSeatsChange = (event) => {
    setNumSeats(parseInt(event.target.value));
  };

  const isSeatAvailable = (seatLabel, seatRow) => {
    const seatStatus = seats[selectedSeatType][(seatRow - 1) * 10 + seatLabel.charCodeAt(0) - 65];
    return seatStatus === 'available';
  };

  const handleSeatSelection = (seatLabel, seatRow) => {
    const seatIndex = (seatRow - 1) * 10 + seatLabel.charCodeAt(0) - 65;
    const seatStatus = seats[selectedSeatType][seatIndex];

    if (selectedSeats[selectedSeatType].length < numSeats && seatStatus === 'available') {
      const updatedSeats = [...seats[selectedSeatType]];
      updatedSeats[seatIndex] = 'booked';

      setSelectedSeats((prevSelectedSeats) => ({
        ...prevSelectedSeats,
        [selectedSeatType]: [...prevSelectedSeats[selectedSeatType], `${seatLabel}${seatRow}`],
      }));

      setSeats((prevSeats) => ({
        ...prevSeats,
        [selectedSeatType]: updatedSeats,
      }));
    }
  };

  const handleBookSeats = () => {
    if (selectedSeats[selectedSeatType].length === numSeats) {
      // Handle the booking logic here (e.g., sending data to a backend or storing locally)
      setSelectedSeats((prevSelectedSeats) => ({
        ...prevSelectedSeats,
        [selectedSeatType]: [],
      }));
      alert(`Booked ${numSeats} ${selectedSeatType} seats.`);
    } else {
      alert('Invalid selection. Please select the correct number of seats.');
    }
  };

  const resetUI = () => {
    setNumSeats(0);
    setSelectedSeats({ standard: [], premium: [] });
  };

  const seatRows = 10;
  const seatLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  const totalAvailableSeats = seats[selectedSeatType].filter((seat) => seat === 'available').length;
  const totalBookedSeats = seats[selectedSeatType].filter((seat) => seat === 'booked').length;

  return (
    <div className="App">
      <h1>Book My Seat</h1>
      <div>
        <label>Select Seat Type:</label>
        <select value={selectedSeatType} onChange={selectSeatType}>
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
        </select>
      </div>
      <div>
        <label>Number of Seats:</label>
        <input type="number" value={numSeats} onChange={handleNumSeatsChange} />
      </div>
      <div className="seating-plan">
        <div className="seat-row">
          {seatLabels.map((seatLabel) => (
            Array.from({ length: seatRows }).map((_, row) => (
              <button
                key={`${seatLabel}-${row + 1}`}
                id={`${seatLabel}${row + 1}`}
                style={{
                  width: '50px',
                  height: '50px',
                  margin: '5px',
                  backgroundColor: isSeatAvailable(seatLabel, row + 1)
                    ? 'blue'
                    : 'red', // Show booked seats in red
                  border: '1px solid #ccc',
                }}
                onClick={() => handleSeatSelection(seatLabel, row + 1)}
                disabled={!isSeatAvailable(seatLabel, row + 1)}
              >
                {`${seatLabel}${row + 1}`}
              </button>
            ))
          ))}
        </div>
      </div>
      <p>Total Seats: {totalAvailableSeats + totalBookedSeats}</p>
      <p>Available Seats: {totalAvailableSeats}</p>
      <p>Booked Seats: {totalBookedSeats}</p>
      <button onClick={handleBookSeats}>Proceed</button>
    </div>
  );
}

export default Book1;
