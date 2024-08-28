import Link from 'next/link';
import { Button } from '@mui/material';

export default function Home() {
  return (
    <div>
      <h1>Pet Management Dashboard</h1>
      <Link href="/entry/species">
        <Button variant="contained">Manage Species</Button>
      </Link>
      <Link href="/entry/breeds">
        <Button variant="contained">Manage Breeds</Button>
      </Link>
      <Link href="/entry/owners">
        <Button variant="contained">Manage Owners</Button>
      </Link>
      <Link href="/entry/pets">
        <Button variant="contained">Manage Pets</Button>
      </Link>
      <Link href="/view/pets">
        <Button variant="contained">View All Pets</Button>
      </Link>
    </div>
  );
}
