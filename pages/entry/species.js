import { useState } from 'react';

export default function SpeciesEntry() {
  const [speciesName, setSpeciesName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://your-server-address/api/species.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ SpeciesName: speciesName }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.success || 'Species added successfully!');
        setSpeciesName(''); // Reset form
      } else {
        alert(result.error || 'Error adding species');
      }
    } catch (error) {
      console.error('Failed to submit:', error);
      alert('Error adding species');
    }
  };

  return (
    <div>
      <h2>Add New Species</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="speciesName">Species Name</label>
          <input
            id="speciesName"
            type="text"
            value={speciesName}
            onChange={(e) => setSpeciesName(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
