const express = require('express')
const ContactsController = require('./controllers/ContactsController')
const PageController = require('./controllers/PageController')
const SqlClient = require('./lib/SqlClient')

const router = express.Router()

// Database Client
const sqlClient = new SqlClient()

// Controllers
const contactsController = new ContactsController(sqlClient)
const pageController = new PageController()

// Routes
router.get('/', contactsController.renderHomeWithContacts)

router.get('/contacts/create', contactsController.renderContactCreationForm)
router.post('/contacts/create', contactsController.insertAndRenderContact)

router.get('/contacts/:id', contactsController.renderSingleContact)

router.get('/contacts/:id/update', contactsController.renderContactUpdateForm)
router.post('/contacts/:id/update', contactsController.updateAndRenderContact)

router.post('/contacts/:id/delete', contactsController.deleteContactAndRenderResponse)

router.get('/about', pageController.renderAbout)
router.get('*', pageController.renderNotFound)

module.exports = router
