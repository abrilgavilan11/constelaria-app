import { Request, Response } from 'express';
import Sign from '../models/Sign';
import Planet from '../models/Planet';
import House from '../models/House';

export const getSigns = async (req: Request, res: Response) => {
  try {
    const signs = await Sign.find();
    res.json(signs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching signs' });
  }
};

export const getPlanets = async (req: Request, res: Response) => {
  try {
    const planets = await Planet.find();
    res.json(planets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching planets' });
  }
};

export const getHouses = async (req: Request, res: Response) => {
  try {
    const houses = await House.find().sort({ number: 1 });
    res.json(houses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching houses' });
  }
};
