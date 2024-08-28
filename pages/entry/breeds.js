import { useState, useEffect } from 'react';

export default function BreedsEntry() {
  const [breedName, setBreedName] = useState('');
  const [speciesID, setSpeciesID] = useState('');
  const [speciesList, setSpeciesList] = useState([]);

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const response = await fetch('http://your-server-address/api/species.php');
        const data = await response.json();
        setSpeciesList(data);
      } catch (error) {
        console.error('Failed to fetch species:', error);
      }
    };

    fetchSpecies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost/pets/breeds.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          BreedName: breedName,
          SpeciesID: speciesID,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.success || 'Breed added successfully!');
        setBreedName('');
        setSpeciesID('');
      } else {
        alert(result.error || 'Error adding breed');
      }
    } catch (error) {
      console.error('Failed to submit:', error);
      alert('Error adding breed');
    }
  };

  return (
    <div>
      <h2>Add New Breed</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="breedName">Breed Name</label>
          <input
            id="breedName"
            type="text"
            value={breedName}
            onChange={(e) => setBreedName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="speciesID">Species</label>
          <select
            id="speciesID"
            value={speciesID}
            onChange={(e) => setSpeciesID(e.target.value)}
          >
            <option value="">Select a species</option>
            {speciesList.map((species) => (
              <option key={species.SpeciesID} value={species.SpeciesID}>
                {species.SpeciesName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
