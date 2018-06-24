import express from 'express';
import {notesController} from './notesController'

const router = express.Router();


router.get("/", notesController.getNotes.bind(notesController));
router.post("/", notesController.addNewNote.bind(notesController));
router.put("/:note/", notesController.updateNote.bind(notesController));
router.post("/:notes/", notesController.saveNotes.bind(notesController));


export const notesRoutes = router;