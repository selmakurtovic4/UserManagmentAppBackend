import { Router } from 'express';
import { getAllUsers, getUserById, updateUser, createUser, deleteUser } from '../controllers/users'; // Import the getUserById function
import { UserService } from '../services/userService';

const router = Router();


router.get('/', async (req, res, next) => {
  try {
    console.log("users ruta");
    const users = await getAllUsers(req, res, next);
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    console.log("nema");
    //console.log(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await getUserById(req, res, next);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.log("ruta error");
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



router.put('/:id', async (req, res, next) => {
  try {
  
    await updateUser(req, res, next);
    res.status(200).json({ message: 'Update successful' });
  } catch (error) {
    console.log("ruta error");
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



router.post('/', async (req, res, next) => {
  try {
    await createUser(req, res, next);
    res.status(200).json({ message: 'User created successfully' }); // Use 201 for resource creation
  } catch (error) {
    console.log("ruta error");
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await deleteUser(req, res, next);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.log("route error");
    console.log(error);
     next(error);
  }
});


export default router;
