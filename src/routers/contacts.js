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

import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const router = Router();

router.get('/', checkRoles(ROLES.TEACHER), ctrlWrapper(getContactsController));
router.get(
  '/:contactId',
  checkRoles(ROLES.TEACHER),
  isValidId,
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/',
  checkRoles(ROLES.TEACHER),
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
  checkRoles(ROLES.TEACHER),
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

router.delete(
  '/:contactId',
  checkRoles(ROLES.TEACHER),
  isValidId,
  ctrlWrapper(deleteContactController),
);

// використовуємо middleware authenticate в роутері для запитів до колекції контактів
router.use(authenticate);
router.get('/', ctrlWrapper(getContactsController));

export default router;
