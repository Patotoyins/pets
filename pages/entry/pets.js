import { useState, useEffect } from 'react';

export default function PetsEntry() {
  const [petName, setPetName] = useState('');
  const [speciesID, setSpeciesID] = useState('');
  const [breedID, setBreedID] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [ownerID, setOwnerID] = useState('');
  const [speciesList, setSpeciesList] = useState([]);
  const [breedsList, setBreedsList] = useState([]);
  const [ownersList, setOwnersList] = useState([]);

  useEffect(() => {
    // Fetch species list
    const fetchSpecies = async () => {
      try {
        const response = await fetch('/api/species');
        const data = await response.json();
        setSpeciesList(data);
      } catch (error) {
        console.error('Failed to fetch species:', error);
      }
    };

    // Fetch breeds list
    const fetchBreeds = async () => {
      try {
        const response = await fetch('/api/breeds');
        const data = await response.json();
        setBreedsList(data);
      } catch (error) {
        console.error('Failed to fetch breeds:', error);
      }
    };

    // Fetch owners list
    const fetchOwners = async () => {
      try {
        const response = await fetch('/api/owners');
        const data = await response.json();
        setOwnersList(data);
      } catch (error) {
        console.error('Failed to fetch owners:', error);
      }
    };

    fetchSpecies();
    fetchBreeds();
    fetchOwners();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: petName,
          SpeciesID: speciesID,
          BreedID: breedID,
          DateOfBirth: dateOfBirth,
          OwnerID: ownerID,
        }),
      });

      if (response.ok) {
        alert('Pet added successfully!');
        setPetName('');
        setSpeciesID('');
        setBreedID('');
        setDateOfBirth('');
        setOwnerID('');
      } else {
        alert('Error adding pet');
      }
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };

  return (
    <div>
      <h2>Add New Pet</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="petName">Pet Name</label>
          <input
            id="petName"
            type="text"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
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
        <div>
          <label htmlFor="breedID">Breed</label>
          <select
            id="breedID"
            value={breedID}
            onChange={(e) => setBreedID(e.target.value)}
          >
            <option value="">Select a breed</option>
            {breedsList.map((breed) => (
              <option key={breed.BreedID} value={breed.BreedID}>
                {breed.BreedName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            id="dateOfBirth"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="ownerID">Owner</label>
          <select
            id="ownerID"
            value={ownerID}
            onChange={(e) => setOwnerID(e.target.value)}
          >
            <option value="">Select an owner</option>
            {ownersList.map((owner) => (
              <option key={owner.OwnerID} value={owner.OwnerID}>
                {owner.Name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
