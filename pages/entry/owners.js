import { useState } from 'react';

export default function OwnersEntry() {
  const [ownerName, setOwnerName] = useState('');
  const [contactDetails, setContactDetails] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/owners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: ownerName,
          ContactDetails: contactDetails,
          Address: address,
        }),
      });

      if (response.ok) {
        alert('Owner added successfully!');
        setOwnerName('');
        setContactDetails('');
        setAddress('');
      } else {
        alert('Error adding owner');
      }
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };

  return (
    <div>
      <h2>Add New Owner</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ownerName">Owner Name</label>
          <input
            id="ownerName"
            type="text"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="contactDetails">Contact Details</label>
          <input
            id="contactDetails"
            type="text"
            value={contactDetails}
            onChange={(e) => setContactDetails(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
