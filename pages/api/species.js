import Species from '../../models/Species';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const species = await Species.create(req.body);
        res.status(201).json(species);
      } catch (error) {
        console.error('Error adding species:', error);
        res.status(500).json({ error: 'Failed to add species' });
      }
      break;
    case 'GET':
      try {
        const species = await Species.findAll();
        res.status(200).json(species);
      } catch (error) {
        console.error('Error fetching species:', error);
        res.status(500).json({ error: 'Failed to fetch species' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
