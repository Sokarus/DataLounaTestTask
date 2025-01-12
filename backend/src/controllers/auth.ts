import {Request, Response} from 'express';
import {DoRegister, DoLogin, DoChangePassword} from '@services/auth';

export const register = async (req: Request, res: Response) => {
  const {username, password} = req.body;

  try {
    await DoRegister(username, password);
    res.status(201).send({message: 'User registered successfully'});
  } catch (err) {
    res.status(400).send({error: (err as Error).message});
  }
};

export const login = async (req: Request, res: Response) => {
  const {username, password} = req.body;

  try {
    await DoLogin(username, password);
    res.status(200).send();
  } catch (err) {
    res.status(400).send({error: (err as Error).message});
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const {username, oldPassword, newPassword} = req.body;

  try {
    await DoChangePassword(username, oldPassword, newPassword);
    res.status(200).send();
  } catch (err) {
    res.status(400).send({error: (err as Error).message});
  }
};
