import { Request, Response } from 'express';
import { getChartInterpretation } from '../services/interpretationService';

export const calculateNatalChart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, year, month, day, hour, lat, lng } = req.body;

    if (!year || !month || !day || hour === undefined || lat === undefined || lng === undefined) {
      res.status(400).json({ message: 'Missing required parameters' });
      return;
    }

    const result: any = await getChartInterpretation(year, month, day, hour, lat, lng);
    if (name) {
      result.name = name;
    }
    res.json(result);
  } catch (error) {
    console.error('Error calculating chart:', error);
    res.status(500).json({ message: 'Error calculating chart' });
  }
};
