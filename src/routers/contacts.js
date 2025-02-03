import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';

// import { checkRoles } from '../middlewares/checkRoles.js';
// import { ROLES } from '../constants/index.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

// router.put(
//   '/:contactId',
//   isValidId,
//   validateBody(createContactSchema),
//   ctrlWrapper(upsertContactController),
// );

router.patch(
  '/:contactId',
  // checkRoles(ROLES.TEACHER),
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

// використовуємо middleware authenticate в роутері для запитів до колекції контактів
// router.use(authenticate);
router.get('/', ctrlWrapper(getContactsController));

export default router;
