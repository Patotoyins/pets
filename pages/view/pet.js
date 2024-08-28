import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

export default function ViewPets() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      const response = await fetch('/api/pets');
      const data = await response.json();
      setPets(data);
    };
    fetchPets();
  }, []);

  return (
    <div>
      <h2>All Pets</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Owner's Name</TableCell>
            <TableCell>Pet Name</TableCell>
            <TableCell>Species</TableCell>
            <TableCell>Breed</TableCell>
            <TableCell>Date Of Birth</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pets.map((pet) => (
            <TableRow key={pet.PetID}>
              <TableCell>{pet.Owner?.Name}</TableCell>
              <TableCell>{pet.Name}</TableCell>
              <TableCell>{pet.Species?.SpeciesName}</TableCell>
              <TableCell>{pet.Breed?.BreedName}</TableCell>
              <TableCell>{pet.DateOfBirth}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
