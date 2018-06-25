import express from 'express';
import {notesController} from './notesController'

const router = express.Router();


router.get("/", notesController.getNotes.bind(notesController));
router.get("/:id", notesController.getNote.bind(notesController));
router.post("/", notesController.addNewNote.bind(notesController));
router.put('/:id/', notesController.updateNote.bind(notesController));



export const notesRoutes = router;